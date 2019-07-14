<?php

namespace Drupal\open_pension_files\Plugin\Action;

use Drupal\Core\Action\ConfigurableActionBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\media\Entity\Media;
use Drupal\open_pension_files\OpenPensionFilesProcessInterface;
use Psr\Log\LogLevel;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Send files to process in the process service.
 *
 * @Action(
 *   id = "send_files_to_process",
 *   label = @Translation("Send files to the process service"),
 *   type = "media"
 * )
 */
class SendFilesToProcessor extends ConfigurableActionBase implements ContainerFactoryPluginInterface
{

    /**
     * Drupal\open_pension_files\OpenPensionFilesProcessInterface definition.
     *
     * @var \Drupal\open_pension_files\OpenPensionFilesProcessInterface
     */
    protected $openPensionFilesFileProcess;

    /**
     * Constructs a new SendFilesToProcessor action.
     *
     * @param array $configuration
     *   A configuration array containing information about the plugin instance.
     * @param string $plugin_id
     *   The plugin ID for the plugin instance.
     * @param mixed $plugin_definition
     *   The plugin implementation definition.
     * @param OpenPensionFilesProcessInterface $open_pension_files_file_process
     *   The file processor service.
     */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, OpenPensionFilesProcessInterface $open_pension_files_file_process) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);

        $this->openPensionFilesFileProcess = $open_pension_files_file_process;
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
        return new static(
            $configuration,
            $plugin_id,
            $plugin_definition,
            $container->get('open_pension_files.file_process')
        );
    }

    /**
     * {@inheritdoc}
     *
     * @throws \Drupal\Core\TypedData\Exception\MissingDataException
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \Drupal\Core\Entity\EntityStorageException
     */
    public function execute(Media $entity = NULL) {
        if ($entity->bundle() != 'open_pension_file') {
            $text = t('The media @id is not a valid open pension file', ['@id' => $entity->id()]);
            $this->openPensionFilesFileProcess->getLogger()->log(LogLevel::ERROR, $text);
            return;
        }

        if (!$file_field = $entity->get('field_media_file')->first()) {
            $text = t('The media @id has no file which can be process.', ['@id' => $entity->id()]);
            $this->openPensionFilesFileProcess->getLogger()->log(LogLevel::ERROR, $text);
            return;
        }

        $field_value = $file_field->getValue();

        // Update about the processing results.
        $this
            ->openPensionFilesFileProcess
            ->processFile($field_value['target_id'])
            ->updateEntity($entity);
    }

    /**
     * {@inheritdoc}
     */
    public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
        return $form;
    }

    /**
     * {@inheritdoc}
     */
    public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {}

    /**
     * {@inheritdoc}
     */
    public function access($object, AccountInterface $account = NULL, $return_as_object = FALSE) {
        return $account->hasPermission('manage file');
    }

}

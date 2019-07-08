<?php

namespace Drupal\open_pension_files\Controller;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Controller\ControllerBase;
use Drupal\media\Entity\Media;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\open_pension_files\OpenPensionFilesProcessInterface;
use Drupal\Core\Ajax\AlertCommand;


/**
 * Class SendFileToProcessController.
 */
class SendFileToProcessController extends ControllerBase
{

    /**
     * Drupal\open_pension_files\OpenPensionFilesProcessInterface definition.
     *
     * @var \Drupal\open_pension_files\OpenPensionFilesProcessInterface
     */
    protected $openPensionFilesFileProcess;


    /**
     * Constructs a new SendFileToProcessController object.
     */
    public function __construct(OpenPensionFilesProcessInterface $open_pension_files_file_process) {
        $this->openPensionFilesFileProcess = $open_pension_files_file_process;
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container) {
        return new static($container->get('open_pension_files.file_process'));
    }

    /**
     * Send file to the process service.
     *
     * @param Media $media
     *    The media object.
     *
     * @return AjaxResponse|void Array of markup.
     *    Array of markup.
     *
     * @throws \Drupal\Core\Entity\EntityStorageException
     * @throws \Drupal\Core\TypedData\Exception\MissingDataException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function handle_file(Media $media) {
        if ($media->bundle() != 'open_pension_file') {
            // todo: log.
            return;
        }
        if (!$file_field = $media->get('field_media_file')->first()) {
            // todo: log here.
            return;
        }

        $field_value = $file_field->getValue();

        // Update about the processing results.
        $media->field_processed = $this->openPensionFilesFileProcess->processFile($field_value['target_id']);

        // Add the history to the file.
        foreach ($this->openPensionFilesFileProcess->getTrackingLogs() as $log) {
            $media->field_history->appendItem($log);
        }

        // Saving file.
        $media->save();

        $response = new AjaxResponse();
        $response->addCommand(new AlertCommand('DOGS ARE GREAT!'));
        return $response;
    }

}

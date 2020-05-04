<?php

namespace Drupal\open_pension_files\Controller;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\media\Entity\Media;
use Drupal\open_pension_services\OpenPensionServicesHealthStatus;
use Psr\Log\LogLevel;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\open_pension_files\OpenPensionFilesProcessInterface;

/**
 * Class SendFileToProcessController.
 */
class SendFileToProcessController extends ControllerBase {

  /**
   * Drupal\open_pension_files\OpenPensionFilesProcessInterface definition.
   *
   * @var \Drupal\open_pension_files\OpenPensionFilesProcessInterface
   */
  protected $openPensionFilesFileProcess;

  /**
   * @var OpenPensionServicesHealthStatus
   */
  private $serviceHealthStatus;

  /**
   * Constructs a new SendFileToProcessController object.
   *
   * @param \Drupal\open_pension_files\OpenPensionFilesProcessInterface $open_pension_files_file_process
   *   The open pension file processor service.
   * @param MessengerInterface $messenger
   */
  public function __construct(
    OpenPensionFilesProcessInterface $open_pension_files_file_process,
    MessengerInterface $messenger,
    OpenPensionServicesHealthStatus $services_health_status
  ) {
    $this->openPensionFilesFileProcess = $open_pension_files_file_process;
    $this->messenger = $messenger;
    $this->serviceHealthStatus = $services_health_status;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('open_pension_files.file_process'),
      $container->get('messenger'),
      $container->get('open_pension_services.health_status')
    );
  }

  /**
   * Send file to the process service.
   *
   * @param \Drupal\media\Entity\Media $media
   *   The media object.
   *
   * @return mixed
   *   Array of markup.
   *
   * @throws \Drupal\Core\TypedData\Exception\MissingDataException
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  public function sendFile(Media $media) {
    $redirect = $this->redirect('view.open_pension_uploaded_files.page_1');

    if ($this->serviceHealthStatus->getProcessorState() === OpenPensionServicesHealthStatus::SERVICE_NOT_RESPONDING) {
      $this->messenger->addError(t('The processor service is not responding. Please check if the service alive.'));
      return $redirect;
    }

    if ($media->bundle() != 'open_pension_file') {
      $text = t('The media @id is not a valid open pension file', ['@id' => $media->id()]);
      $this->openPensionFilesFileProcess->getLogger()->log(LogLevel::ERROR, $text);
      $this->messenger->addError($text);

      return $redirect;
    }

    if (!$file_field = $media->get('field_media_file')->first()) {
      $text = t('The media @id has no file which can be process.', ['@id' => $media->id()]);
      $this->openPensionFilesFileProcess->getLogger()->log(LogLevel::ERROR, $text);
      $this->messenger->addError($text);

      return $redirect;
    }

    $field_value = $file_field->getValue();

    // Update about the processing results.
    $this
      ->openPensionFilesFileProcess
      ->sendToProcessor($field_value['target_id'])
      ->updateEntity($media);

    return $redirect;
  }

}

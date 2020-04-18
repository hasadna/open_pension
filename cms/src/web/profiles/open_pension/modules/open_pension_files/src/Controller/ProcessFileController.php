<?php

namespace Drupal\open_pension_files\Controller;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Controller\ControllerBase;
use Drupal\media\Entity\Media;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\RequestException;
use Masterminds\HTML5\Exception;
use Psr\Log\LogLevel;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\open_pension_files\OpenPensionFilesProcessInterface;
use Symfony\Component\HttpFoundation\Response;

/**
 * class ProcessFileController.
 */
class ProcessFileController extends ControllerBase {

  /**
   * Drupal\open_pension_files\OpenPensionFilesProcessInterface definition.
   *
   * @var \Drupal\open_pension_files\OpenPensionFilesProcessInterface
   */
  protected $openPensionFilesFileProcess;

  /**
   * GuzzleHttp\ClientInterface definition.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * Constructs a new SendFileToProcessController object.
   *
   * @param \Drupal\open_pension_files\OpenPensionFilesProcessInterface $open_pension_files_file_process
   *   The open pension file processor service.
   * @param ClientInterface $http_client
   *  The HTTP service.
   */
  public function __construct(OpenPensionFilesProcessInterface $open_pension_files_file_process, ClientInterface $http_client) {
    $this->openPensionFilesFileProcess = $open_pension_files_file_process;
    $this->httpClient = $http_client;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('open_pension_files.file_process'),
      $container->get('http_client')
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
  public function processFile(Media $media) {
    // todo: check that the processor is alive.
    //  Add the messenger service.
    $redirect = $this->redirect('view.open_pension_uploaded_files.page_1');

    if ($media->bundle() != 'open_pension_file') {
      $text = t('The media @id is not a valid open pension file', ['@id' => $media->id()]);
      $this->openPensionFilesFileProcess->getLogger()->log(LogLevel::ERROR, $text);
      \Drupal::messenger()->addError($text);

      return $redirect;
    }

    if (!$file_field = $media->get('field_media_file')->first()) {
      $text = t('The media @id has no file which can be process.', ['@id' => $media->id()]);
      $this->openPensionFilesFileProcess->getLogger()->log(LogLevel::ERROR, $text);
      \Drupal::messenger()->addError($text);

      return $redirect;
    }

    if (!$media->field_reference_in_other_service->value) {
      $text = t('The media @id has no process ID.', ['@id' => $media->id()]);
      $this->openPensionFilesFileProcess->getLogger()->log(LogLevel::ERROR, $text);
      \Drupal::messenger()->addError($text);

      return $redirect;
    }

    $field_value = $file_field->getValue();

    // Update about the processing results.
    $this
      ->openPensionFilesFileProcess
      ->processFile($field_value['target_id'])
      ->updateEntity($media);

    return $redirect;

  }

}

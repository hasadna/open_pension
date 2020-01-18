<?php

namespace Drupal\open_pension_files\Controller;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Controller\ControllerBase;
use Drupal\media\Entity\Media;
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
   * Constructs a new SendFileToProcessController object.
   *
   * @param \Drupal\open_pension_files\OpenPensionFilesProcessInterface $open_pension_files_file_process
   *   The open pension file processor service.
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

    if ($media->bundle() != 'open_pension_file') {
      $text = t('The media @id is not a valid open pension file', ['@id' => $media->id()]);
      $this->openPensionFilesFileProcess->getLogger()->log(LogLevel::ERROR, $text);
      return;
    }

    if (!$file_field = $media->get('field_media_file')->first()) {
      $text = t('The media @id has no file which can be process.', ['@id' => $media->id()]);
      $this->openPensionFilesFileProcess->getLogger()->log(LogLevel::ERROR, $text);
      return;
    }

    $field_value = $file_field->getValue();

    // Update about the processing results.
    $this
      ->openPensionFilesFileProcess
      ->processFile($field_value['target_id'])
      ->updateEntity($media);

    // Process the tests.
    $text = $media->field_processed ? t('Yes') : t('No');

    $items = [];
    array_map(function ($item) use (&$items) {
        $items[] = ['#markup' => $item['value']];
    }, array_slice($media->field_history->getValue(), -3, 2, TRUE));

    $order_list = [
      '#theme' => 'item_list',
      '#list_type' => 'ol',
      '#items' => $items,
    ];

    // Return the Ajax response and make stuff move magically on the screen.
    if (\Drupal::request()->request->get('js')) {
      $response = new AjaxResponse();
      $response->addCommand(new ReplaceCommand('.media-' . $media->id() . ' .processed', '<td>' . $text . '</td>'));
      $response->addCommand(new ReplaceCommand('.media-' . $media->id() . ' .views-field-field-history', '<td><div class="item-list">' . drupal_render($order_list) . '</div></td>'));
      $response->addCommand(new ReplaceCommand('.media-' . $media->id() . ' .views-field-field-reference-in-other-service', '<td class="views-field views-field-field-reference-in-other-service">' . (string)$media->field_reference_in_other_service->value . '</td>'));

      return $response;
    }

    return $this->redirect('view.open_pension_uploaded_files.page_1');

  }

}

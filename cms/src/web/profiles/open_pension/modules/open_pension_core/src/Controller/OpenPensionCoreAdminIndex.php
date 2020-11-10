<?php

namespace Drupal\open_pension_core\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;

/**
 * Class OpenPensionCoreAdminIndex.
 */
class OpenPensionCoreAdminIndex extends ControllerBase {

  /**
   * Upload_files.
   *
   * @return array
   *   Return the of available actions.
   */
  public function index(): array {

    $content = [
      [
        'title' => t('Query files'),
        'description' => t('Query files and download them for processing'),
        'url' => Url::fromRoute('open_pension_fetcher.open_pension_fetcher'),
      ],
      [
        'title' => t('Upload files'),
        'description' => t('Uploading files for process by the processor'),
        'url' => Url::fromRoute('open_pension_files.upload'),
      ],
      [
        'title' => t('Storage files'),
        'description' => t('Watch all the files which the storage files collected'),
        'url' => Url::fromUserInput('/admin/open_pension/open-pension-storage-files'),
      ],
      [
        'title' => t('Services Addresses'),
        'description' => t('Setting services addresses'),
        'url' => Url::fromRoute('open_pension_services.services_addresses'),
      ],
      [
        'title' => t('Reclamation tables'),
        'description' => t('Manage the reclamation tables'),
        'url' => Url::fromRoute('entity.instrument_type.collection'),
      ]
    ];

    return [
      '#theme' => 'admin_block_content',
      '#content' => $content,
    ];
  }

}

<?php

namespace Drupal\open_pension_core\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;

/**
 * Class OpenPensionCoreAdminIndex.
 */
class OpenPensionCoreAdminIndex extends ControllerBase
{

    /**
     * Upload_files.
     *
     * @return array
     *  Return the of available actions.
     */
    public function index(): array {

        $content = [
            [
                'title' => t('Upload files'),
                'description' => t('Uploading files for process by the processor'),
                'url' => Url::fromRoute('open_pension_files.upload'),
            ],
            [
                'title' => t('Watch uploaded files'),
                'description' => t('Browse uploaded files'),
                'url' => Url::fromRoute('view.open_pension_uploaded_files.page_1'),
            ],
            [
                'title' => t('Watch logs'),
                'description' => t('Watch logs from Kafka'),
                'url' => Url::fromRoute('open_pension_files.upload'),
            ],
        ];

        return [
            '#theme' => 'admin_block_content',
            '#content' => $content,
        ];
    }
}

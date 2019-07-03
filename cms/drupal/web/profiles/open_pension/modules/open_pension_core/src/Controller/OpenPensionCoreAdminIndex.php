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
        ];

        return [
            '#theme' => 'admin_block_content',
            '#content' => $content,
        ];
    }
}

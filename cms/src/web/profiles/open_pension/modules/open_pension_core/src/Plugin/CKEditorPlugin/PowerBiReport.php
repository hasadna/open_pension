<?php

namespace Drupal\open_pension_core\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "Power BI Report" plugin.
 *
 * @CKEditorPlugin(
 *   id = "open_pension_core_power_bi_report",
 *   label = @Translation("Power BI Report"),
 *   module = "open_pension_core"
 * )
 */
class PowerBiReport extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return drupal_get_path('module', 'open_pension_core') . '/js/plugins/power-bi-report/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    $module_path = drupal_get_path('module', 'open_pension_core');
    return [
      'power-bi-report' => [
        'label' => $this->t('Power BI Report'),
        'image' => $module_path . '/js/plugins/power-bi-report/icons/power-bi-report.png',
      ],
    ];
  }

}

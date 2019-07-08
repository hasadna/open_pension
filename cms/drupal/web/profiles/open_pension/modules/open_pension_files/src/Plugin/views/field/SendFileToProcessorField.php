<?php

namespace Drupal\open_pension_files\Plugin\views\field;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Component\Utility\Random;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\media\Entity\Media;
use Drupal\views\Plugin\views\field\FieldPluginBase;
use Drupal\views\ResultRow;

/**
 * A handler to provide a field that is completely custom by the administrator.
 *
 * @ingroup views_field_handlers
 *
 * @ViewsField("send_file_to_processor_field")
 */
class SendFileToProcessorField extends FieldPluginBase
{

    /**
     * {@inheritdoc}
     */
    public function usesGroupBy() {
        return FALSE;
    }

    /**
     * {@inheritdoc}
     */
    public function query() {
        // Do nothing -- to override the parent query.
    }

    /**
     * {@inheritdoc}
     */
    protected function defineOptions() {
        $options = parent::defineOptions();

        $options['hide_alter_empty'] = ['default' => FALSE];
        return $options;
    }

    /**
     * {@inheritdoc}
     */
    public function buildOptionsForm(&$form, FormStateInterface $form_state) {
        parent::buildOptionsForm($form, $form_state);
    }

    /**
     * {@inheritdoc}
     */
    public function render(ResultRow $values) {

        /** @var Media $entity */
        $entity = $this->getEntity($values);

        if (!$field_value = $entity->get('field_media_file')->getValue()) {
            return;
        }

        $link_array = array(
            '#type' => 'link',
            '#title' => t('Send to process'),
            '#url' => Url::fromRoute('open_pension_files.send_file_to_process_controller_handle_file', ['media' => $entity->id()]),
            '#attributes' => array(
                'class' => array('use-ajax'),
                'data-dialog-type' => 'dialog',
            ),
            '#attached' => array('library' => array('core/drupal.ajax')),
        );
        return drupal_render($link_array);
    }

}

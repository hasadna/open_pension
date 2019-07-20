<?php

namespace Drupal\open_pension_files_test;

use Drupal\Core\DependencyInjection\ContainerBuilder;
use Drupal\Core\DependencyInjection\ServiceProviderBase;

/**
 * Modifies the language manager service.
 */
class OpenPensionFilesTestServiceProvider extends ServiceProviderBase {

  /**
   * {@inheritdoc}
   */
  public function alter(ContainerBuilder $container) {
    $definition = $container->getDefinition('open_pension_files.file_process');
    $definition->setClass('Drupal\open_pension_files_test\OpenPensionFilesTestFileProcess');
  }
}

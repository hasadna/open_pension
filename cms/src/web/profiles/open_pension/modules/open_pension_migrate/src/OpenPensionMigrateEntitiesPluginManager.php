<?php

namespace Drupal\open_pension_migrate;

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Plugin\DefaultPluginManager;

/**
 * OpenPensionMigrateEntities plugin manager.
 */
class OpenPensionMigrateEntitiesPluginManager extends DefaultPluginManager {

  /**
   * Constructs OpenPensionMigrateEntitiesPluginManager object.
   *
   * @param \Traversable $namespaces
   *   An object that implements \Traversable which contains the root paths
   *   keyed by the corresponding namespace to look for plugin implementations.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache_backend
   *   Cache backend instance to use.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler to invoke the alter hook with.
   */
  public function __construct(\Traversable $namespaces, CacheBackendInterface $cache_backend, ModuleHandlerInterface $module_handler) {
    parent::__construct(
      'Plugin/OpenPensionMigrateEntities',
      $namespaces,
      $module_handler,
      'Drupal\open_pension_migrate\OpenPensionMigrateEntitiesInterface',
      'Drupal\open_pension_migrate\Annotation\OpenPensionMigrateEntities'
    );
    $this->alterInfo('open_pension_migrate_entities_info');
    $this->setCacheBackend($cache_backend, 'open_pension_migrate_entities_plugins');
  }

}

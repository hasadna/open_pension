<?php

namespace Drupal\open_pension_blog\Commands;

use Consolidation\OutputFormatters\StructuredData\RowsOfFields;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\open_pension_reclamation\OpenPensionReclamationParseSourceFile;
use Drush\Commands\DrushCommands;

/**
 * A Drush commandfile.
 *
 * In addition to this file, you need a drush.services.yml
 * in root of your module, and a composer.json file that provides the name
 * of the services file to use.
 *
 * See these files for an example of injecting Drupal services:
 *   - http://cgit.drupalcode.org/devel/tree/src/Commands/DevelCommands.php
 *   - http://cgit.drupalcode.org/devel/tree/drush.services.yml
 */
class OpenPensionBlogCommands extends DrushCommands {

  protected $entires = [
    'blog' => [
      ['title' => 'Frist blog', 'file' => 'first.html']
    ],
  ];

  /**
   * @var EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * OpenPensionBlogCommands constructor.
   *
   * @param EntityTypeManagerInterface $entityTypeManager
   *  The entity type manager.
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager) {
    $this->entityTypeManager = $entityTypeManager;
  }

  /**
   * Migrating contents.
   *
   * @command open_pension_blog:import
   */
  public function migrateBlogs() {
    $this->io()->title(dt('Migrating blogs'));

    // Start to migrate the blog files.
    $this->importBlogs();
  }

  /**
   * Get the file path relative to the asserts folder.
   *
   * @param $relative_path
   *  The relative path.
   * @return string
   *  A path which can be handle by Drupal.
   */
  protected function getFilePath($relative_path) {
    return drupal_get_path('module', 'open_pension_blog') . '/assets/' . $relative_path;
  }

  /**
   * Import the blogs.
   */
  public function importBlogs() {
    $entity = $this->entityTypeManager->getStorage('node');
    foreach ($this->entires['blog'] as $blog) {
      $file_content = file_get_contents($this->getFilePath("blogs_content/{$blog['file']}"));

      $values = [
        'type' => 'blog',
        'title' => $blog['title'],
        'langcode' => 'en',
        'body' => ['value' => $file_content, 'format' => 'full_html', 'summary' => '',],
        'uid' => 1,
      ];

      $entity->create($values)->save();
    }
  }
}

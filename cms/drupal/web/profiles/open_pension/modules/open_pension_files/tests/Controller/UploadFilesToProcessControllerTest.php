<?php

namespace Drupal\open_pension_files\Tests;

use Drupal\simpletest\WebTestBase;

/**
 * Provides automated tests for the open_pension_files module.
 */
class UploadFilesToProcessControllerTest extends WebTestBase {


  /**
   * {@inheritdoc}
   */
  public static function getInfo() {
    return [
      'name' => "open_pension_files UploadFilesToProcessController's controller functionality",
      'description' => 'Test Unit for module open_pension_files and controller UploadFilesToProcessController.',
      'group' => 'Other',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function setUp() {
    parent::setUp();
  }

  /**
   * Tests open_pension_files functionality.
   */
  public function testUploadFilesToProcessController() {
    // Check that the basic functions of module open_pension_files.
    $this->assertEquals(TRUE, TRUE, 'Test Unit Generated via Drupal Console.');
  }

}

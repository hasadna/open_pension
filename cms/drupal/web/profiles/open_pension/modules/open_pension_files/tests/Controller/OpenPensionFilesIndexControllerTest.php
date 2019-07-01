<?php

namespace Drupal\open_pension_files\Tests;

use Drupal\simpletest\WebTestBase;

/**
 * Provides automated tests for the open_pension_files module.
 */
class OpenPensionFilesIndexControllerTest extends WebTestBase {


  /**
   * {@inheritdoc}
   */
  public static function getInfo() {
    return [
      'name' => "open_pension_files OpenPensionFilesIndexController's controller functionality",
      'description' => 'Test Unit for module open_pension_files and controller OpenPensionFilesIndexController.',
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
  public function testOpenPensionFilesIndexController() {
    // Check that the basic functions of module open_pension_files.
    $this->assertEquals(TRUE, TRUE, 'Test Unit Generated via Drupal Console.');
  }

}

<?php

namespace Drupal\open_pension_files\Tests;

use Drupal\simpletest\WebTestBase;
use Drupal\open_pension_files\OpenPensionFilesProcessInterface;

/**
 * Provides automated tests for the open_pension_files module.
 */
class SendFileToProcessControllerTest extends WebTestBase {

  /**
   * Drupal\open_pension_files\OpenPensionFilesProcessInterface definition.
   *
   * @var \Drupal\open_pension_files\OpenPensionFilesProcessInterface
   */
  protected $openPensionFilesFileProcess;


  /**
   * {@inheritdoc}
   */
  public static function getInfo() {
    return [
      'name' => "open_pension_files SendFileToProcessController's controller functionality",
      'description' => 'Test Unit for module open_pension_files and controller SendFileToProcessController.',
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
  public function testSendFileToProcessController() {
    // Check that the basic functions of module open_pension_files.
    $this->assertEquals(TRUE, TRUE, 'Test Unit Generated via Drupal Console.');
  }

}

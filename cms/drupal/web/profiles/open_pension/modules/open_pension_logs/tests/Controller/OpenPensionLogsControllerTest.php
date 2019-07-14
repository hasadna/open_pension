<?php

namespace Drupal\open_pension_logs\Tests;

use Drupal\simpletest\WebTestBase;
use GuzzleHttp\ClientInterface;

/**
 * Provides automated tests for the open_pension_logs module.
 */
class OpenPensionLogsControllerTest extends WebTestBase {

  /**
   * GuzzleHttp\ClientInterface definition.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;


  /**
   * {@inheritdoc}
   */
  public static function getInfo() {
    return [
      'name' => "open_pension_logs OpenPensionLogsController's controller functionality",
      'description' => 'Test Unit for module open_pension_logs and controller OpenPensionLogsController.',
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
   * Tests open_pension_logs functionality.
   */
  public function testOpenPensionLogsController() {
    // Check that the basic functions of module open_pension_logs.
    $this->assertEquals(TRUE, TRUE, 'Test Unit Generated via Drupal Console.');
  }

}

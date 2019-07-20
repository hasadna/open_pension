<?php

namespace Drupal\Tests\open_pension_files\Kernel;

use Drupal\KernelTests\KernelTestBase;
use Drupal\open_pension_files\OpenPensionFilesProcessInterface;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use Psr\Log\LogLevel;

class OpenPensionFilesFileProcessTest extends KernelTestBase {

  /**
   * Modules to enable.
   */
  public static $modules = [
    'file',
    'user',
    'open_pension_files',
  ];

  /**
   * @var OpenPensionFilesProcessInterface
   */
  protected $openPensionFilesProcess;

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();
    $this->installEntitySchema('file');
    $this->installEntitySchema('user');
    $logger = new OpenPensionFilesLoggerChannel('testing');

    $this->openPensionFilesProcess = $this->container->get('open_pension_files.file_process');

    $this->openPensionFilesProcess
      ->setHttpClient($this->getMockHttpClient())
      ->setLogger($logger);
  }

  /**
   * Get an dummy object.
   *
   * @return Client
   */
  protected function getMockHttpClient(): Client {

    $mock = new MockHandler([
      new Response(200, ['X-Foo' => 'Bar']),
      new Response(400, ['Content-Length' => 0]),
    ]);

    return new Client(['handler' => HandlerStack::create($mock)]);
  }

  /**
   * Testing the log method.
   */
  public function testLog() {
    $this->openPensionFilesProcess->log('This is a logging message', LogLevel::INFO);

    $this->assertEquals(
      $this->openPensionFilesProcess->getTrackingLogs(),
      ['This is a logging message']
    );

    $this->assertEquals(
      $this->openPensionFilesProcess->getLogger()->logs,
      [['level' => LogLevel::INFO, 'message' => 'This is a logging message']]
    );
  }

  /**
   * Testing the process files method.
   */
  public function _testProcessFile() {
  }

  /**
   * Testing the update media method.
   */
  public function _testUpdateEntity() {

  }

}

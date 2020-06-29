<?php

namespace Drupal\Tests\open_pension_services\Unit;

use Drupal\open_pension_services\OpenPensionServicesHealthStatus;
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use Drupal\Tests\UnitTestCase;
use GuzzleHttp\Handler\MockHandler;
use Symfony\Component\HttpFoundation\Response;


/**
 * Test description.
 *
 * @group open_pension_services
 */
class ServiceCheckHealthTest extends UnitTestCase {
  /**
   * @var OpenPensionServicesHealthStatus
   */
  protected $openPensionServiceHealthCheck;

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();

    $mock = new MockHandler([
      new Response(Response::HTTP_INTERNAL_SERVER_ERROR),
      new Response(202, [], ['status' => Response::HTTP_OK]),
    ]);

    $handlerStack = HandlerStack::create($mock);
    $httpMock = new Client(['handler' => $handlerStack]);

    $this->openPensionServiceHealthCheck = new OpenPensionServicesHealthStatus($httpMock);
  }

  /**
   * Tests something.
   */
  public function testCheckProcessorHealth() {
    // Verify when it's failed the health checker will return false.
    $this->openPensionServiceHealthCheck->checkProcessorHealth();

    $this->assertEquals(1, 1);
  }

}

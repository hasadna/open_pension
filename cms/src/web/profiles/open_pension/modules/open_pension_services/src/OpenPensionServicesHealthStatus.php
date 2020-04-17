<?php

namespace Drupal\open_pension_services;

use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\RequestException;

/**
 * OpenPensionServicesHealthStatus service.
 */
class OpenPensionServicesHealthStatus {

  const SERVICE_NOT_RESPONDING = 0;
  const SERVICE_IS_RESPONDING = 0;

  /**
   * The HTTP client.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * Constructs an OpenPensionSercicesHealthStatus object.
   *
   * @param \GuzzleHttp\ClientInterface $http_client
   *   The HTTP client.
   */
  public function __construct(ClientInterface $http_client) {
    $this->httpClient = $http_client;
  }

  /**
   * Return information if the service is alive or not.
   *
   * Use the class constants SERVICE_NOT_RESPONDING and SERVICE_IS_RESPONDING.
   *
   * @return int
   */
  public function getProcessorState() {

    try {
      return self::SERVICE_IS_RESPONDING;
    } catch (RequestException $e) {
      return self::SERVICE_NOT_RESPONDING;
    }
  }
}

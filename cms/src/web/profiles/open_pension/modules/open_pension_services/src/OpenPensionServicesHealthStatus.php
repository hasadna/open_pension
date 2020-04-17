<?php

namespace Drupal\open_pension_services;

use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\RequestException;

/**
 * OpenPensionServicesHealthStatus service.
 */
class OpenPensionServicesHealthStatus {

  const SERVICE_NOT_RESPONDING = 0;
  const SERVICE_IS_RESPONDING = 1;

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
      // todo: move service address to a config schema.
      $this->httpClient->request('POST', 'http://localhost:1000');
      return self::SERVICE_IS_RESPONDING;
    } catch (RequestException $e) {
      if ($e->getCode() === 0 || $e->getCode() >= 500) {
        // The CURL request failed so we got 0 as code or the server has an
        // internal error, 500 and above, so we need to return that the service
        // is not alive.
        return self::SERVICE_NOT_RESPONDING;
      }

      // No 500 error or a 0 code. The service is alive but something else went
      // wrong - bad request, not allowed method or anything else.
      return self::SERVICE_IS_RESPONDING;
    }
  }
}

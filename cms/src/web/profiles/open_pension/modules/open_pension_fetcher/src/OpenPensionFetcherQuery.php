<?php

namespace Drupal\open_pension_fetcher;

use Drupal\Core\DependencyInjection\ContainerBuilder;
use Drupal\Core\DependencyInjection\ServiceProviderBase;
use Drupal\open_pension_services\OpenPensionServicesAddresses;
use Drupal\open_pension_services\OpenPensionServicesHealthStatus;
use GuzzleHttp\ClientInterface;
use Symfony\Component\DependencyInjection\Reference;

/**
 * Defines a service provider for the Open Pension Fetcher module.
 */
class OpenPensionFetcherQuery {

  protected $httpClient;

  protected $servicesHealthStatus;

  protected $servicesAddresses;

  /**
   * Constructs an OpenPensionServicesHealthStatus object.
   *
   * @param \GuzzleHttp\ClientInterface $http_client
   *   The HTTP client.
   * @param OpenPensionServicesAddresses $open_pension_health_status
   *  The services addresses service.
   */
  public function __construct(ClientInterface $http_client, OpenPensionServicesAddresses $services_addresses, OpenPensionServicesHealthStatus $open_pension_health_status) {
    $this->servicesAddresses = $services_addresses;
    $this->httpClient = $http_client;
    $this->servicesHealthStatus = $open_pension_health_status;
  }

  public function query() {
    if (!$this->servicesHealthStatus->getFetcherState()) {
      \Drupal::messenger()->addError(t('The fetcher services does not responding'));
      return [];
    }

    $fetcher_address = $this->servicesAddresses->getFetcherAddress();
    $graphQLquery = '{"query": "query {systemField {Id, Label} reportsType{Id, Label} toYearRange{Years,Quarters{Id,Label}} fromYearRange{Years,Quarters{Id,Label}}}"}';

    $response = $this->httpClient->post($fetcher_address . '/graphql', [
      'headers' => [
        'Content-Type' => 'application/json'
      ],
      'body' => $graphQLquery
    ])
      ->getBody()->getContents();

    return json_decode($response, true)['data'];
  }

}

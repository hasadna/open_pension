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

  protected function sendQuery($query) {
    if (!$this->servicesHealthStatus->getFetcherState()) {
      \Drupal::messenger()->addError(t('The fetcher services does not responding'));
      return [];
    }

    $fetcher_address = $this->servicesAddresses->getFetcherAddress();
    $response = $this->httpClient->post($fetcher_address . '/graphql', [
      'headers' => [
        'Content-Type' => 'application/json',
      ],
      'body' => json_encode([
        'query' => $query,
      ]),
    ]);

    return $response->getBody()->getContents();
  }

  public function query() {
    if (!$this->servicesHealthStatus->getFetcherState()) {
      \Drupal::messenger()->addError(t('The fetcher services does not responding'));
      return [];
    }

    $query = <<<'GRAPHQL'
    query {
      systemField {
        Id
        Label
      }
      reportsType {
        Id
        Label
      }
      fromYearRange {
        Years
        Quarters {
          Id
          Label
        }
      }
      toYearRange {
        Years
        Quarters {
          Id
          Label
        }
      }
    }
    GRAPHQL;

    $response = $this->sendQuery($query);
    return json_decode($response, true)['data'];
  }

  public function mutate($system_field, $report_type, $from_year, $from_quarter, $to_year, $to_quarter) {
    if (!$this->servicesHealthStatus->getFetcherState()) {
      \Drupal::messenger()->addError(t('The fetcher services does not responding'));
      return [];
    }

    $query = <<<'GRAPHQL'
      mutation {
        downloadReports(
          query: {
            SystemField: "{system_field}",
            ReportType: "{report_type}",
            FromYearPeriod: {Year: {from_year}, Quarter: "{from_quarter}"},
            ToYearPeriod: {Year: {to_year}, Quarter: "{to_quarter}"}
          }
        ) {
          links, errors
        }
      }
    GRAPHQL;

    $query = str_replace('{system_field}', $system_field, $query);
    $query = str_replace('{report_type}', $report_type, $query);

    $query = str_replace('{from_year}', $from_year, $query);
    $query = str_replace('{from_quarter}', $from_quarter, $query);

    $query = str_replace('{to_year}', $to_year, $query);
    $query = str_replace('{to_quarter}', $to_quarter, $query);

    return $response = $this->sendQuery($query);
  }

}

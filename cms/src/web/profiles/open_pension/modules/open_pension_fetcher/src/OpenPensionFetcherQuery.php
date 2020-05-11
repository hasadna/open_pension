<?php

namespace Drupal\open_pension_fetcher;

use Drupal\Core\DependencyInjection\ContainerBuilder;
use Drupal\Core\DependencyInjection\ServiceProviderBase;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\open_pension_services\OpenPensionServicesAddresses;
use Drupal\open_pension_services\OpenPensionServicesHealthStatus;
use GuzzleHttp\ClientInterface;
use Symfony\Component\DependencyInjection\Reference;

/**
 * Defines a service provider for the Open Pension Fetcher module.
 */
class OpenPensionFetcherQuery {

  /**
   * @var ClientInterface
   */
  protected $httpClient;

  /**
   * @var OpenPensionServicesAddresses|OpenPensionServicesHealthStatus
   */
  protected $servicesHealthStatus;

  /**
   * @var OpenPensionServicesAddresses
   */
  protected $servicesAddresses;

  /**
   * @var MessengerInterface
   */
  protected $messenger;

  /**
   * Constructs an OpenPensionServicesHealthStatus object.
   *
   * @param \GuzzleHttp\ClientInterface $http_client
   *   The HTTP client.
   * @param OpenPensionServicesAddresses $open_pension_health_status
   *  The services addresses service.
   */
  public function __construct(ClientInterface $http_client, OpenPensionServicesAddresses $services_addresses, OpenPensionServicesHealthStatus $open_pension_health_status, MessengerInterface $messenger) {
    $this->servicesAddresses = $services_addresses;
    $this->httpClient = $http_client;
    $this->servicesHealthStatus = $open_pension_health_status;
    $this->messenger = $messenger;
  }

  /**
   * Sending the query. Can be a query or mutation.
   *
   * @param $query
   *  The query to send.
   * @return string
   *  JSON results form the query.
   */
  protected function sendQuery($query) {
    if (!$this->servicesHealthStatus->getFetcherState()) {
      $this->messenger->addError(t('The fetcher services does not responding'));
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

  /**
   * Query the fetcher for the form options.
   *
   * @return array decoded results.
   */
  public function query() {
    if (!$this->servicesHealthStatus->getFetcherState()) {
      $this->messenger->addError(t('The fetcher services does not responding'));
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

  /**
   * Sending a mutation.
   *
   * @param $system_field
   *  The system field.
   * @param $report_type
   *  The report type.
   * @param $from_year
   *  The year to query from.
   * @param $from_quarter
   *  The quarter to query form.
   * @param $to_year
   *  The year to query to.
   * @param $to_quarter
   *  The quarter to query to.
   * @return array
   */
  public function mutate($system_field, $report_type, $from_year, $from_quarter, $to_year, $to_quarter) {
    if (!$this->servicesHealthStatus->getFetcherState()) {
      $this->messenger->addError(t('The fetcher services does not responding'));
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

    return $this->sendQuery($query);
  }

  public function collectLinks() {
    // todo: inject the entity storage for query.
    $storage = \Drupal::entityTypeManager()->getStorage('open_pension_links');

    $ids = $storage
      ->getQuery()
      ->notExists('open_pension_file', NULL)
      ->execute();

    $results = $storage->loadMultiple($ids);

    $links_payload = [];
    foreach ($results as $result) {
      // append the link.
      $links_payload[] = $result->get('url')->value;
    }

    $query = <<<'GRAPHQL'
      mutation {
        downloadFiles(
          query: {
            files: {files_links}
          }
        ) {
          links, errors
        }
      }
    GRAPHQL;

    $query = str_replace('{files_links}', json_decode($links_payload), $query);

    $this->sendQuery($query);
  }

}

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

  public function mutate() {
    if (!$this->servicesHealthStatus->getFetcherState()) {
      \Drupal::messenger()->addError(t('The fetcher services does not responding'));
      return [];
    }

    $fetcher_address = $this->servicesAddresses->getFetcherAddress();

    $query = <<<'GRAPHQL'
      mutation {
        downloadReports(
          query: {
            SystemField: "",
            ReportType: "",
            FromYearPeriod: {Year: 2020, Quarter: "1"},
            ToYearPeriod: {Year: 2020, Quarter: "1"}
          }
        ) {
          links, errors
        }
      }
    GRAPHQL;

//    $response = $this->sendQuery($query);

    $response = '
    {"data":{"downloadReports":{"links":["https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=1805078&extention=XLSX","https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=1805077&extention=XLSX","https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=1805076&extention=XLSX","https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=1803876&extention=XLSX","https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=1810092&extention=XLSX","https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=1810089&extention=XLSX","https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=1810090&extention=XLSX","https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=1810088&extention=XLSX","https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=1810087&extention=XLSX","https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=1810094&extention=XLSX"]}}}
    ';

    $decoded = json_decode($response, true)['data'];

    if (!empty($decoded['downloadReports']['errors'])) {
      return [];
    }

    return $decoded['downloadReports']['links'];
  }

}

<?php

namespace Drupal\open_pension_fetcher;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\open_pension_services\OpenPensionServicesAddresses;
use Drupal\open_pension_services\OpenPensionServicesHealthStatus;
use GuzzleHttp\ClientInterface;
use Drupal\Core\Logger\LoggerChannelFactory;


/**
 * Defines a service provider for the Open Pension Fetcher module.
 */
class OpenPensionFetcherService {

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
   * @var EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   */
  protected $logger;

  /**
   * Constructs an OpenPensionServicesHealthStatus object.
   *
   * @param \GuzzleHttp\ClientInterface $http_client
   *   The HTTP client.
   * @param OpenPensionServicesAddresses $open_pension_health_status
   *  The services addresses service.
   */
  public function __construct(
    ClientInterface $http_client,
    OpenPensionServicesAddresses $services_addresses,
    OpenPensionServicesHealthStatus $open_pension_health_status,
    MessengerInterface $messenger,
    EntityTypeManagerInterface $entity_type_manager,
    LoggerChannelFactory $logger_factory
  ) {
    $this->servicesAddresses = $services_addresses;
    $this->httpClient = $http_client;
    $this->servicesHealthStatus = $open_pension_health_status;
    $this->messenger = $messenger;
    $this->entityTypeManager = $entity_type_manager;
    $this->logger = $logger_factory->get('open_pension_fetcher');
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
   * Collect links without files.
   *
   * @return array|string
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function collectLinks() {
    $storage = $this->entityTypeManager->getStorage('open_pension_links');

    $links_ids = $storage
      ->getQuery()
      ->notExists('open_pension_file', NULL)
      ->range(0, 50)
      ->execute();

    /** @var ContentEntityInterface[] $links */
    $links = $storage->loadMultiple($links_ids);

    $links_payload = [];
    foreach ($links as $link) {
      // append the link.
      $url = $link->get('url')->value;

      $duplicates = $storage
        ->getQuery()
        ->condition('url', $url)
        ->condition('id', $link->id(), '<>')
        ->execute();

      if ($duplicates) {
        $this->logger->warning(t('Deleting the link record - @url - due to duplicates', ['@url' => $url]));
        $link->delete();
        continue;
      }

      $links_payload[] = $url;
    }

    if (!$links_payload) {
      return [];
    }

    $query = <<<'GRAPHQL'
      mutation {
        completeFilesCollecting(
          query: {
            Urls: {files_links}
          }
        ) {
          links, errors
        }
      }
    GRAPHQL;

    $query = str_replace('{files_links}', json_encode($links_payload), $query);

    return $this->sendQuery($query);
  }

}

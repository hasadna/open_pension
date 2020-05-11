<?php

namespace Drupal\open_pension_fetcher\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\open_pension_fetcher\OpenPensionFetcherQuery;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Returns responses for Open Pension Fetcher routes.
 */
class OpenPensionFetcherCollectFiles extends ControllerBase {

  /**
   * The open_pension_fetcher.query service.
   *
   * @var \Drupal\open_pension_fetcher\OpenPensionFetcherQuery
   */
  protected $openPensionFetcherQuery;

  /**
   * @var LoggerInterface
   */
  protected $logger;

  /**
   * OpenPensionFetcherCollectFiles constructor.
   *
   * @param OpenPensionFetcherQuery $open_pension_fetcher_query
   */
  public function __construct(OpenPensionFetcherQuery $open_pension_fetcher_query, LoggerInterface $logger) {
    $this->openPensionFetcherQuery = $open_pension_fetcher_query;
    $this->logger = $logger;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('open_pension_fetcher.query'),
      $container->get('logger.factory')->get('open_pension_fetcher')
    );
  }

  /**
   * Builds the response.
   */
  public function build() {
    $redirect = $this->redirect('entity.open_pension_links.collection');

    $results = json_decode($this->openPensionFetcherQuery->collectLinks());

    if (!empty($results->data->completeFilesCollecting->errors)) {

      foreach ($results->data->completeFilesCollecting->errors as $error) {
        $this->messenger()->addError($error);
        $this->logger->error($error);
      }

      return $redirect;
    }

    $this->logger->info($results->data->completeFilesCollecting->links[0]);
    $this->messenger()->addMessage($results->data->completeFilesCollecting->links[0]);

    return $redirect;
  }

}

<?php

namespace Drupal\open_pension_fetcher\Form;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Entity\EntityManagerInterface;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Entity\EntityTypeBundleInfoInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\open_pension_fetcher\OpenPensionFetcherQuery;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Form controller for the open pension links entity edit forms.
 */
class OpenPensionLinksForm extends ContentEntityForm {

  /**
   * @var OpenPensionFetcherQuery
   */
  protected $openPensionFetcherQuery;

  public function __construct(
    EntityRepositoryInterface $entity_repository,
    EntityTypeBundleInfoInterface $entity_type_bundle_info,
    TimeInterface $time,
    OpenPensionFetcherQuery $open_pension_fetcher_query
  ) {
    parent::__construct($entity_repository, $entity_type_bundle_info, $time);
    $this->openPensionFetcherQuery = $open_pension_fetcher_query;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity.repository'),
      $container->get('entity_type.bundle.info'),
      $container->get('datetime.time'),
      $container->get('open_pension_fetcher.query')
    );
  }


  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    $query_response = $this->openPensionFetcherQuery->query();

    $iterator = function($values) {
      $system_fields = [];
      foreach ($values as $item) {
        $system_fields[$item['Id']] = $item['Label'];
      }

      return $system_fields;
    };

    $form['#attached']['library'][] = 'open_pension_fetcher/fetcher-service-query';
    $form['system_field'] = [
      '#type' => 'select',
      '#title' => t('System field'),
      '#options' => $iterator($query_response['systemField']),
    ];

    $form['reports_type'] = [
      '#type' => 'select',
      '#title' => t('Reports type'),
      '#options' => $iterator($query_response['reportsType']),
    ];

    $form['period_filter'] = [
      '#type' => 'details',
      '#title' => $this->t('Filter by period'),
      '#collapsible' => TRUE,
      '#collapsed' => FALSE,
      '#open' => TRUE,

      'from' => [
        '#type' => 'details',
        '#title' => $this->t('From'),
        'year' => [
          '#type' => 'select',
          '#title' => t('Years'),
          '#options' => $query_response['fromYearRange']['Years'],
        ],
        'quarter' => [
          '#type' => 'select',
          '#title' => t('Quarters'),
          '#options' => $iterator($query_response['fromYearRange']['Quarters']),
        ],
      ],
      'to' => [
        '#type' => 'details',
        '#title' => $this->t('To'),
        'year' => [
          '#type' => 'select',
          '#title' => t('Years'),
          '#options' => $query_response['fromYearRange']['Years'],
        ],
        'quarter' => [
          '#type' => 'select',
          '#title' => t('Quarters'),
          '#options' => $iterator($query_response['fromYearRange']['Quarters']),
        ],
      ],
    ];

    unset($form['created']);

    return $form;
  }

}

<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Datetime\DateFormatterInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a list controller for the market date entity type.
 */
class MarketDateListBuilder extends EntityListBuilder {

  use ReclamationBuildRowHelperTrait {
    buildRow as public traitBuildRow;
  }

  static $fields = ['date_quarter', 'vol_nominal', 'vol_chas', 'price', 'price_qoq', 'price_ave', 'registered_capital', 'price_ave_qoq'];

  /**
   * The date formatter service.
   *
   * @var \Drupal\Core\Datetime\DateFormatterInterface
   */
  protected $dateFormatter;

  /**
   * Constructs a new MarketDateListBuilder object.
   *
   * @param \Drupal\Core\Entity\EntityTypeInterface $entity_type
   *   The entity type definition.
   * @param \Drupal\Core\Entity\EntityStorageInterface $storage
   *   The entity storage class.
   * @param \Drupal\Core\Datetime\DateFormatterInterface $date_formatter
   *   The date formatter service.
   */
  public function __construct(EntityTypeInterface $entity_type, EntityStorageInterface $storage, DateFormatterInterface $date_formatter) {
    parent::__construct($entity_type, $storage);
    $this->dateFormatter = $date_formatter;
  }

  /**
   * {@inheritdoc}
   */
  public static function createInstance(ContainerInterface $container, EntityTypeInterface $entity_type) {
    return new static(
      $entity_type,
      $container->get('entity_type.manager')->getStorage($entity_type->id()),
      $container->get('date.formatter')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function render() {
    $build['table'] = parent::render();

    $total = $this->getStorage()
      ->getQuery()
      ->count()
      ->execute();

    $build['summary']['#markup'] = $this->t('Total market dates: @total', ['@total' => $total]);
    return $build;
  }

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['id'] = $this->t('ID');
    $header['instrument_number'] = $this->t('Instrument number');
    $header['date_quarter'] = $this->t('Date quarter');
    $header['vol_nominal'] = $this->t('A VolNominal');
    $header['vol_chas'] = $this->t('A VolChas');
    $header['price'] = $this->t('price');
    $header['price_qoq'] = $this->t('Price QoQ');
    $header['price_ave'] = $this->t('Price Ave');
    $header['registered_capital'] = $this->t('Registered Capital');
    $header['price_ave_qoq'] = $this->t('Price Ave - QoQ');

    return $header + parent::buildHeader();
  }

  public function buildRow(EntityInterface $entity) {
    $row = $this->traitBuildRow($entity);

    $row['date_quarter'] = $this->dateFormatter->format($entity->get('date_quarter')->value, '', 'd/m/Y');

    return $row;
  }

}

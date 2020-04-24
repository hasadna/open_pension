<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Datetime\DateFormatterInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\open_pension_reclamation\Entity\ReclamationEntityFieldsHelper;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a list controller for the mutual fund entity type.
 */
class MutualFundListBuilder extends EntityListBuilder {

  use ReclamationBuildRowHelperTrait;
  static $fields = ['instrument_name', 'category', 'sub_category', 'giografic'];

  /**
   * The date formatter service.
   *
   * @var \Drupal\Core\Datetime\DateFormatterInterface
   */
  protected $dateFormatter;

  /**
   * Constructs a new MutualFundListBuilder object.
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

    $build['summary']['#markup'] = $this->t('Total mutual funds: @total', ['@total' => $total]);
    return $build;
  }

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['id'] = $this->t('ID');
    $header['instrument_number'] = $this->t('Instrument number');
    $header['instrument_name'] = $this->t('Instrument name');
    $header['category'] = $this->t('Category');
    $header['sub_category'] = $this->t('Sub category');
    $header['giografic'] = $this->t('Giografic');
    return $header + parent::buildHeader();
  }

}

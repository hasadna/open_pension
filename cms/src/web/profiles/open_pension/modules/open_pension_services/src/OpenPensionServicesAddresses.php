<?php

namespace Drupal\open_pension_services;

use Drupal\Core\Config\ConfigFactoryInterface;

/**
 * OpenPensionServicesAddresses service.
 */
class OpenPensionServicesAddresses {

  const SERVICES_ADDRESSES_CONFIG = 'open_pension_services.settings';

  const PROCESSOR_DEFAULT_ADDRESS = 'http://processor';
  const FETCHER_DEFAULT_ADDRESS = 'http://fetcher';
  const KAFKA_DEFAULT_ADDRESS = 'kafka:9092';

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * @var \Drupal\Core\Config\ImmutableConfig
   */
  protected $config;

  /**
   * Constructs an OpenPensionServicesAddresses object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory.
   */
  public function __construct(ConfigFactoryInterface $config_factory) {
    $this->configFactory = $config_factory;
    $this->config = $this->configFactory->get(OpenPensionServicesAddresses::SERVICES_ADDRESSES_CONFIG);
  }

  /**
   * Get the processor address.
   *
   * @return string
   */
  public function getProcessorAddress(): string {
    return $this->config->get('processor') ?: self::PROCESSOR_DEFAULT_ADDRESS;
  }

  /**
   * Get the fetcher address.
   *
   * @return string
   */
  public function getFetcherAddress(): string {
    return $this->config->get('fetcher') ?: self::FETCHER_DEFAULT_ADDRESS;
  }

  /**
   * Get the kafka address.
   *
   * @return string
   */
  public function getKafkaAddress(): string {
    return $this->config->get('kafka') ?: self::KAFKA_DEFAULT_ADDRESS;
  }

}

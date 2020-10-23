<?php

namespace Drupal\open_pension_kafka;

use Drupal\open_pension_services\OpenPensionServicesAddresses;
use RdKafka\Conf;
use RdKafka\Producer;

class OpenPensionKafkaOrchestrator {

  /**
   * The kafka config.
   *
   * @var \RdKafka\Conf
   */
  protected $kafkaConf;

  /**
   * Open pension services addresses.
   *
   * @var OpenPensionServicesAddresses
   */
  protected $openPensionServicesAddresses;

  /**
   * OpenPensionKafkaOrchestrator constructor.
   *
   * @param OpenPensionServicesAddresses $open_pension_services_addresses
   *  The open pension services addresses.
   */
  public function __construct(OpenPensionServicesAddresses $open_pension_services_addresses) {
    $this->openPensionServicesAddresses = $open_pension_services_addresses;
    $this->kafkaConf = new Conf();
  }

  /**
   * @return \RdKafka\Producer
   */
  public function getProducer() {
    $client = new Producer($this->kafkaConf);
    $client->addBrokers(implode(',', [$this->openPensionServicesAddresses->getKafkaAddress()]));
    return $client;
  }

  /**
   * Broadcast an event with kafka.
   *
   * @param string $topic
   *  The kafka topic.
   * @param $payload
   *  The kafka payload.
   */
  public function sendTopic(string $topic, $payload) {
    $producer = $this->getProducer();
    $topic = $producer->newTopic($topic);
    $topic->produce(\RD_KAFKA_PARTITION_UA, 0, json_encode($payload));
    $producer->flush(1000);
  }

}

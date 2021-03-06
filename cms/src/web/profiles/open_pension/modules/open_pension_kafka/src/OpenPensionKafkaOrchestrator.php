<?php

namespace Drupal\open_pension_kafka;

use Drupal\open_pension_services\OpenPensionServicesAddresses;
use RdKafka\Conf;
use RdKafka\Producer;
use RdKafka\KafkaConsumer;

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
    $topic->produce(\RD_KAFKA_PARTITION_UA, 0, $payload);
    $producer->flush(1000);
  }

  /**
   * Consuming a topic.
   *
   * @param $topic
   *  The topic we need to listen to.
   *
   * @return string
   */
  public function consume($topic) {

    $this->kafkaConf->set('group.id', 'myConsumerGroup');
    $this->kafkaConf->set('metadata.broker.list', $this->openPensionServicesAddresses->getKafkaAddress());
    $this->kafkaConf->set('auto.offset.reset', 'earliest');

    $consumer = new KafkaConsumer($this->kafkaConf);

    $consumer->subscribe([$topic]);

    $message = $consumer->consume(1000);

    if ($message->err == RD_KAFKA_RESP_ERR_NO_ERROR) {
      return $message->payload;
    }
  }

}

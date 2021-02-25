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

    $this->kafkaConf = NULL;
    if (in_array('rdkafka', get_loaded_extensions())) {
      $this->kafkaConf = new Conf();
    }
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

    if (!$this->kafkaConf) {
      throw new \Exception('The kafka package is not installed.');
    }

    $producer = $this->getProducer();
    $topic = $producer->newTopic($topic);
    $topic->produce(\RD_KAFKA_PARTITION_UA, 0, $payload);
    $producer->flush(1000);
  }

  /**
   * Consume the message in a queue format.
   *
   * @param $topics
   *   List of topics we need to events.
   *
   * @return KafkaConsumer
   *   The kafka queue object.
   */
  public function getConsumeQueue($topics) {
    // todo: Take the events from the latest the newer or maybe don't events
    //  which pulled before.

    // Set the group id. This is required when storing offsets on the broker
    $this->kafkaConf->set('group.id', 'myConsumerGroup');

    $rk = new \RdKafka\Consumer($this->kafkaConf);
    $rk->addBrokers($this->openPensionServicesAddresses->getKafkaAddress());

    $queue = $rk->newQueue();

    $topicConf = new \RdKafka\TopicConf();
    $topicConf->set('auto.commit.interval.ms', 100);

    // Set the offset store method to 'file'
    $topicConf->set('offset.store.method', 'broker');

    foreach ($topics as $topic) {
      $topic1 = $rk->newTopic($topic, $topicConf);
      $topic1->consumeQueueStart(0, RD_KAFKA_OFFSET_BEGINNING, $queue);
    }

    return $queue;
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
    $conf = $this->kafkaConf;

    // Configure the group.id. All consumer with the same group.id will consume
    // different partitions.
    $conf->set('group.id', 'myConsumerGroup');

    // Initial list of Kafka brokers
    $conf->set('metadata.broker.list', 'kafka:9092');

    // Set where to start consuming messages when there is no initial offset in
    // offset store or the desired offset is out of range.
    // 'earliest': start from the beginning
//    $conf->set('auto.offset.reset', 'earliest');

    $consumer = new \RdKafka\KafkaConsumer($conf);

    // Subscribe to topic 'test'
    $consumer->subscribe([$topic]);

    var_dump($topic);

    echo "Waiting for partition assignment... (make take some time when\n";
    echo "quickly re-joining the group after leaving it.)\n";

//    while (true) {
//      $message = $consumer->consume(1*1000);
//
//      var_dump($message);
//    }
  }

}

import kafka, {ConsumerGroup, ConsumerGroupOptions} from "kafka-node";
import {getKafkaHost, getListenedTopics} from "../utils/config";
import {handleKafkaEvent} from "./handlers";
import {log} from "open-pension-logger"

export class KafkaClient {
  private producer: kafka.Producer;
  public serviceUp: boolean;

  constructor() {
    try {
      const client = new kafka.KafkaClient({
        kafkaHost: getKafkaHost(),
      });

      this.serviceUp = true;

      this.producer = new kafka.Producer(client);
      this.producer.on("ready", () => log("Kafka producer ready"));
      this.producer.on("error", error =>
          log(`Kafka producer error: ${error}`, 'error')
      );
    } catch (e) {
      this.serviceUp = false;
    }
  }

  async sendMessage(messages: any, topic: any) {

    if (!this.serviceUp) {
      log('The kafka host is not alive', 'error')
      return;
    }

    try {
      messages = JSON.stringify(messages);
      return await this.producer.send([{topic, messages}], () => {});
    } catch (error) {
      log(`There was an error while trying to send the message: ${error}`, 'error')
      throw new Error(error);
    }
  }

  static getPayloadByStorageId(storageId) {
    return {storageId};
  }

  static listen() {
    const options: ConsumerGroupOptions = {
      kafkaHost: getKafkaHost(),
      groupId: 'backoffice_backend',
      protocol: ['roundrobin'],
      encoding: 'utf8', // default is utf8, use 'buffer' for binary data
      fromOffset: 'latest', // default
      outOfRangeOffset: 'earliest', // default
    };
    const consumerGroup = new ConsumerGroup(options, getListenedTopics());
    log('Start to listen to events');

    consumerGroup.on('connect', () => {
      log('connected to kafka 📞');
    });

    consumerGroup.on('message', async function (message) {
      const {topic, value} = message;
      // @ts-ignore
      const parsedMessage = JSON.parse(value);
      await handleKafkaEvent(topic, parsedMessage);
    });
  }
}

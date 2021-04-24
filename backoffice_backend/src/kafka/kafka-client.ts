import kafka, {ConsumerGroup, ConsumerGroupOptions} from "kafka-node";
import {getKafkaHost, getListenedTopics} from "../utils/config";
import {handleKafkaEvent} from "./handlers";

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
      this.producer.on("ready", () => console.log("Kafka producer ready"));
      this.producer.on("error", err =>
          console.error("Kafka producer error", err)
      );
    } catch (e) {
      this.serviceUp = false;
    }
  }

  async sendMessage(messages: any, topic: any) {

    if (!this.serviceUp) {
      console.error('The kafka host is not alive')
      return;
    }

    try {
      messages = JSON.stringify(messages);
      return await this.producer.send([{topic, messages}], () => {});
    } catch (e) {
      throw new Error(e);
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
    console.log('Start to listen to events');

    consumerGroup.on('connect', () => {
      console.log('connected to kafka 📞');
    });

    consumerGroup.on('message', async function (message) {
      const {topic, value} = message;
      // @ts-ignore
      const parsedMessage = JSON.parse(value);
      await handleKafkaEvent(topic, parsedMessage);
    });
  }
}

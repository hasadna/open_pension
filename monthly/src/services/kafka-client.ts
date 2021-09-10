import kafka, {ConsumerGroup, ConsumerGroupOptions} from "kafka-node";
import {getKafkaHost, getKafkaListenTopic} from "./env";
import {storeFile} from "../lib/file";
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
      this.producer.on("error", err =>
        log(`Kafka producer error: ${err}`, "error")
      );
    } catch (e) {
      this.serviceUp = false;
    }
  }

  sendMessage(messages: any, topic: any) {
    return new Promise((resolve, reject) => {
      if (!this.serviceUp) {
        log("The kafka host is not alive", "error");
        reject('The kafka host is not alive');
      }

      try {
        messages = JSON.stringify(messages);
        this.producer.send([{topic, messages}], () => {
          resolve({messages, topic});
          log(`Sending the kafka message: ${JSON.stringify({messages, topic})}`)
        });
      } catch (e) {
        reject(e);
        log(`Could not send a kafka message due to: ${e}`, "error")
        throw new Error(e);
      }
    });
  }

  static getPayloadByStorageId(storageId) {
    return {storageId};
  }

  static listen() {
    const options: ConsumerGroupOptions = {
      kafkaHost: getKafkaHost(),
      groupId: 'monthly',
      protocol: ['roundrobin'],
      encoding: 'utf8', // default is utf8, use 'buffer' for binary data
      fromOffset: 'latest', // default
      outOfRangeOffset: 'earliest', // default
    };
    const kafkaClient = new KafkaClient();

    const consumerGroup = new ConsumerGroup(options, [getKafkaListenTopic()]);
    log(`Start to listen to events: ${JSON.stringify(getKafkaListenTopic())}`);

    consumerGroup.on('connect', () => {
      log('connected');
    });

    consumerGroup.on('message', async function (message) {
      // @ts-ignore
      const parsedMessage = JSON.parse(message.value);

      const { ID, filename } = parsedMessage;
      storeFile(filename, ID, kafkaClient);
    });
  }
}

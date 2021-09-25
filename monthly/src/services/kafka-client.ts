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
      this.producer.on("ready", () => log({text: "Kafka producer ready"}));
      this.producer.on("error", error =>
        log({text: 'Kafka producer error', error}, "error")
      );
    } catch (e) {
      this.serviceUp = false;
    }
  }

  sendMessage(messages: any, topic: any) {
    return new Promise((resolve, reject) => {
      if (!this.serviceUp) {
        log({text: "The kafka host is not alive"}, "error");
        reject('The kafka host is not alive');
      }

      try {
        messages = JSON.stringify(messages);
        this.producer.send([{topic, messages}], () => {
          resolve({messages, topic});
          log({text: `Sending the kafka message: ${JSON.stringify({messages, topic})}`})
        });
      } catch (error) {
        log({text: 'Could not send a kafka message', error}, "error")
        reject(error);
        throw new Error(error);
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
    log({text: `Start to listen to events: ${JSON.stringify(getKafkaListenTopic())}`});

    consumerGroup.on('connect', () => {
      log({text: 'connected to the kafka events'});
    });

    consumerGroup.on('message', async function (message) {
      // @ts-ignore
      const parsedMessage = JSON.parse(message.value);

      const { ID, filename } = parsedMessage;
      storeFile(filename, ID, kafkaClient);
    });
  }
}

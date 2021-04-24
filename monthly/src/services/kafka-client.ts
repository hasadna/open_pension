import kafka, {ConsumerGroup, ConsumerGroupOptions} from "kafka-node";
import {getKafkaHost, getKafkaListenTopic} from "./env";
import {storeFile} from "../lib/file";

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

  sendMessage(messages: any, topic: any) {
    return new Promise((resolve, reject) => {
      if (!this.serviceUp) {
        reject('The kafka host is not alive')
      }
      try {
        messages = JSON.stringify(messages);
        this.producer.send([{topic, messages}], () => {
          resolve({messages, topic});
        });
      } catch (e) {
        reject(e);
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
    console.log('Start to listen to events');

    consumerGroup.on('connect', () => {
      console.log('connected');
    });

    consumerGroup.on('message', async function (message) {
      // @ts-ignore
      const parsedMessage = JSON.parse(message.value);

      const { ID, filename } = parsedMessage;
      storeFile(filename, ID, kafkaClient);
    });

  }
}

// function sendMessage(kafkaClient: KafkaClient, topic: string, storageId: number) {
//   const messagePayload = {
//     storageId: storageId,
//   };
//
//   kafkaClient.sendMessage(JSON.stringify(messagePayload), topic)
//     .then(() => {
//       console.log(`The event ${topic} for the file ${storageId} has been sent.`);
//     });

// try {
//   sendMessage(kafkaClient, getKafkaProcessStartedTopic(), ID);
//   await processFileIntoDb(dest, prisma);
//
//   sendMessage(kafkaClient, getKafkaProcessCompletedTopic(), ID);
//   console.log(`💪 The file ${filename} was process successfully`)
// } catch (e) {
//   sendMessage(kafkaClient, getKafkaProcessCompletedWithErrorsTopic(), ID);
//   console.error(e);
// }
// }

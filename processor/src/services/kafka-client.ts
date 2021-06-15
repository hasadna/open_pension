// import kafka, {ConsumerGroup, ConsumerGroupOptions} from "kafka-node";
import {getKafkaHost, getKafkaListenTopic} from "./env";
import {handleKafkaMessage} from "./queue";

export class KafkaClient {
  // @ts-ignore
  private producer: kafka.Producer;
  public serviceUp: boolean;

  constructor() {
    try {
      // @ts-ignore

      const client = new kafka.KafkaClient({
        kafkaHost: getKafkaHost(),
      });

      this.serviceUp = true;
      // @ts-ignore

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
    return;

    if (!this.serviceUp) {
      console.error('The kafka host is not alive')
      return;
    }

    try {
      return await this.producer.send([{topic, messages}], (error, data) => {});
    } catch (e) {
      throw new Error(e);
    }
  }

  static listen() {
    // @ts-ignore

    const options: ConsumerGroupOptions = {
      kafkaHost: getKafkaHost(),
      groupId: 'fetcher',
      protocol: ['roundrobin'],
      encoding: 'utf8', // default is utf8, use 'buffer' for binary data
      fromOffset: 'latest', // default
      outOfRangeOffset: 'earliest', // default
    };
    // @ts-ignore

    const consumerGroup = new ConsumerGroup(options, [getKafkaListenTopic()]);
    console.log('Start to listen to events')

    consumerGroup.on('message', async function (message) {
      // @ts-ignore
      const parsedMessage = JSON.parse(message.value);

      await handleKafkaMessage(parsedMessage);
    });

  }
}

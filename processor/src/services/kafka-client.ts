import kafka from "kafka-node";
import {getKafkaHost, getKafkaTopic} from "./env";

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

  async sendMessage(messages: any) {

    if (!this.serviceUp) {
      throw new Error('The kafkat service is not running');
    }

    let topic: string;

    try {
      topic = getKafkaTopic()
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e);
      });
    }

    let results: any;
    try {
      results = await this.producer.send(
          [
            {topic: topic, messages}
          ],
          (error, data) => {
          }
      );
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e);
      })
    }


    return new Promise((resolve, reject) => {
      resolve(results);
    });
  }
}

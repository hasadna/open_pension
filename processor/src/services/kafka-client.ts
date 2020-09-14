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
      console.error('The kafka host is not alive')
      return;
    }

    let topic: string;

    try {
      topic = getKafkaTopic()
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e);
      });
    }

    try {
      return await this.producer.send([{topic, messages}], (error, data) => {});
    } catch (e) {
      throw new Error(e);
    }
  }
}

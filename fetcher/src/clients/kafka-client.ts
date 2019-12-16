import kafka from "kafka-node";
import { getKafkaHost, getKafkaTopic } from "services/config-service";

export default class KafkaClient {
  private producer: kafka.Producer;

  constructor() {
    const client = new kafka.KafkaClient({
      kafkaHost: getKafkaHost()
    });

    this.producer = new kafka.Producer(client);
    this.producer.on("ready", () => console.log("Kafka producer ready"));
    this.producer.on("error", err =>
      console.error("Kafka producer error", err)
    );
  }

  async sendMessage(messages: any) {
    return new Promise((resolve, reject) => {
      this.producer.send(
        [
          {
            topic: getKafkaTopic(),
            messages
          }
        ],
        (error, data) => (error ? reject(error) : resolve(data))
      );
    });
  }
}

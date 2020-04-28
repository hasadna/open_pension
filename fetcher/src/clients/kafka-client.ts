import kafka from "kafka-node";
import { getKafkaHost, getKafkaTopic } from "services/config-service";

export default class KafkaClient {
  private producer: kafka.Producer;
  public serviceUp: boolean;

  constructor() {
    try {
      const client = new kafka.KafkaClient({
        kafkaHost: getKafkaHost()
      });

      this.serviceUp = true;

      this.producer = new kafka.Producer(client);
      this.producer.on("ready", () => console.log("Kafka producer ready"));
      this.producer.on("error", err =>
          console.error("Kafka producer error", err)
      );
    } catch (e) {
      console.error(e);
      this.serviceUp = false;
    }
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

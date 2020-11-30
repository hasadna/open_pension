import kafka from "kafka-node";
import { getKafkaHost, getKafkaTopic } from "services/config-service";
import { ConsumerGroupOptions, ConsumerGroup } from 'kafka-node';
import {downloadReports} from "../services/reports-service";
import {ReportQuery} from "../types/report-query";

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

  static listen() {
    const options: ConsumerGroupOptions = {
      kafkaHost: getKafkaHost(),
      groupId: 'fetcher',
      protocol: ['roundrobin'],
      encoding: 'buffer', // default is utf8, use 'buffer' for binary data
      fromOffset: 'latest', // default
      outOfRangeOffset: 'earliest', // default
    };

    const consumerGroup = new ConsumerGroup(options, ['queryFiles']);

    consumerGroup.on('message', async function (message) {
      const { value } = message;
      // @ts-ignore
      const parsedMessage = JSON.parse(value);

      console.log('Start to download files.');

      // Preparing the report query.
      const query: ReportQuery = {
        SystemField: parsedMessage['system_field'],
        ReportType: parsedMessage['reports_type'],
        FromYearPeriod: {
          Quarter: parsedMessage['from_quarter'],
          Year: parsedMessage['from_year']
        },
        ToYearPeriod: {
          Quarter: parsedMessage['to_quarter'],
          Year: parsedMessage['to_year']
        },
      };

      // Send the request to download the reports.
      await downloadReports(query)
    });
  }
}

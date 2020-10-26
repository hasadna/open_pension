import kafka, {ConsumerGroupOptions} from 'kafka-node';

export default class KafkaServices {

    static listen() {
        const options: ConsumerGroupOptions = {
            kafkaHost: 'kafka:9092',
            groupId: 'fetcher',
            // todo: find a way to handle umlimited time.
            sessionTimeout: 15000,
            protocol: ['roundrobin'],
            encoding: 'utf8', // default is utf8, use 'buffer' for binary data
            fromOffset: 'latest', // default
            outOfRangeOffset: 'earliest', // default
        };

        const consumerGroup = new kafka.ConsumerGroup(options, ['file_parsed']);

        consumerGroup.on('message', function (message) {
            console.log( message);
        });
    }
}
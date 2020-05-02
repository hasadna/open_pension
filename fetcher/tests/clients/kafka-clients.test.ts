import {getKafkaTopic} from "services/config-service";

const onMock = jest.fn();
const sendMock = jest.fn();
const KafkaClientMock = jest.fn();
const getKafkaHostMock = jest.fn();
const getKafkaTopicMock = jest.fn();
const mockKafka = jest.fn().mockReturnValue({
    on: onMock,
    send: sendMock,
});

jest.mock("kafka-node", () => ({
    KafkaClient: KafkaClientMock,
    Producer: mockKafka,
}));
jest.mock("services/config-service", () => ({
    getKafkaHost: getKafkaHostMock,
    getKafkaTopic: getKafkaTopicMock,
}));

import KafkaClient from "clients/kafka-client";

describe("Kafka service api client", () => {

    afterEach(() => jest.resetAllMocks());
    afterAll(() => jest.restoreAllMocks());

    it('Checking that the constructor triggerd the functions as expected', () => {
        new KafkaClient();
        expect(getKafkaHostMock).toBeCalled();
        expect(KafkaClientMock).toBeCalledTimes(1);
        expect(onMock).toBeCalledTimes(2);
    })

    it('Verify we get an error when the kafka topic is not defined', async () => {
        const client = new KafkaClient();

        try {
            await client.sendMessage('pizza!')
            expect(false).toBeTruthy();
        } catch (e) {
            expect(e.message).toBe('config_service_1.getKafkaTopic is not a function');
        }
        expect(getKafkaTopicMock).toBeCalled();
    });

    it('Testing message kafka message senging', async () => {
        const client = new KafkaClient();
        getKafkaTopicMock.mockReturnValue(() => 'pizza');
        try {
            const bar = await client.sendMessage('pizza!');
        } catch (e) {
            expect(getKafkaTopicMock).toBeCalled();
        }
    });
});

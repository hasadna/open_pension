const onMock = jest.fn();
const sendMock = jest.fn();
const producerMock = jest.fn();
const KafkaClientMock = jest.fn();
const getKafkaHostMock = jest.fn();
const getKafkaTopicMock = jest.fn();

jest.mock("kafka-node", () => ({
    KafkaClient: KafkaClientMock,
    Producer: producerMock,
}));

jest.mock("services/config-service", () => ({
    getKafkaHost: getKafkaHostMock,
    getKafkaTopic: getKafkaTopicMock,
}));

import { KafkaClient } from "clients/kafka-client";

describe("Kafka service api client", () => {

    afterEach(() => jest.resetAllMocks());
    afterAll(() => jest.restoreAllMocks());

    it('Checking that the constructor triggerd the functions as expected', () => {
        new KafkaClient();
        expect(getKafkaHostMock).toBeCalled();
        expect(KafkaClientMock).toBeCalledTimes(1);
    })

    it('Verify we get an error when the kafka topic is not defined', async () => {
        getKafkaHostMock.mockImplementationOnce(() => {
            throw new Error(`Kafka host most be defined`);
        });
        const client = new KafkaClient();
        expect(client.serviceUp).toBeFalsy();

        try {
            await client.sendMessage('pizza!');
            expect(false).toBeTruthy();
        } catch (e) {
            expect(e.message).toBe('The kafkat service is not running');
            expect(getKafkaTopicMock).not.toBeCalled();
        }
    });

    it('Testing message kafka message sending', async () => {
        getKafkaHostMock.mockReturnValueOnce('Tom');
        getKafkaTopicMock.mockReturnValueOnce(() => 'pizza');
        producerMock.mockImplementationOnce(() => {
            return {
                on: onMock,
                send: sendMock,
            };
        });

        const client = new KafkaClient();

        sendMock.mockResolvedValueOnce('resolved');
        const revolved = await client.sendMessage('pizza!');
        expect(revolved).toBe('resolved');

        sendMock.mockRejectedValueOnce('rejected');
        try {
            await client.sendMessage('pizza!');
            expect(false).toBeTruthy();
        } catch (e) {
            expect(e).toBe('rejected');
        }
    });
});

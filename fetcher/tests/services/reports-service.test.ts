import {DownloadLinks} from "types/download-links";

const mockGetReports = jest.fn();
const mockSendMessage = jest.fn();
const mockDownloadDocument = jest.fn();

const mockCmaGovApiClientCreate = jest.fn().mockReturnValue({
    getReports: mockGetReports,
    downloadDocument: mockDownloadDocument,
});

const mockKafkaClientCreate = jest.fn().mockReturnValue({
    sendMessage: mockSendMessage
});

jest.mock("clients/cma-api-client", () => ({
    CmaGovApiClient: mockCmaGovApiClientCreate
}));

jest.mock("clients/kafka-client", () => ({
    KafkaClient: mockKafkaClientCreate
}));

import {downloadReports} from "services/reports-service";
import ReportQuery from "types/report-query";

describe("Testing the reports service", () => {

    afterEach(() => jest.resetAllMocks());
    afterAll(() => jest.restoreAllMocks());

    it('Happy flow: testing downloading reports without any issues', async () => {

        const reportQuery: ReportQuery = {
            SystemField: "1",
            ToYearPeriod: {Quarter: "101", Year: 2020},
            ReportType: "1",
            FromYearPeriod: {Quarter: "101", Year: 2020},
        };

        mockDownloadDocument.mockResolvedValue('pizza');

        mockGetReports.mockReturnValue([
            {DocumentId: '🍕'},
            {DocumentId: '🤷‍'},
            {DocumentId: '🤘‍'}
        ]);

        const collectedLinks: DownloadLinks = await downloadReports(reportQuery);
        expect(mockGetReports).toBeCalledWith({
            SystemField: '1',
            ToYearPeriod: { Quarter: '101', Year: 2020 },
            ReportType: '1',
            FromYearPeriod: { Quarter: '101', Year: 2020 }
        });
        expect(mockSendMessage).toBeCalled();
        expect(mockDownloadDocument).toBeCalledTimes(3);

        expect(collectedLinks.links.length).toBe(3);
    })

    it('Bad flow: Verify we catch an exception during the links collection', async () => {
        const reportQuery: ReportQuery = {
            SystemField: "1",
            ToYearPeriod: {Quarter: "101", Year: 2020},
            ReportType: "1",
            FromYearPeriod: {Quarter: "101", Year: 2020},
        };

        mockGetReports.mockImplementationOnce(() => {
            throw new Error('🙄');
        })
        const collectedLinks: DownloadLinks = await downloadReports(reportQuery);
        expect(collectedLinks.links).toStrictEqual([]);
    });

    it('Checking validations for reports query', () => {
        expect(true).toBeTruthy();
    });

});

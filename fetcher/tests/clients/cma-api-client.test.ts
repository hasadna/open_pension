import os from "os";
import fs from "fs";

const mockApi = {
    get: jest.fn(),
    post: jest.fn()
};
const mockAxiosCreate = jest.fn().mockReturnValue(mockApi);
jest.mock("axios", () => ({
    create: mockAxiosCreate
}));

jest.mock("fs", () => ({
    createWriteStream: jest.fn()
}));

import { CmaGovApiClient } from "clients/cma-api-client";
import ReportQuery from "types/report-query";

describe("CMA api client", () => {
    let client: CmaGovApiClient;
    const goodQuery: ReportQuery = {
        SystemField: "300001",
        ToYearPeriod: {Quarter: "1", Year: 2020},
        ReportType: "71100075",
        FromYearPeriod: {Quarter: "2", Year: 2015},
    };

    beforeAll(() => (client = new CmaGovApiClient()));
    afterEach(() => jest.resetAllMocks());
    afterAll(() => jest.restoreAllMocks());

    it("should init the api instance with the base url", () => {
        expect(mockAxiosCreate).toHaveBeenCalledWith({
            baseURL: "https://employersinfocmp.cma.gov.il/api/PublicReporting"
        });
    });

    it("should call get reports", async () => {
        const data = "reports";
        mockApi.post.mockResolvedValueOnce({data});
        const query: ReportQuery = {
            ReportType: "",
            ToYearPeriod: {Quarter: "1", Year: 2012},
            SystemField: "",
            FromYearPeriod: {Year: 2012, Quarter: "1"}
        };

        const expectedQuery = {
            "corporation": null,
            "fromQuarter": "1",
            "fromYear": 2012,
            "investmentName": null,
            "reportFromDate": null,
            "reportToDate": null,
            "reportType": "",
            "statusReport": 1,
            "systemField": "",
            "toQuarter": "1",
            "toYear": 2012,
        }

        const response = await client.getReports(query);

        expect(response).toEqual(data);
        expect(mockApi.post).toHaveBeenCalledWith("/GetPublicReports", expectedQuery);
    });

    it("should download document", async () => {
        const reportRow = {
            DocumentId: "1234",
            fileExt: "xlsx"
        };
        const mockStream = {
            on: jest.fn(),
            pipe: jest.fn()
        };
        const mockWriteStream = "1234";
        (fs.createWriteStream as jest.Mock).mockReturnValue(mockWriteStream);
        mockStream.on.mockImplementation((eventName, cb) => {
            if (eventName === "end") setTimeout(cb, 0);
            return mockStream;
        });
        mockApi.get.mockResolvedValueOnce({data: mockStream});

        const response = await client.downloadDocument(reportRow.DocumentId);

        expect(mockApi.get).toHaveBeenCalledWith("/downloadFiles", {
            params: {IdDoc: reportRow.DocumentId, extention: "xlsx"},
            responseType: "stream"
        });
        expect(mockStream.pipe).toHaveBeenCalledWith(mockWriteStream);
        expect(response).toEqual(
            `${os.tmpdir()}/${reportRow.DocumentId}.${reportRow.fileExt}`
        );
    });

    it('Testing query validation: getSystemFields', () => {
        let badQuery: ReportQuery = {...goodQuery, SystemField: "a"};
        expect(client.validateQuery(badQuery)).toStrictEqual({SystemField: "'a' is not allowed"});

        badQuery = {...badQuery, SystemField: ""}
        expect(client.validateQuery(badQuery)).toStrictEqual({});

        badQuery = {...badQuery, SystemField: "300001"}
        expect(client.validateQuery(badQuery)).toStrictEqual({});

        badQuery = {...badQuery, SystemField: "300002"}
        expect(client.validateQuery(badQuery)).toStrictEqual({});

        badQuery = {...badQuery, SystemField: "300003"}
        expect(client.validateQuery(badQuery)).toStrictEqual({});
    });

    it('Testing query validation: getReportsType', () => {
        let badQuery: ReportQuery = {...goodQuery, ReportType: ""};
        expect(client.validateQuery(badQuery)).toStrictEqual({});

        badQuery = {...badQuery, ReportType: "71100075"}
        expect(client.validateQuery(badQuery)).toStrictEqual({});

        badQuery = {...badQuery, ReportType: "pizza"}
        expect(client.validateQuery(badQuery)).toStrictEqual({ReportType: "'pizza' is not allowed"});
    });

    it('Testing query validation: getPeriodRanges', () => {
        let badQuery: ReportQuery = {...goodQuery, FromYearPeriod: {Year: 1990, Quarter: "7"}, ToYearPeriod: {Year: 2010, Quarter: "5"}};
        expect(client.validateQuery(badQuery)).toStrictEqual({
            FromYearPeriod: {Year: "'1990' is out of range", Quarter: "'7' is out of range"},
            ToYearPeriod: {Year: "'2010' is out of range", Quarter: "'5' is out of range"},
        });
    });

    it('Testing query validation: Happy flow and all the bad flows', () => {
        expect(client.validateQuery(goodQuery)).toStrictEqual({});

        let badQuery: ReportQuery = {...goodQuery,
            SystemField: "a",
            ReportType: "pizza",
            FromYearPeriod: {Year: 1990, Quarter: "7"},
            ToYearPeriod: {Year: 2010, Quarter: "5"},
        };

        expect(client.validateQuery(badQuery)).toStrictEqual({
            FromYearPeriod: {Year: "'1990' is out of range", Quarter: "'7' is out of range"},
            ToYearPeriod: {Year: "'2010' is out of range", Quarter: "'5' is out of range"},
            ReportType: "'pizza' is not allowed",
            SystemField: "'a' is not allowed",
        });
    });
});

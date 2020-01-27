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

import CmaGovApiClient from "clients/cma-api-client";

describe("cma api client", () => {
  let client: CmaGovApiClient;

  beforeAll(() => (client = new CmaGovApiClient()));
  afterEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());

  it("should init the api instance with the base url", () => {
    expect(mockAxiosCreate).toHaveBeenCalledWith({
      baseURL: "https://employersinfocmp.cma.gov.il/api/PublicReporting"
    });
  });

  it("should call metadata endpoint", async () => {
    const data = "metadata";
    mockApi.get.mockResolvedValueOnce({ data });

    const response = await client.getReportsMetadata();

    expect(mockApi.get).toHaveBeenCalledWith("/GetPublicReportsSearchData");
    expect(response).toEqual(data);
  });

  it("should call get reports", async () => {
    const data = "reports";
    mockApi.post.mockResolvedValueOnce({ data });
    const query = {
      fromQuarter: 1,
      fromYear: 1,
      toQuarter: 1,
      toYear: 1,
      statusReport: 1
    };

    const response = await client.getReports(query);

    expect(response).toEqual(data);
    expect(mockApi.post).toHaveBeenCalledWith("/GetPublicReports", query);
  });

  it("should download document", async () => {
    const reportRow = {
      DocumentId: 1234,
      fileExt: "test"
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
    mockApi.get.mockResolvedValueOnce({ data: mockStream });

    const response = await client.downloadDocument(reportRow);

    expect(mockApi.get).toHaveBeenCalledWith("/downloadFiles", {
      params: { IdDoc: reportRow.DocumentId, extention: "xlsx" },
      responseType: "stream"
    });
    expect(mockStream.pipe).toHaveBeenCalledWith(mockWriteStream);
    expect(response).toEqual(
      `${os.tmpdir()}/${reportRow.DocumentId}.${reportRow.fileExt}`
    );
  });
});

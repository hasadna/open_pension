import handleReportsRequest from "handlers/reports-handler";
import CmaGovApiClient from "clients/cma-api-client";

jest.mock("clients/cma-api-client");
jest.mock("clients/s3-client");

describe("Reports Handler", () => {
  const send = jest.fn();
  const handle = query => handleReportsRequest({ query }, { send });
  
  describe("fails", () => {
    it.each([
      [{}, "fromQuarter"],
      [{ fromQuarter: 1 }, "toQuarter"],
      [{ fromQuarter: 1, toQuarter: 1 }, "year"]
    ])("should fail for %o for missing %s", async (query, missingField) => {
      await expect(handle(query)).rejects.toThrow(
        `Request must include ${missingField}`
      );
    });
  });

  describe("success", () => {
    const cmaClientMock: CmaGovApiClient = (CmaGovApiClient as jest.Mock).mock.instances[0];

    beforeEach(async () => {
      (cmaClientMock.getReports as jest.Mock).mockResolvedValue([]);
      await handle({ fromQuarter: 1, toQuarter: 2, year: 2019 });
    });

    it('should call send', () => {
      expect(send).toHaveBeenCalled();
    });

  });
});

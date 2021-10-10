import {createFile, createRow} from "../../server/tests/testingServerUtils";
import {convertTimePeriodToTimeRangeQuery} from "./performance";
import {TimePeriod} from "./performanceTypesAndConsts";

describe('Performance', function () {

  describe('convertTimePeriodToTimeRangeQuery', () => {
    const firstFileDate = new Date(`2017-01-01T00:00:00.000Z`);
    const secondFileDate = new Date(`2020-01-01T00:00:00.000Z`);

    beforeAll(async () => {
      // Create two records to verify we we'll pull the last one and calculate
      // the time form that point.

      const file = await createFile({storageID: 20});
      await Promise.all([
        createRow({file, TKUFAT_DIVUACH: firstFileDate}),
        createRow({file, TKUFAT_DIVUACH: secondFileDate}),
      ]);
    });

    it('Get the time ranges for 3 months', async () => {
      const {timeStartRange, timeEndRange} = await convertTimePeriodToTimeRangeQuery(TimePeriod.THREE_MONTHS);

      expect(timeStartRange).toBe('2021-10-01T00:00:00.000Z');
      expect(timeEndRange).toBe('2021-10-01T00:00:00.000Z');

    });
    it('Get the time ranges for 6 months', async () => {});
    it('Get the time ranges for year start', async () => {});
    it('Get the time ranges for 12 months', async () => {});
    it('Get the time ranges for 3 years', async () => {});
    it('Get the time ranges for 5 years', async () => {});
  });

});

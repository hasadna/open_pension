import {createFile, createRow} from "../../server/tests/testingServerUtils";
import {convertTimePeriodToTimeRangeQuery} from "./performance";
import {TimePeriod} from "./performanceTypesAndConsts";

describe('Performance', function () {

  describe('convertTimePeriodToTimeRangeQuery', () => {
    const firstRowDate = new Date(`2017-01-01T00:00:00.000Z`);
    const secondRowDate = new Date('2020-01-01T00:00:00.000Z');

    beforeEach(async () => {
      // Create two records to verify we we'll pull the last one and calculate
      // the time form that point.

      const file = await createFile({storageID: 20});
      await Promise.all([
        createRow({file, TKUFAT_DIVUACH: firstRowDate}),
        createRow({file, TKUFAT_DIVUACH: secondRowDate}),
      ]);
    });

    it('Get the time ranges for 3 months', async () => {
      const {timeStartRange, timeEndRange} = await convertTimePeriodToTimeRangeQuery(TimePeriod.THREE_MONTHS);

      expect(timeStartRange.toISOString()).toBe('2020-01-01T00:00:00.000Z');
      expect(timeEndRange.toISOString()).toBe('2019-10-01T00:00:00.000Z');
    });

    it('Get the time ranges for 6 months', async () => {
      const {timeStartRange, timeEndRange} = await convertTimePeriodToTimeRangeQuery(TimePeriod.SIX_MONTHS);

      expect(timeStartRange.toISOString()).toBe('2020-01-01T00:00:00.000Z');
      expect(timeEndRange.toISOString()).toBe('2019-07-01T00:00:00.000Z');
    });
    it('Get the time ranges for year start', async () => {
      const {timeStartRange, timeEndRange} = await convertTimePeriodToTimeRangeQuery(TimePeriod.YEAR_START);

      expect(timeStartRange.toISOString()).toBe('2020-01-01T00:00:00.000Z');
      expect(timeEndRange.toISOString()).toBe('2020-01-01T00:00:00.000Z');
    });
    it('Get the time ranges for 12 months', async () => {
      const {timeStartRange, timeEndRange} = await convertTimePeriodToTimeRangeQuery(TimePeriod.LAST_TWELVE_MONTHS);

      expect(timeStartRange.toISOString()).toBe('2020-01-01T00:00:00.000Z');
      expect(timeEndRange.toISOString()).toBe('2019-01-01T00:00:00.000Z');
    });
    it('Get the time ranges for 3 years', async () => {
      const {timeStartRange, timeEndRange} = await convertTimePeriodToTimeRangeQuery(TimePeriod.LAST_THREE_YEARS);

      expect(timeStartRange.toISOString()).toBe('2020-01-01T00:00:00.000Z');
      expect(timeEndRange.toISOString()).toBe('2017-01-01T00:00:00.000Z');
    });
    it('Get the time ranges for 5 years', async () => {
      const {timeStartRange, timeEndRange} = await convertTimePeriodToTimeRangeQuery(TimePeriod.LAST_FIVE_YEARS);

      expect(timeStartRange.toISOString()).toBe('2020-01-01T00:00:00.000Z');
      expect(timeEndRange.toISOString()).toBe('2015-01-01T00:00:00.000Z');
    });
  });

});

import {convertTimePeriodToTimeRangeQuery, TimePeriod} from "./performance";

describe('Performance query', () => {

  it('Testing convertTimePeriodToTimeRangeQuery: THREE_MONTHS', () => {
    expect(convertTimePeriodToTimeRangeQuery(TimePeriod.THREE_MONTHS)).toStrictEqual({});
  });

  it('Testing convertTimePeriodToTimeRangeQuery: SIX_MONTHS', () => {
    expect(convertTimePeriodToTimeRangeQuery(TimePeriod.SIX_MONTHS)).toStrictEqual({});
  });

  it('Testing convertTimePeriodToTimeRangeQuery: YEAR_START', () => {
    expect(convertTimePeriodToTimeRangeQuery(TimePeriod.YEAR_START)).toStrictEqual({});
  });

  it('Testing convertTimePeriodToTimeRangeQuery: LAST_TWELVE_MONTHS', () => {
    expect(convertTimePeriodToTimeRangeQuery(TimePeriod.LAST_TWELVE_MONTHS)).toStrictEqual({});
  });

  it('Testing convertTimePeriodToTimeRangeQuery: LAST_THREE_YEARS', () => {
    expect(convertTimePeriodToTimeRangeQuery(TimePeriod.LAST_THREE_YEARS)).toStrictEqual({});
  });

  it('Testing convertTimePeriodToTimeRangeQuery: LAST_FIVE_YEARS', () => {
    expect(convertTimePeriodToTimeRangeQuery(TimePeriod.LAST_FIVE_YEARS)).toStrictEqual({});
  });
});

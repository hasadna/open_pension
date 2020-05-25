import waitForExpect from "wait-for-expect";

const mockParseExcel = jest.fn();

jest.mock("excelParser", () => ({
    parseFile: mockParseExcel,
}));

import {excelParsing} from "parse";

describe('Testing the process logic', () => {

    afterEach(() => jest.resetAllMocks());
    afterAll(() => jest.restoreAllMocks());

    // it('Testing nothing will be invoked when the file has not been found', () => {
    //     excelParsing('a');
    //     expect(mockParseExcel).toBeCalledWith('a', {getSheets: true});
    //     expect(mockParseExcel).toBeCalledTimes(1);
    // });

    it('Testing nothing will be invoked when the file has not been found', async () => {
        const filename: string = 'some_file_name.xlxs';

        mockParseExcel.mockImplementationOnce((filename: string, options: object) => {
            if (options['getSheets']) {
                return [{name: 'foo'}, {name: 'bar'}]
            }

            const sheets = {
                'foo': [[null, null, '🍕'], [null, '🤘', 'foo']],
                'bar': [[null, null, '🍕'], [null, '🤘', 'foo']],
            };

            return sheets[options['sheet']];
        });

        excelParsing(filename);

        await waitForExpect(() => expect(mockParseExcel).toBeCalledWith(filename, {getSheets: true}));
        await waitForExpect(() => expect(mockParseExcel).toBeCalledWith(filename, {sheet: 'foo'}));
        await waitForExpect(() => expect(mockParseExcel).toBeCalledWith(filename, {sheet: 'bar'}));
    });

    // it('Testing the consts values of the parser', () => {
    //     expect(1).toBe('2');
    // });
    //
    // it('Testing the API function: processRowToMetadataObject', () => {
    //     expect(1).toBe('2');
    // });
    //
    // it('Testing the API function: rowIsHeader', () => {
    //     expect(1).toBe('2');
    // });
    //
    // it('Testing the API function: rowShouldBeAppended', () => {
    //     expect(1).toBe('2');
    // });
    //
    // it('Testing the API function: checkNotInIsraelContext', () => {
    //     expect(1).toBe('2');
    // });
    //
    // it('Testing the API function: checkIfSheetEntryIsMetadata', () => {
    //     expect(1).toBe('2');
    // });
});

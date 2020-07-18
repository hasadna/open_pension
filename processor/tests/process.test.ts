import waitForExpect from "wait-for-expect";
import * as fs from "fs";

const mockParseExcel = jest.fn();
jest.mock("excelParser", () => ({
    parseFile: mockParseExcel,
}));

const parsingApiMock = {
    checkIfSheetEntryIsMetadata: jest.fn(),
    checkNotInIsraelContext: jest.fn(),
    rowShouldBeAppended: jest.fn(),
    checkIfRowIsLocalContextAndAppend: jest.fn(),
    rowIsHeader: jest.fn(),
    processRowToMetadataObject: jest.fn(),
};
jest.mock("parsing/api", () => ({
    api: parsingApiMock,
}));

import {singleAssetProcess} from "parse";

describe('Testing the process logic', () => {

    afterEach(() => jest.resetAllMocks());
    afterAll(() => jest.restoreAllMocks());

    it('Testing methods alls', async () => {
        const filename: string = 'some_file_name.xlxs';

        mockParseExcel.mockImplementation((filename: string, options: object) => {
            if (options['getSheets']) {
                return [{name: 'foo'}, {name: 'bar'}]
            }

            const sheets = {
                'foo': fs.readFileSync("/Applications/MAMP/htdocs/open_pension/processor/tests/fixture.json"),
                'bar': fs.readFileSync("/Applications/MAMP/htdocs/open_pension/processor/tests/fixture.json"),
            };

            return sheets[options['sheet']];
        });

        singleAssetProcess(filename);

        await waitForExpect(() => expect(mockParseExcel).toBeCalledWith(filename, {getSheets: true}));
        await waitForExpect(() => expect(mockParseExcel).toBeCalledWith(filename, {sheet: 'foo'}));
        await waitForExpect(() => expect(mockParseExcel).toBeCalledWith(filename, {sheet: 'bar'}));

        await waitForExpect(() => expect(parsingApiMock.checkIfSheetEntryIsMetadata).toBeCalled());
        await waitForExpect(() => expect(parsingApiMock.checkNotInIsraelContext).toBeCalled());
        await waitForExpect(() => expect(parsingApiMock.rowShouldBeAppended).toBeCalled());
        await waitForExpect(() => expect(parsingApiMock.checkIfRowIsLocalContextAndAppend).toBeCalled());
    }, 30000);

    it('Testing the constants values of the parser', () => {
        // TBD.
        expect(1).toBe(1);
    });

    it('Testing the API function: processRowToMetadataObject', () => {
        // TBD.
        expect(1).toBe(1);
    });

    it('Testing the API function: rowIsHeader', () => {
        // TBD.
        expect(1).toBe(1);
    });

    it('Testing the API function: rowShouldBeAppended', () => {
        // TBD.
        expect(1).toBe(1);
    });

    it('Testing the API function: checkNotInIsraelContext', () => {
        // TBD.
        expect(1).toBe(1);
    });

    it('Testing the API function: checkIfSheetEntryIsMetadata', () => {
        // TBD.
        expect(1).toBe(1);
    });
});

import {singleAssetProcess} from "../src/parse";
import * as path from "path";

describe('Testing the process results', () => {

    it('Testing a none existing file', async () => {
        const results = await singleAssetProcess("a")
        expect(results).toStrictEqual({
          "data": {},
        "errors": "ENOENT: no such file or directory, open 'a'",
        }
    );
    });

    it('Testing results of a valid file', async () => {
        const filePath = path.join(process.cwd(), 'src', 'examples', '512237744_psum_0219.xlsx');
        const results = await singleAssetProcess(filePath);

        const parsingResults = results['data']['מזומנים'][0];
        const expected = {
            "index": "יתרות מזומנים ועו\"ש בש\"ח",
            "israel": true,
            "Instrument name": "\u05d1\u05e0\u05e7 \u05d4\u05e4\u05d5\u05e2\u05dc\u05d9\u05dd \u05d1\u05e2\"\u05de",
            "Instrument number": "34112000",
            "Issuer number": 12,
            "Rating": "AAA.IL",
            "Rating agencies": "\u05de\u05e2\u05dc\u05d5\u05ea S&P",
            "Currency": "\u05e9\u05e7\u05dc \u05d7\u05d3\u05e9",
            "Rate": 0,
            "Yield to maturity": 0,
            "Fair value": 45299.34,
            "Rate of instrument type": 0.005745452115844286,
            "Rate of fund holding": 0.0006270738209784875,
            "Investment": "\u05de\u05d6\u05d5\u05de\u05e0\u05d9\u05dd",
            "file_name": "512237744_psum_0219.xlsx",
            "Date": "30/06/2019",
            "Institutional body": "\u05de\u05d2\u05d3\u05dc \u05de\u05e7\u05e4\u05ea \u05e7\u05e8\u05e0\u05d5\u05ea \u05e4\u05e0\u05e1\u05d9\u05d4 \u05d5\u05e7\u05d5\u05e4\u05d5\u05ea \u05d2\u05de\u05dc \u05d1\u05e2\"\u05de",
            "Fund Name": "\u05de\u05e7\u05e4\u05ea \u05de\u05e8\u05db\u05d6",
            "Fund Number": "\u05de\u05d2\u05d3\u05dc \u05de\u05e7\u05e4\u05ea - \u05de\u05e8\u05db\u05d6"
        }

        expect(Object.keys(expected).sort()).toStrictEqual(Object.keys(parsingResults).sort())
        expect(parsingResults).toStrictEqual(expected)

    }, 30000);

});

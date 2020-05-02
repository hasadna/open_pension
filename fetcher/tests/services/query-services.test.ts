import {getPeriodRanges, getReportsType, getSystemFields} from "services/query-services";

describe("Testing the query resolvers", () => {

    it('Testing the system fields', () => {
        expect(getSystemFields()).toStrictEqual([
            {Id: "", Label: "הכל"},
            {Id: "300001", Label: "ביטוח"},
            {Id: "300002", Label: "פנסיה"},
            {Id: "300003", Label: "גמל"},
        ]);
    })

    it('Testing the report types', () => {
        expect(getReportsType()).toStrictEqual([
            {Id: "", Label: "הכל"},
            {Id: "71100004", Label: "דוח תקופתי רבועני ביטוח בקובץ PDF"},
            {Id: "71100028", Label: "דוח תקופתי רבעוני בקובץ PDF - פנסיה"},
            {Id: "71100071", Label: "רשימת נכסים ברמת נכס בודד - Public - חברה - ביטוח"},
            {Id: "71100074", Label: "רשימת נכסים ברמת נכס בודד - Public - חברה - פנסיה"},
            {Id: "71100072", Label: "רשימת נכסים ברמת נכס בודד - Public - מסלול ביטוח"},
            {Id: "71100075", Label: "רשימת נכסים ברמת נכס בודד - Public - מסלול פנסיה"},
            {Id: "71100077", Label: "רשימת נכסים ברמת נכס בודד - Public - מוצר - פנסיה"},
        ]);
    })

    it('Testing the dates period', () => {
        expect(getPeriodRanges()).toStrictEqual({
            "Quarters": [{"Id": "1", "Label": "רבעון ראשון"}, {
                "Id": "2",
                "Label": "רבעון שני"
            }, {"Id": "3", "Label": "רבעון שלישי"}, {"Id": "4", "Label": "שנתי"}],
            "Years": [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
        });
    })

});

/**
 * Returns the list of system fields.
 */
export function getSystemFields() {
    return [
        {Id: "", Label: "הכל"},
        {Id: "300001", Label: "ביטוח"},
        {Id: "300002", Label: "פנסיה"},
        {Id: "300003", Label: "גמל"},
    ];
}

/**
 * Returns the list of reports types.
 */
export function getReportsType() {
    return [
        {Id: "", Label: "הכל"},
        {Id: "71100004", Label: "דוח תקופתי רבועני ביטוח בקובץ PDF"},
        {Id: "71100028", Label: "דוח תקופתי רבעוני בקובץ PDF - פנסיה"},
        {Id: "71100071", Label: "רשימת נכסים ברמת נכס בודד - Public - חברה - ביטוח"},
        {Id: "71100074", Label: "רשימת נכסים ברמת נכס בודד - Public - חברה - פנסיה"},
        {Id: "71100072", Label: "רשימת נכסים ברמת נכס בודד - Public - מסלול ביטוח"},
        {Id: "71100075", Label: "רשימת נכסים ברמת נכס בודד - Public - מסלול פנסיה"},
        {Id: "71100077", Label: "רשימת נכסים ברמת נכס בודד - Public - מוצר - פנסיה"},
    ];
}

/**
 * Get the quarters which we can query by.
 */
export function getPeriodRanges() {
    const years = () => {
        const years: number[] = [];

        for (let i = 2012; i <= new Date().getFullYear(); i++) {
            years.push(i);
        }

        return years;
    };
    return {
        Years: years(),
        Quarters: [
            {Id: "1", Label: "רבעון ראשון"},
            {Id: "2", Label: "רבעון שני"},
            {Id: "3", Label: "רבעון שלישי"},
            {Id: "4", Label: "שנתי"},
        ],
    }
}

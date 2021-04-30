import ButtonGroups from "../ButtonsGroup/ButtonsGroup";
import Table from "../Table/Table";

export default function HoldingsQuery({company}) {
  return <div className="inner-page-content">
    <h3>רשימת חברות השקעה של {company}</h3>
    <h4>רבעון 4, ספטמבר 2019</h4>

    <ButtonGroups
      title={"בחרו את אפיק ההשקעה"}
      buttons={{
        pension: 'פנסיה',
        gemel: 'גמל',
        bituah: 'ביטוח'
      }}
      description={"במידה ואתה לא יודע היכן הכסף שלך מושקע...."}
    />
    <Table
      headers={['', 'שם החברה', 'שוק / ענף במשק', 'שווי החזקות', 'שיעור אחזקות']}
      rows={[
        ['', 'פוקס ויזל', 'מסחר', '10,000,000 שקל', '5.7%'],
        ['', 'קבוצת עזריאלי', 'מסחר', '10,000,000 שקל', '5.7%'],
        ['', 'בנק לאומי', 'מסחר', '10,000,000 שקל', '5.7%'],
        ['', 'בזק החברה הישראלית לתקשורת בע”מ ', 'מסחר', '10,000,000 שקל', '5.7%'],
      ]}
    />

    <div className="all-companies-wrapper">
      <a href="#" className="all-companies">לרשימות החברות המלאות</a>
    </div>
  </div>
}

import ButtonGroups from "../ButtonsGroup/ButtonsGroup";
import Table from "../Table/Table";
import {useMemo, useState} from "react";
import {isEmpty} from 'lodash';

export default function HoldingsQuery({company, companyID, channels}) {
  const [selectedValue, setSelectedValue] = useState();

  const results = useMemo(() => {
    if (isEmpty(selectedValue)) {
      return [];
    }

    const selectedID = Object.keys(selectedValue)[0];

    return [...[], ...[
      ['', 'פוקס ויזל', 'מסחר', `10,000,000 שקל ${selectedID}`, '5.7%'],
      ['', 'קבוצת עזריאלי', 'מסחר', '10,000,000 שקל', '5.7%'],
      ['', 'בנק לאומי', 'מסחר', '10,000,000 שקל', '5.7%'],
      ['', 'בזק החברה הישראלית לתקשורת בע”מ ', 'מסחר', '10,000,000 שקל', '5.7%'],
    ]];
  }, [companyID, selectedValue]);

  return <div className="inner-page-content">
    <h3>רשימת חברות השקעה של {company}</h3>
    <h4>רבעון 4, ספטמבר 2019</h4>

    <ButtonGroups
      title={"בחרו את אפיק ההשקעה"}
      buttons={channels}
      description={"במידה ואתה לא יודע היכן הכסף שלך מושקע...."}
      selectHandler={(selectedValue) => {
        setSelectedValue(selectedValue)
      }}
    />
    {!isEmpty(results) && <>
      <Table
        headers={['', 'שם החברה', 'שוק / ענף במשק', 'שווי החזקות', 'שיעור אחזקות']}
        rows={results}
      />

      <div className="all-companies-wrapper">
        <a href="#" className="all-companies">לרשימות החברות המלאות</a>
      </div>
    </>}

  </div>
}

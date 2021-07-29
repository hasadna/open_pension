import Table from "../Table/Table";
import BarsGraph from "../BarsGraph/BarsGraph";
import {isEmpty} from 'lodash';
import ResponsiveLine from "./ResponsiveLine";

export default function PerformanceResults({results: {tracksInfo, graphData, legends, graph}, selectedPeriod, setPeriod}) {

  const periodFilterOptions = {
    THREE_MONTHS: '3 חוד׳ אחרונים',
    SIX_MONTHS: '6 חוד׳ אחרונים',
    YEAR_START: 'תחילת שנה',
    LAST_TWELVE_MONTHS: '12 חודשים אחרונים',
    LAST_THREE_YEARS: '3 שנים אחרונות',
    LAST_FIVE_YEARS: '5 שנים אחרונות',
  };

  return <div className="performance-results">

    <h5>רשימת מסלולים</h5>
    <Table
      headers={[
        'מספר קרן',
        'שם הקרן',
        'יתרת נכסים',
        'תשואה שנתית',
        'ת.ממוצאות ב-3 שנים',
        'ת.ממוצאות ב-5 שנים',
        'שארפ',
      ]}
      rows={tracksInfo}
    />

    <h5 className="separator">משה מה לכתוב כאן?</h5>
    <div className="graph-wrapper">
      <ul className="period-picker">
        {Object.entries(periodFilterOptions).map(([period, title], key) => {
          const className = selectedPeriod === period ? 'active' : '';

          return <li key={key} className={className}>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              setPeriod(period);
            }}>{title}</a>
          </li>
        })}
      </ul>

      <div className={`graph lines ${isEmpty(graph) && 'no-results'}`}>
        {isEmpty(graph) ? <>
          <p>מצטערים אבל נראה שאין לנו תוצאות מדיהמות לתקופת הזמן שבחרת.</p>
          <p>אולי תנסה לבחור תקופת זמן אחרת.</p>
        </> : <ResponsiveLine graph={graph} legends={legends} />}
      </div>
    </div>

    <h5 className="separator">משה מה לכתוב כאן?</h5>

    <div className="graph bars">
      <BarsGraph data={graphData} />
    </div>

  </div>
}

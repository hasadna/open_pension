import Table from "../Table/Table";
import BarsGraph from "../BarsGraph/BarsGraph";
import {isEmpty} from 'lodash';
import ResponsiveLine from "./ResponsiveLine";
import {periodFilterOptions} from "../../consts/performance";

export default function PerformanceResults({results: {tracksInfo, graphData, graph}, selectedPeriod, setPeriod}) {
  const colors = graph.map(({color}) => color);
  const legends = graph.map(({id, color}) => [id, color])

  return <div className="performance-results">

    <div className="tracks-wrapper">
      <h5>רשימת מסלולים</h5>

      <div className={"tracks"}>

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
      </div>
    </div>

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
        </> : <ResponsiveLine graph={graph} legends={legends} colors={colors} />}
      </div>
    </div>

    <h5 className="separator">משה מה לכתוב כאן?</h5>

    <div className="graph bars">
      <BarsGraph data={graphData} />
    </div>

  </div>
}

import Table from "../Table/Table";
import {useState} from 'react';
import lineData from './lineData';
import {ResponsiveLine} from "@nivo/line";
import BarsGraph from "../BarsGraph/BarsGraph";

export default function PerformanceResults({tracksInfo}) {
  const [selectedFilter, setSelectedFilter] = useState('last12Years');

  const graphsFilterOptions = {
    last3Months: '3 חוד׳ אחרונים',
    last6Months: '6 חוד׳ אחרונים',
    yearStart: 'תחילת שנה',
    last12Years: '12 חודשים אחרונים',
    last3Years: '3 שנים אחרונות',
    last5Years: '5 שנים אחרונות',
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
        {Object.entries(graphsFilterOptions).map(([filterBy, title], key) => {
          const className = selectedFilter === filterBy ? 'active' : '';

          return <li key={key} className={className}>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              setSelectedFilter(filterBy);
            }}>{title}</a>
          </li>
        })}
      </ul>

      <div className="graph lines">

        <ul className="legends">
          <li>כלל חיסכון לכל ילד</li>
          <li>חיסכון לכל ילד</li>
          <li>פסגות חיסכון לכל ילד</li>
          <li>הטובה ביותר: מיטב דש חיסכון לכל ילד</li>
        </ul>
        <ResponsiveLine
          data={lineData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          enableGridY={false}
          lineWidth={5}
          pointSize={10}
          pointColor={{ from: 'color', modifiers: [] }}
          pointBorderWidth={1}
          pointBorderColor={{ theme: 'background' }}
          pointLabel="x"
          pointLabelYOffset={-12}
          areaBlendMode="overlay"
          areaOpacity={0}
          enableCrosshair={false}
          crosshairType="top-right"
          useMesh={true}
          legends={[]}
          motionConfig="default"
        />
      </div>
    </div>

    <h5 className="separator">משה מה לכתוב כאן?</h5>

    <div className="graph bars">
      <BarsGraph
        data={{
          'עמיתים': null,
          'הלמן אלדובי': null,
          'מנורה': -2.2,
          'אלטשולר שחם': -1.2,
          'הפניקס': 0.08,
          'הראל': 1.10,
          'הכשרה': 1.8,
          'מגדל': 2.85,
          'ביטוח ישיר': 2.93,
          'הראל פיננסי': 4.51,
          'פסגות': 7.11,
          'יונים': 10.18,
        }}
      />
    </div>

  </div>
}

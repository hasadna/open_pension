import Table from "../Table/Table";
import {useState} from 'react';
import {ResponsiveLine} from "@nivo/line";
import BarsGraph from "../BarsGraph/BarsGraph";

export default function PerformanceResults({results: {tracksInfo, graphData, legends, graph}}) {
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
          {legends.map((legend, key) => <li key={key}>{legend}</li>)}
        </ul>
        <ResponsiveLine
          curve={'natural'}
          data={graph}
          margin={{ top: 50, right: 25, bottom: 100, left: 20 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 70,
            tickRotation: 90,
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={null}
          enableGridX={false}
          enableGridY={true}
          lineWidth={2}
          pointSize={8}
          pointColor={{ from: 'color', modifiers: [] }}
          pointBorderWidth={1}
          pointBorderColor={{ theme: 'background',  }}
          pointLabel="x"
          pointLabelYOffset={-12}
          areaBlendMode="overlay"
          areaOpacity={0}
          enableCrosshair={false}
          crosshairType="top-right"
          useMesh={true}
          legends={[]}
          tooltip={({point}) => {
            const {data: {x, valueToDisplay, fundName}, color} = point;
            return <div className={"line-tooltip"} style={{borderColor: color}}><b>{fundName}</b>, {x}: {valueToDisplay}</div>;
          }}
          motionConfig="default"
        />
      </div>
    </div>

    <h5 className="separator">משה מה לכתוב כאן?</h5>

    <div className="graph bars">
      <BarsGraph data={graphData} />
    </div>

  </div>
}

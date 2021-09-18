import {ResponsiveLine} from "@nivo/line";

export default ({graph, legends, colors}) => <>
  <ul className="legends">
    {legends.map(([legend, color], key) => <li key={key}><span className="cube" style={{backgroundColor: color}}>&nbsp;</span> {legend}</li>)}
  </ul>
  <ResponsiveLine
    curve={'natural'}
    data={graph}
    colors={colors}
    margin={{ top: 50, right: 25, bottom: 100, left: 20 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', reverse: false }}
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
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
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
    enableCrosshair={true}
    crosshairType="bottom-left"
    useMesh={true}
    legends={[]}
    tooltip={({point}) => {
      const {data: {x, y, fundName}, color} = point;
      return <div className={"line-tooltip"} style={{borderColor: color}}><b>{fundName}</b>, {x}: {y}</div>;
    }}
    motionConfig="default"
  />
</>
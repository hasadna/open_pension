export default function BarsGraph({data}) {

  // Ordering the bodies from the lowest to the highest.
  const sortedBodies = Object.entries(data).sort(([, valueFirst], [, valueSecond]) => {
    if (!valueFirst || !valueSecond) {
      // It seems the body did not invested any money. Set it in the end of the list.
      return -1;
    }

    return valueFirst > valueSecond ? -1 : 1
  });

  const [[, highestValue]] = sortedBodies;

  const calculateHeight = (investmentValueForBody) => (Math.abs(investmentValueForBody) / highestValue) * 100;
  const Bar = ({value}) => <div
    className="bar"
    style={{height: `${calculateHeight(value)}%`}}
  >&nbsp;</div>;

  return <div className="bars-graph">
    <table>
      <thead>
        <tr>
          {sortedBodies.map(([, value], key) => {
            if (value && value > 0) {
              return <td className='up' key={key}>

                {value === highestValue && <img src={`/svgs/winner.svg`}/>}
                <Bar value={value}/>
              </td>;
            }
            return <td>&nbsp;</td>
          })}
        </tr>
      </thead>
      <tbody>
        <tr className="legend">
          {sortedBodies.map(([name, value], key) => {
            const valueToPresent = value ? value : 'לא השקיעה';
            let textClass;

            if (value === null) {
              textClass = 'gray';
            } else {
              textClass = value < 0 ? 'red' : 'purple';
            }

            return <td key={key}>
              {value < 0 && <Bar value={value}/>}
              <span className={`money ${textClass}`}>{valueToPresent}</span>
              <span>{name}</span>
            </td>
          })}
        </tr>
      </tbody>
    </table>
  </div>
}

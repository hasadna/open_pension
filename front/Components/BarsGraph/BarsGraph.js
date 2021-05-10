export default function BarsGraph({data}) {

  const sortedBodies = Object.entries(data).sort(([_, valueFirst], [__,valueSecond]) =>  {
    if (!valueFirst || !valueSecond) {
      return -1;
    }
    return valueFirst > valueSecond ? -1: 1
  });

  const [[_, highestValue]] = sortedBodies;

  const calculateHeight = (investmentValueForBody) => (Math.abs(investmentValueForBody) / highestValue) * 100;

  const Bar = ({value}) => <div className={"bar"} style={{height: `${calculateHeight(value)}%`}}>&nbsp;</div>;
  const Columns = ({direction}) => {
    return <tr>
      {sortedBodies.map(([_, value], key) => {

        if (value && value > 0) {
          return <td className={direction}>
            <Bar value={value} />
          </td>;
        }

        return <td>&nbsp;</td>

      })}
    </tr>
  };

  return <div className="bars-graph">
      <table>
      <thead>
        <Columns />
      </thead>
      <tbody>
        <tr className="legend">
          {sortedBodies.map(([name, value], key) => {
            const valueToPresent = value ? value : 'לא השקיעה';
            let textClass;

            if (value === null) {
              textClass = 'gray';
            }
            else if (value < 0) {
              textClass = 'red';
            }
            else {
              textClass = 'purple';
            }

            return <td key={key}>
              {value < 0 && <Bar value={value} />}
              <span className={`money ${textClass}`}>{valueToPresent}</span>
              <span>{name}</span>
            </td>
          })}
        </tr>
      </tbody>
    </table>
  </div>
}

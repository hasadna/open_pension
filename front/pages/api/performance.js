import {gql} from "@apollo/client";
import client from "../../backend/apollo-client";
import {log} from "open-pension-logger"

export default async function handler(req, res) {
  try {
    log({text: `Getting graph data for with the args: ${JSON.stringify(req.body)}`})
    const results = await client.query({
      query: gql`query ($channel: Int, $subChannel: Int, $bodies: [Int], $timePeriod: TimePeriod) {
        performance(input:{channel: $channel, subChannel: $subChannel, bodies: $bodies, timePeriod: $timePeriod}) {
          graph,
          graphData,
          tracksInfo {
            fundNumber
            fundName
            balance
            yearlyRevenue
            threeYearsAverageBalance
            fiveYearsAverageBalance
            sharp
          }
        }
      }`,
      variables: {...req.body}
    });

    const {graph, graphData, tracksInfo} = results.data.performance;

    log({text: `Returning the graph`})

    res.status(200).json({
      graph: JSON.parse(graph),
      graphData: JSON.parse(graphData),
      tracksInfo: Object.values(tracksInfo)
        .map(({fundNumber, fundName, yearlyRevenue, balance, threeYearsAverageBalance, fiveYearsAverageBalance, sharp}) => {
          return [fundNumber, fundName, yearlyRevenue, balance, threeYearsAverageBalance, fiveYearsAverageBalance, sharp]
        })
    });
  } catch (error) {
    log({text: 'There was an error while getting the graph data', error}, 'error');
    res.status(500).json({error: 'Something went wrong'});
  }
}

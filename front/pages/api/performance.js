import {gql} from "@apollo/client";
import client from "../../backend/apollo-client";

const months = {
  0: 'ינואר', 1: 'פברואר', 2: 'מרץ', 3: 'אפריל', 4: 'מאי', 5: 'יוני', 6: 'יולי', 7: 'אוגוסט', 8: 'ספטמבר', 9: 'אוקטובר', 10: 'נובמבר', 11: 'דצמבר'
};

const colors = [
  "hsl(78, 70%, 50%)",
  "hsl(19, 70%, 50%)",
  "hsl(240, 70%, 50%)",
  "hsl(215, 70%, 50%)",
];

function convertDataToGraph(graph) {
  const data = {};
  const nameOfMonth = {};
  const getMonthFromTimeStamp = (timestamp) => {
    if (!Object.keys(nameOfMonth).includes(timestamp)) {
      nameOfMonth[timestamp] = months[new Date(timestamp * 1000).getMonth()];
      return nameOfMonth[timestamp];
    }

    return nameOfMonth[timestamp];
  };

  Object.entries(graph).forEach(([month, value]) => {
    Object.entries(value).forEach(([fundId, value]) => {
      if (!Object.keys(data).includes(fundId)) {
        data[fundId] = [];
      }
      data[fundId].push({x: getMonthFromTimeStamp(month), y: value});
    });
  });

  return Object.entries(data).map(([fundId, data], index) => {
    return {
      "id": fundId,
      "color": colors[index],
      data
    }
  });
}

export default async function handler(req, res) {
  try {
    const results = await client.query({
      query: gql`query ($fundId: [Int], $managingBody: [Int], $channel: [Int]) {
        performance(input:{fundId: $fundId, managingBody: $managingBody, channel: $channel, timePeriod: LAST_FIVE_YEARS}) {
          graph
        }
      }`,
      variables: {...req.body}
    });

    res.status(200).json({graph: convertDataToGraph(JSON.parse(results.data.performance.graph))});
  } catch (e) {
    console.log(e.result.error);
    res.status(500).json({error: 'Something went wrong'});
  }
}

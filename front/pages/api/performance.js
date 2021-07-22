import {gql} from "@apollo/client";
import client from "../../backend/apollo-client";

// Move this logic to the backend.
const months = {
  0: 'ינואר', 1: 'פברואר', 2: 'מרץ', 3: 'אפריל', 4: 'מאי', 5: 'יוני', 6: 'יולי', 7: 'אוגוסט', 8: 'ספטמבר', 9: 'אוקטובר', 10: 'נובמבר', 11: 'דצמבר'
};

// Load the funds names as well.
const funds = {
  892: 'כלל לדמי מחלה',
  72: 'מיטב דש גמל חו"ל',
};

function convertDataToGraph(graph) {
  const data = {};
  const nameOfMonth = {};
  const getMonthFromTimeStamp = (timestamp) => {
    if (!Object.keys(nameOfMonth).includes(timestamp)) {
      const date = new Date(timestamp * 1000);
      nameOfMonth[timestamp] = `${months[date.getMonth()]} ${date.getFullYear()}`;
      return nameOfMonth[timestamp];
    }

    return nameOfMonth[timestamp];
  };

  Object.entries(graph).forEach(([month, value]) => {
    Object.entries(value).forEach(([fundId, value]) => {
      if (!Object.keys(data).includes(fundId)) {
        data[fundId] = [];
      }
      data[fundId].push({x: getMonthFromTimeStamp(month), y: value, fund: funds[fundId]});
    });
  });

  return Object.entries(data).map(([fundId, data], index) => {
    return {
      "id": fundId,
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

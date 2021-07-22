import {gql} from "@apollo/client";
import client from "../../backend/apollo-client";

export default async function handler(req, res) {
  try {
    const results = await client.query({
      query: gql`
        query ($fundId: [Int], $managingBody: [Int], $channel: [Int]) {
          performance(input:{fundId: $fundId, managingBody: $managingBody, channel: $channel, timePeriod: LAST_FIVE_YEARS}) {
              graph
          }
        }`,
      variables: {
        ...req.body
      }
    });

    res.status(200).json({graph: JSON.parse(results.data.performance.graph)});
  } catch (e) {
    console.log(e.result.error);
  }
}

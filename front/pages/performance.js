import {isEmpty} from 'lodash';
import Wrapper from "../Components/Wrapper/Wrapper";
import SecondaryHeader from "../Components/SecondaryHeader/SecondaryHeader";
import HoldingsWaiting from "../Components/HoldingsWaiting/HoldingsWaiting";
import {useReducer, useEffect, useState} from 'react';
import PerformanceQuery from "../Components/PerformanceQuery/PerformanceQuery";
import PerformanceResults from "../Components/PerformanceResults/PerformanceResults";
import {convertServerEntitiesToKeyValue, getLastUpdate} from "./api";
import client from "../backend/apollo-client";
import {gql} from "@apollo/client";

export async function getServerSideProps(context) {
  const {data: {managingBodies, channels, subChannels}} = await client.query({
    query: gql`
      query {
        managingBodies {
          ID
          label
        }
        channels {
          ID
          label
        },
        subChannels {
          ID
          label
        }
      }
    `,
  });

  return {
    props: {
      bodies: convertServerEntitiesToKeyValue(managingBodies),
      channels: convertServerEntitiesToKeyValue(channels),
      subChannels: convertServerEntitiesToKeyValue(subChannels),
      lastUpdate: getLastUpdate()
    },
  }
}

const queryState = {
  bodies: [],
  investmentType: null,
  investmentPath: null,
  selectedPeriod: 'LAST_TWELVE_MONTHS',
};

const queryReducer = (state, {type, value}) => {
  switch (type) {
    case 'investmentPath':
    case 'investmentType':
      const [key, selectedValue] = Object.entries(value)[0];
      let newValue = selectedValue ? key : null;
      return {...state, ...{[type]: newValue}};

    case 'bodies':
      return {...state, ...{bodies: value}};

    case 'period':
      return {...state, ...{selectedPeriod: value}};

    default:
      return state;
  }
};

export default function Performance({bodies, channels, subChannels, lastUpdate}) {
  const [query, dispatchQuery] = useReducer(queryReducer, queryState);
  const [results, setResults] = useState(null);
  const {selectedPeriod} = query;

  const setPeriod = (value) => {
    dispatchQuery({type: 'period', value});
  }


  useEffect(async () => {
    const {bodies, investmentType, investmentPath, selectedPeriod} = query;

    if (!isEmpty(bodies) && !isEmpty(investmentType) && !isEmpty(investmentPath)) {
      const res = await fetch('/api/performance', {
        body: JSON.stringify({
          fundId: [892, 72],
          managingBody: [3],
          channel: [1],
          timePeriod: selectedPeriod,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })

      const {graph, graphData, legends, tracksInfo} = await res.json();
      setResults({
        graph,
        tracksInfo,
        graphData,
        legends,
      });
    }

  }, [query]);

  return <>
    <Wrapper title="ביצועים">
      <SecondaryHeader
        title={"ביצועים"}
        description={<p className="description">
          גופי הפנסיה משקיעים את הכספי החסכון שלך כדי להשיג תשואה.<br/>
          ככל הם מרווחים יותר, לך יהיה יותר. כאן, אפשר לבדוק,כמה גוף הפנסיה שלך מרווח בשבילך,<br/>
          באיזה סיכון, וכמה הייתה היכול להרוויח במקום אחר.
        </p>
        }
        lastUpdate={lastUpdate}
      >
      </SecondaryHeader>

      <div className="inner-page-content big performance">
        <PerformanceQuery
          dispatchQuery={dispatchQuery}
          bodies={bodies}
          subChannels={subChannels}
          channels={channels}/>

        {results ? <PerformanceResults results={results} selectedPeriod={selectedPeriod} setPeriod={setPeriod}/> :
          <HoldingsWaiting/>}
      </div>
    </Wrapper>
  </>
}

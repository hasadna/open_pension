import {isEmpty} from 'lodash';
import Wrapper from "../Components/Wrapper/Wrapper";
import SecondaryHeader from "../Components/SecondaryHeader/SecondaryHeader";
import HoldingsWaiting from "../Components/HoldingsWaiting/HoldingsWaiting";
import {useState, useReducer, useEffect} from 'react';
import PerformanceQuery from "../Components/PerformanceQuery/PerformanceQuery";
import PerformanceResults from "../Components/PerformanceResults/PerformanceResults";
import {convertServerEntitiesToKeyValue, getLastUpdate} from "./api";
import client from "../backend/apollo-client";
import {gql} from "@apollo/client";

export async function getServerSideProps(context) {
  const { data: {managingBodies, channels, subChannels} } = await client.query({
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

    default:
      return state;
  }
};

export default function Performance({bodies, channels, subChannels, lastUpdate}) {
  const [results, setResults] = useState(null);
  const [query, dispatchQuery] = useReducer(queryReducer, queryState);

  // Convert to useMemo.
  useEffect(() => {
    const {bodies, investmentType, investmentPath} = query;

    if (!isEmpty(bodies) && !isEmpty(investmentType) && !isEmpty(investmentPath)) {
      setResults({});
    }
  }, [query]);

  return <>
    <Wrapper title="ביצועים">
      <SecondaryHeader
        title={"ביצועים"}
        description={<p className="description">
          גופי הפנסיה משקיעים את הכספי החסכון שלך כדי להשיג תשואה.<br />
          ככל הם מרווחים יותר, לך יהיה יותר. כאן, אפשר לבדוק,כמה גוף הפנסיה שלך מרווח בשבילך,<br />
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
          channels={channels} />

        {results ? <PerformanceResults tracksInfo={[
          [11320, 'מנורה חיסכון לכל ילד', '198', '5.6', '', '', ''],
          [11320, 'פסגות חיסכון לכל ילד', '193', '5.9', '', '', ''],
          [11320, 'כלל חיסכון לכל ילד', '197', '4.2', '', '', ''],
        ]} /> : <HoldingsWaiting />}
      </div>


    </Wrapper>
  </>
}

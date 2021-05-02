import {isEmpty} from 'lodash';
import Wrapper from "../Components/Wrapper/wrapper";
import SecondaryHeader from "../Components/SecondaryHeader/SecondaryHeader";
import HoldingsWaiting from "../Components/HoldingsWaiting/HoldingsWaiting";
import {useState, useReducer, useEffect} from 'react';
import PerformanceQuery from "../Components/PerformanceQuery/PerformanceQuery";
import PerformanceResults from "../Components/PerformanceResults/PerformanceResults";
import {getBodies, getInvestmentPath, getInvestmentTypes, getLastUpdate} from "./api";

export async function getStaticProps() {
  return {
    props: {
      bodies: getBodies(),
      investmentTypes: getInvestmentTypes(),
      investmentPath: getInvestmentPath(),
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

export default function Performance({bodies, investmentTypes, investmentPath, lastUpdate}) {

  const [results, setResults] = useState(null);
  const [searchedOnce, setSearchedOnce] = useState(false);
  const [query, dispatchQuery] = useReducer(queryReducer, queryState);

  useEffect(() => {
    const {bodies, investmentType, investmentPath} = query;

    if (!isEmpty(bodies) && !isEmpty(investmentType) && !isEmpty(investmentPath)) {
      console.log('searching');
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
          investmentPath={investmentPath}
          investmentTypes={investmentTypes} />

        {results ? <PerformanceResults /> : <HoldingsWaiting />}
      </div>


    </Wrapper>
  </>
}

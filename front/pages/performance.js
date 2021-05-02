import Wrapper from "../Components/Wrapper/wrapper";
import SecondaryHeader from "../Components/SecondaryHeader/SecondaryHeader";
import HoldingsWaiting from "../Components/HoldingsWaiting/HoldingsWaiting";
import {useState} from 'react';
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

export default function Performance({bodies, investmentTypes, investmentPath, lastUpdate}) {

  const [results, setResults] = useState(null);

  return <>
    <Wrapper title="ביצועים">
      <SecondaryHeader
        title={"אחזקות"}
        description={<p className="description">
          גופי הפנסיה משקיעים את הכספי החסכון שלך כדי להשיג תשואה.<br />
          ככל הם מרווחים יותר, לך יהיה יותר. כאן, אפשר לבדוק,כמה גוף הפנסיה שלך מרווח בשבילך,<br />
          באיזה סיכון, וכמה הייתה היכול להרוויח במקום אחר.
        </p>
        }
        lastUpdate={lastUpdate}
      >
      </SecondaryHeader>

      <div className="inner-page-content big">
        <PerformanceQuery />

        {results && <PerformanceResults />}

        {!results && <HoldingsWaiting />}
      </div>


    </Wrapper>
  </>
}

import Wrapper from "../Components/Wrapper/wrapper";
import SecondaryHeader from "../Components/SecondaryHeader/SecondaryHeader";
import HoldingsSearch from "../Components/HoldingsSearch/HoldingsSearch";
import {useState} from 'react';
import HoldingsWaiting from "../Components/HoldingsWaiting/HoldingsWaiting";
import HoldingsQuery from "../Components/HoldingsQuery/HoldingsQuery";

export async function getStaticProps() {
  const bodies = [
    'אלטשולר שחם'
    , 'כלל ביטוח'
    , 'כלל ביטוח'
    , 'מנורה מבטחים'
  ];

  const investmentTypes = {
    pension: 'פנסיה',
    gemel: 'גמל',
    bituah: 'ביטוח'
  };
  const lastUpdate = '18/09/2020 לפי רבעון 4 של שנת 2020';

  return {
    props: {
      bodies,
      investmentTypes,
      lastUpdate
    },
  }
}

export default function Holdings({bodies, investmentTypes, lastUpdate}) {
  const [selectedBody, setSelectedBody] = useState(null);

  return <>
    <Wrapper title="אחזקות">
      <SecondaryHeader
        title={"אחזקות"}
        description={<p className="description">

          בכל רבעון, גופי הפניסה מפרסמים לציבור דוחות המפרטים<br />
          את רשימת הכנסים שהם כספי החיסכון של הציבור מושקעים.
          <br />
          כאן, ניתן לראות, באילו מניות, אגרות חוב, נכסי נדל״ן, קרנות השקעה וכו׳<br />
          בחרו גופי הפנסיה להשקעה את כספי החסכונות שלנו.
        </p>
        }
        lastUpdate={lastUpdate}
      >
        <HoldingsSearch setSelectedBody={setSelectedBody} bodies={bodies} />
      </SecondaryHeader>

      {selectedBody ?
        <HoldingsQuery
          company={selectedBody}
          investmentTypes={investmentTypes} /> :
        <HoldingsWaiting />
      }

    </Wrapper>
  </>
}

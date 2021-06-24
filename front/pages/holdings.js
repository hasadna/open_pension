import Wrapper from "../Components/Wrapper/Wrapper";
import SecondaryHeader from "../Components/SecondaryHeader/SecondaryHeader";
import HoldingsSearch from "../Components/HoldingsSearch/HoldingsSearch";
import {useState} from 'react';
import HoldingsWaiting from "../Components/HoldingsWaiting/HoldingsWaiting";
import HoldingsQuery from "../Components/HoldingsQuery/HoldingsQuery";
import {getLastUpdate, convertServerEntitiesToKeyValue} from "./api";
import { gql } from "@apollo/client";
import client from "../backend/apollo-client.js";

export async function getServerSideProps(context) {
  const { data: {managingBodies, channels} } = await client.query({
    query: gql`
      query {
        managingBodies {
          ID
          label
        }
        channels {
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
      lastUpdate: getLastUpdate()
    },
  }
}

export default function Holdings({bodies, channels, lastUpdate}) {
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

      <div className="inner-page-content small">
        {selectedBody ?
          <HoldingsQuery
            company={bodies[selectedBody]}
            companyID={selectedBody}
            channels={channels} /> :
          <HoldingsWaiting />
        }
      </div>
    </Wrapper>
  </>
}

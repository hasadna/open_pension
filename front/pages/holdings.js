import Wrapper from "../Components/Wrapper/wrapper";
import SecondaryHeader from "../Components/SecondaryHeader/SecondaryHeader";
import HoldingsSearch from "../Components/HoldingsSearch/HoldingsSearch";

export default function Holdings() {
  return <>
    <Wrapper title="אחזקות">
      <SecondaryHeader
        title={"אחזקות"}
        description={<>
          <p>
            בכל רבעון, גופי הפניסה מפרסמים לציבור דוחות המפרטים<br />
            את רשימת הכנסים שהם כספי החיסכון של הציבור מושקעים.
            <br />
            כאן, ניתן לראות, באילו מניות, אגרות חוב, נכסי נדל״ן, קרנות השקעה וכו׳<br />
            בחרו גופי הפנסיה להשקעה את כספי החסכונות שלנו.
          </p>
        </>}
        lastUpdate={"18/09/2020 לפי רבעון 4 של שנת 2020"}
      >
        <HoldingsSearch />
      </SecondaryHeader>
    </Wrapper>
  </>
}

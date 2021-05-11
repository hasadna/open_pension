import Wrapper from "../Components/Wrapper/Wrapper";
import SecondaryHeader from "../Components/SecondaryHeader/SecondaryHeader";

export default function Portfolio() {
  return <>
    <Wrapper title="מבנה תיק">
      <SecondaryHeader
        title={"מבנה תיק"}
        description={<p className="under-construction"> אנחנו עובדים על סיום העמוד, עוד קצת סבלנות.</p>}
      >
      </SecondaryHeader>

      <div className="inner-page-content">
        <div className="under-construction-image">
          <img src="./svgs/under-constructions.svg" />
        </div>
      </div>
    </Wrapper>
  </>
}

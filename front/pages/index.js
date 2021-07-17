import Wrapper from "../Components/Wrapper/Wrapper";
import WelcomeMessage from "../Components/WelcomeMessage/WelcomeMessage";
import FrontpageNavigation from "../Components/FrontpageNavigation/FrontpageNavigation";
import WhoWeAre from "../Components/WhoWeAre/WhoWeAre";
import {HOMEPAGE} from "../consts/titles";

export default function Home() {
  return <Wrapper title={HOMEPAGE} isFrontPage={true}>
    <WelcomeMessage />
    <FrontpageNavigation />
    <WhoWeAre />
  </Wrapper>
}

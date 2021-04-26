import Wrapper from "../Components/Wrapper/wrapper";
import WelcomeMessage from "../Components/WelcomeMessage/WelcomeMessage";
import FrontpageNavigation from "../Components/FrontpageNavigation/FrontpageNavigation";
import WhoWeAre from "../Components/WhoWeAre/WhoWeAre";

export default function Home() {
  return <Wrapper title="Homepage" isFrontPage={true}>
    <WelcomeMessage />
    <FrontpageNavigation />
    <WhoWeAre />
  </Wrapper>
}

import Wrapper from "../Components/Wrapper/wrapper";
import WelcomeMessage from "../Components/WelcomeMessage/WelcomeMessage";
import FrontpageNavigation from "../Components/FrontpageNavigation/FrontpageNavigation";

export default function Home() {
  return <Wrapper title="Homepage">
    <WelcomeMessage />
    <FrontpageNavigation />
  </Wrapper>
}

import {getComponent, verifyElementExists} from "../../tests/TestingUtils";
import Page from "./Page";

jest.mock("react-router-dom", () => {
  return {
    Link: jest.fn(),
  }
});

describe('Page', () => {

  const renderComponent = (props) => getComponent(<Page
    activePage={'home'}
    title={"title of the page"}
    {...props}
  >
    <div id={"single-id"}>This is a body</div>
  </Page>)

  it('Check the content appears with a simple render', () => {
    const wrapper = renderComponent();
    verifyElementExists({wrapper, selector: "#single-id", text: 'This is a body'});
  });

  it('Check the top content render', () => {
    let wrapper = renderComponent();

    // No content at all.
    verifyElementExists({wrapper, selector: ".top-content", text: ""});

    // Verify the top notch render correctly.
    // todo: until enzyme support react 17 we cannot test it.
    // wrapper = renderComponent({topNotch: <div id={"header-content"}>This is the top notch</div>});
    //
    // verifyElementExists({wrapper, selector: "#header-content", text: "This is the top notch"});
  });

});

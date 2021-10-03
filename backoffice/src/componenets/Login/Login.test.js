import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from "./Login";
configure({ adapter: new Adapter() });

describe('Login', () => {
  const getComponent = () => shallow(<Login />);

  const searchText = ({wrapper, text}) => {
    expect(wrapper.html().includes(text)).toBeTruthy();
  }

  const verifyElementExists = ({wrapper, selector}) => {
    expect(wrapper.find(selector).length).toBe(1);
  }

  const verifyElementNotExists = ({wrapper, selector}) => {
    expect(wrapper.find(selector).length).toBe(0);
  }

  it('Submitting the form without a username or password', () => {
    const wrapper = getComponent();
    verifyElementNotExists({wrapper, selector: '.message.error'});
    wrapper.find('.button.button-ok').simulate('click');

    searchText({wrapper: wrapper.find('Input').at(0), text: 'You need to set a username or email'});
    searchText({wrapper: wrapper.find('Input').at(1), text: 'Password cannot be empty'});
  });

  it('Submitting the form without a username', () => {});
  it('Submitting the form without a password', () => {});
  it('Handling an error from the server upon a valid form', () => {});
  it('Handling an success from server upon a valid form', () => {});
});

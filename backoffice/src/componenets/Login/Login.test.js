import {
  getComponent,
  verifyElementExists,
  verifyElementNotExists,
  searchText,
  setElementValue, clickEvent
} from "../../tests/TestingUtils";

let mockLoginQuery = jest.fn()

jest.mock('api/user', () => {
  return {
    loginQuery: () => mockLoginQuery()
  };
})

import Login from "./Login";

describe('Login', () => {

  it('Submitting the form without a username or password', async () => {
    const wrapper = getComponent(<Login />);

    verifyElementNotExists({wrapper, selector: '.message.error'});
    await clickEvent({wrapper, selector: '.button.button-ok'});

    searchText({wrapper: wrapper.find('Input').at(0), text: 'You need to set a username or email'});
    searchText({wrapper: wrapper.find('Input').at(1), text: 'Password cannot be empty'});
  });

  it('Submitting the form without a password', async () => {
    const wrapper = getComponent(<Login />);

    setElementValue({wrapper, selector: '#username', value: 'test@example.com'});
    await clickEvent({wrapper, selector: '.button.button-ok'});

    searchText({wrapper: wrapper.find('Input').at(1), text: 'Password cannot be empty'});
  });

  it('Handling an error from the server upon a valid form', async () => {
    const wrapper = getComponent(<Login />);

    expect(mockLoginQuery).not.toBeCalled();

    setElementValue({wrapper, selector: '#username', value: 'test@example.com'});
    setElementValue({wrapper, selector: '#password', value: '1234'});

    mockLoginQuery.mockReturnValue({data: {}, error: {message: 'There was an error with the request'}});
    await clickEvent({wrapper, selector: '.button.button-ok', flushPromise: true});

    expect(mockLoginQuery).toBeCalledTimes(1);
    verifyElementExists({wrapper, selector: '.message.error', text: 'There was an error with the request'});
  });

  it('Handling an success from server upon a valid form', async () => {
    const wrapper = getComponent(<Login />, {recoil: true});

    setElementValue({wrapper, selector: 'email', value: 'test@example.com', recoilComponent: true})
    setElementValue({wrapper, selector: 'password', value: '1234', recoilComponent: true})

    expect(mockLoginQuery).not.toBeCalled();

    mockLoginQuery.mockReturnValue({
      data: {
        token: 'pizza',
        expires: 'time',
        refreshToken: 'sushi'
      }, error: {}
    });

    await clickEvent({wrapper, selector: 'submit', recoilComponent: true});
    expect(mockLoginQuery).toBeCalledTimes(1);

    verifyElementNotExists({wrapper, selector: '.message.error', recoilComponent: true});
  });
});

import {fireEvent} from '@testing-library/react';
import {getComponent,verifyElementExists,verifyElementNotExists, flushPromises, searchText} from "../../tests/TestingUtils";

let mockLoginQuery = jest.fn()

jest.mock('api/user', () => {
  return {
    loginQuery: () => mockLoginQuery()
  };
})

import Login from "./Login";

describe('Login', () => {

  it('Submitting the form without a username or password', () => {
    const wrapper = getComponent(<Login />);
    verifyElementNotExists({wrapper, selector: '.message.error'});
    wrapper.find('.button.button-ok').simulate('click');

    searchText({wrapper: wrapper.find('Input').at(0), text: 'You need to set a username or email'});
    searchText({wrapper: wrapper.find('Input').at(1), text: 'Password cannot be empty'});
  });

  it('Submitting the form without a password', () => {
    const wrapper = getComponent(<Login />)
    wrapper.find('#username').simulate('change', {target: {value: 'test@example.com'}})
    wrapper.find('.button.button-ok').simulate('click');

    searchText({wrapper: wrapper.find('Input').at(1), text: 'Password cannot be empty'});
  });

  it('Handling an error from the server upon a valid form', async () => {
    const wrapper = getComponent(<Login />);

    expect(mockLoginQuery).not.toBeCalled();

    wrapper.find('#username').simulate('change', {target: {value: 'test@example.com'}});
    wrapper.find('#password').simulate('change', {target: {value: '1234'}});
    mockLoginQuery.mockReturnValue({data: {}, error: {message: 'There was an error with the request'}});
    wrapper.find('.button.button-ok').simulate('click');
    await flushPromises();
    expect(mockLoginQuery).toBeCalledTimes(1);
    verifyElementExists({wrapper, selector: '.message.error', text: 'There was an error with the request'});
  });

  it('Handling an success from server upon a valid form', async () => {
    const {getByTestId, queryByTestId} = getComponent(<Login />, {recoil: true});

    fireEvent.change(getByTestId('email'), {target: {value: 'test@example.com'}});
    fireEvent.change(getByTestId('password'), {target: {value: '1234'}});

    expect(mockLoginQuery).not.toBeCalled();

    mockLoginQuery.mockReturnValue({
      data: {
        token: 'pizza',
        expires: 'time',
        refreshToken: 'sushi'
      }, error: {}
    });
    fireEvent.click(getByTestId('submit'), {target: {value: '1234'}});

    await flushPromises();
    expect(mockLoginQuery).toBeCalledTimes(1);

    expect(queryByTestId('message-error')).toBeNull();
  });
});

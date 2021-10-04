import {shallow} from "enzyme";
import {fireEvent, render} from "@testing-library/react";
import {RecoilRoot} from "recoil";
import Login from "../componenets/Login/Login";

export const getComponent = (component, options = {}) => {
  const {recoil} = options;

  if (recoil) {
    return render(<RecoilRoot><Login/></RecoilRoot>);
  }

  return shallow(component);
}

export const searchText = ({wrapper, text}) => {
  expect(wrapper.html().includes(text)).toBeTruthy();
}

export const verifyElementExists = ({wrapper, selector, text}) => {
  const element = wrapper.find(selector);
  expect(element.length).toBe(1);

  if (text) {
    expect(element.text()).toBe(text);
  }
}

export const verifyElementNotExists = ({wrapper, selector, recoilComponent}) => {

  if (recoilComponent) {
    let {queryByTestId} = wrapper;
    expect(queryByTestId(selector)).toBeNull();
    return;
  }

  expect(wrapper.find(selector).length).toBe(0);
}

export const flushPromises = () => new Promise(setImmediate);

export const setElementValue = ({wrapper, selector, value, recoilComponent}) => {
  if (recoilComponent) {
    const {getByTestId} = wrapper;
    fireEvent.change(getByTestId(selector), {target: {value}});
  }

}

export const clickEvent = ({wrapper, selector, recoilComponent}) => {
  if (recoilComponent) {
    const {getByTestId} = wrapper;
    fireEvent.click(getByTestId(selector));
  }
}


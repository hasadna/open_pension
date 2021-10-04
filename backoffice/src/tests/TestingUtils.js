import {shallow} from "enzyme";
import {render} from "@testing-library/react";
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

export const verifyElementNotExists = ({wrapper, selector}) => {
  expect(wrapper.find(selector).length).toBe(0);
}

export const flushPromises = () => new Promise(setImmediate);


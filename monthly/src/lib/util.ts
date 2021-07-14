import {isNumber} from "lodash";

export function setKeyIfNotEmpty(key, value) {
  if (!isNumber(value)) {
    return {};
  }

  return {[key]: {connect: {ID: value}}}
}

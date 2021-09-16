import {rowsHeaders} from "./Consts";

export const calculateInitialState = ({fileRows, type}) => {
  return {
    currentHeaders: rowsHeaders,
    rows: fileRows,
    type,
  }
};

export function fileViewReducer(state, {type, rows, currentHeaders}) {
  return {...state, ...{type, rows, currentHeaders}}
}

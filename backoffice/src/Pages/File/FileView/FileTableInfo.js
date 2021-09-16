import {calculateInitialState, fileViewReducer} from "./fileViewReducer";
import RoundedElement from "../../../componenets/RoundedElement/RoundedElement";
import {Info, Top} from "../../../componenets/FileView";
import {isEmpty} from "lodash";
import Table from "../../../componenets/Table/Table";
import {Link} from "react-router-dom";
import {METADATA_ROWS, FILE_ROWS, metadataHeaders, rowsHeaders} from "./Consts";
import {useReducer} from 'react';

function displayFileRows(row, currentHeaders, dispatch) {
  return currentHeaders.map((header, key) => {

    let value = row[header];
    value = header === 'TKUFAT_DIVUACH' ? new Date(parseInt(value)).toDateString() : value;

    if (key !== 0) {
      return value;
    }

    return <a onClick={() => {
      dispatch({
        currentHeaders: metadataHeaders,
        rows: [Object.values(row['managerMetadata'])],
        type: METADATA_ROWS,
      })
    }}>{value}</a>
  });
}

export default ({file}) => {
  const {filename, status, createdAt, extra: {error, numberOfRows, fileRows}} = file;
  const date = new Date(parseInt(createdAt));
  const initialState = calculateInitialState({fileRows, type: FILE_ROWS})
  const [state, dispatch] = useReducer(fileViewReducer, initialState);
  const {currentHeaders, rows, type} = state;

  const switchToFileRowsView = () => {dispatch({
    type: FILE_ROWS,
    currentHeaders: rowsHeaders,
    rows: fileRows,
  })}

  return <RoundedElement>
    <div className="fileView">
      <Top filename={filename} status={status}/>
      <Info numberOfRows={numberOfRows} uploadedAt={date.toDateString()} error={error} />

      {!isEmpty(fileRows) && <Table
        limitTableSize={true}
        title="File rows"
        headers={currentHeaders}
        rows={type === FILE_ROWS ? rows.map(row => displayFileRows(row, currentHeaders, dispatch)) : rows}
        actionButton={type !== FILE_ROWS && <Link onClick={switchToFileRowsView} className="navigation-button">View rows</Link>}
      />}
    </div>
  </RoundedElement>;
};

import {useEffect, useState, useReducer} from 'react';
import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Copy, File, Home} from "Icons/Icons";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import "./FileView.scss";
import Table from "componenets/Table/Table";
import {Link, useParams} from "react-router-dom";
import {Top, Info} from "componenets/FileView";
import {getFile} from "../../../api/file";
import {isEmpty} from 'lodash';
import {rowsHeaders, metadataHeaders} from "./Consts";
const FILE_ROWS = 'file_rows';
const METADATA_ROWS = 'metadata_rows';

function reducer(state, {type, rows, currentHeaders}) {
  return {...state, ...{type, rows, currentHeaders}}
}

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
        type: METADATA_ROWS
      })
    }}>{value}</a>
  });
}

const Content = ({file}) => {
  const {filename, status, createdAt, extra: {error, numberOfRows, fileRows}} = file;
  const date = new Date(parseInt(createdAt));

  const initialState = {
    currentHeaders: rowsHeaders,
    rows: fileRows,
    type: FILE_ROWS,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {currentHeaders, rows, type} = state;

  return <RoundedElement>
    <div className="fileView">
      <Top filename={filename} status={status}/>
      <Info numberOfRows={numberOfRows} uploadedAt={date.toDateString()} error={error} />

      {!isEmpty(fileRows) && <Table
        title="File rows"
        headers={currentHeaders}
        rows={type === FILE_ROWS ? rows.map(row => displayFileRows(row, currentHeaders, dispatch)) : rows}
        actionButton={type !== FILE_ROWS && <Link onClick={() => {dispatch({
          type: FILE_ROWS,
          currentHeaders: rowsHeaders,
          rows: fileRows,
        })}} className="navigation-button">View rows</Link>}
      >
      </Table>}
    </div>
  </RoundedElement>;
}

export default () => {
  const {id} = useParams();
  const [file, setFile] = useState(null);

  useEffect(async () => {
    const file = await getFile(id);
    file.extra = JSON.parse(file.extra);
    setFile(file);

  }, [id]);

  return <Page
    activePage={"files"}
    title={"Files view"}
    notch={"small"}
    topContent={<Breadcrumbs crumbs={[
      <Crumb title={'Home'} icon={<Home />} />,
      <Crumb title={'Files'} icon={<Copy />} />,
      <Crumb title={'Viewing a file'} icon={<File />} />
    ]} />}
    >
    {file && <Content file={file} /> }
  </Page>
}

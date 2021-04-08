import Table from "componenets/Table/Table";
import Status from "componenets/Status/Status";
import Pager from "componenets/Pager/Pager";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import {getFiles} from "api/file";


const filesHandler = (files) => {

  if (!files) {
    return [];
  }

  // todo: handle the statueses.
  return files.map((file, key) => [
    file.filename,
    <Status status='info'>{file.status}</Status>,
    file.storageId
  ]);
}

export default ({isFrontpage, showPager, itemsPerPage = 25}) => {
  const [files, setFiles] = useState([]);

  useEffect(async () => {
    if (!files) {
      return;
    }
    const {data, error} = await getFiles();
    setFiles(data);
  }, []);

  let navigationButton;
  if (isFrontpage) {
    navigationButton = isEmpty(files) ?
      {path: '/file/add', text: 'Add file'} :
      {path: 'files', text: 'View all'};
  } else {
    navigationButton = {path: '/file/add', text: 'Add file'};
  }

  return <RoundedElement>
    <Table
      title="Recent uploaded files"
      headers={['Filename', 'Status', 'Storage ID']}
      rows={filesHandler(files)}
      navigationButton={navigationButton}
      pager={showPager && <Pager />}
      emptyElement={"No files were found. You can add more files with the button above."}
    >
    </Table>
  </RoundedElement>
};

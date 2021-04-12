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
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(async () => {
    if (!files) {
      return;
    }
    const {data: {files: filesFromResponse, totalCount}, error} = await getFiles(itemsPerPage, currentPage);
    setTotalCount(totalCount);
    setFiles(filesFromResponse);
  }, [currentPage]);

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
      pager={showPager && <Pager
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />}
      emptyElement={"No files were found. You can add more files with the button above."}
    >
    </Table>
  </RoundedElement>
};

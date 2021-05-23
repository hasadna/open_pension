import Table from "componenets/Table/Table";
import Status from "componenets/Status/Status";
import Pager from "componenets/Pager/Pager";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import {getFiles} from "api/file";
import {getPusher} from "api/pusher";


const filesHandler = (files) => {

  if (!files) {
    return [];
  }

  const fileStatusHandler = {
    sent: 'Sent to storage',
    processStarted: 'Processing started',
    storedByService: 'Stored by the service',
    processed: 'Processed successfully',
    processedWithError: 'processed with errors'
  };

  const handleFileStatus = (fileStatus) => Object.keys(fileStatusHandler).includes(fileStatus) ?
    fileStatusHandler[fileStatus] : 'Unknown';

  return files.map((file, key) => [
    file.filename,
    <Status status='info'>{handleFileStatus(file.status)}</Status>,
    file.storageId
  ]);
}

export default ({isFrontpage, showPager, itemsPerPage = 25, queryParams}) => {
  const [files, setFiles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [lastReloaded, setLastReloaded] = useState(new Date());

  useEffect(async () => {
    const {
      data: {
        files: filesFromResponse,
        totalCount
      }
    } = await getFiles({itemsPerPage, page, queryParams});

    setTotalCount(totalCount);
    setFiles(filesFromResponse);
  }, [page, queryParams, lastReloaded]);

  useEffect(() => {
    const channel = getPusher();
    channel.bind_global((event, {model}) => {

      if (model !== 'files') {
        return;
      }

      // Trigger reloading the page.
      setLastReloaded(new Date());
    });
  }, [files]);

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
        page={page}
        setPage={setPage}
      />}
      emptyElement={"No files were found. You can add more files with the button above."}
    >
    </Table>
  </RoundedElement>
};

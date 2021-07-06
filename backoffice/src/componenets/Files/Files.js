import Table from "componenets/Table/Table";
import Status from "componenets/Status/Status";
import Pager from "componenets/Pager/Pager";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import {getFiles} from "api/file";
import {getPusherChannel} from "api/pusher";


const filesHandler = (files) => {

  if (!files) {
    return [];
  }

  const fileStatusHandler = {
    sent: {text: 'Sent to storage', icon: 'warning'},
    processStarted: {text: 'Processing started', icon: 'warning'},
    stored: {text: 'Stored by the service', icon: 'info'},
    storedByService: {text: 'Stored by the service', icon: 'info'},
    processed: {text: 'Processed successfully', icon: 'ok'},
    processedWithError: {text: 'processed with errors', icon: 'error'},
  };

  const handleFileStatus = (fileStatus) => Object.keys(fileStatusHandler).includes(fileStatus) ?
    fileStatusHandler[fileStatus] : 'Unknown';

  return files.map((file, key) => {
    const {text, icon} = handleFileStatus(file.status);

    return [
      file.filename,
      <Status status={icon}>{text}</Status>,
      file.storageId
    ]
  });
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
    const channel = getPusherChannel();
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

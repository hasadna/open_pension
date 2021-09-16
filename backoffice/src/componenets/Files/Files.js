import Table from "componenets/Table/Table";
import Status from "componenets/Status/Status";
import Pager from "componenets/Pager/Pager";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import {getFiles} from "api/file";
import {getPusherChannel} from "api/pusher";
import {Link} from "react-router-dom";
import FileStatus from "componenets/FileStatus/FileStatus";

const filesHandler = (files) => {

  if (!files) {
    return [];
  }

  return files.map((file, key) => {
    return [
      <Link to={`file/view/${file.id}`}>{file.filename}</Link>,
      <FileStatus file={file} />,
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

import {useEffect, useState} from 'react';
import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Copy, File, Home} from "Icons/Icons";
import {useParams} from "react-router-dom";
import {getFile} from "../../../api/file";
import "./FileView.scss";
import FileTableInfo from "./FileTableInfo";
import {isEmpty} from 'lodash';

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
    {!isEmpty(file) && <FileTableInfo file={file} /> }
  </Page>
}

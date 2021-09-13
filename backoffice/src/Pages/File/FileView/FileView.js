import {useEffect, useState} from 'react';
import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Copy, File, Home} from "Icons/Icons";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import "./FileView.scss";
import Table from "componenets/Table/Table";
import {useParams} from "react-router-dom";
import {Top, Info} from "componenets/FileView";
import {getFile} from "../../../api/file";

const Content = ({file}) => {
  const {filename, status, createdAt} = file;
  const date = new Date(parseInt(createdAt));

  return <RoundedElement>
    <div className="fileView">
      <Top filename={filename} status={status}/>
      <Info numberOfRows={150} uploadedAt={date.toDateString()}/>

      <Table
        title="File rows"
        headers={['Filename', 'Status', 'Storage ID']}
        rows={[]}
        navigationButton={{path: 'a', text: 'View metadata'}}
      >
      </Table>
    </div>
  </RoundedElement>;
}

export default () => {
  const {id, action} = useParams();
  const [file, setFile] = useState(null);

  useEffect(async () => {
    const file = await getFile(id);
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
    {file !== null && <Content file={file} /> }
  </Page>
}

import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Copy, File, Home} from "Icons/Icons";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import FileStatus from "componenets/FileStatus/FileStatus";
import "./FileView.scss";
import Table from "componenets/Table/Table";
import {useParams} from "react-router-dom";

export default () => {
  const {id, action} = useParams();

  console.log(id, action);

  return <Page
    activePage={"files"}
    title={"Files view"}
    topContent={<Breadcrumbs crumbs={[
      <Crumb title={'Home'} icon={<Home />} />,
      <Crumb title={'Files'} icon={<Copy />} />,
      <Crumb title={'Viewing a file'} icon={<File />} />
    ]} />}
    >
    <RoundedElement>

      <div className={"fileView"}>

        <div className="top">
          <h3 className="title">Filename</h3>
          <FileStatus file={{status: 'sent'}} />
        </div>

        <div className="file-info">
          <div className="info-item">
            <span>Uploaded at: </span> Yesterday
          </div>

          <div className="info-item">
            <span>Number of rows: </span> 150
          </div>
        </div>

        <Table
          title="File rows"
          headers={['Filename', 'Status', 'Storage ID']}
          rows={[]}
          navigationButton={{path: 'a', text: 'View metadata'}}
        >
        </Table>
      </div>

    </RoundedElement>
  </Page>
}

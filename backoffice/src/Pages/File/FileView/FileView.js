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
import {isEmpty} from 'lodash';

const Content = ({file}) => {
  const {filename, status, createdAt, extra: {error, numberOfRows, fileRows}} = file;
  const date = new Date(parseInt(createdAt));

/*    "managerMetadata": {
        "status": "ציבוריות",
        "channel": "גמל",
        "subChannel": "אג\"ח",
        "fundName": "כלל תמר אג\"ח",
        "type": "תגמולים ואישית לפיצויים",
        "passiveActive": "אקטיבי",
        "homebase": "כללי",
        "managingBody": "כלל"
    }
}
   */

  const headers = ['MANAGER_ID',
    'ALPHA_SHNATI',
    'SHARP_RIBIT_HASRAT_SIKUN',
    'STIAT_TEKEN_60_HODASHIM',
    'STIAT_TEKEN_36_HODASHIM',
    'TSUA_SHNATIT_MEMUZAAT_5_SHANIM',
    'TSUA_SHNATIT_MEMUZAAT_3_SHANIM',
    'TSUA_MITZTABERET_60_HODASHIM',
    'TSUA_MITZTABERET_36_HODASHIM',
    'TSUA_MEMUZAAT_60_HODASHIM',
    'TSUA_MEMUZAAT_36_HODASHIM',
    'TSUA_MITZT_MI_THILAT_SHANA',
    'YITRAT_NCHASIM_LSOF_TKUFA',
    'TSUA_NOMINALIT_BRUTO_HODSHIT',
    'TKUFAT_DIVUACH',];

  return <RoundedElement>
    <div className="fileView">
      <Top filename={filename} status={status}/>
      <Info numberOfRows={numberOfRows} uploadedAt={date.toDateString()} error={error} />

      {!isEmpty(fileRows) && <Table
        title="File rows"
        headers={headers}
        rows={fileRows.map(fileRow => {
          return headers.map(header => {
            let value = fileRow[header];
            if (header === 'TKUFAT_DIVUACH') {
              console.log(value);
              value = new Date(parseInt(value)).toDateString();
            }
            return value;
          })
        })}
        navigationButton={{path: 'a', text: 'View metadata'}}
      >
      </Table>}
    </div>
  </RoundedElement>;
}

export default () => {
  const {id, action} = useParams();
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
    {file !== null && <Content file={file} /> }
  </Page>
}

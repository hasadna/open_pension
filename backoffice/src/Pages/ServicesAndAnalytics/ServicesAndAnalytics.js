import Page from "componenets/Page/Page";
import Table from "componenets/Table/Table";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Charts, Home} from "Icons/Icons";
import Status from "componenets/Status/Status";

export default () => {
  //todo: get from the BE all the data.
  return <Page
    activePage="servicesAndAnalytics"
    title="Services and analytics"
    notch="small"
    topContent={<Breadcrumbs crumbs={[
      <Crumb title={'Home'} icon={<Home />} />,
      <Crumb title={'Services and Analytics'} icon={<Charts />} />
    ]} />}
  >
    <RoundedElement>
      <Table
        title={"Services health"}
        headers={['Service name', 'Service address', 'Status']}
        rows={[
          ['Storage', 'http://localhost:7000', <Status status={"ok"}>Up</Status>],
          ['Monthly', 'http://localhost:4000', <Status status={"ok"}>Up</Status>],
          ['Application', 'http://localhost:4000', <Status status={"ok"}>Up</Status>],
          ['Processor', 'http://localhost:4000', <Status status={"ok"}>Up</Status>],
        ]}
        navigationButton={false}
      />

    </RoundedElement>

  </Page>
}

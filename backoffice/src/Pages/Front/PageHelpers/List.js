import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Book, Home, InfoCircle} from "Icons/Icons";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import Table from "componenets/Table/Table";

export default () => {
  return <Page
    activePage={"frontSite"}
    title={"Page helpers"}
    notch="small"
    topContent={
      <>
        <Breadcrumbs crumbs={[
          <Crumb title={'Home'} icon={<Home/>}/>,
          <Crumb title={'Front site'} icon={<Book/>}/>,
          <Crumb title={'Page helpers'} icon={<InfoCircle />}/>,
        ]}/>
      </>
    }>
    <RoundedElement>
      <Table
        title="Page helpers"
        headers={['Page', 'Element ID', 'Description']}
        rows={[]}
        navigationButton={{path: '/front/page-helpers/add', text: 'Add page helper'}}
        emptyElement={"There are no page helpers to manage."}
      >
      </Table>
    </RoundedElement>
  </Page>
}

import Page from "../../componenets/Page/Page";
import {Input} from "../../componenets/Form/Form";
import Filters from "../../componenets/Filters/Filters";
import {Breadcrumbs, Crumb} from "../../componenets/Breadcrumns/Breadcrumbs";
import {Home, Users} from "../../Icons/Icons";
import Table from "../../componenets/Table/Table";
import RoundedElement from "../../componenets/RoundedElement/RoundedElement";

export default () => {

  return <Page
    title="Users"
    activePage="users"
    topContent={
      <>
        <Breadcrumbs crumbs={[<Crumb title={'Home'} icon={<Home />} />, <Crumb title={'Users'} icon={<Users />} />]} />
        <Filters inputs={[
          <Input title={"Username"} />,
          <Input title={"Email"} />
        ]} />
      </>
      }
  >
    <RoundedElement>
      <Table
        title="Users"
        headers={['Username', 'Email', 'Presentation name']}
        rows={[]}
        navigationButton={{path: '/users/add', text: 'Add user'}}
        // pager={showPager && <Pager />}
        emptyElement={"No files were found. You can add more files with the button above."}
      >
      </Table>
    </RoundedElement>
  </Page>
}

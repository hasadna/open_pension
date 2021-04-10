import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Copy, Delete, Home} from "Icons/Icons";
import {Button, Form, Text} from "componenets/Form/Form";
import {Link} from "react-router-dom";

export default () => {
  return <Page
    title={"Deleting a user"}
    activePage="users"
    notch="small"
    topContent={<Breadcrumbs crumbs={[
      <Crumb title={'Home'} icon={<Home/>}/>,
      <Crumb title={'Users'} icon={<Copy/>}/>,
      <Crumb title={'Delete user'} icon={<Delete/>}/>
    ]}/>}>

    <Form title={<b>Are you sure?</b>} actions={<>
      <Link to={"/users"}><Button type={"ok"}>No</Button></Link>
      <Button type={"error"}>Yes</Button>
    </>}>
      <Text>
        You going to delete the user <b>Name</b> from the system. This action cannot be undone.
      </Text>
    </Form>
  </Page>
}

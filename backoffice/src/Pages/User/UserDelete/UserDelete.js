import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Copy, Delete, Home} from "Icons/Icons";
import {Button, Form, Text} from "componenets/Form/Form";
import {Link, Redirect} from "react-router-dom";
import {useParams} from "react-router-dom"
import {useState, useEffect} from 'react';
import {deleteUser, getUser} from "api/user";

export default () => {
  const {id} = useParams();
  const [{username}, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteUser(id);
    setRedirect(true);
  }

  useEffect(async() => {
    const {data: user} = await getUser(id);
    setUser(user.user);
  }, []);

  if (redirect) {
    return <Redirect to={"/users"} />;
  }

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
      <Button type={"error"} waiting={loading} onClick={() => {handleDelete()}}>Yes</Button>
    </>}>
      <Text>
        You going to delete the user <b>{username}</b> from the system. This action cannot be undone.
      </Text>
    </Form>
  </Page>
}

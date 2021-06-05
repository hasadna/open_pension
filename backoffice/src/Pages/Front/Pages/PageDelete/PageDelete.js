import {Link, Redirect, useParams} from "react-router-dom";
import {useState, useEffect} from 'react';
import {getPage, deletePage} from "api/page";
import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Book, BookOpen, Delete, Home} from "Icons/Icons";
import {Button, Form, Text} from "componenets/Form/Form";

export default () => {

  const {id} = useParams();
  const [{label}, setPage] = useState({});
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deletePage({id});
    setRedirect(true);
  }

  useEffect(async() => {
    const {data: page} = await getPage(id);
    setPage(page);
  }, []);

  if (redirect) {
    return <Redirect to={"/front/pages"} />;
  }

  return <Page
    notch={"small"}
    activePage="frontSite"
    topContent={
      <>
        <Breadcrumbs crumbs={[
          <Crumb title={'Home'} icon={<Home/>}/>,
          <Crumb title={'Front site'} icon={<Book/>}/>,
          <Crumb title={'Pages'} icon={<BookOpen/>}/>,
          <Crumb title={'Delete page'} icon={<Delete />}/>,
        ]}/>
      </>
    }>

    <Form title={<b>Are you sure?</b>} actions={<>
      <Link to={"/front/pages"}><Button type={"ok"}>No</Button></Link>
      <Button type={"error"} waiting={loading} onClick={() => {handleDelete()}}>Yes</Button>
    </>}>
      <Text>
        You going to delete the page <b>{label}</b> from the system. This action cannot be undone.
      </Text>
    </Form>
  </Page>
};

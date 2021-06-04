import {Link, Redirect, useParams} from "react-router-dom";
import {useState, useEffect} from 'react';
import {getPageHelper, deletePageHelper} from "api/pageHelper";
import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Book, Delete, Home, InfoCircle} from "Icons/Icons";
import {Button, Form, Text} from "componenets/Form/Form";
import {isEmpty} from 'lodash';

export default () => {

  const {id} = useParams();
  const [{elementID, page}, setPageHelper] = useState({});
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deletePageHelper(id)
    setRedirect(true);
  }

  useEffect(async() => {
    const {data: pageHelper} = await getPageHelper(id);
    setPageHelper(pageHelper);
  }, []);

  if (redirect) {
    return <Redirect to={"/front/page-helpers"} />;
  }

  if (isEmpty(page) || isEmpty(elementID)) {
    return null;
  }

  return <Page
    notch={"small"}
    activePage="frontSite"
    topContent={
      <>
        <Breadcrumbs crumbs={[
          <Crumb title={'Home'} icon={<Home/>}/>,
          <Crumb title={'Front site'} icon={<Book/>}/>,
          <Crumb title={'Page helpers'} icon={<InfoCircle />}/>,
          <Crumb title={'Delete page helper'} icon={<Delete />}/>,
        ]}/>
      </>
    }>

    <Form title={<b>Are you sure?</b>} actions={<>
      <Link to={"/front/page-helpers"}><Button type={"ok"}>No</Button></Link>
      <Button type={"error"} waiting={loading} onClick={() => {handleDelete()}}>Yes</Button>
    </>}>
      <Text>
        You going to delete the page helper for page <b>{page.label}</b> for the element <b>{elementID}</b> from the system. This action cannot be undone.
      </Text>
    </Form>
  </Page>
};

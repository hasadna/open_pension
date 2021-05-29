import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Book, BookOpen, Delete, Edit, Home} from "Icons/Icons";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import Table from "componenets/Table/Table";
import {useEffect, useState} from "react";
import {getPages} from "api/pages";
import {isEmpty} from 'lodash';
import TextWithActions from "componenets/TextWithActions/TextWithActions";
import {Link} from "react-router-dom";

const handlePages = (pages) => {
  if (isEmpty(pages)) {
    return [];
  }

  return pages.map(({label, id}) => {
    const actions = [
      <Link to={`/front/page/${id}/edit`}><span className="edit"><Edit /> Edit</span></Link>,
      <Link to={`/front/page/${id}/delete`}><span className="delete"><Delete /> Delete</span></Link>
    ];
    return [<TextWithActions actions={actions}>{label}</TextWithActions>];
  });
};

export default () => {
  const [pages, setPages] = useState([]);

  useEffect(async () => {
    const {data} = await getPages();
    setPages(data);
  }, []);

  return <Page
    activePage={"frontSite"}
    title={"Pages"}
    notch="small"
    topContent={
      <>
        <Breadcrumbs crumbs={[
          <Crumb title={'Home'} icon={<Home/>}/>,
          <Crumb title={'Front site'} icon={<Book/>}/>,
          <Crumb title={'Pages'} icon={<BookOpen/>}/>,
        ]}/>
      </>
    }
  >

    <RoundedElement>
      <Table
        title="Pages"
        headers={['Page label']}
        rows={handlePages(pages)}
        navigationButton={{path: '/front/pages/add', text: 'Add page'}}
        emptyElement={"There are no pages to manage."}
      >
      </Table>
    </RoundedElement>
  </Page>
}

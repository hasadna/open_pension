import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Book, Delete, Edit, Home, InfoCircle} from "Icons/Icons";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import Table from "componenets/Table/Table";
import {Input, Select} from "componenets/Form/Form";
import Filters from "componenets/Filters/Filters";
import {useEffect, useReducer, useState} from "react";
import {valuesReducer} from "componenets/Form/formReducers";
import Pager from "componenets/Pager/Pager";
import {getPageHelpers} from "api/pageHelper";
import {getPages} from "api/page";
import {Link} from "react-router-dom";
import TextWithActions from "componenets/TextWithActions/TextWithActions";

const handlePageHelpers = (pageHelpers) => {
  return pageHelpers.map(({id, description, elementID, page: {label}}) => {

    const actions = [
      <Link to={`/front/page/${id}/edit`}><span className="edit"><Edit /> Edit</span></Link>,
      <Link to={`/front/page/${id}/delete`}><span className="delete"><Delete /> Delete</span></Link>
    ];

    return [label, elementID, <TextWithActions actions={actions}>{description}</TextWithActions>];
  });
};

export default () => {
  const [{filterByPage, filterByDescription}, dispatchValue] = useReducer(
    valuesReducer,
    {filterByPage: null, filterByDescription: null}
  );
  const [pages, setPages] = useState([]);
  const [pageHelpers, setPageHelpers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(async () => {
    const {data: pages} = await getPages();

    setPages(pages.map(({id: value, label: text}) => {
      return {value, text}
    }));

  }, []);

  useEffect(async () => {
    const {
      data: {
        pageHelpers: pageHelpers,
        totalCount
      }
    } = await getPageHelpers();

    setPageHelpers(pageHelpers);
    setTotalCount(totalCount);
  }, [page, filterByPage, filterByDescription, pages]);

  return <Page
    activePage={"frontSite"}
    title={"Page helpers"}
    topContent={
      <>
        <Breadcrumbs crumbs={[
          <Crumb title={'Home'} icon={<Home/>}/>,
          <Crumb title={'Front site'} icon={<Book/>}/>,
          <Crumb title={'Page helpers'} icon={<InfoCircle />}/>,
        ]}/>

        <Filters
          handleSubmit={() => {}}
          inputs={[
            <Select
              title={"Page"}
              onChange={(element) => dispatchValue({element, name: 'filename'})}
              firstOption={'Please select an option'}
              options={pages}
            />,
            <Input title={"Descriptions"} onChange={(element) => dispatchValue({element, name: 'filename'})} />
          ]}
        />
      </>
    }>
    <RoundedElement>
      <Table
        title="Page helpers"
        headers={['Page', 'Element ID', 'Description']}
        rows={handlePageHelpers(pageHelpers)}
        navigationButton={{path: '/front/page-helpers/add', text: 'Add page helper'}}
        emptyElement={"There are no page helpers to manage."}
        pager={<Pager
          totalCount={totalCount}
          itemsPerPage={10}
          page={page}
          setPage={setPage}
        />}
      >
      </Table>
    </RoundedElement>
  </Page>
}

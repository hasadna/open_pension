import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Book, Home, InfoCircle} from "Icons/Icons";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import Table from "componenets/Table/Table";
import {Input, Select} from "componenets/Form/Form";
import Filters from "componenets/Filters/Filters";
import {useReducer} from "react";
import {valuesReducer} from "componenets/Form/formReducers";

export default () => {
  const [formValues, dispatchValue] = useReducer(valuesReducer, {filename: null, status: null});

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
              options={[{value: 123, text: 'Home page'}]}
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
        rows={[]}
        navigationButton={{path: '/front/page-helpers/add', text: 'Add page helper'}}
        emptyElement={"There are no page helpers to manage."}
      >
      </Table>
    </RoundedElement>
  </Page>
}

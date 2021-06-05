import "./Files.scss";
import {useState, useReducer} from 'react';
import Page from "componenets/Page/Page";
import Files from "componenets/Files/Files";
import {Input} from "componenets/Form/Form";
import Filters from "componenets/Filters/Filters";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Copy, Home} from "Icons/Icons";
import {valuesReducer} from "componenets/Form/formReducers";

export default () => {
  const [queryParams, setQueryParams] = useState({});
  const [formValues, dispatchValue] = useReducer(valuesReducer, {filename: null});

  const handleSubmit = () => {
    setQueryParams(formValues);
  };

  return <Page
    activePage={"files"}
    title={"Files view"}
    topContent={
      <>
        <Breadcrumbs crumbs={[<Crumb title={'Home'} icon={<Home />} />, <Crumb title={'Files'} icon={<Copy />} />]} />
        <Filters
          handleSubmit={handleSubmit}
          inputs={[
            <Input title={"Filter by filename"} onChange={(element) => dispatchValue({element, name: 'filename'})} />
          ]}
        />
      </>
    }>
    <Files
      isFrontpage={false}
      showPager={true}
      queryParams={queryParams}
      itemsPerPage={10}
    />
  </Page>
};

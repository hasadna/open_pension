import {Button, Form, Input, Section, Select, Editor} from "componenets/Form/Form";
import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Book, Edit, Home, InfoCircle, Upload} from "Icons/Icons";
import {isEmpty} from "lodash";
import {ADD_ERROR, RESET_ERRORS} from "componenets/Form/formReducers";
import {useEffect, useState} from "react";
import {getPages} from "api/page";

export const handleFormSubmit = async ({setIsLoading, formValues, dispatchError, setRedirect, sendRequestHandler}) => {
  const {description, elementID, page} = formValues;
  let formIsValid = true;

  // First, reset the errors and set the loading to true.
  dispatchError({ type: RESET_ERRORS});
  setIsLoading(true);

  if (isEmpty(description)) {
    dispatchError({ type: ADD_ERROR, error: {description: 'The field is required'}});
    formIsValid = false;
  }

  if (isEmpty(elementID)) {
    dispatchError({ type: ADD_ERROR, error: {elementID: 'The field is required'}});
    formIsValid = false;
  }

  if (isEmpty(page)) {
    dispatchError({ type: ADD_ERROR, error: {page: 'The field is required'}});
    formIsValid = false;
  }

  if (!formIsValid) {
    setIsLoading(false);
    return;
  }

  const {error} = await sendRequestHandler({description, elementID, page});

  if (!isEmpty(error)) {
    // todo: handle.
    return;
  }

  setRedirect(true);
};

export const PageHelperForm = ({isEdit, isLoading, handleSubmit, errors, dispatchValue, pageHelper}) => {
  const [pages, setPages] = useState([]);
  useEffect(async () => {
    const {data: pages} = await getPages();

    setPages(pages.map(({id: value, label: text}) => {
      return {value, text}
    }));
  }, []);


  const {descriptionError, elementIDError, pageError} = errors;
  const {description, elementID, page} = {
    ...{description: '', elementID: '', page: null},
    ...pageHelper
  };

  return <Page
    notch={"small"}
    activePage="frontSite"
    topContent={
      <>
        <Breadcrumbs crumbs={[
          <Crumb title={'Home'} icon={<Home/>}/>,
          <Crumb title={'Front site'} icon={<Book/>}/>,
          <Crumb title={'Page helpers'} icon={<InfoCircle />}/>,
          isEdit ? <Crumb title={'Edit page helper'} icon={<Edit />}/> : <Crumb title={'Add page helper'} icon={<Upload />}/>,
        ]}/>
      </>
    }>
    <Form title={isEdit ? 'Edit page helper' : 'Add page helper'} actions={<Button type="ok" waiting={isLoading} onClick={() => handleSubmit()}>Submit</Button>}>
      <Section title="Page helper details">
        <Editor
          label={"Description"}
          value={description}
          error={descriptionError}
          changeContentCallback={(content) => {
            dispatchValue({element: encodeURI(content.trim()), name: 'description'})
          }}
        />
        <Input type="text" value={elementID} title={"Element ID"} error={elementIDError} onChange={(element) => dispatchValue({element, name: 'elementID'})}  />
      </Section>

      <Section title="Page reference">
        <Select
          defaultValue={page}
          title={"Page"}
          error={pageError}
          onChange={(element) => {
            dispatchValue({element, name: 'page'})
          }}
          firstOption={'Please select an option'}
          options={pages}
        />
      </Section>
    </Form>
  </Page>
}

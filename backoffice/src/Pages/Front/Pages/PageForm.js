import {Button, Form, Input, Section} from "componenets/Form/Form";
import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Book, BookOpen, Home, Upload} from "Icons/Icons";
import {isEmpty} from "lodash";
import {ADD_ERROR} from "componenets/Form/formReducers";

export const handleFormSubmit = async ({setIsLoading, formValues, dispatchError, setRedirect, sendRequestHandler}) => {
  setIsLoading(true);
  const {label} = formValues;

  if (isEmpty(label)) {
    dispatchError({ type: ADD_ERROR, error: {label: 'The field is required'}});
    setIsLoading(false);
    return;
  }

  const {error} = await sendRequestHandler({label});

  if (!isEmpty(error)) {
    // todo: handle.
    return;
  }

  setRedirect(true);
};

export default ({isEdit, isLoading, handleSubmit, errors, dispatchValue, page}) => {
  const {labelError} = errors;
  const {label} = {
    ...{label: ''},
    ...page
  };

  return <Page
    notch={"small"}
    activePage="frontSite"
    topContent={
      <>
        <Breadcrumbs crumbs={[
          <Crumb title={'Home'} icon={<Home/>}/>,
          <Crumb title={'Front site'} icon={<Book/>}/>,
          <Crumb title={'Pages'} icon={<BookOpen/>}/>,
          <Crumb title={'Add page'} icon={<Upload />}/>,
        ]}/>
      </>
    }>
    <Form title={isEdit ? 'Edit page' : 'Add page'} actions={<Button type="ok" waiting={isLoading} onClick={() => handleSubmit()}>Submit</Button>}>
      <Section title="Page details">
        <Input type="text" value={label} title={"Label"} error={labelError} onChange={(element) => dispatchValue({element, name: 'label'})}  />
      </Section>
    </Form>
  </Page>
}

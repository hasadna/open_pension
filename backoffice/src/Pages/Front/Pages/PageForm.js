import {Button, Form, Input, Section} from "componenets/Form/Form";
import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Book, BookOpen, Home, Upload} from "Icons/Icons";

export default ({isEdit, isLoading, handleSubmit, errors, dispatchValue}) => {
  const {labelError} = errors;
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
        <Input type="text" title={"Label"} error={labelError} onChange={(element) => dispatchValue({element, name: 'label'})}  />
      </Section>
    </Form>
  </Page>
}

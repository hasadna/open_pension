import {useState} from 'react';
import {Redirect} from "react-router-dom";
import Page from "componenets/Page/Page";
import {Button, Form, Input, Section} from "componenets/Form/Form";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Copy, Home, Upload} from "Icons/Icons";
import {uploadFile} from "api/file";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to={"/files"} />
  }

  const handleSubmit = async () => {
    setErrors({});

    if (!file) {
      setErrors({errors, ...{file: 'You need to select a file'}})
      return;
    }

    setIsLoading(true);

    try {
      await uploadFile(file);
      setRedirect(true);
    } catch (e) {
      const {response: {data: {error}}} = e;
      console.log(error);
      setErrors({errors, ...{file: error}})
    }

    setIsLoading(false);
  };

  return <Page
    title={"Adding file"}
    activePage="files"
    notch="small"
    topContent={<Breadcrumbs crumbs={[
      <Crumb title={'Home'} icon={<Home />} />,
      <Crumb title={'Files'} icon={<Copy />} />,
      <Crumb title={'Adding a file'} icon={<Upload />} />
    ]} />}
  >
    <Form
      title={"Adding file"}
      actions={<Button type="ok" waiting={isLoading} onClick={() => handleSubmit()}>Submit</Button>}>
      <Section title="File">
        <Input type="file" onChange={(event) => {setFile(event.target.files[0])}} error={errors.file}/>
      </Section>
    </Form>
  </Page>
};

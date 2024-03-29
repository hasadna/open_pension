import {useState} from 'react';
import {Redirect} from "react-router-dom";
import Page from "componenets/Page/Page";
import {Button, Form, Input, Section} from "componenets/Form/Form";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Copy, Home, Upload} from "Icons/Icons";
import {uploadFile} from "api/file";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState();
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to={"/files"} />
  }

  const handleSubmit = async () => {
    setErrors({});

    if (!files) {
      setErrors({errors, ...{file: 'You need to select a file'}})
      return;
    }

    if (files.length > 2) {
      // todo: find out why we cannot support more than two files or add a support for zip files.
      setErrors({errors, ...{file: 'For now, only 2 files are allowed at once'}})
      return;
    }

    setIsLoading(true);

    try {
      await uploadFile(files);
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
        <Input type="file" onChange={(event) => {setFiles(event.target.files)}} error={errors.file} multiple/>
      </Section>
    </Form>
  </Page>
};

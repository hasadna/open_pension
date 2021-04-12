import "./Files.scss";
import Page from "componenets/Page/Page";
import Files from "componenets/Files/Files";
import {Input} from "componenets/Form/Form";
import Filters from "componenets/Filters/Filters";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Copy, Home} from "Icons/Icons";

export default () => {
  return <Page
    activePage={"files"}
    title={"Files view"}
    topContent={
      <>
        <Breadcrumbs crumbs={[<Crumb title={'Home'} icon={<Home />} />, <Crumb title={'Files'} icon={<Copy />} />]} />
        <Filters inputs={[
          <Input title={"Filter by filename"} />,
          <Input title={"Filter by status"} />]
        } />
      </>
    }>
    <Files
      isFrontpage={false}
      showPager={true}
      itemsPerPage={10}
    />
  </Page>
};

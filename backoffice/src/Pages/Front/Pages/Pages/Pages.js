import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Book, BookOpen, Home} from "Icons/Icons";

export default () => {
  return <Page
    activePage={"frontSite"}
    title={"Pages"}
    notch="small"
    topContent={
      <>
        <Breadcrumbs crumbs={[
          <Crumb title={'Home'} icon={<Home />} />,
          <Crumb title={'Front site'} icon={<Book />} />,
          <Crumb title={'Pages'} icon={<BookOpen />} />,
        ]} />
      </>
    }
  >
    asadasd
  </Page>
}

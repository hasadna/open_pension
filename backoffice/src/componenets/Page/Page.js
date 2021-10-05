import "./Page.scss"
import {Charts, Copy, Home, Users, Search, Book, BookOpen, Paragraph, InfoCircle, Shekel, Route, Articles} from "Icons/Icons";
import {Link} from "react-router-dom";
import Username from "componenets/Username/Username";
import {useState} from 'react';
import {isEmpty} from 'lodash';

const MenuItem = ({title, icon, path, id, children}) => {
 const [isOpen, setIsOpen] = useState(false);
 const onClickHandler = (e) => {
   if (isEmpty(children)) {
     // The menu item has no sub menu so we can navigate the user.
     return;
   }

   e.preventDefault();
   setIsOpen(!isOpen);
 }

  return <>
      <Link to={path} onClick={onClickHandler}>
        <span className={`icon icon-${id}`}>{icon}</span>
        {title}
      </Link>
      {isOpen && children}
    </>
}

export default ({title, children, topContent, activePage = "home", notch="big"}) => {

  const menuItems = {
    home: <MenuItem title={'Home'} icon={<Home />} path={"/"} id={'home'} />,
    users: <MenuItem title={'Users'} icon={<Users />} path={"/users"} id={'users'} />,
    files: <MenuItem title={'Files'} icon={<Copy />} path={"/files"} id={'files'} />,
    frontSite: <MenuItem title={'Front site'} icon={<Book />} path={"/files"} id={'frontSite'}>
      <ul className="submenu">
        <li><MenuItem title="Pages" icon={<BookOpen />} id="pages" path={"/front/pages"} /></li>
        <li><MenuItem title="Helpers" icon={<InfoCircle />} id="pages" path={"/front/page-helpers"} /></li>
        <li><MenuItem title="Pages descriptions" icon={<Paragraph />} id="pages" path={"/front/pages"} /></li>
        <li><MenuItem title="Bodies" icon={<Shekel />} id="pages" path={"/front/pages"} /></li>
        <li><MenuItem title="Routes" icon={<Route />} id="pages" path={"/front/pages"} /></li>
        <li><MenuItem title="Articles" icon={<Articles />} id="pages" path={"/front/pages"} /></li>
        <li><MenuItem title="Staff" icon={<Users />} id="pages" path={"/front/pages"} /></li>
      </ul>
    </MenuItem>,
    search: <MenuItem title={'Search files'} icon={<Search />} path={"/query-files"} id={'search'} />,
    servicesAndAnalytics: <MenuItem title={'Services & Analytics'} icon={<Charts />} path={"/services-and-analytics"} id={'servicesAndAnalytics'} />,
  };

  return <main>
    <aside>
      <section className="title">
        <h2>Open Pension</h2>
      </section>

      <nav>
        <ul className="side-menu">
          {Object.entries(menuItems).map(([id, menuItem], key) => {
            return <li key={key} className={`${id === activePage ? 'active' : ''} link-wrapper`}>
              {menuItem}
            </li>
          })}
        </ul>
      </nav>
    </aside>

    <section className="main-content">
      <header className={`umbre-background notch-${notch}`}>

        <div className="header">
          <h1>{title}</h1>

          <div className="header-menu">
            Welcome <Username />.
          </div>

        </div>

        <div className="top-content">
          {topContent}
        </div>
      </header>

      <section className="content">
        {children}
      </section>

    </section>
  </main>
}

import "./Page.scss"
import {Charts, Copy, Home, Users, Search} from "Icons/Icons";
import {Link} from "react-router-dom";
import Username from "componenets/Username/Username";

export default ({title, children, topContent, activePage = "home", notch="big"}) => {

  const menuItems = {
    home: {title: 'Home',  icon: <Home />, path: "/"},
    users: {title: 'Users', icon: <Users />, path: "/users"},
    files: {title: 'Files', icon: <Copy />, path: "/files"},
    search: {title: 'Search files', icon: <Search />, path: "/query-files"},
    servicesAndAnalytics: {title: 'Services & Analytics', icon: <Charts />, path: "/services-and-analytics"}
  };

  return <main>

    <aside>
      <section className="title">
        <h2>Open Pension</h2>
      </section>

      <nav>
        <ul className="side-menu">
          {Object.entries(menuItems).map(([id, menuItem], key) => {
            const {title, icon, path} = menuItem;
            return <li className={`${id === activePage ? 'active' : ''} link-wrapper`}>
              <Link to={path}>
                <span className={`icon icon-${id}`}>{icon}</span>
                <div >{title}</div>
              </Link>
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

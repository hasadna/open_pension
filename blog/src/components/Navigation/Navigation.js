import React from "react"
import "./navigtation.scss"

const menuItems = [
  {path: '#tools', label: 'בלוגים אחרונים'},
  {path: '#articles', label: 'כתבו עלינו בעיתון'},
  {path: '#about-us', label: 'מי אנחנו'},
  {path: '#contact-us', label: 'צור קשר'},
]

export class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: true,
    };
  }

  renderMenu() {
    return <ul>
      {menuItems.map((menuItem, key) => {
        return <li key={key} className={`${key === 0 ? 'first': 'not-first'}`}>
          <a href={menuItem.path}>{menuItem.label}</a>
          {key === 0 && <i className="mobile fas fa-chevron-circle-down"></i> }
        </li>
      })}
    </ul>
  }

  render() {
    return <nav>
      <div className="wrapper desktop">
        <ul>
          {this.renderMenu()}
        </ul>
      </div>

      <div className="wrapper mobile">
        {this.state.mobileOpen && this.renderMenu()}
      </div>
    </nav>
  }
}

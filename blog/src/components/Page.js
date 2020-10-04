import React from "react"
import {Header} from "./Header/Header";

export class Wrapper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mobilMenuOpen: false,
    };
  }

  openCloseMobileMenu = () => {
    this.setState({mobilMenuOpen: !this.state.mobilMenuOpen});
  }

  render() {
    const { children, front } = this.props;
    return <main>
      {!front && <Header front={front} mobileMenuHandler={this.openCloseMobileMenu} />}
      {children}
    </main>
  }
}

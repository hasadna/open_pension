import React from "react"
import {Header} from "./Header/Header";
import {Navigation} from "./Navigation/Navigation";
import {Footer} from "./Footer/Footer";

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
      <Header frontPage={front} mobileMenuHandler={this.openCloseMobileMenu} />

      {front && <Navigation mobileOpen={this.state.mobilMenuOpen} /> }

      {children}

      <Footer appendToBottom={!front}/>
    </main>
  }
}

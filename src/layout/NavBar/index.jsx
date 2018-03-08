import React from "react";
import { Link } from "react-router-dom";

import { Toolbar, ToolbarRow, ToolbarTitle } from "rmwc/Toolbar";
import { TabBar, Tab } from "rmwc/Tabs";

import styles from "./styles.scss";

export class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 0
    };
  }

  render() {
    return (
      <Toolbar>
        <ToolbarRow>
          <TabBar
            activeTabIndex={this.state.activeTabIndex || 0}
            onChange={evt =>
              this.setState({ activeTabIndex: evt.target.value })
            }
          >
            <Tab className="mdc-tab--active">
              <Link to="/scripts" />
              Scripts
            </Tab>
            <Tab>
              <Link to="/packages" />
              Packages
            </Tab>
          </TabBar>
        </ToolbarRow>
      </Toolbar>
    );
  }
}

export default NavBar;

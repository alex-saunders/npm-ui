import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Toolbar, ToolbarRow, ToolbarTitle } from 'rmwc/Toolbar';
import { TabBar, Tab } from 'rmwc/Tabs';

import ScriptsView from '../scripts/scripts';
import PackagesView from '../packages/packages';

import './app-shell.scss'

export class AppShell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 0
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="app-container">
        <Toolbar>
          <ToolbarRow>
        <TabBar
        activeTabIndex={this.state.activeTabIndex || 0}
        onChange={evt => this.setState({'activeTabIndex': evt.target.value})}
      >
        <Tab className='mdc-tab--active'>
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

      <Route path="/scripts" render={() => <div className="route-container"><ScriptsView /></div>}/>
      <Route path="/packages" render={() => <div className="route-container"><PackagesView /></div>}/>
    </div>
    )
  }
}

export default AppShell;
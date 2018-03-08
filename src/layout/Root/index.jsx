import React from "react";
import { Route } from "react-router-dom";

import NavBar from '../NavBar'

import ScriptsView from "../../views/ScriptsView";

import styles from "./styles.scss";

export class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 0
    };
  }

  render() {
    return (
      <div className={styles.appContainer}>
        <NavBar />

        <Route
          path="/scripts"
          render={() => (
            <div className={styles.routeContainer}>
              <ScriptsView />
            </div>
          )}
        />
        <Route
          path="/packages"
          render={() => (
            <div className={styles.routeContainer}>
            packages
            </div>
          )}
        />
      </div>
    );
  }
}

export default Root;

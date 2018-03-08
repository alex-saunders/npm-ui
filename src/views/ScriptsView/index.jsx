import React from 'react';
import { Subscribe } from "unstated";

import styles from './styles.scss';

import ScriptsContainer from '../../containers/ScriptsContainer';

import ScriptsList from '../../components/ScriptsList';
import ProcessSelect from '../../components/ProcessSelect';

class ScriptsView extends React.Component {
  render() {
    return (
      <div className={styles["grid"]}>
        <div className={styles["grid-item"]}>
        <Subscribe to={[ScriptsContainer]}>
          {
            scriptsStore => (
              <ScriptsList scriptsStore={scriptsStore} />
            )
          }
        </Subscribe>
        </div>
        <div className={styles["grid-item"]}>
          ProcessPanel
        </div>
      </div>
    );
  }
}

export default ScriptsView;
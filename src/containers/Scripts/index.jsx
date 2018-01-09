import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  updateShellOutput,
  updateCurrentScript,
  restartShell,
  addProcess,
  changeProcess
} from "./actions";

import readPkg from "read-pkg-up";

import AnsiHTML from "ansi-html";

import { Button } from "rmwc/Button";
import { Icon } from "rmwc/Icon";
import { Card } from "rmwc/Card";
import { Typography } from "rmwc/Typography";
import { Select } from 'rmwc/Select';
import { TextField } from 'rmwc/TextField'; 

import Panel from "../../components/Panel";
import ScrollingContent from "../../components/ScrollingContent";
import IconButton from '../../components/icon-button/icon-button';

import styles from "./styles.scss";

export class ScriptsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scripts: {},
      shellOutput: []
    };

    // AnsiHTML.setColors({
    //   reset: ['555', '666'], // FOREGROUND-COLOR or [FOREGROUND-COLOR] or [, BACKGROUND-COLOR] or [FOREGROUND-COLOR, BACKGROUND-COLOR]
    //   black: 'aaa',	// String
    //   red: 'bbb',
    //   green: 'ccc',
    //   yellow: 'ddd',
    //   blue: '0085ff',
    //   magenta: 'fff',
    //   cyan: '999',
    //   lightgrey: '888',
    //   darkgrey: '777'
    // });
  }

  componentDidMount() {
    this.fetchScripts().then(scripts => {
      this.setState({
        scripts: scripts.scripts
      });
    });
  }

  execCommand(script) {
    this.props.updateCurrentScript({
      script: script,
      process: this.props.currentProcess
    });
  }

  changeProcess = (e) => {
    this.props.changeProcess(e.target.value);
  }

  async fetchScripts() {
    const { pkg } = await readPkg();

    const keys = ["scripts"];
    return keys.reduce((prev, p) => {
      if (Array.isArray(p)) {
        prev[p[0]] = extract(pkg[p[0]], p[1]);
      } else if (
        pkg !== undefined &&
        pkg !== null &&
        Object.prototype.hasOwnProperty.call(pkg, p)
      ) {
        prev[p] = pkg[p];
      }
      return prev;
    }, {});
  }

  createMarkup(shellOutputLine) {
    return { __html: `${AnsiHTML(shellOutputLine)}` };
  }

  componentDidUpdate() {
    this.scrollingShellOutput.scrollToBottom();
  }

  render() {
    const selectOptions = this.props.processes.map((process, index) => { 
        return { label: process.label, value: index} 
      }
    )

    return (
      <div className={styles["grid"]}>
        <div className={styles["grid-item"]}>
          <Panel>
            <Card>
              <TextField label="Write something..." />
              <TextField label="Write something..." />
              <ScrollingContent className={styles.listContainer}>
                {Object.keys(this.state.scripts).length > 0
                  ? Object.keys(this.state.scripts).map((script, index) => {
                      return (
                        <Button
                          key={index}
                          className={`${styles["list-item"]} ${styles["list-item--icon"]}`}
                          onClick={e => {
                            this.execCommand(script);
                          }}
                        >
                          <div className={styles["list-action"]}>
                            <Icon use="play_arrow" />
                          </div>
                          <div className={styles["list-text"]}>
                            <span className={styles["list-text--title"]}>
                              {script}
                            </span>
                            <span className={styles["list-text--detail"]}>
                              {this.state.scripts[script]}
                            </span>
                          </div>
                        </Button>
                      );
                    })
                  : ""}
              </ScrollingContent>
            </Card>
          </Panel>
        </div>
        <div className={styles["grid-item"]}>
          <Panel fullHeight>
            <div className={styles["list-container"]}>
              <div className={styles["list-item"]}>
                <Select
                  label="Process"
                  options={selectOptions}
                  value={`${this.props.currentProcess}`}
                  onChange={this.changeProcess}
                  className={styles["shell-select"]}
                />
                <div className={styles["list-item--rightActions"]}>
                  <IconButton raised onClick={this.props.addProcess}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                  </IconButton>
                  <IconButton raised>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                  </IconButton>
                  <IconButton raised onClick={this.props.restartShell}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                  </IconButton>
                </div>
              </div>
            </div>
            <Panel fullHeight>
              <Card>
                <ScrollingContent className={styles["shell-output"]} ref={(div) => { this.scrollingShellOutput = div; }}>
                  <pre ref={(pre) => { this.shellOutput = pre; }}>
                    {this.props.processes[this.props.currentProcess].output.map((shellOutputLine, index) => {
                      return <div key={index}><span dangerouslySetInnerHTML={this.createMarkup(shellOutputLine)}/><br/></div>
                    })}
                  </pre>
                </ScrollingContent>
              </Card>
            </Panel>
          </Panel>
        </div>
      </div>
    );
  }
}

ScriptsView.propTypes = {
  shellOutput: PropTypes.array.isRequired,
  restartShell: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    shellOutput: state.scripts.shellOutput,
    processes: state.scripts.processes,
    currentProcess: state.scripts.currentProcess,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    updateShellOutput: output => {
      dispatch(updateShellOutput(output));
    },
    updateCurrentScript: script => {
      dispatch(updateCurrentScript(script));
    },
    restartShell: () => {
      dispatch(restartShell());
    },
    addProcess: () => {
      dispatch(addProcess());
    },
    changeProcess: (index) => { 
      dispatch(changeProcess(index)); 
    },
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(ScriptsView);

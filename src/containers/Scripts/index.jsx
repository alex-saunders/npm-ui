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
import { Card, CardPrimary, CardTitle, CardSubtitle, CardActions, CardAction } from "rmwc/Card";
import { Typography } from "rmwc/Typography";
import { TextField } from 'rmwc/TextField'; 

import Panel from "../../components/common/Panel";
import ScrollingContent from "../../components/common/ScrollingContent";
import IconButton from '../../components/common/icon-button/icon-button';
import { 
  List, 
  ListItem, 
  ListItemIcon,
  ListItemTitle, 
  ListItemSubtitle,
  ListItemEndDetail } from '../../components/common/List/List';

  import ProcessSelect from '../../components/ProcessSelect';

import styles from "./styles.scss";
import { ListItemText } from "rmwc/List";

export class ScriptsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scripts: {},
      shellOutput: [],
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
        scripts: scripts.scripts,
      });
    });
  }

  componentDidUpdate() {
    this.scrollingShellOutput.scrollToBottom();
  }

  execCommand(script) {
    this.props.updateCurrentScript({
      script: script,
      process: this.props.currentProcess
    });
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

  render() {
    return (
      <div className={styles["grid"]}>
        <div className={styles["grid-item"]}>
          <Panel>
            <Card className={styles["newScript-card"]}>
              <ScrollingContent>
                <CardPrimary>
                  <CardTitle>New Script</CardTitle>
                  <div className={styles["newScript-wrapper"]}>
                    <div className={styles["newScript-inputContainer"]}>
                      <TextField label="Name" className={styles["newScript-name"]} />
                      <TextField label="Action" className={styles["newScript-detail"]} />
                    </div>
                  </div>
                </CardPrimary>
                <CardActions>
                  <CardAction>Add Script</CardAction>
                </CardActions>
              </ScrollingContent>
            </Card>
            <Card>
              <CardPrimary>
                <CardTitle>All Scripts</CardTitle>
              </CardPrimary>
              <ScrollingContent className={styles.listContainer}>
                <List>
                {Object.keys(this.state.scripts).length > 0
                  ? Object.keys(this.state.scripts).map((script, index) => {
                      return (
                        <ListItem
                          key={index}
                          onClick={e => {
                            this.execCommand(script);
                          }}
                        >
                          <ListItemIcon>
                            <Icon use="play_arrow" />
                          </ListItemIcon>
                          <ListItemTitle>
                            {script}
                          </ListItemTitle>
                          <ListItemSubtitle>
                            {this.state.scripts[script]}
                          </ListItemSubtitle>
                          <ListItemEndDetail>
                            <IconButton raised>
                              <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                            </IconButton>
                          </ListItemEndDetail>
                        </ListItem>
                      );
                    })
                  : ""}
                  </List>
              </ScrollingContent>
            </Card>
          </Panel>
        </div>
        <div className={styles["grid-item"]}>
          <Panel fullHeight>
            <List>
              <ListItem>
                <ListItemTitle>
                  <ProcessSelect
                    processes={this.props.processes}
                    currentProcess={this.props.currentProcess}
                    changeProcess={this.props.changeProcess}
                  >
                  </ProcessSelect>
                </ListItemTitle>
                <ListItemEndDetail>
                  <IconButton raised
                    className={styles["process-option"]}
                    onClick={this.props.addProcess}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                  </IconButton>
                  <IconButton raised
                    className={styles["process-option"]}
                  >
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                  </IconButton>
                  <IconButton raised
                    className={styles["process-option"]}
                    onClick={this.props.restartShell}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                  </IconButton>
                </ListItemEndDetail>
              </ListItem>
            </List>
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

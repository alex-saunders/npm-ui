import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  updateShellOutput,
  updateCurrentScript,
  restartShell
} from "./actions";

import readPkg from "read-pkg-up";

import AnsiHTML from "ansi-html";

import { Button } from "rmwc/Button";
import { Icon } from "rmwc/Icon";
import { Card } from "rmwc/Card";
import { Typography } from "rmwc/Typography";

import Panel from "../../components/Panel";
import ScrollingContent from "../../components/ScrollingContent";

import styles from "./styles.scss";

class ScriptsView extends React.Component {
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
    this.props.updateCurrentScript(script);
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
    const scroll =
      this.shellOutput.offsetHeight - this.scrollingShellOutput.offsetHeight;
    if (scroll > 0) {
      this.scrollingShellOutput.scrollTop = scroll;
    }
  }

  render() {
    return (
      <div className="grid">
        <div className="grid-item">
          <Panel>
            <Card>
              <ScrollingContent className={styles.listContainer}>
                {Object.keys(this.state.scripts).length > 0
                  ? Object.keys(this.state.scripts).map((script, index) => {
                      return (
                        <Button
                          key={index}
                          className={`${styles.listItem} ${styles.listItemIcon}`}
                          onClick={e => {
                            this.execCommand(script);
                          }}
                        >
                          <div className={styles.listAction}>
                            <Icon use="play_arrow" />
                          </div>
                          <div className={styles.listText}>
                            <span className={styles.listTextTitle}>
                              {script}
                            </span>
                            <span className={styles.listTextDetail}>
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
        <div className="grid-item">
          <Panel fullHeight>
            <div className={styles.listContainer}>
              <div className={styles.listItem}>
                <Typography use="title" className="grid-item--title">
                  Terminal
                </Typography>
                <Button
                  raised
                  className="restart-button"
                  onClick={this.props.restartShell}
                >
                  RESTART
                </Button>
              </div>
            </div>
            <Panel fullHeight>
              <Card>
                <ScrollingContent
                  className={styles.shellOutput}
                  ref={div => {
                    this.scrollingShellOutput = div;
                  }}
                >
                  <pre
                    ref={pre => {
                      this.shellOutput = pre;
                    }}
                  >
                    {this.props.shellOutput.map((shellOutputLine, index) => {
                      return (
                        <div key={index}>
                          <span
                            dangerouslySetInnerHTML={this.createMarkup(
                              shellOutputLine
                            )}
                          />
                          <br />
                        </div>
                      );
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
    shellOutput: state.scripts.shellOutput
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
    }
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(ScriptsView);

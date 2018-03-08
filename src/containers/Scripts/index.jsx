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
import {
  Card,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardActions,
  CardAction
} from "rmwc/Card";
import { Typography } from "rmwc/Typography";
import { TextField } from "rmwc/TextField";

import Panel from "../../components/common/Panel";
import ScrollingContent from "../../components/common/ScrollingContent";
import IconButton from "../../components/common/icon-button/icon-button";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemTitle,
  ListItemSubtitle,
  ListItemEndDetail
} from "../../components/common/List/List";

import ProcessSelect from "../../components/ProcessSelect";

import ScriptsList from "./ScriptsList";
import ProcessPanel from './ProcessPanel'

import styles from "./styles.scss";
import { ListItemText } from "rmwc/List";

export class ScriptsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scripts: {},
    };

    this.scrollingShellOutput = null;
    this.setScrollingShellOutput = this.setScrollingShellOutput.bind(this);
    this.execCommand = this.execCommand.bind(this)

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

  setScrollingShellOutput(div) {
    this.scrollingShellOutput = div;
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
    currentProcess: state.scripts.currentProcess
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
    changeProcess: index => {
      dispatch(changeProcess(index));
    }
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(ScriptsView);

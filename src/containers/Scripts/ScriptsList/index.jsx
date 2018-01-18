import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Icon } from "rmwc/Icon";
import {
  Card,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardActions,
  CardAction
} from "rmwc/Card";
import { TextField } from "rmwc/TextField";

import Panel from "../../../components/common/Panel";
import ScrollingContent from "../../../components/common/ScrollingContent";
import IconButton from "../../../components/common/icon-button/icon-button";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemTitle,
  ListItemSubtitle,
  ListItemEndDetail
} from "../../../components/common/List/List";

import styles from "../styles.scss";

const renderScriptsListItem = (scripts, execCommand) => (script, index) => (
  <ListItem
    key={index}
    onClick={e => {
      execCommand(script);
    }}
  >
    <ListItemIcon>
      <Icon use="play_arrow" />
    </ListItemIcon>
    <ListItemTitle>{script}</ListItemTitle>
    <ListItemSubtitle>{scripts[script]}</ListItemSubtitle>
    <ListItemEndDetail>
      <IconButton raised>
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </IconButton>
    </ListItemEndDetail>
  </ListItem>
);

const renderScriptsList = (scripts, execCommand) => {
  const scriptsKeys = Object.keys(scripts);

  if (!scriptsKeys.length) {
    return "";
  }

  return scriptsKeys.map(renderScriptsListItem(scripts, execCommand));
};

const ScriptsList = ({ scripts, execCommand }) => (
  <Panel>
    <Card className={styles["newScript-card"]}>
      <ScrollingContent>
        <CardPrimary>
          <CardTitle>New Script</CardTitle>
          <div className={styles["newScript-wrapper"]}>
            <div className={styles["newScript-inputContainer"]}>
              <TextField label="Name" className={styles["newScript-name"]} />
              <TextField
                label="Action"
                className={styles["newScript-detail"]}
              />
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
        <List>{renderScriptsList(scripts, execCommand)}</List>
      </ScrollingContent>
    </Card>
  </Panel>
);

ScriptsList.propTypes = {
  scripts: PropTypes.object,
  execCommand: PropTypes.func
};

export default ScriptsList;

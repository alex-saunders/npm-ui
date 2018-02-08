import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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

import ProcessSelect from "../../../components/ProcessSelect";

import styles from "../styles.scss";
import { ListItemText } from "rmwc/List";

const ProcessPanel = ({
  processes,
  currentProcess,
  changeProcess,
  addProcess,
  restartShell,
  scrollingShellOutput,
  shellOutput,
  createMarkup,
  setScrollingShellOutput,
}) => (
  <Panel fullHeight>
    <Card>
      <List>
        <ListItem>
          <ListItemTitle>
            <ProcessSelect
              processes={processes}
              currentProcess={currentProcess}
              changeProcess={changeProcess}
            />
          </ListItemTitle>
          <ListItemEndDetail>
            <IconButton
              raised
              className={styles["process-option"]}
              onClick={addProcess}
            >
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </IconButton>
            <IconButton raised className={styles["process-option"]}>
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
            <IconButton
              raised
              className={styles["process-option"]}
              onClick={restartShell}
            >
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </IconButton>
          </ListItemEndDetail>
        </ListItem>
      </List>
      <Panel fullHeight>
        <Card>
          <ScrollingContent
            className={styles["shell-output"]}
            ref={setScrollingShellOutput}
          >
            <pre
              ref={pre => {
                shellOutput = pre;
              }}
            >
              {processes[
                currentProcess
              ].output.map((shellOutputLine, index) => {
                return (
                  <div key={index}>
                    <span
                      dangerouslySetInnerHTML={createMarkup(shellOutputLine)}
                    />
                    <br />
                  </div>
                );
              })}
            </pre>
          </ScrollingContent>
        </Card>
      </Panel>
    </Card>
  </Panel>
);

ProcessPanel.propTypes = {
  processes: PropTypes.array,
  currentProcess: PropTypes.number,
  changeProcess: PropTypes.func,
  addProcess: PropTypes.func,
  restartShell: PropTypes.func,
  scrollingShellOutput: PropTypes.object,
  shellOutput: PropTypes.func,
  createMarkup: PropTypes.func,
  setScrollingShellOutput: PropTypes.func,
};

export default ProcessPanel;

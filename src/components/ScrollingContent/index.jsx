import React from "react";
import styles from "./styles.scss";

export default class ScrollingContent extends React.Component {
  render() {
    return (
      <div className={`${this.props.className} ${styles.panelSrollingContent}`}>
        {this.props.children}
      </div>
    );
  }
}

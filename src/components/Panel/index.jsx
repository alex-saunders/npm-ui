import React from "react";

import styles from "./styles.scss";

export default class Panel extends React.Component {
  render() {
    return (
      <div
        className={`${this.props.className} ${styles.panelBody} ${this.props.fullHeight ? styles.panelFullHeight : styles.growingHeight}`}
      >
        {this.props.children}
      </div>
    );
  }
}

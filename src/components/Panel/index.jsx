import React from "react";

import "./styles.scss";

export default class Panel extends React.Component {
  render() {
    return (
      <div
        className={`${this.props.className} panel-body ${this.props.fullHeight ? "panel--fullHeight" : "panel--growingHeight"}`}
      >
        {this.props.children}
      </div>
    );
  }
}

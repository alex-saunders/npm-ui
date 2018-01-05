import React from "react";

export default class ScrollingContent extends React.Component {
  render() {
    return (
      <div className={`${this.props.className} panel--scrollingContent`}>
        {this.props.children}
      </div>
    );
  }
}

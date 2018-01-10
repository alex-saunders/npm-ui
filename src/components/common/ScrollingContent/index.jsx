import React from "react";
import styles from "./styles.scss";

export default class ScrollingContent extends React.Component {
  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }
  
  render() {
    return (
      <div
        className={`${this.props.className} ${styles.panelSrollingContent}`}
        ref={(div) => { this.container = div; }}
      >
        {this.props.children}
      </div>
    );
  }
}

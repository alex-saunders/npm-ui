import React from 'react';

import { Button } from "rmwc/Button";

import styles from './styles.scss';

class ListItem extends React.Component {

  constructor(props) {
    super(props);

    let defaultState = {
      icon: null,
      title: null,
      subtitle: null,
      endDetail: null
    }

    // console.log(props.children)
    props.children.forEach((child) => {
      switch (child.type) {
        case ListItemIcon:
          defaultState.icon = child;
          break;
        case ListItemTitle:
          defaultState.title = child;
          break;
        case ListItemSubtitle:
          defaultState.subtitle = child;
          break;
        case ListItemEndDetail:
          defaultState.endDetail = child;
          break;
        default:
      }
    });
    
    this.state = defaultState;
  }

  render() {
    const primaryActionContent = (
      <div className={styles["primaryAction-container"]}>
        {
          this.state.icon ?
          <div className={styles["icon-container"]}>
            { this.state.icon }
          </div>
          :
          ""
        }
        {
          this.state.title || this.state.subtitle ?
          <div className={styles["text-container"]}>
            { this.state.title ? 
              <div className={styles["text-title"]}>
                {this.state.title} 
              </div>
              : "" }
            { this.state.subtitle ? 
              <div className={styles["text-subtitle"]}>
                {this.state.subtitle} 
              </div>
              : "" }
            </div>
          :
          ""
        }
      </div>
    )

    return (
      <div className={styles["listItem"]}>
        { 
          this.props.onClick ?
            <Button
              onClick={this.props.onClick}
              className={styles["primaryAction-container"]}>
            { primaryActionContent }
            </Button>
          :
          <div className={styles["primaryAction-container"]}>
            { primaryActionContent }
          </div>
        }
        {
          this.state.endDetail ?
          <div className={styles["endDetail-container"]}>
            {this.state.endDetail}
          </div>
          :
          ""
        }
      </div>
    );
  }
}

class ListItemTitle extends React.Component {
  render() {
    return (
      this.props.children
    );
  }
}

class ListItemSubtitle extends React.Component {
  render() {
    return (
      this.props.children
    );
  }
}

class ListItemIcon extends React.Component {
  render() {
    return (
      this.props.children
    );
  }
}

class ListItemEndDetail extends React.Component {
  render() {
    return (
      this.props.children
    );
  }
}

module.exports = { 
  ListItem: ListItem, 
  ListItemTitle: ListItemTitle,
  ListItemSubtitle: ListItemSubtitle,
  ListItemIcon: ListItemIcon,
  ListItemEndDetail: ListItemEndDetail
}
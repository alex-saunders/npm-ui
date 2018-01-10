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
    
    
    this.state = this._getChildren(props);
  }

  _getChildren(props) {
    let defaultChildrenState = {
      icon: null,
      title: null,
      subtitle: null,
      endDetail: null
    }

    props.children.forEach((child) => {
      switch (child.type) {
        case ListItemIcon:
          defaultChildrenState.icon = child;
          break;
        case ListItemTitle:
          defaultChildrenState.title = child;
          break;
        case ListItemSubtitle:
          defaultChildrenState.subtitle = child;
          break;
        case ListItemEndDetail:
          defaultChildrenState.endDetail = child;
          break;
        default:
      }
    });

    return defaultChildrenState;
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState(this._getChildren(nextProps));
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
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.children
    );
  }
}

class ListItemSubtitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.children
    );
  }
}

class ListItemIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.children
    );
  }
}

class ListItemEndDetail extends React.Component {
  constructor(props) {
    super(props);
  }

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
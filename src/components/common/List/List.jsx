import React from 'react';

import styles from './styles.scss';

import { 
  ListItem, 
  ListItemTitle, 
  ListItemSubtitle, 
  ListItemIcon, 
  ListItemEndDetail } from './ListItem/ListItem';

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div
        className={`${this.props.className ? 
          `${this.props.className} ${styles["list"]}` 
          : styles["list"]}`}
      >
        {
          this.props.children && this.props.children.length > 0 ? 
            this.props.children.filter((child) => child.type == ListItem) 
          : this.props.children && this.props.children.type == ListItem ?
            this.props.children
          : ""}

      </div>
    );
  }
}

module.exports = {
  List: List,
  ListItem: ListItem, 
  ListItemTitle: ListItemTitle,
  ListItemSubtitle: ListItemSubtitle,
  ListItemIcon: ListItemIcon,
  ListItemEndDetail: ListItemEndDetail
}
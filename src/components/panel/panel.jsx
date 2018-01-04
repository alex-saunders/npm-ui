import React from 'react';

import './panel.scss';

export class Panel extends React.Component {
  render() {
    return (
      <div 
        className={`${this.props.className} panel-body ${this.props.fullHeight ? 'panel--fullHeight' : 'panel--growingHeight'}`}
      >
        {this.props.children}
      </div>
    );
  }
}

export class ScrollingContent extends React.Component {
  render() {
    return (
      <div className={`${this.props.className} panel--scrollingContent`}>
        {this.props.children}
      </div>
    );
  }
}
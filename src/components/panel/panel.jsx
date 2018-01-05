import React from 'react';
import PropTypes from 'prop-types';

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

Panel.propTypes = {
  className: PropTypes.string,
};
Panel.defaultProps = {
  className: '',
};

export class ScrollingContent extends React.Component {

  scrollToBottom() {
    this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
  }

  render() {
    return (
      <div
        className={`${this.props.className} panel--scrollingContent`}
        ref={(div) => this.scrollContainer = div}
      >
        {this.props.children}
      </div>
    );
  }
}

ScrollingContent.propTypes = {
  className: PropTypes.string,
};
ScrollingContent.defaultProps = {
  className: '',
};
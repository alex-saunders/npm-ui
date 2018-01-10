import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'rmwc/Button';

import styles from './icon-button.scss';

class IconButton extends React.Component {
  render() {
    return (
      <Button
        raised={this.props.raised}
        className={`${styles["icon-button"]} ${this.props.className ? this.props.className : ""}`}
        onClick={this.props.onClick}>
        {this.props.children}
      </Button>
    )
  }
}

IconButton.propTypes = {
  raised: PropTypes.bool,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  raised: false,
  onClick: () => {}
};

export default IconButton;
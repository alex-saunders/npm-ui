import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'rmwc/Button';

import './icon-button.scss';

class IconButton extends React.Component {
  render() {
    return (
      <Button raised={this.props.raised} className="icon-button" onClick={this.props.onClick}>
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
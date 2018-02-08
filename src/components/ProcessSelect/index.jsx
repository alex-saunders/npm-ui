import React from 'react';

import { Select } from 'rmwc/Select';

import styles from './styles.scss';

class ProcessSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectOptions: this._generateSelectOptions(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectOptions: this._generateSelectOptions(nextProps),
    });
  }

  _generateSelectOptions(props) {
    return props.processes.map((process, index) => {
      return { label: process.label, value: index };
    });
  }

  _changeProcess = (e) => {
    this.props.changeProcess(e.target.value);
  };

  render() {
    console.log(process);

    return (
      <Select
        label="Process"
        options={this.state.selectOptions}
        value={`${this.props.currentProcess}`}
        onChange={this._changeProcess}
        className={styles['process-select']}
      />
    );
  }
}

export default ProcessSelect;

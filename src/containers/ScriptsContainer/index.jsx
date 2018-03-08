import React from 'react';
import { Container } from 'unstated';

import readPkg from "read-pkg-up";
import AnsiHTML from "ansi-html";

class ScriptsContainer extends Container {
  state = {
    scripts: {}
  }

  shellOutput() {
    let currOutput = [...state.processes[action.payload.process].output, ...action.payload.output]
    let currOutputString = currOutput.join('\n').trim();

    let updatedProcesses = [...state.processes];
    updatedProcesses[action.payload.process].output = currOutputString.split('\n');

    this.setState(
      {
        processes: updatedProcesses
      }
    );
  }
  
  clearShellOutput() {
    let updatedProcesses = [...state.processes];
    updatedProcesses[state.currentProcess].output = [];
    
    this.setState(
      {
        processes: updatedProcesses,
      }
    );
  }
  
  addProcess() {
    const newProcess = {
      label: `${state.processes.length + 1}: ${process.cwd()}`,
      output: []
    }
    this.setState(
      {
        processes: [...state.processes, newProcess],
        currentProcess: state.processes.length
      }
    );
  }
  
  changeProcess() {
    this.setState(
      {
        currentProcess: parseInt(action.payload)
      }
    );
  }
  
  processIdentifier() {
    const newProcesses = [...state.processes];
    newProcesses[state.currentProcess].label = `${state.currentProcess + 1}: ${action.payload}`;
    this.setState(
      {
        processes: newProcesses
      }
    );
  }
  
  async fetchScripts() {
    const { pkg } = await readPkg();

    const keys = ["scripts"];
    const scripts = keys.reduce((prev, p) => {
      if (Array.isArray(p)) {
        prev[p[0]] = extract(pkg[p[0]], p[1]);
      } else if (
        pkg !== undefined &&
        pkg !== null &&
        Object.prototype.hasOwnProperty.call(pkg, p)
      ) {
        prev[p] = pkg[p];
      }
      return prev;
    }, {});
    console.log(scripts);
  }
}

export default ScriptsContainer;
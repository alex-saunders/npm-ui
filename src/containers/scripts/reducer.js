import initialStates from '../../store/initial-state';
import initialState from '../../store/initial-state';

export default function (state = initialStates.scriptsInitialState, action) {
  switch(action.type) {
    case 'SHELL_OUTPUT': {
      let currOutput = [...state.processes[action.payload.process].output, ...action.payload.output]
      let currOutputString = currOutput.join('\n').trim();

      let updatedProcesses = [...state.processes];
      updatedProcesses[action.payload.process].output = currOutputString.split('\n');

      return Object.assign({}, state,
        {
          processes: updatedProcesses
        }
      );
    }
    case 'CLEAR_SHELL_OUTPUT': {
      let updatedProcesses = [...state.processes];
      updatedProcesses[state.currentProcess].output = [];
      
      return Object.assign({}, state,
        {
          processes: updatedProcesses,
        }
      );
    }
    case 'ADD_PROCESS': {
      const newProcess = {
        label: `${state.processes.length + 1}: ${process.cwd()}`,
        output: []
      }
      return Object.assign({}, state,
        {
          processes: [...state.processes, newProcess],
          currentProcess: state.processes.length
        }
      );
    }
    case 'CHANGE_PROCESS': {
      return Object.assign({}, state,
        {
          currentProcess: parseInt(action.payload)
        }
      );
    }
    case 'PROCESS_IDENTIFIER': {
      const newProcesses = [...state.processes];
      newProcesses[state.currentProcess].label = `${state.currentProcess + 1}: ${action.payload}`;
      return Object.assign({}, state,
        {
          processes: newProcesses
        }
      );
    }
    default : {
      return state
    }
  }
}
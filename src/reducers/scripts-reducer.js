import initialStates from '../store/initial-state';

export default function (state = initialStates.scriptsInitialState, action) {
  switch(action.type) {
    case 'SHELL_OUTPUT': {
      let currOutput = [...state.shellOutput, ...action.payload]
      let currOutputString = currOutput.join('\n').trim();

      return Object.assign({}, state,
        {
          shellOutput: currOutputString.split('\n')
        }
      );
    }
    case 'CLEAR_SHELL_OUTPUT': {
      return Object.assign({}, state,
        {
          shellOutput: initialStates.scriptsInitialState.shellOutput
        }
      );
    }
    case 'SHELL_SCRIPT': {
      return Object.assign({}, state,
        {
          currentScript: action.payload
        }
      );
    }
    default: {
      return state
    }
  }
}
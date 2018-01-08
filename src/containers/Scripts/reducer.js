const initialState = {
  currentScript: null,
  shellOutput: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SHELL_OUTPUT": {
      let currOutput = [...state.shellOutput, ...action.payload];
      let currOutputString = currOutput.join("\n").trim();

      return Object.assign({}, state, {
        shellOutput: currOutputString.split("\n")
      });
    }
    case "CLEAR_SHELL_OUTPUT": {
      return Object.assign({}, state, {
        shellOutput: initialState.shellOutput
      });
    }
    case "SHELL_SCRIPT": {
      return Object.assign({}, state, {
        currentScript: action.payload
      });
    }
    default: {
      return state;
    }
  }
}

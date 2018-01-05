import ScriptsExecutor from '../utils/scripts';

let currExecutor = null;

export const updateShellOutput = (output) => {
  return {
    type: 'SHELL_OUTPUT',
    payload: {
      output: output.output,
      process: output.process
    }
  }
}

export const clearShellOutput = () => {
  return {
    type: 'CLEAR_SHELL_OUTPUT',
  }
}

export const restartShell = () => {
  return (dispatch) => {
    if (currExecutor && currExecutor.process) {
      dispatch(clearShellOutput());
      currExecutor.closeProcess();
    }
  }
}

export const addProcess = () => {
  return {
    type: 'ADD_PROCESS',
  }
}

export const changeCurrentProcessIdentifier = (identifier) => {
  return {
    type: 'PROCESS_IDENTIFIER',
    payload: identifier
  }
}

export const changeProcess = (index) => {
  return {
    type: 'CHANGE_PROCESS',
    payload: index
  }
}

export const updateCurrentScript = (script) => {
  return (dispatch) => {
    dispatch(changeCurrentProcessIdentifier(script.script));

    if (currExecutor && currExecutor.process) {
      dispatch(clearShellOutput());
      currExecutor.closeProcess();
    }

    currExecutor = new ScriptsExecutor(script.script);

    currExecutor.process.stdout.on('data', (data) => {
      const lines = data.split('\n');
      dispatch(updateShellOutput({
        output: lines,
        process: script.process
      }));
    });
    
    currExecutor.process.stderr.on('data', (data) => {
      dispatch(updateShellOutput({
        output: [data],
        process: script.process
      }));
    });
    
    currExecutor.process.on('close', (code) => {
      dispatch(updateShellOutput({
        output: [`child process exited with code ${code}`],
        process: script.process
      }));
    });
  }
}
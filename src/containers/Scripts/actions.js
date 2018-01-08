import ScriptsExecutor from "../../utils/scripts";

let currExecutor = null;

export const updateShellOutput = output => {
  return {
    type: "SHELL_OUTPUT",
    payload: output
  };
};

export const clearShellOutput = () => {
  return {
    type: "CLEAR_SHELL_OUTPUT"
  };
};

export const currentScript = script => {
  return {
    type: "SHELL_SCRIPT",
    payload: script
  };
};

export const restartShell = () => {
  return dispatch => {
    if (currExecutor && currExecutor.process) {
      dispatch(clearShellOutput());
      currExecutor.closeProcess();
    }
  };
};

export const updateCurrentScript = script => {
  return dispatch => {
    dispatch(currentScript(script));

    if (currExecutor && currExecutor.process) {
      dispatch(clearShellOutput());
      currExecutor.closeProcess();
    }

    currExecutor = new ScriptsExecutor(script);

    currExecutor.process.stdout.on("data", data => {
      const lines = data.split("\n");
      dispatch(updateShellOutput(lines));
    });

    currExecutor.process.stderr.on("data", data => {
      dispatch(updateShellOutput([data]));
    });

    currExecutor.process.on("close", code => {
      dispatch(updateShellOutput([`child process exited with code ${code}`]));
    });
  };
};

import React from "react";
import { shallow } from "enzyme";

import { ScriptsView } from "../scripts";

test("ScriptsView should render", () => {
  const wrapper = shallow(
    <ScriptsView shellOutput={[]} restartShell={() => {}} />
  );
});

test("ScriptsView should restart the shell", () => {
  const restartShell = jest.fn();
  const wrapper = shallow(
    <ScriptsView shellOutput={[]} restartShell={restartShell} />
  );

  // should not have been called automatically
  expect(restartShell.mock.calls.length).toBe(0);

  // should invoke the restart callback
  wrapper.find(".restart-button").simulate("click");
  expect(restartShell.mock.calls.length).toBe(1);
});

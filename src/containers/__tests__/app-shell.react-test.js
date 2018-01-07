import React from "react";
import { shallow } from "enzyme";

import { TabBar } from "rmwc/Tabs";
import { AppShell } from "../app-shell/app-shell";

test("AppShell should render", () => {
  const customClassName = "some-class-name";
  const wrapper = shallow(<AppShell />);
});

test("AppShell should change the tab", () => {
  const wrapper = shallow(<AppShell />);

  // initial tab
  expect(wrapper.state("activeTabIndex")).toBe(0);

  // change tab
  const event = { target: { value: 1 } };
  wrapper.find(TabBar).simulate("change", event);
  expect(wrapper.state("activeTabIndex")).toBe(1);
});

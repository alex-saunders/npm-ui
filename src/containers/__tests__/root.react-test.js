import React from "react";
import { shallow } from "enzyme";

import { TabBar } from "rmwc/Tabs";
import { Root } from "../root";

test("Root should render", () => {
  const customClassName = "some-class-name";
  const wrapper = shallow(<Root />);
});

test("Root should change the tab", () => {
  const wrapper = shallow(<Root />);

  // initial tab
  expect(wrapper.state("activeTabIndex")).toBe(0);

  // change tab
  const event = { target: { value: 1 } };
  wrapper.find(TabBar).simulate("change", event);
  expect(wrapper.state("activeTabIndex")).toBe(1);
});

import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Panel from "../panel";

test("Panel should render", () => {
  const component = renderer.create(
    <Panel className="some-class-name" fullHeight={true}>
      Content
    </Panel>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Panel should contain the custom className", () => {
  const customClassName = "some-class-name";
  const wrapper = shallow(<Panel className={customClassName}>Content</Panel>);
  expect(wrapper.find("div").hasClass(customClassName)).toBe(true);
});

test("Panel should render in full height", () => {
  const wrapper = shallow(<Panel fullHeight={true}>Content</Panel>);
  expect(wrapper.find("div").hasClass("panel--fullHeight")).toBe(true);
});

test("Panel should render in growing height", () => {
  const wrapper = shallow(<Panel fullHeight={false}>Content</Panel>);
  expect(wrapper.find("div").hasClass("panel--growingHeight")).toBe(true);
});

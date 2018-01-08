import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import ScrollingContent from "../ScrollingContent";

test("ScrollingContent should render", () => {
  const component = renderer.create(
    <ScrollingContent className="some-class-name">Content</ScrollingContent>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("ScrollingContent should contain the custom className", () => {
  const customClassName = "some-class-name";
  const wrapper = shallow(
    <ScrollingContent className={customClassName}>Content</ScrollingContent>
  );
  expect(wrapper.find("div").hasClass(customClassName)).toBe(true);
});

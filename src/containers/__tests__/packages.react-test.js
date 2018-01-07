import React from "react";
import { shallow } from "enzyme";

import { PackagesView } from "../packages/packages";

test("PackagesView should render", () => {
  const wrapper = shallow(<PackagesView />);
});

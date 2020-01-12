import React from "react";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";

import { Providers } from "../../setupTests";

import App from "./App";

it(`renders without crashing`, () => {
  act(() => {
    render(<App />, { wrapper: Providers });
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";

import HeaderText from "./";

describe("<HeaderText />", () => {
  it("renders HeaderText component", async () => {
    const text = "Hello";
    render(<HeaderText text={text} />);
    expect(screen.getByText(text).textContent).toEqual(text);
  });
});

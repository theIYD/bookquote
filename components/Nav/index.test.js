import React from "react";
import cookies from "nookies";

import { render, screen } from "@testing-library/react";

import Nav from "./";

describe("<Nav />", () => {
  beforeEach(() => {
    cookies.parseCookies = jest.fn().mockImplementation(() => {
      return {
        user: {
          name: "ABCD",
          profileUrl: "",
          id: "",
          isSignedIn: false,
        },
      };
    });
  });

  it("renders the nav (not signed in)", async () => {
    const brandLogoTestId = "brand-logo";
    render(<Nav />);
    expect(screen.getByTestId(brandLogoTestId));
  });
});

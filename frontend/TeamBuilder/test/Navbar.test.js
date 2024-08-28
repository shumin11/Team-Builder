import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import '@testing-library/jest-dom';

describe("Navbar Component", () => {
  test("renders Home and About links", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Check if the Home link is rendered
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();

    // Check if the About link is rendered
    const aboutLink = screen.getByText(/about/i);
    expect(aboutLink).toBeInTheDocument();
  });
});

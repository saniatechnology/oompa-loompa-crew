import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import oompaLoompaReducer from "../slices/oompaLoompaSlice";
import Homepage from "../pages/Homepage";

interface PreloadedState {
  oompaLoompa: ReturnType<typeof oompaLoompaReducer>;
}

function renderWithStore(ui: React.ReactElement, { preloadedState }: { preloadedState: PreloadedState }) {
  const store = configureStore({
    reducer: { oompaLoompa: oompaLoompaReducer },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}

const initialState: PreloadedState = {
  oompaLoompa: {
    pages: {
      1: {
        workers: [
          {
            id: 1,
            firstName: "Willy",
            lastName: "Wonka",
            age: 50,
            image: "wonka.jpg",
            gender: "M",
            profession: "Candy Maker",
          },
          {
            id: 2,
            firstName: "Charlie",
            lastName: "Bucket",
            age: 12,
            image: "charlie.jpg",
            gender: "M",
            profession: "Chocolate Taster",
          },
        ],
        lastFetched: Date.now(),
      },
    },
    details: {},
  },
};

describe("Homepage", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders and displays workers", () => {
    renderWithStore(<Homepage />, { preloadedState: initialState });
    expect(screen.getByText(/Find your Oompa Loompa/i)).toBeInTheDocument();
    expect(screen.getByText(/Willy Wonka/)).toBeInTheDocument();
    expect(screen.getByText(/Charlie Bucket/)).toBeInTheDocument();
  });

  it("filters workers by search", () => {
    renderWithStore(<Homepage />, { preloadedState: initialState });
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "Charlie" } });
    expect(screen.queryByText(/Willy Wonka/)).not.toBeInTheDocument();
    expect(screen.getByText(/Charlie Bucket/)).toBeInTheDocument();
  });

  it("renders the search bar", () => {
    renderWithStore(<Homepage />, { preloadedState: initialState });
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });
});

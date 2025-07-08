import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import oompaLoompaReducer from "../slices/oompaLoompaSlice";
import DetailView from "../pages/DetailView";
import * as api from "../api/oompaLoompaApi";

const mockWorker = {
  id: 1,
  first_name: "Willy",
  last_name: "Wonka",
  age: 50,
  image: "wonka.jpg",
  gender: "M",
  profession: "Candy Maker",
  email: "wonka@factory.com",
  country: "Loompaland",
  height: 150,
  favorite: {
    color: "purple",
    food: "chocolate",
    random_string: "Oompa Loompa",
    song: "Oompa Loompa doompadee doo",
  },
};

function renderWithStoreAndRouter(ui: React.ReactElement, { route = "/detail/1", preloadedState = { oompaLoompa: { pages: {}, details: {} } } } = {}) {
  const store = configureStore({
    reducer: { oompaLoompa: oompaLoompaReducer },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/detail/:id" element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe("DetailView", () => {
  beforeEach(() => {
    vi.spyOn(api, "fetchOompaLoompaById").mockImplementation(async () => mockWorker);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    vi.spyOn(api, "fetchOompaLoompaById").mockImplementation(() => new Promise(() => {}));
    renderWithStoreAndRouter(<DetailView />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders worker details after fetch", async () => {
    renderWithStoreAndRouter(<DetailView />);
    await waitFor(() => expect(screen.getByText(/Willy Wonka/)).toBeInTheDocument());
    expect(screen.getByText(/Candy Maker/)).toBeInTheDocument();
    expect(screen.getByText(/wonka@factory.com/)).toBeInTheDocument();
    expect(screen.getByText(/Loompaland/)).toBeInTheDocument();
    expect(screen.getByText(/Oompa Loompa doompadee doo/)).toBeInTheDocument();
  });

  it("renders error state if fetch fails", async () => {
    vi.spyOn(api, "fetchOompaLoompaById").mockImplementation(async () => {
      throw new Error("Network error");
    });
    renderWithStoreAndRouter(<DetailView />);
    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
  });
});

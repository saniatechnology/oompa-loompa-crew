import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Favorite {
  color: string;
  food: string;
  random_string: string;
  song: string;
}

interface OompaLoompa {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  image: string;
  gender: string;
  profession: string;
  email?: string;
  country?: string;
  height?: number;
  favorite?: Favorite;
}

interface PageData {
  workers: OompaLoompa[];
  lastFetched: number | null;
}

interface WorkerDetailData {
  worker: OompaLoompa;
  lastFetched: number;
}

interface OompaLoompaState {
  pages: Record<number, PageData>;
  details: Record<number, WorkerDetailData>;
}

const initialState: OompaLoompaState = {
  pages: {},
  details: {},
};

const oompaLoompaSlice = createSlice({
  name: "oompaLoompa",
  initialState,
  reducers: {
    setPageData(state, action: PayloadAction<{ page: number; workers: OompaLoompa[]; lastFetched: number }>) {
      const { page, workers, lastFetched } = action.payload;
      state.pages[page] = { workers, lastFetched };
    },
    setWorkerDetail(state, action: PayloadAction<{ id: number; worker: OompaLoompa; lastFetched: number }>) {
      const { id, worker, lastFetched } = action.payload;
      state.details[id] = { worker, lastFetched };
    },
    clearAllPages(state) {
      state.pages = {};
    },
    clearAllDetails(state) {
      state.details = {};
    },
  },
});

export const selectAllWorkers = createSelector(
  (state: RootState) => state.oompaLoompa.pages,
  (pages) => Object.values(pages).flatMap((page) => page.workers)
);

export const { setPageData, setWorkerDetail, clearAllPages, clearAllDetails } = oompaLoompaSlice.actions;
export default oompaLoompaSlice.reducer;

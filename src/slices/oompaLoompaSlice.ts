import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Worker } from "../types/Worker";

interface PageData {
  workers: Worker[];
  lastFetched: number | null;
}

interface WorkerDetailData {
  worker: Worker;
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
    setPageData(state, action: PayloadAction<{ page: number; workers: Worker[]; lastFetched: number }>) {
      const { page, workers, lastFetched } = action.payload;
      state.pages[page] = { workers, lastFetched };
    },
    setWorkerDetail(state, action: PayloadAction<{ id: number; worker: Worker; lastFetched: number }>) {
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

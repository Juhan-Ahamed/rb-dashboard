import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { MemberState } from "../../types";
import { transactionData } from "../../data/dummyData.ts";

const initialState: MemberState = {
  points: 1250,
  transactions: [],
  isLoading: false,
};

// Mock async function to fetch member points
export const fetchPoints = createAsyncThunk(
  "member/fetchPoints",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return 1250; // Mock points value
    } catch (error) {
      return rejectWithValue("Failed to fetch points");
    }
  },
);

// Mock async function to fetch transactions
export const fetchTransactions = createAsyncThunk(
  "member/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return transactionData;
    } catch (error) {
      return rejectWithValue("Failed to fetch transactions");
    }
  },
);

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    addPoints: (state, action: PayloadAction<number>) => {
      state.points += action.payload;
    },
    spendPoints: (state, action: PayloadAction<number>) => {
      state.points -= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Points
      .addCase(fetchPoints.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPoints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.points = action.payload;
      })
      .addCase(fetchPoints.rejected, (state) => {
        state.isLoading = false;
      })
      // Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { addPoints, spendPoints } = memberSlice.actions;
export default memberSlice.reducer;

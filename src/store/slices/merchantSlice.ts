import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { MerchantState, Notification } from "../../types";
import { notificationsData, purchaseData } from "../../data/dummyData.ts";

const initialState: MerchantState = {
  purchases: [],
  customers: [],
  contributionRate: 5,
  notifications: [],
  isLoading: false,
};

// Mock async function to fetch purchases
export const fetchPurchases = createAsyncThunk(
  "merchant/fetchPurchases",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return purchaseData;
    } catch (error) {
      return rejectWithValue("Failed to fetch purchases");
    }
  },
);

// Mock async function to fetch notifications
export const fetchNotifications = createAsyncThunk(
  "merchant/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return notificationsData;
    } catch (error) {
      return rejectWithValue("Failed to fetch notifications");
    }
  },
);

const merchantSlice = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    approvePurchase: (state, action: PayloadAction<number>) => {
      const purchase = state.purchases.find((p) => p.id === action.payload);
      if (purchase) {
        purchase.status = "approved";
      }
    },
    rejectPurchase: (state, action: PayloadAction<number>) => {
      const purchase = state.purchases.find((p) => p.id === action.payload);
      if (purchase) {
        purchase.status = "rejected";
      }
    },
    updateContributionRate: (state, action: PayloadAction<number>) => {
      state.contributionRate = action.payload;
    },
    markNotificationAsRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload,
      );
      if (notification) {
        notification.read = true;
      }
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Purchases
      .addCase(fetchPurchases.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.isLoading = false;
        state.purchases = action.payload;
      })
      .addCase(fetchPurchases.rejected, (state) => {
        state.isLoading = false;
      })
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  approvePurchase,
  rejectPurchase,
  updateContributionRate,
  markNotificationAsRead,
  addNotification,
} = merchantSlice.actions;
export default merchantSlice.reducer;

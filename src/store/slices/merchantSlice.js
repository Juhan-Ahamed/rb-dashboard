import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notificationsData, purchaseData } from "../../data/dummyData.js";

const initialState = {
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
    approvePurchase: (state, action) => {
      const purchase = state.purchases.find((p) => p.id === action.payload);
      if (purchase) {
        purchase.status = "approved";
      }
    },
    rejectPurchase: (state, action) => {
      const purchase = state.purchases.find((p) => p.id === action.payload);
      if (purchase) {
        purchase.status = "rejected";
      }
    },
    updateContributionRate: (state, action) => {
      state.contributionRate = action.payload;
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload,
      );
      if (notification) {
        notification.read = true;
      }
    },
    addNotification: (state, action) => {
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

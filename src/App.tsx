import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "./components/core/theme-provider/theme-provider";

// Auth Components
import AdminLogin from "./components/Auth/AdminLogin";
import MerchantLogin from "./components/Auth/MerchantLogin";
import MemberLogin from "./components/Auth/MemberLogin";
import AdminRegister from "./components/Auth/AdminRegister";
import MerchantRegister from "./components/Auth/MerchantRegister";
import MemberRegister from "./components/Auth/MemberRegister";

// Dashboard Components
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import MerchantDashboard from "./components/Dashboard/MerchantDashboard";
import MemberDashboard from "./components/Dashboard/MemberDashboard";

// Common Components
import ProtectedRoute from "./components/Common/ProtectedRoute";
import AuthLayout from "./components/Auth/AuthLayout.tsx";
import DashboardLayout from "./components/Dashboard/DashboardLayout.tsx";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<AdminLogin />} />
              <Route path="/login/admin" element={<AdminLogin />} />
              <Route path="/register/admin" element={<AdminRegister />} />
              <Route path="/login/merchant" element={<MerchantLogin />} />
              <Route path="/register/merchant" element={<MerchantRegister />} />
              <Route path="/login/member" element={<MemberLogin />} />
              <Route path="/register/member" element={<MemberRegister />} />
            </Route>

            <Route element={<DashboardLayout />}>
              <Route
                path="/dashboard/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/merchant"
                element={
                  <ProtectedRoute requiredRole="merchant">
                    <MerchantDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/member"
                element={
                  <ProtectedRoute requiredRole="member">
                    <MemberDashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

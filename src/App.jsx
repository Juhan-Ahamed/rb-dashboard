import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { ThemeProvider } from "./components/core/theme-provider/theme-provider.jsx";

// Auth Pages
import AdminLoginPage from "./pages/login/AdminLoginPage.jsx";
import AdminRegisterPage from "./pages/register/AdminRegisterPage.jsx";
import MerchantLoginPage from "./pages/login/MerchantLoginPage.jsx";
import MerchantRegisterPage from "./pages/register/MerchantRegisterPage.jsx";
import MemberLoginPage from "./pages/login/MemberLoginPage.jsx";
import MemberRegisterPage from "./pages/register/MemberRegisterPage.jsx";

// Dashboard Pages
import AdminPage from "./pages/dashboard/AdminPage.jsx";
import MemberPage from "./pages/dashboard/MemberPage.jsx";
import PurchasesPage from "./pages/dashboard/merchant/PurchasesPage.jsx";
import CustomerLookupPage from "./pages/dashboard/merchant/CustomerLookupPage.jsx";
import ContributionRatePage from "./pages/dashboard/merchant/ContributionRatePage.jsx";
import NotificationsPage from "./pages/dashboard/merchant/NotificationsPage.jsx";

// Common Components
import ProtectedRoute from "./components/Common/ProtectedRoute.jsx";
import AuthLayout from "./components/Auth/AuthLayout.jsx";
import DashboardLayout from "./components/Dashboard/DashboardLayout.jsx";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<AdminLoginPage />} />
              <Route path="/login/admin" element={<AdminLoginPage />} />
              <Route path="/register/admin" element={<AdminRegisterPage />} />
              <Route path="/login/merchant" element={<MerchantLoginPage />} />
              <Route
                path="/register/merchant"
                element={<MerchantRegisterPage />}
              />
              <Route path="/login/member" element={<MemberLoginPage />} />
              <Route path="/register/member" element={<MemberRegisterPage />} />
            </Route>

            <Route element={<DashboardLayout />}>
              <Route
                path="/dashboard/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/merchant/*"
                element={
                  <ProtectedRoute requiredRole="merchant">
                    <Routes>
                      <Route
                        path="/"
                        element={<Navigate to="purchases" replace />}
                      />
                      <Route path="purchases" element={<PurchasesPage />} />
                      <Route
                        path="customer-lookup"
                        element={<CustomerLookupPage />}
                      />
                      <Route
                        path="contribution-rate"
                        element={<ContributionRatePage />}
                      />
                      <Route
                        path="notifications"
                        element={<NotificationsPage />}
                      />
                    </Routes>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/member"
                element={
                  <ProtectedRoute requiredRole="member">
                    <MemberPage />
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

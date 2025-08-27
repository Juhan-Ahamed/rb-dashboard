import { BrowserRouter as Router, Routes, Route } from "react-router";

import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { ThemeProvider } from "./components/core/theme-provider/theme-provider.jsx";

// Auth Components
import AdminLogin from "./components/Auth/AdminLogin.jsx";
import MerchantLogin from "./components/Auth/MerchantLogin.jsx";
import MemberLogin from "./components/Auth/MemberLogin.jsx";
import AdminRegister from "./components/Auth/AdminRegister.jsx";
import MerchantRegister from "./components/Auth/MerchantRegister.jsx";
import MemberRegister from "./components/Auth/MemberRegister.jsx";

// Dashboard Components
import AdminDashboard from "./components/Dashboard/AdminDashboard.jsx";
import MerchantDashboard from "./components/Dashboard/MerchantDashboard.jsx";
import MemberDashboard from "./components/Dashboard/MemberDashboard.jsx";

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

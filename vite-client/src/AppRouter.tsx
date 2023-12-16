import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { ToastProvider } from "@/components/ui/toast";
import { MainLayout } from "./layout/MainLayout";
import { Login } from "./pages/Login";
import { AppLayout } from "./layout/AppLayout";
import { SignUp } from "./pages/SignUp";
import { UserDashboard } from "./pages/UserDashboard";

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path=""
          element={
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <ToastProvider>
                <MainLayout />
              </ToastProvider>
            </ThemeProvider>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="app" element={<AppLayout />}>
            <Route path="" element={<div>App</div>} />
            <Route path="admin" element={<div>Admin</div>} />
            <Route path="user" element={<UserDashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
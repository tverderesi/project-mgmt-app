import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Login } from "./pages/Login";
import { AppLayout } from "./layout/AppLayout";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "@/pages/Dashboard";
import { NewProject } from "./pages/NewProject";
import { NewClient } from "./pages/NewClient";
import { Project } from "./pages/Project";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { NotFound } from "./components/NotFound";

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="app" element={<AppLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="projects" element={<div>Projects</div>} />
            <Route path="projects/:id" element={<Project />} />
            <Route path="projects/new" element={<NewProject />} />
            <Route path="clients/new" element={<NewClient />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

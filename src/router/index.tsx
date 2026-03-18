import { DashboardLayout } from "@/layouts/dashboard.layout";
import { AuthenticationView } from "@/views/authentication.view";
import CompetitionsView from "@/views/dashboard/competitions.view";
import SportsView from "@/views/dashboard/sports.view";
import UsersView from "@/views/dashboard/users.view";
import { Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationView />} />
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="users" element={<UsersView />} />
        <Route path="sports" element={<SportsView />} />
        <Route path="competitons" element={<CompetitionsView />} />
      </Route>
    </Routes>
  );
}

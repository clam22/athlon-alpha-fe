import { DashboardLayout } from "@/layouts/dashboard.layout";
import { AuthenticationView } from "@/views/authentication.view";
import CompetitionsView from "@/views/dashboard/competitions.view";
import Dashboard from "@/views/dashboard/index.view";
import SportsView from "@/views/dashboard/sports.view";
import UsersView from "@/views/dashboard/users.view";
import { NotFoundView } from "@/views/not-found.view";
import { Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationView />} />
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="" element={<Dashboard/>}/>
        <Route path="users" element={<UsersView />} />
        <Route path="sports" element={<SportsView />} />
        <Route path="competitions" element={<CompetitionsView />} />
      </Route>
      <Route path="*" element={<NotFoundView/>}/>
    </Routes>
  );
}

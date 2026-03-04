import { AuthenticationView } from "@/views/authentication.view";
import { Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationView />} />
    </Routes>
  );
}

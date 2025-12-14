import { AppLayout } from "@/components/layout/AppLayout";
import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
      </Route >

      <Route element={<PrivateRoutes />}>
        <Route element={<AppLayout />}>
        </Route>
      </Route>
    </Routes >
  )
}

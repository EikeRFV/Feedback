import { AppLayout } from "@/components/layout/AppLayout";
import { Route, Routes } from "react-router";
import { PrivateRoutes } from "./PrivateRoutes";
import { Home } from "@/pages/Home";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Home />} />
      <Route path="/signup" element={<Home />} />

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

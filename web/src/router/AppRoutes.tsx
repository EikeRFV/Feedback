import { AppLayout } from "@/components/layout/AppLayout";
import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";
import { Dashboard } from "@/pages/Dashboard";
import { Developers } from "@/pages/Developers";
import { Chat } from "@/pages/Chat";
import { Profile } from "@/pages/Profile";
import { CreateReviewRequest } from "@/pages/CreateReviewRequest";
import { PublicRoutes } from "./PublicRoutes";
import { ReviewRequests } from "@/pages/ReviewRequests";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/review-requests" element={<ReviewRequests />} />
          <Route path="/review-requests/create" element={<CreateReviewRequest />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes >
  )
}

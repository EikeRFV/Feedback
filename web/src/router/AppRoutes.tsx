import { AppLayout } from "@/components/layout/AppLayout";
import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";
import { Dashboard } from "@/pages/Dashboard";
import { Developers } from "@/pages/Developers";
import { MyReviews } from "@/pages/MyReviews";
import { Notifications } from "@/pages/Notifications";
import { ReviewRequests } from "@/pages/ReviewRequests";
import { Chat } from "@/pages/Chat";
import { Profile } from "@/pages/Profile";
import { MyRequests } from "@/pages/MyRequests";
import { Solutions } from "@/pages/Solutions";
import { CreateReviewRequest } from "@/pages/CreateReviewRequest";
import { PublicRoutes } from "./PublicRoutes";

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
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/review-requests" element={<ReviewRequests />} />
          <Route path="/review-requests/create" element={<CreateReviewRequest />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/solutions" element={<Solutions />} />
        </Route>
      </Route>
    </Routes >
  )
}

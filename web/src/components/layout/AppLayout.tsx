import { Outlet } from "react-router";
import { LoggedHeader } from "../LoggedHeader";
import { Footer } from "../Footer";

export function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <LoggedHeader />
      <main className="grow px-44 bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

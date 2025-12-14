import { Outlet } from "react-router";
import { Footer } from "../Footer";
import { Header } from "../Header";

export function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Loaders } from "@/components/Loaders";

export const Layout = () => {
  const user = useAuth();

  if (user === undefined) return <Loaders />;
  if (!user) return <Navigate to="/signin" replace />;
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-20 flex-1 w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

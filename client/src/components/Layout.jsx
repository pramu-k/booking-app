import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="px-8 py-4 flex flex-col min-h-screen max-w-6xl mx-auto">
      <Header />
      <Outlet />
    </div>
  );
};
export default Layout;

import React from "react";
import { useCookies } from "react-cookie";
import Navbar from "../components/Navbar.jsx";
import Footer from "../pages/pages/Footer.jsx";

const PublicLayout = ({ children }) => {
  const [cookies] = useCookies(["token"]);
  const isAuthenticated = !!cookies.token;

  // Don't show public layout if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;

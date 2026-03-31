import React from "react";
import Navbar from "./components/Navbar.jsx";
import Path from "./routes/Path.jsx";
import { BrowserRouter } from "react-router-dom";
import Footer from "./pages/pages/Footer.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>
        <Path />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

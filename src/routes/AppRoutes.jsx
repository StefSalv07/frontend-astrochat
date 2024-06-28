import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../pages/About";
import ChatWithAstro from "../pages/ChatWithAstro";
import AstrologerSignUp from "../pages/AstrologerSignUp";
import AstrologerLogin from "../pages/AstrologerLogin";
import AstroDetail from "../pages/AstroDetail";

function AppRoutes() {
  return (
    <>
      {/* <BrowserRouter> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat-with-astro" element={<ChatWithAstro />} />
        <Route path="/astrologer-signup" element={<AstrologerSignUp />} />
        <Route path="/astrologer-signin" element={<AstrologerLogin />} />
        <Route path="/astro-Details/:id" element={<AstroDetail />} />
      </Routes>
      <Footer />
      {/* </BrowserRouter> */}
    </>
  );
}

export default AppRoutes;

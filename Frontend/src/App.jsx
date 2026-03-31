import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Doctors from "../src/pages/Doctors";
import Login from "../src/pages/Login";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import MyProfile from "../src/pages/MyProfile";
import MyAppointments from "../src/pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  return (
    <>
      <div className="mx-3 sm:mx-6 md:mx-[10%]">
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;

import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-primary rounded-lg px-6 md:px-10 lg:px-20 gap-8 lg:py-20">
      {/* ------ Left Side - All Text ------ */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto">
        <p className="text-3xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight lg:leading-tight">
          Book Appointment <br></br> With Trusted Doctors
        </p>
        <div className="text-white text-sm font-light flex flex-col gap-3">
          <img
            className="w-28"
            src={assets.group_profiles}
            alt="Group of trusted doctors"
          />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br /> schedule your appointment hassle-free.
          </p>
          <a
            href="#speciality"
            className="bg-slate-200 rounded-full justify-center text-gray-500 p-4 flex items-center gap-2 mt-2 hover:text-secondary font-medium"
          >
            Book appointment <img src={assets.arrow_icon} alt="Arrow right" />
          </a>
        </div>
      </div>

      {/* ------ Right Side -------- */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt="Doctor consultation"
        />
      </div>
    </div>
  );
};

export default Header;

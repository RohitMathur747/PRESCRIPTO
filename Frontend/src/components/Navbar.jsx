import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets.js";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="flex items-center justify-between text-sm py-3 sm:py-4 mb-5 border-b border-gray-200 px-4 sm:px-0">
        <img
          onClick={() => navigate("/")}
          className="w-40 sm:w-44 cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 font-medium text-sm lg:text-base">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-2 relative group ${isActive ? "text-primary font-semibold" : ""}`
            }
            onClick={() => showMenu && setShowMenu(false)}
          >
            {({ isActive }) => (
              <>
                <li>Home</li>
                <hr
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-all duration-200 ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"} origin-left`}
                />
              </>
            )}
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              `py-2 relative group ${isActive ? "text-primary font-semibold" : ""}`
            }
            onClick={() => showMenu && setShowMenu(false)}
          >
            {({ isActive }) => (
              <>
                <li>All Doctors</li>
                <hr
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-all duration-200 ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"} origin-left`}
                />
              </>
            )}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `py-2 relative group ${isActive ? "text-primary font-semibold" : ""}`
            }
            onClick={() => showMenu && setShowMenu(false)}
          >
            {({ isActive }) => (
              <>
                <li>About</li>
                <hr
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-all duration-200 ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"} origin-left`}
                />
              </>
            )}
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `py-2 relative group ${isActive ? "text-primary font-semibold" : ""}`
            }
            onClick={() => showMenu && setShowMenu(false)}
          >
            {({ isActive }) => (
              <>
                <li>Contact</li>
                <hr
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-all duration-200 ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"} origin-left`}
                />
              </>
            )}
          </NavLink>
        </ul>
        <div className="flex items-center gap-3 sm:gap-4">
          {token ? (
            <div className="flex items-center gap-2 cursor-pointer group relative md:group-hover:block hidden md:inline-flex">
              <img
                className="w-7 sm:w-8 rounded-full"
                src={assets.profile_pic}
                alt="Profile"
              />
              <img
                className="w-2 sm:w-2.5"
                src={assets.dropdown_icon}
                alt="Dropdown"
              />
              <div className="absolute top-full right-0 mt-2 text-base font-medium text-gray-700 bg-white shadow-lg rounded-lg border py-2 px-4 min-w-[160px] z-30 hidden md:group-hover:block">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-primary cursor-pointer py-1"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-primary cursor-pointer py-1"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    setToken(false);
                  }}
                  className="hover:text-primary cursor-pointer py-1 border-t pt-1 mt-1"
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-medium text-sm sm:text-base hover:bg-opacity-90 transition-all hidden md:block"
            >
              Create Account
            </button>
          )}
          <img
            onClick={toggleMenu}
            className="w-6 h-6 md:hidden cursor-pointer p-1 hover:bg-gray-100 rounded-lg transition-colors"
            src={assets.menu_icon}
            alt="Menu toggle"
          />
        </div>
      </div>

      {/* Mobile Backdrop */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[80vw] max-w-sm bg-white shadow-2xl transform 
          transition-transform duration-300 ease-in-out z-30 md:hidden
          ${showMenu ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-5 pt-12 border-b border-gray-200">
          <img className="w-32 sm:w-36" src={assets.logo} alt="Logo" />
          <img
            className="w-8 h-8 p-2 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="Close menu"
          />
        </div>
        <ul className="flex flex-col items-stretch gap-0 mt-2 px-5 pb-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block py-4 px-4 text-lg font-medium border-l-4 transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white border-primary shadow-md"
                  : "text-gray-700 hover:bg-gray-50 hover:border-primary/50 border-transparent"
              }`
            }
            onClick={() => setShowMenu(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              `block py-4 px-4 text-lg font-medium border-l-4 transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white border-primary shadow-md"
                  : "text-gray-700 hover:bg-gray-50 hover:border-primary/50 border-transparent"
              }`
            }
            onClick={() => setShowMenu(false)}
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block py-4 px-4 text-lg font-medium border-l-4 transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white border-primary shadow-md"
                  : "text-gray-700 hover:bg-gray-50 hover:border-primary/50 border-transparent"
              }`
            }
            onClick={() => setShowMenu(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block py-4 px-4 text-lg font-medium border-l-4 transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white border-primary shadow-md"
                  : "text-gray-700 hover:bg-gray-50 hover:border-primary/50 border-transparent"
              }`
            }
            onClick={() => setShowMenu(false)}
          >
            Contact
          </NavLink>
        </ul>
        {!token && (
          <div className="absolute bottom-8 left-5 right-5">
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="w-full bg-primary text-white py-3 px-6 rounded-xl font-medium text-base hover:bg-opacity-90 transition-all shadow-lg"
            >
              Create Account
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

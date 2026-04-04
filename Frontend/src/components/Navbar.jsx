import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets.js";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContent";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const getDesktopNavClass = ({ isActive }) =>
    `relative py-2 group ${isActive ? "text-primary font-semibold" : ""}`;

  const getDesktopUnderline = ({ isActive }) =>
    `absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-all duration-200 ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"} origin-left`;

  const getMobileNavClass = ({ isActive }) =>
    `block py-4 px-4 text-lg font-medium border-l-4 transition-all duration-200 ${
      isActive
        ? "bg-primary text-white border-primary shadow-md"
        : "text-gray-700 hover:bg-gray-50 hover:border-primary/50 border-transparent"
    }`;

  return (
    <>
      <div className="flex items-center justify-between text-sm py-3 sm:py-4 mb-5 border-b border-gray-200 px-4 sm:px-0">
        <img
          onClick={() => navigate("/")}
          className="w-40 sm:w-44 cursor-pointer"
          src={assets.logo}
          alt="MediCare Logo"
          title="Go to home"
        />
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 font-medium text-sm lg:text-base">
          <NavLink
            to="/"
            className={({ isActive: navActive }) =>
              getDesktopNavClass({ isActive: navActive })
            }
            onClick={() => showMenu && setShowMenu(false)}
          >
            <span
              className={getDesktopUnderline({
                isActive: location.pathname === "/",
              })}
              aria-hidden="true"
            />
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive: navActive }) =>
              getDesktopNavClass({ isActive: navActive })
            }
            onClick={() => showMenu && setShowMenu(false)}
          >
            <span
              className={getDesktopUnderline({
                isActive: location.pathname === "/doctors",
              })}
              aria-hidden="true"
            />
            <li>All Doctors</li>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive: navActive }) =>
              getDesktopNavClass({ isActive: navActive })
            }
            onClick={() => showMenu && setShowMenu(false)}
          >
            <span
              className={getDesktopUnderline({
                isActive: location.pathname === "/about",
              })}
              aria-hidden="true"
            />
            <li>About</li>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive: navActive }) =>
              getDesktopNavClass({ isActive: navActive })
            }
            onClick={() => showMenu && setShowMenu(false)}
          >
            <span
              className={getDesktopUnderline({
                isActive: location.pathname === "/contact",
              })}
              aria-hidden="true"
            />
            <li>Contact</li>
          </NavLink>
        </ul>
        <div className="flex items-center gap-3 sm:gap-4">
          {token && userData ? (
            <div
              className="flex items-center gap-2 cursor-pointer group relative md:group-hover:block hidden md:inline-flex"
              aria-label="User profile"
            >
              <img
                className="w-7 sm:w-8 rounded-full"
                src={userData.image}
                alt="Profile picture"
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
                    logout();
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
              aria-label="Create account or login"
            >
              Create Account
            </button>
          )}
          <img
            onClick={toggleMenu}
            className="w-6 h-6 md:hidden cursor-pointer p-1 hover:bg-gray-100 rounded-lg transition-colors"
            src={assets.menu_icon}
            alt="Toggle mobile menu"
            aria-label="Toggle navigation menu"
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
        {token && userData && (
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b">
              <img
                className="w-12 h-12 rounded-full"
                src={userData.image}
                alt="Profile picture"
              />
              <div>
                <p className="font-medium text-lg">{userData.name}</p>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p
                onClick={() => {
                  navigate("/my-profile");
                  setShowMenu(false);
                }}
                className="block py-2 px-4 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                My Profile
              </p>
              <p
                onClick={() => {
                  navigate("/my-appointments");
                  setShowMenu(false);
                }}
                className="block py-2 px-4 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                My Appointments
              </p>
              <p
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
                className="block py-2 px-4 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-t pt-2"
              >
                Logout
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between p-5 pt-4 border-b border-gray-200">
          <img className="w-32 sm:w-36" src={assets.logo} alt="Logo" />
          <img
            className="w-8 h-8 p-2 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="Close menu"
            aria-label="Close menu"
          />
        </div>
        <ul className="flex flex-col items-stretch gap-0 mt-2 px-5 pb-8">
          <NavLink
            to="/"
            className={getMobileNavClass}
            onClick={() => setShowMenu(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={getMobileNavClass}
            onClick={() => setShowMenu(false)}
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={getMobileNavClass}
            onClick={() => setShowMenu(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={getMobileNavClass}
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
              aria-label="Login"
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

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { doctors as staticDoctors } from "../assets/assets_frontend/assets.js";

export const AppContext = createContext();

const currencySymbol = "$";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AppContentProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [user, setUser] = useState(null);

  const getDoctorsData = () => {
    setDoctors(staticDoctors);
  };

  const getUserData = async () => {
    if (token) {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("User fetch error:", error);
        setUser(null);
        setToken(false);
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    getUserData();
  }, [token]);

  const value = {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContentProvider;

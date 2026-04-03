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
  const [userData, setUserData] = useState(false);

  // const getDoctorsData = () => {
  //   try {
  //     const { data } = axios.get(backendUrl + "/api/doctor/list");
  //     if (data.success) {
  //       setDoctors(data.doctors);
  //     } else {
  //       toast.error(data.message || "Failed to fetch doctors data");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };

  const getDoctorsData = () => {
    setDoctors(staticDoctors);
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: {
          token,
        },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  const value = {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    loadUserProfileData,
    userData,
    setUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContentProvider;

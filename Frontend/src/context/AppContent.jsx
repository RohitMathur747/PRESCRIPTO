import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const currencySymbol = "$";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AppContentProvider = (props) => {
  const [doctor, setDoctor] = useState([]);
  const [token, setToken] = useState("");

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctor(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const value = {
    doctors: doctor,
    currencySymbol,
    backendUrl,
    token,
    setToken,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContentProvider;

import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "$";

  const months = [
    " ",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const calculateAge = (dobString) => {
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const slotDateFormat = (slotDate, slotTime) => {
    const normalizedDate = new Date(slotDate).toISOString().split("T")[0];
    const dateArray = normalizedDate.split("-");
    const day = dateArray[2];
    const month = months[Number(dateArray[1])];
    const year = dateArray[0];
    return `${day} ${month} ${year}`;
  };

  const value = { calculateAge, slotDateFormat, currency };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

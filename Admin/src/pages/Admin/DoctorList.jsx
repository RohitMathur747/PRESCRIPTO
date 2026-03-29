import React, { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
const DoctorList = () => {
  const { getAllDoctors, doctors, aToken } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div>
      <div>Doctor List Page</div>
    </div>
  );
};

export default DoctorList;

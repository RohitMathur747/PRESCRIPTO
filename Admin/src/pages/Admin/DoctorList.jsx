import React, { useEffect } from "react";
import { useContext } from "react";
import doctor_icon from "../../assets/doctor_icon.svg";
import { AdminContext } from "../../context/AdminContext";
const DoctorList = () => {
  const { getAllDoctors, doctors, aToken, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item) => (
          <div
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer"
            key={item._id}
          >
            <img
              className="bg-indigo-50 group-hover:bg-primary transition-all duration-500 w-full h-48 object-cover"
              src={item.image || doctor_icon}
              loading="lazy"
              alt={item.name}
              onError={(e) => {
                e.target.src = doctor_icon;
                e.target.alt = `${item.name} profile`;
              }}
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">
                {item.name}
              </p>
              <p className="text-zinc-600 text-sm">{item.speciality}</p>
              <div>
                <input
                  className="mt-2 flex items-center gap-1 text-sm"
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                />
                <p className="text-sm">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;

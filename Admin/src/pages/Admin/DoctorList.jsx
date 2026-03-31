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

  const handleImageError = (e, docId, index) => {
    // Fallback to local docN.png for first 15 docs, then doctor_icon
    if (index < 15) {
      const fallbackPath = `/src/assets/doc${index + 1}.png`;
      e.target.src = fallbackPath;
    } else {
      e.target.src = doctor_icon;
    }
    e.target.alt = `Doctor profile`;
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5">
        {doctors.map((item, index) => (
          <div
            className="border border-indigo-200 rounded-xl w-full overflow-hidden cursor-pointer"
            key={item._id}
          >
            <img
              className="bg-indigo-50 group-hover:bg-primary transition-all duration-500 w-full h-48 object-cover"
              src={item.image || doctor_icon}
              loading="lazy"
              alt={item.name}
              onError={(e) => handleImageError(e, item._id, index)}
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">
                {item.name}
              </p>
              <p className="text-zinc-600 text-sm">{item.speciality}</p>
              <div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    id={`available-${item._id}`}
                    className="w-4 h-4 text-sm rounded"
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                  />
                  <label
                    htmlFor={`available-${item._id}`}
                    className="text-sm font-medium cursor-pointer select-none text-neutral-800"
                  >
                    Available
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;

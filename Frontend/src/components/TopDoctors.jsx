import React, { useContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContent";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="max-w-md text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={item._id || index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-500 bg-white"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-52 object-cover bg-blue-50"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm mb-1">
                {/* <div className="flex text-yellow-400 text-lg">★★★★★</div> */}
              </div>
              <div className="flex items-center gap-1 text-green-500 text-xs mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Available
              </div>
              <h3 className="text-gray-900 text-lg font-medium">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
              {/* <p className="text-sm text-gray-500">
                {item.degree}, {item.experience}
              </p> */}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-blue-50 text-gray-600 px-10 py-3 rounded-full transition-colors"
        >
          more
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;

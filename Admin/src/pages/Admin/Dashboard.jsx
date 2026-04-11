import React, { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken, getDashData]);

  if (!dashData) {
    return (
      <div className="m-5 flex items-center justify-center h-64">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="w-full m-5">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.doctors || 0}
            </p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.appointments || 0}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.patients || 0}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      <div className="bg-white mt-10">
        <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4 border border-t-0 overflow-x-auto">
          {dashData.latestAppointments?.length > 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashData.latestAppointments.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          className="rounded-full w-10"
                          src={item.docData?.image || assets.doctor_icon}
                          alt=""
                        />
                        <p className="text-gray-800 font-medium truncate max-w-xs">
                          {item.docData?.name || "Unknown Doctor"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                      {slotDateFormat(item.Slotdate)}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex-shrink-0">
                        {item.cancelled ? (
                          <p className="text-red-400 text-sm font-medium">
                            Cancelled
                          </p>
                        ) : (
                          <img
                            onClick={() => cancelAppointment(item._id)}
                            className="w-8 h-8 cursor-pointer"
                            src={assets.cancel_icon}
                            alt="Cancel"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              No recent bookings
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

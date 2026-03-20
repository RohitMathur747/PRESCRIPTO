import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContent";
import { assets } from "../assets/assets_frontend/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotindex, SetSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // get current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentdate = new Date(today);
      currentdate.setDate(today.getDate() + i);

      // setting and time of date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + 1);
      endTime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === currentdate.getDate()) {
        currentdate.setHours(
          currentdate.getHours() > 10 ? currentdate.getHours() + 1 : 10,
        );
        currentdate.setMinutes(currentdate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentdate.setHours(10);
        currentdate.setMinutes(0);
      }

      let timeslots = [];

      while (currentdate < endTime) {
        let formattedTime = currentdate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // add  slots to array
        timeslots.push({
          datetime: new Date(currentdate),
          time: formattedTime,
        });

        // increment current time by 30 minutes
        currentdate.setMinutes(currentdate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeslots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <>
        <div>
          {/*---------Doctors Details ------------- */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <img
                className="bg-primary w-full sm:max-w-72 rounded-lg"
                src={docInfo.image}
                alt=""
              />
            </div>

            <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
              {/*---------Doc Info : name,degree and Experience------------ */}
              <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                {docInfo.name}{" "}
                <img className="w-5" src={assets.verified_icon} alt="" />
              </p>

              <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                <p>
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <button className="py-0.5 px-2 border text-xs rounded-full">
                  {docInfo.experience}
                </button>
              </div>

              {/*----------------------Doctor About -------------------- */}
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                  About <img src={assets.info_icon} alt="" />
                </p>
                <p className="text-sm text-gray-500 max-[700px] mt-1">
                  {docInfo.about}
                </p>
              </div>

              <p className="text-gray-500 font-medium mt-4">
                Appointment fee:
                <span className="text-gray-600">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Appointment;

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContent";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = () => {
    const docInfo = doctors?.find((doc) => doc._id === docId);
    if (docInfo) {
      setDocInfo(docInfo);
    }
  };

  const getAvailableSlots = () => {
    setDocSlots([]);

    const today = new Date();
    const endHour = 21;

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(today);
      dayDate.setDate(today.getDate() + i);

      const endTime = new Date(dayDate);
      endTime.setHours(endHour, 0, 0, 0);

      let startTime;
      if (i === 0) {
        // Today
        startTime = new Date();
        startTime.setMinutes(Math.ceil(startTime.getMinutes() / 30) * 30);
        if (startTime.getHours() < 10) {
          startTime.setHours(10, 0);
        }
      } else {
        startTime = new Date(dayDate);
        startTime.setHours(10, 0, 0, 0);
      }

      const timeslots = [];
      let currentTime = new Date(startTime);

      while (currentTime < endTime) {
        const formattedTime = currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeslots.push({
          datetime: new Date(currentTime),
          time: formattedTime,
        });

        currentTime.setMinutes(currentTime.getMinutes() + 30);
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

  // useEffect(() => {
  // console.log(docSlots);
  // }, [docSlots]);

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

            <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-0 sm:mt-[22px]">
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

              {/* Doctor Address */}
              <div className="mt-4">
                <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                  Address <img src={assets.info_icon} alt="" />
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {docInfo.address?.line1}, {docInfo.address?.line2}
                </p>
              </div>
            </div>
          </div>

          {/*-----------------Booking Slots-------------------- */}
          <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
            <p>Booking Slots</p>
            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
              {docSlots.length > 0 &&
                docSlots.map((item, index) => (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white" : "border border-gray-200"}`}
                    key={index}
                  >
                    <p>{daysOfWeek[item?.[0]?.datetime?.getDay()]}</p>
                    {String(item?.[0]?.datetime?.getDate()).padStart(2, "0")}
                  </div>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex]?.length > 0 &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-primary text-white" : "text-gray-400 border border-gray-300"}`}
                  key={index}
                >
                  {item?.time}
                </p>
              ))}
          </div>
          <button
            className={`text-sm font-light px-14 py-3 rounded-full my-6 transition-all ${
              !slotTime || !docInfo
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary-dark cursor-pointer"
            }`}
            onClick={() => {
              if (slotTime && docInfo) {
                alert(
                  `Appointment booked with Dr. ${docInfo.name} at ${slotTime} for $${docInfo.fees}`,
                );
              }
            }}
            disabled={!slotTime || !docInfo}
          >
            Book Appointment Now
          </button>

          {/* Listing realted Doctors */}
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </>
    )
  );
};

export default Appointment;

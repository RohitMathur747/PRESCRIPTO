import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContent";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { backendUrl, token, user, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    image: assets.profile_pic,
    email: "",
    phone: "0000000000",
    address: { line1: "", line2: "" },
    gender: "Not Selected",
    dob: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        image: user.image || assets.profile_pic,
        email: user.email || "",
        phone: user.phone || "0000000000",
        address: user.address || { line1: "", line2: "" },
        gender: user.gender || "Not Selected",
        dob: user.dob || "",
      });
      setLoading(false);
    } else if (token) {
      // Fallback fetch
      const fetchProfile = async () => {
        try {
          const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (data.success) {
            setUserData({
              name: data.user.name,
              image: data.user.image || assets.profile_pic,
              email: data.user.email,
              phone: data.user.phone || "0000000000",
              address: data.user.address || { line1: "", line2: "" },
              gender: data.user.gender || "Not Selected",
              dob: data.user.dob || "",
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, [user, token, backendUrl, navigate]);

  const handleSave = async () => {
    if (!token) return navigate("/login");
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/user/profile`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (data.success) {
        toast.success("Profile updated!");
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Update failed!");
    }
  };

  const handleLogout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-4 p-4 sm:p-8 text-sm">
      <button
        onClick={handleLogout}
        className="self-end text-primary underline hover:no-underline mb-4"
      >
        Logout
      </button>
      <img
        className="w-36 h-36 rounded-full mx-auto object-cover"
        src={userData.image}
        alt="Profile"
      />
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium text-center max-w-96 mx-auto mt-2 p-2 rounded"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-bold text-3xl text-neutral-800 text-center mt-2">
          {userData.name}
        </p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none my-6" />
      <div>
        <p className="text-neutral-500 underline mb-4 font-medium">
          CONTACT INFORMATION
        </p>
        <div className="grid grid-cols-[120px_1fr] gap-y-3 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 p-2 rounded w-full max-w-md"
              type="tel"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="space-y-2">
              <input
                className="bg-gray-50 p-2 rounded w-full"
                value={userData.address.line1 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                placeholder="Line 1"
              />
              <input
                className="bg-gray-50 p-2 rounded w-full"
                value={userData.address.line2 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                placeholder="Line 2"
              />
            </div>
          ) : (
            <div className="text-gray-500 space-y-1">
              <p>{userData.address.line1}</p>
              <p>{userData.address.line2}</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mb-4 font-medium">
          BASIC INFORMATION
        </p>
        <div className="grid grid-cols-[120px_1fr] gap-y-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-100 p-2 rounded w-full max-w-xs"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400 capitalize">{userData.gender}</p>
          )}
          <p className="font-medium">Date of Birth:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 p-2 rounded w-full max-w-32"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-400">{userData.dob || "Not set"}</p>
          )}
        </div>
      </div>
      <div className="flex gap-4 mt-10 justify-center">
        {isEdit ? (
          <>
            <button
              className="border border-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={handleSave}
            >
              Save Changes
            </button>
            <button
              className="px-8 py-3 rounded-full hover:bg-gray-100 transition-all border"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="border border-primary px-12 py-3 rounded-full hover:bg-primary hover:text-white transition-all font-medium"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContent";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userData._id);
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } },
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-lg mx-auto flex flex-col gap-4 p-4 sm:p-8 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={assets.upload_icon}
                alt=""
              />
            </div>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            className="w-36 h-36 rounded-full mx-auto object-cover"
            src={userData.image}
            alt="Profile"
          />
        )}

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
                onClick={updateUserProfileData}
              >
                Save Information
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
    )
  );
};

export default MyProfile;

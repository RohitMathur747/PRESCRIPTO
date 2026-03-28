import React, { useState } from "react";
import { assets } from "../../assets/assets";

const AddDoctor = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(assets.upload_area);

  // const handleImage = (e) => {
  //   if (e.target.files[0]) {
  //     setFile(e.target.files[0]);
  //     setPreview(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add form submission logic here later
  //   console.log("Form submitted");
  // };

  return (
    <>
      <form className="m-5 w-full">
        <p className="mb-3 text-lg font-medium">Add Doctor</p>
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label
              htmlFor="doc-img"
              //className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer"
            >
              <img
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
                src={assets.upload_area}
                alt=""
              />
            </label>
            <input
              type="file"
              id="doc-img"
              //className="hidden"
              //accept="image/*"
              //onChange={handleImage}
              hidden
            />
            <p>
              upload doctor <br /> Picture
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex flex-1 flex-col gap-1">
                <p>Doctor Name</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Name"
                  name=""
                  id=""
                  required
                />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p>Doctor Email</p>
                <input
                  className="border rounded px-3 py-2"
                  type="email"
                  placeholder="Email"
                  name=""
                  id=""
                  required
                />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p>Doctor password</p>
                <input
                  className="border rounded px-3 py-2"
                  type="password"
                  placeholder="password"
                  name=""
                  id=""
                  required
                />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p>Experience</p>
                <select className="border rounded px-3 py-2" name="" id="">
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Year</option>
                  <option value="3 Year">3 Year</option>
                  <option value="4 Year">4 Year</option>
                  <option value="5 Year">5 Year</option>
                  <option value="6 Year">6 Year</option>
                  <option value="7 Year">7 Year</option>
                  <option value="8 Year">8 Year</option>
                  <option value="9 Year">9 Year</option>
                  <option value="10 Year">10 Year</option>
                </select>
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p>Fees</p>
                <input
                  className="border rounded px-3 py-2"
                  type="number"
                  placeholder="fees"
                  name=""
                  id=""
                  required
                />
              </div>
            </div>

            <div className="w-full lg:flex-1 flex flex-col">
              <div className="flex flex-1 flex-col gap-1">
                <p>Speciality</p>
                <select className="border rounded px-3 py-2" name="" id="">
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p>Education</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Education"
                  name=""
                  id=""
                  required
                />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p>Address</p>
                <input
                  className="border rounded px-3 py-2 mb-2"
                  type="text"
                  placeholder="address 1"
                  name=""
                  id=""
                  required
                />
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="address 2"
                  name=""
                  id=""
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <p className="mt-4 mb-2">About Doctor</p>
            <textarea
              className="w-full px-4 pt-2 border rounded"
              type="text"
              placeholder="write about doctor"
              rows={5}
              name=""
              id=""
              required
            />
          </div>

          <button className="bg-primary px-10 py-3 mt-4 text-white rounded-full">
            Add Doctor
          </button>
        </div>
      </form>
    </>
  );
};

{
  /* Upload Area */
}
// <div className="mb-8">
//   <label
//     htmlFor="image"
//     className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer"
//   >
//     Doctor Image
//   </label>
//   <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-primary transition-all">
//     <img
//       src={assets.upload_area}
//       alt="Upload area"
//       className="w-32 h-32 object-cover rounded-full mx-auto"
//     />
//     <input
//       type="file"
//       id="image"
//       className="hidden"
//       accept="image/*"
//       onChange={handleImage}
//     />
//     <p className="mt-4 text-gray-500 text-center">
//       upload doctor <br /> Picture
//     </p>

//   </div>
//   {file && (
//     <p className="text-sm text-green-600 mt-2 text-center">
//       Image selected: {file.name}
//     </p>
//   )}
// </div>

//   <div>
//     <label
//       htmlFor="name"
//       className="block text-sm font-medium text-gray-700 mb-2"
//     >
//       Full Name
//     </label>
//     <input
//       type="text"
//       id="name"
//       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//       placeholder="Enter doctor name"
//       required
//     />
//   </div>

//   <div>
//     <label
//       htmlFor="specialization"
//       className="block text-sm font-medium text-gray-700 mb-2"
//     >
//       Specialization
//     </label>
//     <input
//       type="text"
//       id="specialization"
//       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//       placeholder="e.g., Cardiologist"
//       required
//     />
//   </div>

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     <div>
//       <label
//         htmlFor="email"
//         className="block text-sm font-medium text-gray-700 mb-2"
//       >
//         Email
//       </label>
//       <input
//         type="email"
//         id="email"
//         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//         placeholder="doctor@example.com"
//         required
//       />
//     </div>
//     <div>
//       <label
//         htmlFor="phone"
//         className="block text-sm font-medium text-gray-700 mb-2"
//       >
//         Phone
//       </label>
//       <input
//         type="tel"
//         id="phone"
//         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//         placeholder="+1 234 567 8900"
//         required
//       />
//     </div>
//   </div>

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     <div>
//       <label
//         htmlFor="experience"
//         className="block text-sm font-medium text-gray-700 mb-2"
//       >
//         Experience (years)
//       </label>
//       <input
//         type="number"
//         id="experience"
//         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//         placeholder="5"
//         min="0"
//         required
//       />
//     </div>
//     <div>
//       <label
//         htmlFor="fees"
//         className="block text-sm font-medium text-gray-700 mb-2"
//       >
//         Consultation Fees ($)
//       </label>
//       <input
//         type="number"
//         id="fees"
//         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//         placeholder="100"
//         min="0"
//         required
//       />
//     </div>
//   </div>

//   <div>
//     <label
//       htmlFor="qualifications"
//       className="block text-sm font-medium text-gray-700 mb-2"
//     >
//       Qualifications
//     </label>
//     <textarea
//       id="qualifications"
//       rows="4"
//       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
//       placeholder="Enter qualifications..."
//       required
//     ></textarea>
//   </div>

//   <button
//     type="submit"
//     className="w-full bg-primary text-white py-4 px-8 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 text-lg"
//   >
//     Add Doctor
//   </button>

export default AddDoctor;

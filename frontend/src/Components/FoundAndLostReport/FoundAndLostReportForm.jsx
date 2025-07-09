import React, { useContext, useEffect, useState } from "react";
import LAndFHeader from "./LAndFHeader";
import FormInput from "../Register/FormInput";
import { ContextStore } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const FoundAndLostReportForm = () => {
  const { baseUrl, btnLoader, setBtnLoader, token, loggedIn } =
    useContext(ContextStore);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const location = useLocation();
  const { pathname } = location;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    // Append basic text fields
    formData.append("title", form.title.value);
    formData.append("description", form.description.value);
    formData.append("category", form.category.value);
    pathname == "/lost-report"
      ? formData.append("dateLost", form.dateLost.value)
      : formData.append("dateFound", form.dateFound.value);
    // Tags: make comma-separated string
    formData.append("tags", form.tags.value);

    // Location: as JSON string
    const location = {
      state: form.state.value,
      city: form.city.value,
      address: form.address.value,
    };
    formData.append("location", JSON.stringify(location));

    // Contact: as JSON string
    const contact = {
      phone: form.phone.value,
      email: form.email.value,
    };
    formData.append("contact", JSON.stringify(contact));

    // Append images
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await fetch(
        `${baseUrl}/${
          pathname == "/lost-report/" ? "lostApplications" : "foundApplications"
        }/create`,
        {
          method: "POST",
          headers: {
            token: token, // ⬅️ replace with actual token
          },
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Response:", data);

      if (data.success) {
        toast.success(data.message);
        e.target.reset(); // Reset the form
        setImageFiles([]);
        setImagePreviews([]);
        // Reset form, image states, etc. here
      } else {
        toast.error("Submission failed: " + data.message);
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("An error occurred while submitting the report.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <LAndFHeader location={location} />
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--dartmouth-green)] to-[var(--sea-green)] px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            Lost Item Details
          </h2>
          <p className="text-[var(--celadon)] text-sm">
            Please fill out all required fields marked with *
          </p>
        </div>

        <form
          id="lost-item-form"
          className="p-6 space-y-8"
          encType="multipart/form-data"
          onSubmit={sumbitHandler}
        >
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-[var(--brunswick-green)] flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Item Information
              </h3>
            </div>

            <FormInput
              label="Item Title"
              placeholder="e.g., Black iPhone 13, Blue Backpack, Silver Watch"
              name="title"
              type="text"
              id="title"
              required={true}
            />

            <FormInput
              label="Description"
              placeholder="Provide detailed description including brand, model, color, size, distinctive features, etc."
              name="description"
              type="text"
              id="description"
              required={true}
              isTextarea={true}
            />

            <FormInput
              label="Tags"
              placeholder="e.g., electronics, phone, apple, black, cracked screen"
              name="tags"
              type="text"
              id="tags"
              required={true}
            />

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-[var(--brunswick-green)] mb-1"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                required=""
                className="form-input block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none"
              >
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing &amp; Accessories</option>
                <option value="bags">Bags &amp; Luggage</option>
                <option value="jewelry">Jewelry &amp; Watches</option>
                <option value="documents">Documents &amp; Cards</option>
                <option value="keys">Keys</option>
                <option value="sports">Sports Equipment</option>
                <option value="books">Books &amp; Stationery</option>
                <option value="toys">Toys &amp; Games</option>
                <option value="pets">Pets</option>
                <option value="vehicles">Vehicles</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-[var(--brunswick-green)] flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Location Where Lost
              </h3>
            </div>

            <div className="flex justify-between items-center gap-5 w-full max-sm:flex-col ">
              <FormInput
                type="text"
                placeholder="e.g., Punjab, Sindh "
                label="State"
                id="state"
                name="state"
                required={true}
              />

              <FormInput
                type="text"
                placeholder="e.g., Lahore, Islamabad"
                label="City"
                id="city"
                name="city"
                required={true}
              />
            </div>

            <FormInput
              type="text"
              placeholder="e.g., Near DHA Lahore"
              label="CSpecific Address/Locationity"
              id="address"
              name="address"
              required={true}
              isTextarea={true}
            />
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-[var(--brunswick-green)] flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                Date &amp; Images
              </h3>
            </div>

            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-[var(--brunswick-green)] mb-1"
              >
                Images
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[var(--mint-2)] transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="images"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-[var(--mint-2)] hover:text-[var(--sea-green)] focus-within:outline-none"
                    >
                      <span>Upload photos</span>
                      <input
                        id="images"
                        name="images"
                        type="file"
                        className="sr-only"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
              </div>

              {/* Image Previews */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    className="object-cover w-full h-32 rounded-lg shadow-sm border"
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Upload photos of your item to help others identify it
              </p>
            </div>
            {pathname == "/lost-report" ? (
              <div>
                <label
                  htmlFor="dateLost"
                  className="block text-sm font-medium text-[var(--brunswick-green)] mb-1"
                >
                  Date Lost *
                </label>
                <input
                  type="date"
                  id="dateLost"
                  name="dateLost"
                  required={true}
                  className="form-input block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none"
                  max="2025-07-09"
                />
                <p className="mt-1 text-xs text-gray-500">
                  When did you lose this item?
                </p>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="dateFound"
                  className="block text-sm font-medium text-[var(--brunswick-green)] mb-1"
                >
                  Date Found *
                </label>
                <input
                  type="date"
                  id="dateFound"
                  name="dateFound"
                  required="true"
                  className="form-input block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none"
                  max="2025-07-09"
                />
                <p className="mt-1 text-xs text-gray-500">
                  When did you dateFound this item?
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-[var(--brunswick-green)] flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                Contact Information
              </h3>
            </div>

            <div className="flex justify-between items-center gap-5 w-full max-sm:flex-col ">
              <FormInput
                type="text"
                placeholder="03XXXXXXXXX"
                label="Phone Number"
                id="phone"
                name="phone"
                required={true}
              />

              <FormInput
                type="email"
                placeholder="your.email@example.com"
                label="email"
                id="email"
                name="email"
                required={true}
                value={loggedIn.email}
              />
            </div>
          </div>
          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-[var(--sea-green)] hover:bg-[var(--dartmouth-green)] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
                Submit {pathname == "/lost-report" ? "Lost" : "Found"} Item
                Report
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500 text-center">
              By submitting this form, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoundAndLostReportForm;

import React, { useContext, useEffect, useState } from "react";
import LAndFHeader from "./LAndFHeader";
import FormInput from "../Register/FormInput";
import { ContextStore } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const FoundAndLostReportForm = () => {
  const { baseUrl, btnLoader, setBtnLoader, token, loggedIn, fetchLoggdIn } =
    useContext(ContextStore);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { pathname } = location;

  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    state: "",
    city: "",
    address: "",
    phone: "",
    email: loggedIn?.email || "",
    dateLost: "",
    dateFound: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if we're in edit mode
  useEffect(() => {
    const isEdit = pathname.includes("/edit/");
    setIsEditMode(isEdit);

    if (isEdit && params.id) {
      fetchItemData(params.id);
    }
  }, [pathname, params.id]);

  // Authentication check
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  // Fetch item data for editing
  const fetchItemData = async (itemId) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/lostApplications/${itemId}`, {
        method: "GET",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success && data.data) {
        const item = data.data;

        // Populate form data
        setFormData({
          title: item.title || "",
          description: item.description || "",
          category: item.category || "",
          tags: Array.isArray(item.tags)
            ? item.tags.join(", ")
            : item.tags || "",
          state: item.location?.state || "",
          city: item.location?.city || "",
          address: item.location?.address || "",
          phone: item.contact?.phone || "",
          email: item.contact?.email || loggedIn?.email || "",
          dateLost: item.dateLost
            ? new Date(item.dateLost).toISOString().split("T")[0]
            : "",
          dateFound: item.dateFound
            ? new Date(item.dateFound).toISOString().split("T")[0]
            : "",
        });

        // Handle existing images
        if (item.images && item.images.length > 0) {
          setExistingImages(item.images);
        }
      } else {
        toast.error("Failed to fetch item data");
        navigate(-1); // Go back if item not found
      }
    } catch (error) {
      console.error("Error fetching item data:", error);
      toast.error("Error loading item data");
      navigate(-1);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image changes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoader(true);

    const formDataToSend = new FormData();

    // Append basic text fields
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("tags", formData.tags);

    // Date field
    if (pathname.includes("/lost")) {
      formDataToSend.append("dateLost", formData.dateLost);
    } else {
      formDataToSend.append("dateFound", formData.dateFound);
    }

    // Location as JSON string
    const locationData = {
      state: formData.state,
      city: formData.city,
      address: formData.address,
    };
    formDataToSend.append("location", JSON.stringify(locationData));

    // Contact as JSON string
    const contactData = {
      phone: formData.phone,
      email: formData.email,
    };
    formDataToSend.append("contact", JSON.stringify(contactData));

    // Append new images
    imageFiles.forEach((file) => {
      formDataToSend.append("images", file);
    });

    // For edit mode, append existing images that weren't removed
    if (isEditMode && existingImages.length > 0) {
      formDataToSend.append("existingImages", JSON.stringify(existingImages));
    }

    try {
      const endpoint = pathname.includes("/lost")
        ? "lostApplications"
        : "foundApplications";
      const url = isEditMode
        ? `${baseUrl}/${endpoint}/update/${params.id}`
        : `${baseUrl}/${endpoint}/create`;

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          token: token,
        },
        body: formDataToSend,
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data.success) {
        fetchLoggdIn();
        toast.success(
          data.message ||
            `Item ${isEditMode ? "updated" : "created"} successfully!`
        );

        if (!isEditMode) {
          // Reset form for new items
          fetchLoggdIn();
          setFormData({
            title: "",
            description: "",
            category: "",
            tags: "",
            state: "",
            city: "",
            address: "",
            phone: "",
            email: loggedIn?.email || "",
            dateLost: "",
            dateFound: "",
          });
          setImageFiles([]);
          setImagePreviews([]);
          setExistingImages([]);
        } else {
          // Navigate to item details or list for edited items
          navigate(-1);
        }
      } else {
        toast.error(
          `${isEditMode ? "Update" : "Submission"} failed: ` + data.message
        );
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error(
        `An error occurred while ${
          isEditMode ? "updating" : "submitting"
        } the report.`
      );
    } finally {
      setBtnLoader(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--sea-green)]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <LAndFHeader location={location} />
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--dartmouth-green)] to-[var(--sea-green)] px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            {isEditMode ? "Edit" : "Report"}{" "}
            {pathname.includes("/lost") ? "Lost" : "Found"} Item
          </h2>
          <p className="text-[var(--celadon)] text-sm">
            Please fill out all required fields marked with *
          </p>
        </div>

        <form
          id="lost-item-form"
          className="p-6 space-y-8"
          encType="multipart/form-data"
          onSubmit={submitHandler}
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
              value={formData.title}
              onChange={handleInputChange}
            />

            <FormInput
              label="Description"
              placeholder="Provide detailed description including brand, model, color, size, distinctive features, etc."
              name="description"
              type="text"
              id="description"
              required={true}
              isTextarea={true}
              value={formData.description}
              onChange={handleInputChange}
            />

            <FormInput
              label="Tags"
              placeholder="e.g., electronics, phone, apple, black, cracked screen"
              name="tags"
              type="text"
              id="tags"
              required={true}
              value={formData.tags}
              onChange={handleInputChange}
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
                value={formData.category}
                onChange={handleInputChange}
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
                Location Where {pathname.includes("/lost") ? "Lost" : "Found"}
              </h3>
            </div>

            <div className="flex justify-between items-center gap-5 w-full max-sm:flex-col">
              <FormInput
                type="text"
                placeholder="e.g., Punjab, Sindh"
                label="State"
                id="state"
                name="state"
                required={true}
                value={formData.state}
                onChange={handleInputChange}
              />

              <FormInput
                type="text"
                placeholder="e.g., Lahore, Islamabad"
                label="City"
                id="city"
                name="city"
                required={true}
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            <FormInput
              type="text"
              placeholder="e.g., Near DHA Lahore"
              label="Specific Address/Location"
              id="address"
              name="address"
              required={true}
              isTextarea={true}
              value={formData.address}
              onChange={handleInputChange}
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

            {/* Existing Images */}
            {isEditMode && existingImages.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-[var(--brunswick-green)] mb-2">
                  Current Images
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {existingImages.map((image, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={`${baseUrl}/images/${
                          pathname.includes("/found-report/edit/") ? "found" : "lost"
                        }/${image}`}
                        alt={`Existing ${idx + 1}`}
                        className="object-cover w-full h-32 rounded-lg shadow-sm border"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-[var(--brunswick-green)] mb-1"
              >
                {isEditMode ? "Add New Images" : "Images"}
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

              {/* New Image Previews */}
              {imagePreviews.length > 0 && (
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
              )}

              <p className="mt-1 text-xs text-gray-500">
                Upload photos of your item to help others identify it
              </p>
            </div>

            {pathname.includes("/lost") ? (
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
                  max="2025-07-11"
                  value={formData.dateLost}
                  onChange={handleInputChange}
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
                  required={true}
                  className="form-input block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none"
                  max="2025-07-11"
                  value={formData.dateFound}
                  onChange={handleInputChange}
                />
                <p className="mt-1 text-xs text-gray-500">
                  When did you find this item?
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

            <div className="flex justify-between items-center gap-5 w-full max-sm:flex-col">
              <FormInput
                type="text"
                placeholder="03XXXXXXXXX"
                label="Phone Number"
                id="phone"
                name="phone"
                required={true}
                value={formData.phone}
                onChange={handleInputChange}
              />

              <FormInput
                type="email"
                placeholder="your.email@example.com"
                label="Email"
                id="email"
                name="email"
                required={true}
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={btnLoader}
                className="flex-1 bg-[var(--sea-green)] hover:bg-[var(--dartmouth-green)] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md flex items-center justify-center disabled:opacity-50"
              >
                {btnLoader ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
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
                )}
                {btnLoader
                  ? "Processing..."
                  : `${isEditMode ? "Update" : "Submit"} ${
                      pathname.includes("/lost") ? "Lost" : "Found"
                    } Item Report`}
              </button>

              {isEditMode && (
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md flex items-center justify-center"
                >
                  Cancel
                </button>
              )}
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

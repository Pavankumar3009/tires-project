
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Tg.css";
import LoadingSpinner from "./LoadingSpinner";

const Tg = () => {
  const [Pn, setPn] = useState("");
  const [Rn, setRn] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    // Start loading
    setLoading(true);

    // Clear the form after submitting
    setPn("");
    setRn("");
    setImage(null);

    // Reset the input file value
    document.getElementById("input-file").value = null;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("Pn", Pn);
    formData.append("Rn", Rn);

    try {
      const response = await axios.post(
        "http://localhost:8001/uploads",
        formData,
        {
          headers: {
            "content-Type": "multipart/form-data",
          },
        }
      );

      // Display success notification
      toast.success("Data uploaded successfully");

      // Log the response from the server
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error uploading data:", error);

      // Display error notification
      toast.error("Error uploading data");
    } finally {
      // Stop loading, whether successful or not
      setLoading(false);
    }
  };

  const PnumUpdate = (e) => {
    const input = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // Allow only letters and numbers
    setPn(input);
  };

  const RnumUpdate = (e) => {
    const input = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // Allow only letters and numbers
    setRn(input);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    
    <div className="hero">
      <h1>Enter the details</h1>
      <div className="card1">
        
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Enter reg number"
            id="ph-no"
            className="form-control"
            value={Rn}
            onChange={RnumUpdate}
          />
          <label htmlFor="ph-no"></label>
          <input
            type="text"
            placeholder="Enter phone number"
            id="reg-no"
            className="form-control"
            value={Pn}
            onChange={PnumUpdate}
          />
          <label htmlFor="reg-no"></label>

          <div className="file-input">
            <label htmlFor="input-file" className="file-label">
              Choose File
            </label>
            <div className="selected-file-box">
              {image && <span>{image.name}</span>}
            </div>
            <input
              type="file"
              id="input-file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            image && (
              <button type="submit" id="btn">
                Submit
              </button>
            )
          )}
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Tg;

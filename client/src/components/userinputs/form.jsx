import { useState } from "react";
import "./form.css";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
const FormComponent = ({ formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorsData = {};

    // Validation: Mobile number should contain exactly 10 digits
    if (formData.mobile.length !== 10) {
      errorsData.mobile = "Mobile number should be 10 digits";
    }

    // Validation: Check if the email is in proper format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errorsData.email = "Please enter a valid email";
    }

    // Set errors or submit the form
    if (Object.keys(errorsData).length > 0) {
      setErrors(errorsData);
    } else {
      // Submit the form - Here, you can perform further actions with formData
      console.log("Form submitted:", formData);

      // Store form data in local storage
      localStorage.setItem("formData", JSON.stringify(formData));

      // Optionally, you can clear the form data in the state if needed
      setFormData({
        name: "",
        mobile: "",
        email: "",
        numOfPeople: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-data">
        <label className="input-label">Name:</label>
        <br />
        <input
          className="user-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-data">
        <label className="input-label">Mobile Number:</label>
        <br />
        <input
          className="user-input"
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        {errors.mobile && <span className="error">{errors.mobile}</span>}
      </div>
      <div className="input-data">
        <label className="input-label">Email:</label>
        <br />
        <input
          className="user-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="input-data">
        <label className="input-label">Number of People:</label>
        <br />
        <input
          className="user-input"
          type="number"
          name="numOfPeople"
          value={formData.numOfPeople}
          onChange={handleChange}
          required
        />
      </div>
    </form>
  );
};
FormComponent.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    numOfPeople: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};
export default FormComponent;

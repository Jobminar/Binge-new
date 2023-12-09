import { useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const AddDecorations = ({ onClose, onAdd }) => {
  const [decorationData, setDecorationData] = useState({
    decorationName: "",
    price: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDecorationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          setDecorationData((prevData) => ({
            ...prevData,
            image: reader.result,
          }));
        } catch (error) {
          console.error("Error reading image file:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate an API call (replace with actual API call)
      console.log("Simulating API call to add decoration:", decorationData);

      // Simulate a successful response (replace with actual response handling)
      console.log("Decoration added successfully!");

      // Trigger the onAdd callback to update the decorations list
      onAdd();

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error submitting decoration data:", error);
    }
  };

  const handleClose = () => {
    // Close the modal
    onClose();
  };

  return (
    <div id="popup" className="d-block">
      <div className="card popup-card">
        <div className="card-header text-center">
          <h2>Add New Decoration</h2>
          <button
            type="button"
            className="btn-close close-icon"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="decorationName" className="form-label">
                Decoration Name
              </label>
              <input
                type="text"
                className="form-control"
                id="decorationName"
                name="decorationName"
                value={decorationData.decorationName}
                onChange={handleInputChange}
                placeholder="Enter decoration name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={decorationData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                <label className="custom-file-label" htmlFor="image">
                  Choose file
                </label>
              </div>
              {decorationData.image && (
                <img
                  src={decorationData.image}
                  alt="Decoration Preview"
                  className="preview-image"
                />
              )}
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Add Decoration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes
AddDecorations.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddDecorations;

import { useState } from "react";
import PropTypes from "prop-types";
import {
  IoMdCalendar,
  IoMdCheckbox,
  IoMdRadioButtonOn,
  IoMdPerson,
} from "react-icons/io";
import {
  MdEventSeat,
  MdAccessTime,
  MdAttachMoney,
  MdSend,
  MdLocationOn,
  MdClose,
} from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { IconContext } from "react-icons";

const PostSlots = ({ onClose, visible }) => {
  const [slotData, setSlotData] = useState({
    date: "",
    availability: true,
    numberOfPeople: 0,
    time: "",
    price: 0,
    type: "MINI", // Default value
    location: "",
    organizer: "",
  });

  const {
    date,
    availability,
    numberOfPeople,
    time,
    price,
    type,
    location,
    organizer,
  } = slotData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSlotData({
      ...slotData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://binge-be.onrender.com/postslots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(slotData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Slot Posted:", result);
    } catch (error) {
      console.error("Error posting slot:", error.message);
    }
  };

  const containerStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: visible ? "block" : "none",
    zIndex: "1000",
    overflowX: "hidden", // Add this line to remove horizontal overflow
  };

  return (
    visible && (
      <div style={containerStyle} id="popup">
        <div className="d-flex justify-content-end mb-2">
          <MdClose
            size="1.5em"
            style={{ cursor: "pointer" }}
            onClick={onClose}
          />
        </div>
        <div className="card">
          <div className="card-header text-center">
            <h2>Add a Slot</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <IconContext.Provider value={{ color: "black", size: "1.5em" }}>
                <div className="mb-3">
                  <label className="form-label">
                    <IoMdRadioButtonOn /> Type:
                  </label>
                  <div className="custom-radio">
                    <input
                      type="radio"
                      id="mini"
                      name="type"
                      value="MINI"
                      checked={type === "MINI"}
                      onChange={handleChange}
                    />
                    <label htmlFor="mini">MINI</label>
                  </div>
                  <div className="custom-radio">
                    <input
                      type="radio"
                      id="max"
                      name="type"
                      value="MAX"
                      checked={type === "MAX"}
                      onChange={handleChange}
                    />
                    <label htmlFor="max">MAX</label>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    <IoMdCalendar /> Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3 form-check">
                  <label htmlFor="availability" className="form-check-label">
                    <IoMdCheckbox /> Availability
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="numberOfPeople" className="form-label">
                    <MdEventSeat /> Number of People:
                  </label>
                  <input
                    type="number"
                    id="numberOfPeople"
                    name="numberOfPeople"
                    value={numberOfPeople}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">
                    <MdAccessTime /> Time:
                  </label>
                  <input
                    type="text"
                    id="time"
                    name="time"
                    value={time}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    <MdLocationOn /> Location:
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={location}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="organizer" className="form-label">
                    <IoMdPerson /> Organizer:
                  </label>
                  <input
                    type="text"
                    id="organizer"
                    name="organizer"
                    value={organizer}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    <MdAttachMoney /> Price:
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary">
                    <MdSend /> Submit
                  </button>
                </div>
              </IconContext.Provider>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

PostSlots.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default PostSlots;

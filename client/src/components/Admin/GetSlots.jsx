import React from "react";
import { useEffect, useState } from "react";
import PostSlot from "./PostSlot";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GetSlots = () => {
  const [isPostSlotsVisible, setIsPostSlotsVisible] = useState(true);
  const [data, setData] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const determineTypeFromPrice = (price) => {
    return price === 1799 ? "STANDARD" : price === 2999 ? "LUXI" : "";
  };

  useEffect(() => {
    fetchData();
  }, [availabilityFilter, selectedDate]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://binge-be.onrender.com/getslots");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      let filteredData =
        availabilityFilter === "all"
          ? jsonData
          : jsonData.filter((item) => item.availability === availabilityFilter);

      const dateFilteredData =
        selectedDate === null
          ? filteredData
          : filteredData.filter(
              (item) => item.date === selectedDate.toISOString().split("T")[0]
            );

      filteredData = dateFilteredData.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setData(filteredData);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.message || "An error occurred while fetching data."
      );
    }
  };

  const handleAvailabilityChange = (event) => {
    setAvailabilityFilter(event.target.value);
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      const response = await fetch(
        `https://binge-be.onrender.com/slots/${slotId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchData();
      } else {
        console.error(
          `Failed to delete slot with ID ${slotId}. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(
        "Error deleting slot:",
        error.message || "An error occurred while deleting slot."
      );
    }
  };

  const handleShowModal = () => {
    setIsPostSlotsVisible(true);
    setShowModal(true);
  };

  const handleClosePostSlots = () => {
    setIsPostSlotsVisible(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotClick = (slot) => {
    // Access the "type" value from the slot object
    const type = slot.type;

    // Now you can use the "type" value as needed
    console.log("Clicked slot type:", type);

    // Add any other logic you need to perform when a slot is clicked
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4">SLOTS</h2>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="mx-2">Filter by Availability:</label>
          <div className="custom-radio mx-2">
            <input
              type="radio"
              id="allRadio"
              value="all"
              checked={availabilityFilter === "all"}
              onChange={handleAvailabilityChange}
            />
            <label htmlFor="allRadio">AVAILABLE</label>
          </div>
          <div className="custom-radio mx-2">
            <input
              type="radio"
              id="availableRadio"
              value="available"
              checked={availabilityFilter === "available"}
              onChange={handleAvailabilityChange}
            />
            <label htmlFor="availableRadio">SOLD</label>
          </div>
        </div>

        <div className="col-md-6">
          <label className="mx-2">Filter by Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            isClearable
            showYearDropdown
            scrollableYearDropdown
            className="mx-2 p-0 text-dark"
          />
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary mb-3 custom-button"
        onClick={handleShowModal}
      >
        Add Slot
      </button>
      <div
        className="table-responsive overflow-auto"
        style={{ minHeight: "200px", minWidth: "300px" }}
      >
        <table className="table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Price</th>
              <th scope="col">Number of People</th>
              <th scope="col">Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((slot, index) => (
              <tr key={index}>
                <td>
                  {/* Pass the entire slot object to handleSlotClick */}
                  <a href="#" onClick={() => handleSlotClick(slot)}>
                    {slot.date}
                  </a>
                </td>
                <td>{slot.type || determineTypeFromPrice(slot.price)}</td>
                <td>{slot.price}</td>
                <td>{slot.numberOfPeople}</td>
                <td>{slot.time}</td>
                <td>
                  <button
                    onClick={() => handleDeleteSlot(slot._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <PostSlot onClose={handleClosePostSlots} visible={isPostSlotsVisible} />
      </div>
    </div>
  );
};

export default GetSlots;

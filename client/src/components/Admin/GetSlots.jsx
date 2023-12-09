import { useEffect, useState } from "react";
import PostSlot from "./PostSlot";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GetSlots = () => {
  const [isPostSlotsVisible, setIsPostSlotsVisible] = useState(true);

  const handleClosePostSlots = () => {
    setIsPostSlotsVisible(false);
  };
  // State for slot data
  const [data, setData] = useState([]);

  // State for availability filter
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  // State for showing/hiding Add Slot Modal
  const [showModal, setShowModal] = useState(false);

  // State for calendar date
  const [selectedDate, setSelectedDate] = useState(null);

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
      const filteredData =
        availabilityFilter === "all"
          ? jsonData
          : jsonData.filter((item) => item.availability === availabilityFilter);

      const dateFilteredData =
        selectedDate === null
          ? filteredData
          : filteredData.filter((item) => item.date === selectedDate);

      setData(dateFilteredData);
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
  const handleCloseModal = () => setShowModal(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div id="main-container" className="mt-3">
      <h2 id="main-title" className="text-center mb-4">
        SLOTS
      </h2>

      <div id="filter-section" className="mb-3">
        <label id="filter-label" className="mx-2">
          Filter by Availability:
        </label>
        <div className="custom-radio mx-2">
          <input
            type="radio"
            id="allRadio"
            value="all"
            checked={availabilityFilter === "all"}
            onChange={handleAvailabilityChange}
          />
          <label htmlFor="allRadio">SOLD</label>
        </div>
        <div className="custom-radio mx-2">
          <input
            type="radio"
            id="availableRadio"
            value="available"
            checked={availabilityFilter === "available"}
            onChange={handleAvailabilityChange}
          />
          <label htmlFor="availableRadio">AVAILABLE</label>
        </div>
      </div>

      {/* Calendar Date Picker */}
      <div id="calendar-section" className="mb-3">
        <label id="calendar-label" className="mx-2">
          Filter by Date:
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            isClearable
            showYearDropdown
            scrollableYearDropdown
            className="mx-2 p-0 text-dark"
          />
        </label>
      </div>

      {/* Button to show Add Slot Modal */}
      {availabilityFilter === "available" && (
        <button
          id="add-slot-button"
          type="button"
          className="btn btn-primary mb-3 custom-button"
          onClick={handleShowModal}
        >
          Add Slot
        </button>
      )}

      {/* Slots Table */}
      <table
        id="slots-table"
        className="table-bordered table-hover table-striped"
      >
        <thead className="table-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Availability</th>
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
                <a href="#" onClick={() => handleSlotClick(slot)}>
                  {slot.date}
                </a>
              </td>
              <td>{slot.availability}</td>
              <td>{slot.price}</td>
              <td>{slot.numberOfPeople}</td>
              <td>{slot.time}</td>
              <td>
                <button
                  id="delete-slot-button"
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

      {/* Add Slot Modal */}
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

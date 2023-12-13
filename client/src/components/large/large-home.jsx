import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../mini/mini-home.css";
import grid from "../../assets/images/grid.png";
import Booknow from "../../assets/images/Frame 11.png";

const Largehome = () => {
  // slot selection usestate
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [fetchedSlotData, setFetchedSlotData] = useState([]);
  const storedEvent = sessionStorage.getItem("selectedEvent") || "";
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    date: "",
    numberOfPeople: "",
    hours: "",
    event: "",
  });
  //declaring state varibles to advanced bookings

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Format tomorrow's date as 'YYYY-MM-DD'
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

  const [advanceDate, setAdvanceDate] = useState(tomorrowFormatted);

  const handleAdvanceDateChange = (e) => {
    // Your onChange logic here
    setAdvanceDate(e.target.value);
  };
  //  Date update
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-GB", options);
  };
  const [showAdvanceBooking, setShowAdvanceBooking] = useState(false);

  // Time slots for advanced booking
  const timeSlots = [
    "10:00 am - 01:00 pm",
    "02:00 pm - 05:00 pm",
    "06:00 pm - 09:00 pm",
    "10:00 pm - 12:00 am",
  ];
  //function to close the toggleadvancebookings________________
  const toggleAdvanceBooking = () => {
    // Clear any checks or selections when toggling advance booking
    setSelectedSlot(null);
    sessionStorage.removeItem("selectedSlot");

    // Uncheck regular slots
    const regularCheckboxes = document.querySelectorAll(
      ".table-section tbody input[type='checkbox']"
    );
    regularCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Uncheck advanced booking slots
    const advanceCheckboxes = document.querySelectorAll(
      ".advance-booking-container tbody input[type='checkbox']"
    );
    advanceCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Toggle the visibility of the advanced booking section
    setShowAdvanceBooking(!showAdvanceBooking);
  };

  // Function to handle the selection of a date for advanced booking

  // here the functions and state variables of advance bookings will  end____
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://binge-be.onrender.com/getslots?date=${inputValues.date}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Filter slots for the selected date and price === 1799
        const filteredSlots = result.filter(
          (slot) =>
            formatDate(slot.date) === formatDate(inputValues.date) &&
            slot.price === 2999
        );

        // Update your state or perform any necessary processing
        setFetchedSlotData(filteredSlots);
        console.log("Fetched Slots:", filteredSlots);
      } catch (error) {
        console.error("Error fetching slots:", error.message);
      }
    };

    // Fetch data when the date changes
    if (inputValues.date) {
      fetchData();
    } else {
      // If no date is selected, reset the slot data
      setFetchedSlotData([]);
    }
  }, [inputValues.date]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(
    formatDate(new Date().toISOString().split("T")[0])
  );

  useEffect(() => {
    // Update date state with inputValues.date
    setDate(
      inputValues.date
        ? formatDate(inputValues.date)
        : formatDate(new Date().toISOString().split("T")[0])
    );
  }, [inputValues.date]);

  // local storage and slot selction
  // Store the selected event in sessionStorage
  const handleSlotSelection = (event, time, price) => {
    if (event.target.checked) {
      // Store the selected slot information in sessionStorage
      setSelectedSlot({ date: advanceDate, time, price });
      sessionStorage.setItem(
        "selectedSlot",
        JSON.stringify({ date: advanceDate, time, price })
      );
    } else {
      // Clear the selected slot when unchecked
      setSelectedSlot(null);
      sessionStorage.removeItem("selectedSlot");
    }
  };

  // Function to handle the "Book Now" button click

  //functionality to go to next page
  const navigateToNextPage = () => {
    navigate("/userinputslarge");
  };
  const handleAdvanceBookingSelection = () => {};
  // Function to handle the "Book Now" button click
  // Function to handle the "Book Now" button click
  const handleNextPage = () => {
    const selectedSlot = sessionStorage.getItem("selectedSlot");
    if ((!inputValues.date && !advanceDate) || !inputValues.event) {
      // If neither regular calendar date nor advanced booking date is selected, or if the event is not selected, show an alert
      alert("Please select a date and event before proceeding.");
    } else if (!selectedSlot) {
      // If no slot is selected, show an alert
      alert("Please select a slot before proceeding.");
    } else {
      // Store the selected event in sessionStorage
      sessionStorage.setItem("selectedEvent", inputValues.event);

      // If all conditions met, navigate to the next page
      navigateToNextPage();
    }
  };

  return (
    <div className="mini-home-con">
      <div className="mini-head">
        <h1>
          LUXI<span>THEATER</span>
        </h1>
        <img
          src={grid}
          alt="grid"
          onClick={() => {
            navigate("/navbar");
          }}
        />
      </div>

      {/* input title section */}
      <div className="input-head">
        <p className="input1tittle">Check slot availability</p>
        <p className="input1tittle">Event</p>
      </div>
      <div className="input-section">
        {/* Date input */}
        <div className="input-sub">
          <input
            type="date"
            className="input1"
            name="date"
            value={inputValues.date}
            onChange={handleInputChange}
            min={today}
          />
        </div>

        {/* Event dropdown */}
        <div className="input-sub">
          <select
            className="input4"
            name="event"
            value={inputValues.event || storedEvent}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select an event
            </option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Other parties">Others</option>
          </select>
        </div>
        <h2
          className="advance-title clickable"
          onClick={() => {
            toggleAdvanceBooking();
            handleAdvanceBookingSelection();
          }}
        >
          Advance Booking
        </h2>
        {/* Advanced Booking Section */}
        <div
          className={`advance-booking-container ${
            showAdvanceBooking ? "show" : "hide"
          }`}
        >
          <div className="advance-booking-content">
            {/* Advanced Booking date input */}
            <div className="input-sub">
              <input
                type="date"
                className="input1"
                name="advanceDate"
                value={advanceDate || tomorrowFormatted}
                onChange={handleAdvanceDateChange}
                min={tomorrowFormatted}
              />
            </div>

            {/* Advanced Booking time and price table */}
            <table>
              <thead>
                <tr>
                  <th className="thead">Date</th>
                  <th className="thead">Time</th>
                  <th className="thead">Price</th>
                  <th className="thead">Select Slot</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through time slots for advanced booking */}
                {timeSlots.map((timeSlot, index) => (
                  <tr key={index}>
                    <td>{advanceDate ? formatDate(advanceDate) : "-"}</td>
                    <td>{timeSlot}</td>
                    <td>2999/-</td>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(event) =>
                          handleSlotSelection(event, timeSlot, 2999)
                        }
                        disabled={
                          selectedSlot && selectedSlot.time !== timeSlot
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add other necessary input fields for advanced booking */}
            <button
              className="advance-booking-button"
              onClick={toggleAdvanceBooking}
            >
              Cancel Advance Booking
            </button>
          </div>
        </div>
        {/*Advance Booking*/}
      </div>

      {/* table section */}

      {/* table section */}
      <div
        className="table-section"
        style={{ display: showAdvanceBooking ? "none" : "block" }}
      >
        <h6 className="slots" style={{ fontSize: "24px" }}>
          Select a Slot
        </h6>

        <table>
          <thead>
            <tr>
              <th className="thead">Date</th>
              <th className="thead">Time</th>
              <th className="thead">Price</th>
            </tr>
          </thead>
          <tbody>
            {fetchedSlotData.map((slot) => (
              <tr key={slot._id}>
                <td>{formatDate(slot.date)}</td>
                <td>{slot.time}</td>
                <td>{slot.price}</td>
                <td>
                  <input
                    type="checkbox"
                    onChange={(event) => handleSlotSelection(event, slot.time)}
                    disabled={selectedSlot && selectedSlot !== slot.time}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="book-now m-auto mb-2"
        onClick={() => {
          handleNextPage();
        }}
      >
        <img src={Booknow} alt="book-now" />
      </div>

      <div className="mobile-view">
        <div className="date-section">
          <div className="date-sub-section">
            <h1>DATE</h1>
            <p>20 November 2023</p>
          </div>
          <div className="date-sub-section">
            <h1>Availability</h1>
            <p>Available</p>
          </div>
        </div>
        <div className="mobile-table">
          <table>
            <tr>
              <th>No.of People</th>
              <th>Time</th>

              <th>Price</th>
            </tr>
            <tr>
              <td>2-4 people</td>
              <td>7:00 pm - 10:00 pm</td>

              <td>2500</td>
            </tr>
            <tr>
              <td>2-4 people</td>
              <td>7:00 pm - 10:00 pm</td>

              <td>2500</td>
            </tr>
            <tr>
              <td>2-4 people</td>
              <td>7:00 pm - 10:00 pm</td>

              <td>2500</td>
            </tr>
            <tr>
              <td>2-4 people</td>
              <td>7:00 pm - 10:00 pm</td>

              <td>2500</td>
            </tr>
            <tr>
              <td>2-4 people</td>
              <td>7:00 pm - 10:00 pm</td>

              <td>2500</td>
            </tr>
          </table>
          <div
            className="book-now"
            onClick={() => {
              navigate("/userinputslarge");
            }}
          >
            <img src={Booknow} alt="book-now" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Largehome;

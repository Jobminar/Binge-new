// ... (previous imports)

const Largehome = () => {
  // ... (previous code)

  // New state variables for the selected advanced booking date and time
  const [selectedAdvanceDate, setSelectedAdvanceDate] = useState(null);
  const [selectedAdvanceTime, setSelectedAdvanceTime] = useState(null);

  // ... (previous code)

  // Function to handle the selection of date and time from advanced booking
  const handleAdvanceBookingSelection = () => {
    setSelectedAdvanceDate(advanceDate);
    // Assuming that the selected time from the dropdown is stored in state
    // Update this line according to your actual logic
    setSelectedAdvanceTime(/* Selected time from the dropdown */);
  };

  // ... (previous code)

  return (
    <div className="mini-home-con">
      {/* ... (previous code) */}

      {/* Advanced Booking Section */}
      <h2
        className="advance-title clickable"
        onClick={() => {
          toggleAdvanceBooking();
          handleAdvanceBookingSelection();
        }}
      >
        Advance Booking
      </h2>
      <div
        className={`advance-booking-container ${
          showAdvanceBooking ? "show" : "hide"
        }`}
      >
        {/* ... (previous code) */}
        <button
          className="advance-booking-button"
          onClick={() => {
            toggleAdvanceBooking();
            handleAdvanceBookingSelection();
          }}
        >
          Book Now
        </button>
      </div>

      {/* ... (previous code) */}

      {/* table section */}
      <div className="table-section">
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
                <td>{selectedAdvanceDate || formatDate(slot.date)}</td>
                <td>
                  {selectedAdvanceTime ||
                    (selectedSlot ? selectedSlot : slot.time)}
                </td>
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
        {/* ... (previous code) */}
      </div>
      {/* ... (previous code) */}
    </div>
  );
};

export default Largehome;

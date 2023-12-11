import React, { useEffect, useState } from "react";
import UserDetailsForm from "./UserDetailsForm";
import { FaEdit } from "react-icons/fa";

const Bookings = () => {
  const [data, setData] = useState([]);
  const [showUserDetailsForm, setShowUserDetailsForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://binge-be.onrender.com/getbookings");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
      setExpandedDetails(Array(jsonData.length).fill(false));
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.message || "An error occurred while fetching data."
      );
    }
  };

  const handleManageClick = (contact) => {
    setSelectedContact(contact);
    setShowUserDetailsForm(true);
  };

  const handlePopupClose = () => {
    setShowUserDetailsForm(false);
  };

  const handleViewMoreClick = (index) => {
    setExpandedDetails((prev) => {
      const newExpandedDetails = [...prev];
      newExpandedDetails[index] = !newExpandedDetails[index];
      return newExpandedDetails;
    });
  };

  const renderViewMoreDropdown = (booking, index) => (
    <div>
      <button
        onClick={() => handleViewMoreClick(index)}
        style={{
          border: "none",
          background: "none",
          cursor: "pointer",
          color: "blue",
        }}
      >
        View More
      </button>
      {expandedDetails[index] && (
        <div>
          <p>Total Price: ${booking.totalPrice || 0}</p>
          <p>Number of People: {booking.numberOfPeople}</p>
          <p>Date and Time: {new Date(booking.dateTime).toLocaleString()}</p>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h2>Bookings</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contact, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{contact.name}</td>
              <td>{contact.mailID}</td>
              <td>{contact.phone}</td>
              <td>{renderViewMoreDropdown(contact, index)}</td>
              <td>
                <button
                  onClick={() => handleManageClick(contact)}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <FaEdit style={{ color: "pink" }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUserDetailsForm && selectedContact && (
        <div className="popup">
          <UserDetailsForm
            contact={selectedContact}
            onClose={handlePopupClose}
          />
        </div>
      )}
    </div>
  );
};

export default Bookings;

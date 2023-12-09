import { useEffect, useState } from "react";
import { FaTrash, FaPhone, FaEnvelope } from "react-icons/fa";

const GetContactUs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://binge-be.onrender.com/getcontactus"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.message || "An error occurred while fetching data."
      );
    }
  };

  const handleDeleteContactUs = async (contactId) => {
    try {
      const response = await fetch(
        `https://binge-be.onrender.com/deletecontactus/${contactId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If the deletion is successful, fetch the updated data
        fetchData();
      } else {
        console.error(
          `Failed to delete Contact Us entry with ID ${contactId}. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(
        "Error deleting Contact Us entry:",
        error.message || "An error occurred while deleting Contact Us entry."
      );
    }
  };

  const handlePhoneCall = (phone) => {
    // Implement phone call functionality here
    console.log(`Calling ${phone}`);
  };

  const handleSendEmail = (email) => {
    // Implement email sending functionality here
    console.log(`Sending email to ${email}`);
  };

  return (
    <div>
      <h2>Enquiries</h2>

      <table>
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.mailID}</td>
              <td>{contact.phone}</td>
              <td>{contact.message}</td>
              <td>
                <button
                  onClick={() => handleDeleteContactUs(contact._id)}
                  style={{ background: "none", border: "none" }} // No background and no border
                >
                  <FaTrash style={{ color: "red" }} /> {/* Red delete icon */}
                </button>
                <button
                  onClick={() => handlePhoneCall(contact.phone)}
                  style={{ background: "none", border: "none" }} // No background and no border
                >
                  <FaPhone style={{ color: "red" }} /> {/* Red phone icon */}
                </button>
                <button
                  onClick={() => handleSendEmail(contact.mailID)}
                  style={{ background: "none", border: "none" }} // No background and no border
                >
                  <FaEnvelope style={{ color: "red" }} /> {/* Red email icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetContactUs;

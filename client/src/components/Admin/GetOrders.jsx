import { useEffect, useState } from "react";
import UserDetailsForm from "./UserDetailsForm";
import { FaEdit } from "react-icons/fa";

const Bookings = () => {
  const [data, setData] = useState([]);
  const [showUserDetailsForm, setShowUserDetailsForm] = useState(false);

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

  const handleManageClick = () => {
    setShowUserDetailsForm(true);
  };

  const handlePopupClose = () => {
    setShowUserDetailsForm(false);
  };

  return (
    <div>
      <h2>Bookings</h2>

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
                  onClick={handleManageClick}
                  style={{ border: "none", background: "none" }}
                >
                  <FaEdit style={{ color: "pink" }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUserDetailsForm && (
        <div className="popup">
          <UserDetailsForm onClose={handlePopupClose} />
        </div>
      )}
    </div>
  );
};

export default Bookings;

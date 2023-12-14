import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./payment.css";

// Replace these paths with your actual logo and background image paths
import LogoImg from "../../assets/images/logo.png";
import BgImage from "../../assets/images/Home-bg-img.jpeg";
import { FaHome } from "react-icons/fa";

const generateRandomPaymentID = () => {
  return `PAY-${Math.random().toString(36).substring(7).toUpperCase()}`;
};

const Paymentstep = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    numOfPeople: "",
  });

  useEffect(() => {
    try {
      const storedUserData = JSON.parse(localStorage.getItem("formData"));
      if (storedUserData) {
        setFormData(storedUserData);
      }
    } catch (e) {
      setError(e.message);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleProceed = () => {
    // Extract data from location state
    const { date, numOfPeople, time, finalamount } = location.state;
    console.log("Date:", date);
    console.log("Number of People:", numOfPeople);
    console.log("Time:", time);
    console.log("Final Price:", finalamount);

    // Generate a random payment ID
    const paymentID = generateRandomPaymentID();

    // Prepare data for API request
    const orderData = {
      date: date || "N/A",
      numOfPeople: numOfPeople || "N/A",
      name: formData.name || "N/A",
      email: formData.email || "N/A",
      mobile: formData.mobile || "N/A",
      totalAmount: finalamount || 0, // Use finalamount instead of price
    };

    // Make the API call
    fetch("https://binge-be.onrender.com/postorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentID,
        totalPrice: orderData.totalAmount,
        dateTime: new Date(),
        name: orderData.name,
        phoneNumber: orderData.mobile,
        numberOfPeople: orderData.numOfPeople,
        email: orderData.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response here
        console.log("API Response:", data);

        // Continue with navigation or other actions as needed
        navigate("/whatsapp", {
          state: {
            ...orderData,
            paymentID,
            price: finalamount, // Include TotalAmount in the state
          },
        });
      })
      .catch((error) => {
        console.error("Error posting order:", error);
        // Handle the error as needed
      });
  };

  const selectedCake = sessionStorage.getItem('selectedCakeName');
  const selectedDeceration = sessionStorage.getItem('selectedDecoration');

  const generatePaymentData = () => {
    return {
      date: location.state.date || "N/A",
      numOfPeople: location.state.numOfPeople || "N/A",
      name: formData.name || "N/A",
      email: formData.email || "N/A",
      mobile: formData.mobile || "N/A",
      totalAmount: location.state.finalamount || 0,
    };
  };

  return (
    <div
      className="container-fluid p-0"
      id="wconatiner"
      style={{ backgroundImage: `url(${BgImage})`, backgroundSize: "cover" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg" id="shadowcard">
            <div className="card-body">
              <div
                className="header d-flex justify-content-between align-items-center"
                id="headers"
              >
                <FaHome
                  className="home-icon"
                  onClick={() => navigate("/")}
                  style={{
                    fontSize: "24px", // Adjust the font size as needed
                    color: "#d55f80", // Light pink color
                    cursor: "pointer", // Show pointer cursor on hover
                    marginLeft: "8px", // Add some left margin for spacing
                  }}
                />
                <img src={LogoImg} alt="Logo" className="logo" id="logos" />
              </div>
              <h1 className="card-title text-center mb-4" id="cardtitles">
                Payment Details
              </h1>
              {loading && (
                <p className="text-center" id="textcenters">
                  <i className="fas fa-spinner fa-spin"></i> Loading...
                </p>
              )}
              {error && (
                <p className="text-center text-danger" id="textdangers">
                  Error: {error}. Please refresh the page or try again later.
                </p>
              )}
              {!loading && !error && (
                <>
                  <div className="details-section" id="detailssections">
                    <table style={{ width: "100%", textAlign: "left" }}>
                      <tbody>
                        <tr>
                          <td style={{ paddingRight: "16px" }}>Date:</td>
                          <td>{generatePaymentData().date}</td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: "16px" }}>
                            Number of People:
                          </td>
                          <td>{generatePaymentData().numOfPeople}</td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: "16px" }}>Name:</td>
                          <td>{generatePaymentData().name}</td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: "16px" }}>Email:</td>
                          <td>{generatePaymentData().email}</td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: "16px" }}>
                            Phone Number:
                          </td>
                          <td>{generatePaymentData().mobile}</td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: "16px" }}>

                            Cake:
                          </td>
                          <td>{selectedCake}</td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: "16px" }}>
                            Deceration:
                          </td>
                          <td>{selectedDeceration}</td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: "16px" }}>

                            Total Amount:
                          </td>
                          <td>
                            <strong>
                              ${generatePaymentData().totalAmount}
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              <button
                className="btn btn-primary btn-block mt-4"
                onClick={handleProceed}
                id="btn-prime"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paymentstep;

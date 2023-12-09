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
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed to checkout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        alert(
          "Payment Successful! Your payment has been processed successfully."
        );

        const { date, numOfPeople, time, price } = location.state;
        console.log("Date:", date);
        console.log("Number of People:", numOfPeople);
        console.log("Time:", time);
        console.log("Final Price:", price);

        const paymentID = generateRandomPaymentID();

        navigate("/whatsapp", {
          state: {
            ...generatePaymentData(),
            paymentID,
          },
        });
      }
    });
  };

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
                    <p>
                      <span>Date:</span> {generatePaymentData().date}
                    </p>
                    <p>
                      <span>Number of People:</span>{" "}
                      {generatePaymentData().numOfPeople}
                    </p>
                    <p>
                      <span>Name:</span> {generatePaymentData().name}
                    </p>
                    <p>
                      <span>Email:</span> {generatePaymentData().email}
                    </p>
                    <p>
                      <span>Phone Number:</span> {generatePaymentData().mobile}
                    </p>
                    <p className="mb-0">
                      <span>Total Amount:</span>{" "}
                      <strong>${generatePaymentData().totalAmount}</strong>
                    </p>
                    <p className="mb-0">
                      <span>Payment ID:</span>{" "}
                      <strong>{location.state.paymentID}</strong>
                    </p>
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

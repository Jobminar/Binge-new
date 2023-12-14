import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./payment.css";
import LogoImg from "../../assets/images/logo.png";
import BgImage from "../../assets/images/Home-bg-img.jpeg";

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

  const handleProceed = async () => {
    const { date, numOfPeople, finalamount } = location.state;
    const paymentID = generateRandomPaymentID();

    const orderData = {
      date: date || "N/A",
      numOfPeople: numOfPeople || "N/A",
      name: formData.name || "N/A",
      email: formData.email || "N/A",
      mobile: formData.mobile || "N/A",
      totalAmount: finalamount || 0,
    };

    try {
      const response = await fetch("https://binge-be.onrender.com/postorders", {
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
      });

      const data = await response.json();
      console.log("API Response:", data);

      navigate("/whatsapp", {
        state: {
          ...orderData,
          paymentID,
          price: finalamount,
        },
      });
    } catch (error) {
      console.error("Error posting order:", error);
    }
  };

  const selectedCake = sessionStorage.getItem("selectedCakeName");
  const selectedDecoration = sessionStorage.getItem("selectedDecoration");

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
    <div className="container-fluid invoice-container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <img
                  src={LogoImg}
                  alt="Logo"
                  className="logo m-auto ms-lg-5"
                  onClick={() => navigate("/")}
                />
              </div>

              {loading && (
                <p className="text-light text-center">
                  <i className="fas fa-spinner fa-spin"></i> Loading...
                </p>
              )}
              {error && (
                <p className="text-danger text-center">
                  Error: {error}. Please refresh the page or try again later.
                </p>
              )}

              {!loading && !error && (
                <div className="details-section m-0 mb-0">
                  <ul className="payment-list">
                    <li>
                      <dt>Date:</dt>
                      <dd>{generatePaymentData().date}</dd>
                    </li>
                    <li>
                      <dt>Number of People:</dt>
                      <dd>{generatePaymentData().numOfPeople}</dd>
                    </li>
                    <li>
                      <dt>Name:</dt>
                      <dd>{generatePaymentData().name}</dd>
                    </li>
                    <li>
                      <dt>Email:</dt>
                      <dd>{generatePaymentData().email}</dd>
                    </li>
                    <li>
                      <dt>Phone Number:</dt>
                      <dd>{generatePaymentData().mobile}</dd>
                    </li>
                    <li>
                      <dt>Cake:</dt>
                      <dd>{selectedCake}</dd>
                    </li>
                    <li>
                      <dt>Decoration:</dt>
                      <dd>{selectedDecoration}</dd>
                    </li>
                    <li>
                      <dt>Total Amount:</dt>
                      <dd>
                        <strong>${generatePaymentData().totalAmount}</strong>
                      </dd>
                    </li>
                  </ul>
                </div>
              )}

              <button
                className="btn btn-primary btn-block mt-0"
                onClick={handleProceed}
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

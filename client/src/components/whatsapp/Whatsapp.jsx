// Whatsapp.js

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaPhone, FaClipboard, FaMoneyBillWave } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import BgImage from "../../assets/images/Home-bg-img.jpeg";
import LogoImg from "../../assets/images/logo.png";
import QRCodeImage1 from "../../assets/images/phonepe.jpeg";
import QRCodeImage2 from "../../assets/images/Googlepay.jpeg";
import "./Whatsapp.css"; // External CSS file for additional styling

const Whatsapp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const handleShareViaWhatsapp = () => {
    const { date, numOfPeople, name, email, mobile, totalAmount, paymentID } =
      location.state;

    const message = `Payment Details:
      Date: ${date}
      Number of People: ${numOfPeople}
      Name: ${name}
      Email: ${email}
      Mobile: ${mobile}
      Total Amount: ${totalAmount}
      Payment ID: ${paymentID}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const phoneNumbers = ["+91996382771", "+8074020058"];

  const handleDialNumber = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`);
  };

  const handleCopyNumber = (phoneNumber) => {
    navigator.clipboard.writeText(phoneNumber);
  };

  const handlePayment = () => {
    const paymentMessage =
      "To confirm the booking, transfer 700Rs as booking amount to 996382771.";

    const paymentLinkPhonePe = `https://phon.pe/${encodeURIComponent(
      paymentMessage
    )}`;
    const paymentLinkGooglePay = `https://pay.google.com/gp/v/${encodeURIComponent(
      paymentMessage
    )}`;

    window.open(paymentLinkPhonePe, "_blank");
    window.open(paymentLinkGooglePay, "_blank");
  };

  const generatePaymentData = () => {
    return {
      date: location.state.date || "N/A",
      numOfPeople: location.state.numOfPeople || "N/A",
      name: location.state.name || "N/A",
      email: location.state.email || "N/A",
      mobile: location.state.mobile || "N/A",
      totalAmount: location.state.totalAmount || 0,
      paymentID: location.state.paymentID || "N/A",
    };
  };
  return (
    <div className="grid-container">
      <animated.div style={{ ...fadeIn }} className="grid-item">
        <div className="header">
          <img src={LogoImg} alt="Logo" className="logo" />
          <h1 className="dynamic-effect">Share Payment Details via WhatsApp</h1>
          <button
            className="btn btn-home hover-effect"
            onClick={() => navigate("/")}
            title="Go Home"
          >
            <FaHome />
          </button>
        </div>
        <animated.div style={{ ...fadeIn }} className="grid-item">
          <button
            className="btn btn-success mt-3 hover-effect"
            onClick={handleShareViaWhatsapp}
          >
            Share via WhatsApp
          </button>
        </animated.div>
        <animated.div style={{ ...fadeIn }} className="grid-item phone-section">
          {phoneNumbers.map((phoneNumber, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
              <p>
                <strong>Phone Number:</strong> {phoneNumber}
              </p>
              <div className="btn-group" role="group">
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleDialNumber(phoneNumber)}
                >
                  <FaPhone /> Dial
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleCopyNumber(phoneNumber)}
                >
                  <FaClipboard /> Copy
                </button>
              </div>
            </div>
          ))}
        </animated.div>
      </animated.div>
      <animated.div style={{ ...fadeIn }} className="grid-item">
        <div className="payment-details">
          <p>
            <span style={{ fontSize: "24px" }}>Date:</span>{" "}
            {generatePaymentData().date}
          </p>
          <p>
            <span style={{ fontSize: "24px" }}>Number of People:</span>{" "}
            {generatePaymentData().numOfPeople}
          </p>
          <p>
            <span style={{ fontSize: "24px" }}>Name:</span>{" "}
            {generatePaymentData().name}
          </p>
          <p>
            <span style={{ fontSize: "24px" }}>Email:</span>{" "}
            {generatePaymentData().email}
          </p>
          <p>
            <span style={{ fontSize: "24px" }}>Phone Number:</span>{" "}
            {generatePaymentData().mobile}
          </p>
          <p className="mb-0">
            <span style={{ fontSize: "24px" }}>Total Amount:</span>{" "}
            <strong>${generatePaymentData().totalAmount}</strong>
          </p>
          <p className="mb-0">
            <span style={{ fontSize: "24px" }}>Payment ID:</span>{" "}
            <strong>{generatePaymentData().paymentID}</strong>
          </p>
        </div>
      </animated.div>
      <animated.div style={{ ...fadeIn }} className="grid-item qr-code-section">
        <img
          src={QRCodeImage1}
          alt="QR Code 1"
          className="img-fluid animated-image img-small"
        />
        <h1 className="or-heading">OR</h1>
        <img
          src={QRCodeImage2}
          alt="QR Code 2"
          className="img-fluid animated-image img-small"
        />
      </animated.div>

      <animated.div style={{ ...fadeIn }} className="grid-item payment-section">
        <p className="payment-message">
          To confirm the booking, transfer 700Rs as booking amount to 996382771.
        </p>
        <button className="btn btn-success mt-3" onClick={handlePayment}>
          <FaMoneyBillWave /> Pay Now
        </button>
      </animated.div>
    </div>
  );
};

export default Whatsapp;

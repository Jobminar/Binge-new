// Whatsapp.js

import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
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

  const phoneNumbers = ["+91996382771", "+918074020058"];

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
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <Link className="navbar-brand m-1" to="/">
          <img
            src={LogoImg}
            alt="Logo"
            className="logo"
            onClick={() => navigate("/")}
          />
        </Link>
      </nav>

      {/* Main Content */}
      <main className="container mt-3">
        {/* Share via WhatsApp Button */}
        <div className="row">
          <div className="col">
            <h2
              className="navbar-text dynamic-effect"
              style={{ marginLeft: "auto", marginRight: "1rem" }}
            >
              To confirm the booking, transfer Rs 700/- as booking amount to
              displayed QR codes
            </h2>
          </div>
        </div>

        {/* Phone Section */}
        <div className="row mt-3">
          <div className="row mt-3">
            <div className="col-md-5">
              <img
                src={QRCodeImage1}
                alt="QR Code 1"
                className="img-fluid animated-image img-large"
                style={{ objectFit: "cover", height: "100%" }}
              />
            </div>
            <div className="col-md-2 d-flex align-items-center justify-content-center">
              <h1 className="or-heading m-0 p-0" style={{ fontSize: "3rem" }}>
                OR
              </h1>
            </div>
            <div className="col-md-5">
              <img
                src={QRCodeImage2}
                alt="QR Code 2"
                className="img-fluid animated-image img-large"
                style={{ objectFit: "cover", height: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="row mt-3">
          <div className="mb-3 p-3">
            <h3>
              Please Share the payment details or Screen Shots via Whatsapp on:{" "}
            </h3>
          </div>
          {phoneNumbers.map((phoneNumber, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="mb-3 p-3">
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
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer mt-3">
        {" "}
        <ul>
          <li>
            <h4>NOTE:</h4>
          </li>

          <li>
            We collect an advance amount of 700/- towards the confirmation of
            your booking. Partial advance amount (Rs 500/-) is refundable if you
            cancel the slot 72 hours prior to your booking.
          </li>
          <li>
            {" "}
            <h4
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => navigate("/refund")}
            >
              To know more
            </h4>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Whatsapp;

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
      Total Amount: $${totalAmount}
      Payment ID: ${paymentID}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)};`

    window.open(whatsappUrl, "_blank");
  };

  const phoneNumbers = ["+91996382771", "+8074020058"]; // Replace with your actual phone numbers

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

    // Open payment links
    window.open(paymentLinkPhonePe, "_blank");
    window.open(paymentLinkGooglePay, "_blank");
  };

  return (
    <div
      className="gradient-background"
      style={{ backgroundImage: `url(${BgImage}) `}}
    >
      {/* ... (rest of the code) */}
      <animated.div style={{ ...fadeIn }} className="gradient-background">
        <div className="overlay">
          <div className="container">
            <div className="row justify-content-center align-items-center full-height">
              <div className="col-lg-8 text-center">
                <animated.div style={fadeIn}>
                  <div className="card whatsapp-card">
                    <div className="card-body">
                      <div className="header">
                        <img src={LogoImg} alt="Logo" className="logo" />
                        <h1 className="dynamic-effect">
                          Share Payment Details via WhatsApp
                        </h1>
                        <button
                          className="btn btn-home hover-effect"
                          onClick={() => navigate("/")}
                          title="Go Home"
                        >
                          <FaHome />
                        </button>
                      </div>
                      <div className="payment-details">
                        {/* ... (existing code) */}
                      </div>
                      <div className="qr-code-section">
                        <animated.img
                          src={QRCodeImage1}
                          alt="QR Code 1"
                          className="img-fluid animated-image"
                        />
                        <animated.img
                          src={QRCodeImage2}
                          alt="QR Code 2"
                          className="img-fluid animated-image"
                        />
                      </div>
                      <div className="phone-section">
                        {phoneNumbers.map((phoneNumber, index) => (
                          <div key={index}>
                            <p>
                              <strong>Phone Number:</strong> {phoneNumber}
                            </p>
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
                        ))}
                      </div>
                      <div className="payment-section">
                        <p className="payment-message">
                          To confirm the booking, transfer 700Rs as booking
                          amount to 996382771.
                        </p>
                        <button
                          className="btn btn-success mt-3"
                          onClick={handlePayment}
                        >
                          <FaMoneyBillWave /> Pay Now
                        </button>
                      </div>
                      <button
                        className="btn btn-success mt-3 hover-effect"
                        onClick={handleShareViaWhatsapp}
                      >
                        Share via WhatsApp
                      </button>
                    </div>
                  </div>
                </animated.div>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default Whatsapp;
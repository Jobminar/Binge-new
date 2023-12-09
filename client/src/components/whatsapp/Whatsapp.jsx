import { useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import BgImage from "../../assets/images/Home-bg-img.jpeg";
import LogoImg from "../../assets/images/logo.png";
import "./Whatsapp.css"; // External CSS file for styling

const Whatsapp = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="whatsapp-container">
      <div
        className="gradient-background"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        <div className="overlay">
          <div className="row justify-content-center align-items-center full-height">
            <div className="col-lg-8 text-center">
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
                    <p>
                      <strong className="dynamic-effect">Date:</strong>{" "}
                      {location.state.date}
                    </p>
                    <p>
                      <strong className="dynamic-effect">
                        Number of People:
                      </strong>{" "}
                      {location.state.numOfPeople}
                    </p>
                    <p>
                      <strong className="dynamic-effect">Name:</strong>{" "}
                      {location.state.name}
                    </p>
                    <p>
                      <strong className="dynamic-effect">Email:</strong>{" "}
                      {location.state.email}
                    </p>
                    <p>
                      <strong className="dynamic-effect">Mobile:</strong>{" "}
                      {location.state.mobile}
                    </p>
                    <p>
                      <strong className="dynamic-effect">Total Amount:</strong>{" "}
                      ${location.state.totalAmount}
                    </p>
                    <p>
                      <strong className="dynamic-effect">Payment ID:</strong>{" "}
                      {location.state.paymentID}
                    </p>
                  </div>
                  <button
                    className="btn btn-success mt-3 hover-effect"
                    onClick={handleShareViaWhatsapp}
                  >
                    Share via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whatsapp;

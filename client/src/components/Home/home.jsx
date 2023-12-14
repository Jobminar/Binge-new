/* eslint-disable react/no-unescaped-entities */
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import grid from "../../assets/images/grid.png";
import mini from "../../assets/images/mini.png";
import large from "../../assets/images/large.png";
import call from "../../assets/images/icon _call_call.png";
import youtube from "../../assets/images/icon _youtube with circle_youtube.png";
import insta from "../../assets/images/icon _instagram with circle icon_insta.png";
import facebook from "../../assets/images/icon _facebook_facebook.png";
// import Navbar from './navbar';

const Home = () => {
  const navigate = useNavigate();
  const openInstagram = () => {
    window.open(
      "https://www.instagram.com/binge__in?igshid=MmVlMjlkMTBhMg%3D%3D",
      "_blank"
    );
  };

  const openFacebook = () => {
    window.open("https://www.facebook.com/your_facebook_page/", "_blank");
  };

  const openYoutube = () => {
    window.open("https://www.youtube.com/your_youtube_channel/", "_blank");
  };

  const openCall = () => {
    // Replace the phone number with the actual phone number
    window.open("tel:+918074020058");
  };
  const openLocation = () => {
    window.open("https://maps.app.goo.gl/b5xtHs2DNd3oRuVX6?g_st=ic", "_blank");
  };
  return (
    <>
      <div className="Beigein-home-con">
        <div className="main-section">
          <div>
            <img src={logo} alt="logo" className="logo" />
            <h1>
              Step into an unforgettable world of cinematic luxury and
              celebration. Book your private theatre experience and elevate
              every moment with us.
            </h1>
          </div>
          <div
            className="grid-con"
            onClick={() => {
              navigate("/navbar");
            }}
          >
            <img src={grid} alt="grid" />
          </div>
        </div>
        <p className="mobileview-text">
          Step into an unforgettable world of cinematic luxury and celebration.
          Book your private theatre experience and elevate every moment with us
        </p>
        <div className="theater-part">
          <div className="routing-home">
            <div className="mini-con">
              <img src={mini} />
              <p>
                {/* Experience intimate cinematic moments and celebrate in style
                within our mini private theatre's exclusive ambiance. */}
                1799 for 4 or less people
                <br />
                399 per extra person <br />
                Decoration is included <br />
                you can get your own food and cake
                <br />
              </p>
              <button
                onClick={() => {
                  navigate("/minihome");
                }}
              >
                BOOK STANDARD
              </button>
            </div>
            <div className="large-con">
              <img src={large} />
              <p>
                {/* Immerse yourself in grand cinematic experiences and elevate
                celebrations within our spacious and versatile large private
                theatre. */}
                2999 for 6 or less people <br />
                More that 4 people 399 per person <br />
                Decoration is included in the price <br />
                you can get your own food and cake
                <br />
              </p>
              <button
                onClick={() => {
                  navigate("/largehome");
                }}
              >
                BOOK LUXI
              </button>
            </div>
          </div>
          <div className="content-home">
            <div className="birthday">
              <h1>BIRTHDAY PARTY</h1>
              <p>
                Celebrate your birthday in style with our private theatre
                experience. Enjoy watching your favorite movies or shows.
              </p>
            </div>
            <div className="birthday">
              <h1>Anniversary</h1>
              <p>
                Mark your milestone anniversary with a romantic and intimate
                private theatre celebration.
              </p>
            </div>
            <div className="birthday">
              <h1>Party & Events</h1>
              <p>
                Whether it's a reunion, farewell, or any other social gathering,
                our private theatres provide a unique and exclusive venue
              </p>
            </div>
            <div className="socialmedia-links">
              <img src={insta} alt="insta" onClick={openInstagram} />
              <img src={facebook} alt="facebook" onClick={openFacebook} />
              <img src={youtube} alt="youtube" onClick={openYoutube} />
              <img src={call} alt="call" onClick={openCall} />
              <FaMapMarkerAlt
                onClick={openLocation}
                style={{
                  color: "black",
                  fontSize: "2.2rem",
                  backgroundColor: "#B46161",
                  borderRadius: "100px",
                  padding: "5px", // Optional padding for visual appeal
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

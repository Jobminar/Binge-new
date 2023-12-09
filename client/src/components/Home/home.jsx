/* eslint-disable react/no-unescaped-entities */
import "./Home.css";
import { useNavigate } from "react-router-dom";

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
                Experience intimate cinematic moments and celebrate in style
                within our mini private theatre's exclusive ambiance.
              </p>
              <button
                onClick={() => {
                  navigate("/minihome");
                }}
              >
                BOOK MINI
              </button>
            </div>
            <div className="large-con">
              <img src={large} />
              <p>
                Immerse yourself in grand cinematic experiences and elevate
                celebrations within our spacious and versatile large private
                theatre.
              </p>
              <button
                onClick={() => {
                  navigate("/largehome");
                }}
              >
                BOOK LARGE
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
              <img src={insta} alt="insta" />
              <img src={facebook} alt="facebook" />
              <img src={youtube} alt="youtube" />
              <img src={call} alt="call" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

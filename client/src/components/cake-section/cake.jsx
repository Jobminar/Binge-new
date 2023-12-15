import "./cake.css";
// import sampleData from "./cakedata.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import grid from "../../assets/images/grid.png";
import calender from "../../assets/images/calender-logo.png";
import timelogo from "../../assets/images/time-logo.png";
import nextstep from "../../assets/images/Frame 12.png";
import { useState } from "react";
// import CakeList from "./getcake.jsx";

const Cake = () => {
  const location = useLocation();
  const { date, numOfPeople, time, price } = location.state || {};
  const [cakes, setCakes] = useState([]);
  const [Total, setTotal] = useState(0);
  const [priceFromState, setPriceFromState] = useState(price);
  const navigate = useNavigate();

  const timeinput = "1:00 pm to 3:00 pm";

  // amountcount
  const [count, setCount] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    // Initialize priceFromState when price changes
    setPriceFromState(price || 0);
  }, [price]);

  const calculateCount = (cakeprice, index, cakeName) => {
    const updatedCheckedItems = {};
    const isAlreadyChecked = checkedItems[index];

    if (isAlreadyChecked) {
      setCheckedItems({});
      sessionStorage.removeItem("selectedCakeName");
    } else {
      updatedCheckedItems[index] = true;
      setCheckedItems(updatedCheckedItems);
      setCount((prevCount) => prevCount + cakeprice);
      sessionStorage.setItem("selectedCakeName", cakeName);
    }
  };

  //   skip button functionality
  const isSkipButtonVisible = Object.values(checkedItems).every(
    (value) => !value
  );

  const handleSkip = () => {
    handlecakeandtheater();
  };
  // data send
  const sendamountcake = priceFromState + count;
  const handlecakeandtheater = () => {
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("noofpeople:", numOfPeople);
    console.log("Send Amount Cake:", sendamountcake);

    navigate("/decoration", {
      state: {
        date,
        numOfPeople,
        time,
        sendamountcake: Total,
      },
    });
  };

  useEffect(() => {
    console.log("count:", count);
    console.log("priceFromState:", priceFromState);
    console.log("Total:", count + priceFromState);
    setTotal(count + priceFromState);
  }, [count, priceFromState]);
  // get cake----------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://binge-be.onrender.com/getcakes", {
          headers: {
            // Your headers here if needed
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCakes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setError('Error fetching data. Please try again later.');
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="cake-con">
        <div className="main-cake-con">
          <div className="logo-img">
            <img src={logo} alt="logo" id="logo-img" />
          </div>

          {/* <div className="headding-cake">
            <h1>MINI</h1>
            <p>Theater</p>
          </div> */}
          <img
            src={grid}
            alt="grid"
            className="grid-img-beigein"
            onClick={() => {
              navigate("/navbar");
            }}
          />
        </div>
        <div className="dateandtime">
          <img src={calender} alt="calender" />
          <p>{date}</p>
          <img src={timelogo} alt="time" />
          <p>{timeinput}</p>
        </div>
        <h1 className="cake-headding">CAKE</h1>
        <div className="cake-shop">
          {cakes.map((cake, index) => (
            <div key={index}>
              <div className="cake-box">
                <img
                  className="cake-image"
                  src={`data:image/jpeg;base64,${cake.image}`}
                  alt={cake.cakeName}
                />

                <p className="cakename">{cake.cakeName}</p>
                <p className="price">{cake.price}</p>
                <input
                  type="checkbox"
                  id="checkbox1"
                  name="checkbox1"
                  onClick={() =>
                    calculateCount(parseInt(cake.price), index, cake.cakeName)
                  }
                  checked={checkedItems[index]}
                />
              </div>
            </div>
          ))}
        </div>

        <h1 className="result">
          <h1 className="result">
            Total : <span>{Total}</span>
          </h1>
        </h1>
        <div>
          {isSkipButtonVisible && (
            <div className="skipp-button" onClick={handleSkip}>
              <h1 style={{ color: "#895D5F" }}>SKIP</h1>
            </div>
          )}
          <div
            className="nextstep"
            onClick={() => {
              handlecakeandtheater();
            }}
          >
            <img
              src={nextstep}
              alt="nextstep"
              onClick={() => {
                navigate("/deceration");
              }}
            />
          </div>
        </div>

        {/* <h1 className='final'>{sendamountcake}</h1> */}
      </div>
    </>
  );
};
export default Cake;

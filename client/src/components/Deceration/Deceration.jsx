import "./Deceration.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Decerationdata from "./Decerationdata";

import logo from "../../assets/images/logo.png";
import grid from "../../assets/images/grid.png";
import calender from "../../assets/images/calender-logo.png";
import time from "../../assets/images/time-logo.png";
import nextstep from "../../assets/images/Frame 12.png";

const Deceration = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const timeinput = "1:00 pm to 3:00 pm";
  const date = "20 November 2023";

  const [count, setCount] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});

  const calculateCount = (decorationPrice, index) => {
    const updatedCheckedItems = { ...checkedItems };
    updatedCheckedItems[index] = !updatedCheckedItems[index];

    setCheckedItems(updatedCheckedItems);

    const isChecked = updatedCheckedItems[index];
    const increment = isChecked ? decorationPrice : -decorationPrice;
    setCount(count + increment);
  };

  const pricedecoration = location.state && location.state.sendamountcake;
  const pricetotalbefore = parseInt(pricedecoration) || 0;

  const finalamount = count + pricetotalbefore;

  const handleDecoration = () => {
    console.log("Date:", location.state.date);
    console.log("Number of People:", location.state.numOfPeople);
    console.log("Time:", location.state.time);
    console.log("Final Amount:", finalamount);

    navigate("/payment", {
      state: {
        date: location.state.date,
        numOfPeople: location.state.numOfPeople,
        time: location.state.time,
        finalamount,
      },
    });
  };

  return (
    <>
      <div className="deceration-con">
      <div className="main-cake-con">
          <div className="logo-img">
           <img src={logo} alt="logo" id="logo-img" />
          </div>
        
          <div className="headding-cake">
            <h1>MINI</h1>
            <p>Theater</p>
          </div>
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
          <img src={time} alt="time" />
          <p>{timeinput}</p>
        </div>
        <h1 className="cake-headding">DECERATION</h1>
        <div className="deceration-shop">
          {Decerationdata.map((item, index) => (
            <div key={index}>
              <div className="cake-box">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="cake-image"
                />
                <p className="cakename">{item.name}</p>
                <p className="price">{item.price}</p>
                <input
                  type="checkbox"
                  id="checkbox1"
                  name="checkbox1"
                  onClick={() => calculateCount(parseInt(item.price), index)}
                  checked={checkedItems[index]}
                />
              </div>
            </div>
          ))}
        </div>
        <h1 className="result">
          Total :  <span>{count + pricetotalbefore}</span>
        </h1>
        <div
          className="nextstep"
          onClick={() => {
            handleDecoration();
          }}
        >
          <img
            src={nextstep}
            alt="nextstep"
            onClick={() => {
              navigate("/payment");
            }}
          />
        </div>
        {/* <h1 className='final'>{finalamount}</h1> */}
      </div>
    </>
  );
};
export default Deceration;

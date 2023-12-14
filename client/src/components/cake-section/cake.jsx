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
  const [cakes, setCakes] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const { date, numOfPeople, time, price } = location.state || {};

  

  // amountcount
  const [count, setCount] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});

  const calculateCount = (cakeprice, index, cakeName) => {
    const updatedCheckedItems = {};
  
    const isAlreadyChecked = checkedItems[index];
  
    if (isAlreadyChecked) {
      setCheckedItems({});
      setCount(0);
      sessionStorage.removeItem('selectedCakeName'); // Remove from session storage if unchecked
    } else {
      updatedCheckedItems[index] = true;
      setCheckedItems(updatedCheckedItems);
      setCount(cakeprice);
      sessionStorage.setItem('selectedCakeName', cakeName); // Store cake name in session storage
    }
  };
  
  

  //   data recive

  const priceFromState =  1799; //need to change price here

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
        sendamountcake,
      },
    });
  };

// get cake----------------------------------------
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://binge-be.onrender.com/getcakes', {
        headers: {
          // Your headers here if needed
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setCakes(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again later.');
    } finally {
      // setLoading(false);
    }
  };

  fetchData();
}, []);

// get date and time
var sessionData = sessionStorage.getItem('selectedSlot');
if (sessionData) {
  var slotselctionData = JSON.parse(sessionData);
  console.log(slotselctionData);
} else {
  console.log('No data found in sessionStorage for key "slotselction"');
}
const  dates= slotselctionData.date;
const timeinput = slotselctionData.time;


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
          <p>{dates}</p>
          <img src={timelogo} alt="time" />
          <p>{timeinput}</p>
        </div>
        <h1 className="cake-headding">CAKE</h1>
        <div className="cake-shop">
          {cakes.map((cake, index) => (
            <div key={index}>
              <div className="cake-box">
              
                <img className="cake-image" src={`data:image/jpeg;base64,${cake.image}`} alt={cake.cakeName} />

                
             
               
                <p className="cakename">{cake.cakeName}</p>
                <p className="price">{cake.price}</p>
                <input
                  type="checkbox"
                  id="checkbox1"
                  name="checkbox1"
                  onClick={() => calculateCount(parseInt(cake.price), index, cake.cakeName)}
                  checked={checkedItems[index]}
                />
              </div>
            </div>
          ))}
          
        </div>

        <h1 className="result">
          Total :  <span>{count + priceFromState}</span>
        </h1>
      <div className="cake-buttons">
        <div className="skipp-button" onClick={()=>{navigate('/decoration')}}>
           <h1>SKIP</h1>
        </div>
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

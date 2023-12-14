import "./Deceration.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


import logo from "../../assets/images/logo.png";
import grid from "../../assets/images/grid.png";
import calender from "../../assets/images/calender-logo.png";
import time from "../../assets/images/time-logo.png";
import nextstep from "../../assets/images/Frame 12.png";

const Deceration = () => {
  const [decorations, setDecorations] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();



  const [count, setCount] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});

  const calculateCount = (decorationPrice, decorationName, index) => {
    const updatedCheckedItems = {};
    updatedCheckedItems[index] = true;
  
    setCheckedItems(updatedCheckedItems);
  
    const increment = decorationPrice;
    setCount(increment);
  
    // Store decorationName in sessionStorage
    sessionStorage.setItem('selectedDecoration', decorationName);
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://binge-be.onrender.com/getdecorations', {
          headers: {
            // Your headers here if needed
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setDecorations(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // setError('Error fetching data. Please try again later.');
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

// date and time
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
      <div className="deceration-con">
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
          <img src={time} alt="time" />
          <p>{timeinput}</p>
        </div>
        <h1 className="cake-headding">DECERATION</h1>
        <div className="deceration-shop">
          {decorations.map((deceration, index) => (
            <div key={index}>
              <div className="cake-box">
             
              <img className="cake-image" src={`data:image/jpeg;base64,${deceration.image}`} alt={deceration.decorationName} />
              
                <p className="cakename">{deceration.decorationName}</p>
                {/* <p className="price">{deceration.price}</p> */}
                <input
                    type="checkbox"
                    id="checkbox1"
                    name="checkbox1"
                    onClick={() => calculateCount(parseInt(deceration.price), deceration.decorationName, index)}
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

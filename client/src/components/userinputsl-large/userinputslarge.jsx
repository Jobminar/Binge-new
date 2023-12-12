import "../userinputs/userinputs.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import grid from "../../assets/images/grid.png";
import calender from "../../assets/images/calender-logo.png";
import time from "../../assets/images/time-logo.png";
import nextstep from "../../assets/images/Frame 12.png";
import FormComponentlarge from "../userinputs/formlarge";

const getLocalStorage = (key) => {
    try {
      const value = localStorage.getItem(key);
      if (value === null) {
        console.log(`No data found for key '${key}' in local storage.`);
        return null;
      }
      return JSON.parse(value);
    } catch (error) {
      console.error('Error getting data from local storage:', error);
      return null;
    }
  };
const Userinputslarge = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    numOfPeople: "",
  });
  //setting total cost__________________________________
  const [Total, setTotal] = useState(0);
  
  useEffect(() => {
    // Clear local storage and session storage data on component load
    localStorage.clear();

  
    // Check if user details are available in local storage
    const storedUserData = JSON.parse(localStorage.getItem("formData"));
  
    if (storedUserData) {
      // Set form data from local storage
      setFormData({
        name: storedUserData.name || "",
        mobile: storedUserData.mobile || "",
        email: storedUserData.email || "",
        numOfPeople: storedUserData.numOfPeople || "",
      });
    }
  
    // Calculate Total initially and when parsedExtraCost changes
    const calculateTotal = () => {
      const extraCost = getLocalStorage('extraCost');
      const parsedExtraCost = extraCost ? parseInt(extraCost) : 0;
      const Totallarge = 2999 + parsedExtraCost;
      setTotal(Totallarge);
    };
  
    calculateTotal(); // Calculate Total initially
  
    // Watch for changes in parsedExtraCost and recalculate Total
    const interval = setInterval(() => {
      calculateTotal();
    }, 1000); // Set the interval time according to your requirement
  
    return () => clearInterval(interval); // Clean up the interval
  }, [getLocalStorage]); // Trigger useEffect when getLocalStorage changes
  


  const handleNextButtonClick = () => {
    // Validate form data
    if (!formData.name || !formData.mobile ) {
      alert("Please fill out the form completely before proceeding.");
      return;
    }

    // Store form data in local storage
    localStorage.setItem("formData", JSON.stringify(formData));

    // Navigate to the next page
  // Get the extraCost from local storage
// Get the extraCost from local storage


const extraCost = getLocalStorage('extraCost');

// If extraCost exists in local storage, parse it as an integer; otherwise, use 0 as default
const parsedExtraCost = extraCost ? parseInt(extraCost) : 0;
// const Totallarge = 2999 + parsedExtraCost
navigate("/cakemain", {
  state: {
    date,
    numOfPeople: formData.numOfPeople,
    time,
    price: 2500 + parsedExtraCost, // Calculating price by adding 2500 with the retrieved extraCost
  },
});

// Display a success message
alert("Form details submitted successfully!");

  };


  // gettime and date

   // get time and date 
  var sessionData = sessionStorage.getItem('selectedSlot');
  if (sessionData) {
    var slotselctionData = JSON.parse(sessionData);
    console.log(slotselctionData);
  } else {
    console.log('No data found in sessionStorage for key "slotselction"');
  }
  const  date= slotselctionData.date;
  const timeinput = slotselctionData.time;

  return (
    <>
      <div className="miniinput-con">
      <div className="main-cake-con">
          <div className="logo-img">
           <img src={logo} alt="logo" id="logo-img" />
          </div>
        
          <div className="headding-cake">
            <h1>LARGE</h1>
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
        <div className="inputs-con">
          {/* Render the form component with form data and setter function */}
          <FormComponentlarge formData={formData} setFormData={setFormData} />
        </div>
        
        <div>
          <div className="nextstep-result-con">
            <div className="result-con">

          <h1 className="result-input">Total: {Total}</h1>
          <p className="taxes">(All tax Included)</p>
          </div>
          <div className="nextstep">
            <img src={nextstep} alt="nextstep" onClick={handleNextButtonClick} />
          </div>
          </div>
         
        </div>
       
      </div>
    </>
  );
};

export default Userinputslarge;

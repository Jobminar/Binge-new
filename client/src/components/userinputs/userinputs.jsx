import "./userinputs.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "./form";
import logo from "../../assets/images/logo.png";
import grid from "../../assets/images/grid.png";
import calender from "../../assets/images/calender-logo.png";
import time from "../../assets/images/time-logo.png";
import nextstep from "../../assets/images/Frame 12.png";

const Userinputs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    numOfPeople: "",
  });

  useEffect(() => {
    // Clear local storage and session storage data on component load
    localStorage.clear();
    sessionStorage.clear();

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
  }, []);

  const handleNextButtonClick = () => {
    // Validate form data
    if (!formData.name || !formData.mobile || !formData.numOfPeople) {
      alert("Please fill out the form completely before proceeding.");
      return;
    }

    // Store form data in local storage
    localStorage.setItem("formData", JSON.stringify(formData));

    // Navigate to the next page
    navigate("/cakemain", {
      state: {
        date,
        numOfPeople: formData.numOfPeople,
        time,
        price: 2500, // You can set the default price here or retrieve it from elsewhere
      },
    });

    // Display a success message
    alert("Form details submitted successfully!");
  };

  const timeinput = "1:00 pm to 3:00 pm";
  const date = "20 November 2023";

  return (
    <>
      <div className="cake-con">
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
        <div className="inputs-con">
          {/* Render the form component with form data and setter function */}
          <FormComponent formData={formData} setFormData={setFormData} />
        </div>
        <div className="events">
            <div className="events-sub">
                <input type="checkbox"/>
                <label>BIRTHDAY PARTY</label>
            </div>
            <div className="events-sub">
                <input type="checkbox"/>
                <label>Anniversary</label>
            </div>
            <div className="events-sub">
                <input type="checkbox"/>
                <label>Party & Events</label>
            </div>
        </div>
        <div>
          <div className="nextstep-result-con">
            <div className="result-con">

          <h1 className="result-input">Total: 2500</h1>
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

export default Userinputs;

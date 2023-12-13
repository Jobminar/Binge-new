import React, { useState, useEffect } from "react";
import PricingPopup from "./PricingPopup";
import "react-datepicker/dist/react-datepicker.css";

const TheatrePrice = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await fetch("https://binge-be.onrender.com/getmaxi");
      const data1 = await response.json();
      setData(data1);
    } catch (error) {
      console.log(error, "...........");
    }
  };

  const [data1, setData1] = useState([]);
  useEffect(() => {
   
const fetchData1=async()=>{
  try{
    const responce=await fetch("https://binge-be.onrender.com/getmini")
    const trans=await responce.json()
    setData1(trans)

  }
  catch(error){
  console.log("error display",error)
  }
}

fetchData1()

  }, []);

  const handleEditTheater = (id) => {
    
    const theaterToEdit = data.find((theater) => theater.id === id);

    if (theaterToEdit) {
      setNewPricing(theaterToEdit.price);
      setNoOfPeople(theaterToEdit.numberOfPeople);
      setIsPricingInputSelected(true);
      setIsNoOfPeopleInputSelected(true);

      
      handleShowPricingPopup();
    }
  };

  

  const handleUpdateTheater = async (id, updatedData) => {
    try {
      const response = await fetch(`https://binge-be.onrender.com/updatemaxi/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log("Theater data updated successfully!");
        fetchData(); // Update the local data after updating
      } else {
        console.error("Failed to update theater data");
      }
    } catch (error) {
      console.error("Error updating theater data:", error);
    }
  };
  const handleEditSubmit = (id) => {
    const updatedTheaterData = {
      price: newPricing,
      numberOfPeople: noOfPeople,
    };

    handleUpdateTheater(id, updatedTheaterData);
    handleClosePricingPopup();
  };





  
  const [showPricingPopup, setShowPricingPopup] = useState(false);
  const [newPricing, setNewPricing] = useState(1000);
  const [noOfPeople, setNoOfPeople] = useState(0);

  const [miniPrices, setMiniPrices] = useState({
    pricing: data.length > 0 ? data[0].price : "",
    noOfPeople: data.length > 0 ? data[0].numberOfPeople : "",
  });

  const [maxPrices, setMaxPrices] = useState({
    pricing: "",
    noOfPeople: "",
  });

  const [isPricingInputSelected, setIsPricingInputSelected] = useState(false);
  const [isNoOfPeopleInputSelected, setIsNoOfPeopleInputSelected] =
    useState(false);

  const handleShowPricingPopup = () => setShowPricingPopup(true);
  const handleClosePricingPopup = () => setShowPricingPopup(false);

  const handleIncreasePricing = () => {
    if (isPricingInputSelected) {
      setNewPricing((prevPricing) => prevPricing + 1);
    } else {
      setIsPricingInputSelected(true);
    }
  };

  const handleDecreasePricing = () => {
    if (isPricingInputSelected) {
      setNewPricing((prevPricing) => Math.max(prevPricing - 1, 0));
    } else {
      setIsPricingInputSelected(true);
    }
  };

  const handlePricingInputClick = () => {
    setIsPricingInputSelected(true);
  };

  const handleIncreaseNoOfPeople = () => {
    if (isNoOfPeopleInputSelected) {
      setNoOfPeople((prevNoOfPeople) => prevNoOfPeople + 1);
    } else {
      setIsNoOfPeopleInputSelected(true);
    }
  };

  const handleDecreaseNoOfPeople = () => {
    if (isNoOfPeopleInputSelected) {
      setNoOfPeople((prevNoOfPeople) => Math.max(prevNoOfPeople - 1, 0));
    } else {
      setIsNoOfPeopleInputSelected(true);
    }
  };

  const handleNoOfPeopleInputClick = () => {
    setIsNoOfPeopleInputSelected(true);
  };

  const handlePricingSubmit = () => {
    const miniValues = calculateMiniValues(newPricing, noOfPeople);
    const maxValues = calculateMaxValues(newPricing, noOfPeople);

    setMiniPrices(miniValues);
    setMaxPrices(maxValues);

    handleClosePricingPopup();

    postTheaterData({
      price: newPricing,
      numberOfPeople: noOfPeople,
    });
  };

  const calculateMiniValues = (pricing, noOfPeople) => {
    return {
      pricing: pricing * 0.8,
      noOfPeople: noOfPeople + 2,
    };
  };

  const calculateMaxValues = (pricing, noOfPeople) => {
    return {
      pricing: pricing * 1.2,
      noOfPeople: noOfPeople + 5,
    };
  };

  return (
    <div id="main-container" className="mt-3">
      <h2 id="main-title" className="text-center mb-4">
        Theatre Pricing
      </h2>

      <button
        id="pricing-popup-button"
        type="button"
        className="btn btn-primary mb-3 custom-button"
        // onClick={handleShowPricingPopup}
        onClick={handleEditSubmit}
      >
        Add Pricing
      </button>

      <PricingPopup
        show={showPricingPopup}
        handleClose={handleClosePricingPopup}
        handleIncreasePricing={handleIncreasePricing}
        handleDecreasePricing={handleDecreasePricing}
        handlePricingInputClick={handlePricingInputClick}
        handleIncreaseNoOfPeople={handleIncreaseNoOfPeople}
        handleDecreaseNoOfPeople={handleDecreaseNoOfPeople}
        handleNoOfPeopleInputClick={handleNoOfPeopleInputClick}
        handlePricingSubmit={handlePricingSubmit}
        newPricing={newPricing}
        setNewPricing={setNewPricing}
        noOfPeople={noOfPeople}
        setNoOfPeople={setNoOfPeople}
      />

      <div>
        <h3>MINI:</h3>
        {data.map((ele, ind) => (
          <div key={ind}>
            <div>Pricing: {ele.price}<button onClick={() => handleEditTheater(ele.id)}>Edit</button></div>
            <div>No of People: {ele.numberOfPeople}<button onClick={() => handleEditTheater(ele.id)}>Edit</button></div>

            </div>
        ))}
       
        
        


      </div>


      <div>
        <h3>MAX:</h3>
      

{data1.map((ele, ind) => (
          <div key={ind}>
            <div>Pricing: {ele.price}</div>
            <div>No of People: {ele.numberOfPeople}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheatrePrice;

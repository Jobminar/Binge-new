import React, { useState, useEffect } from "react";
import PricingPopup from "./PricingPopup";
import "react-datepicker/dist/react-datepicker.css";

const TheatrePrice = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/gettheater");
        const data1 = await response.json();
        setData(data1);
      } catch (error) {
        console.log(error, "...........");
      }
    };
    fetchData();
  }, []);

  const [showPricingPopup, setShowPricingPopup] = useState(false);
  const [newPricing, setNewPricing] = useState(1000);
  const [noOfPeople, setNoOfPeople] = useState(0);

  const [miniPrices, setMiniPrices] = useState({
    pricing: data.length > 0 ? data[0].price : "", // Assuming data is an array of objects
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
//commit the data
  return (
    <div id="main-container" className="mt-3">
      <h2 id="main-title" className="text-center mb-4">
        Theatre Pricing
      </h2>

      <button
        id="pricing-popup-button"
        type="button"
        className="btn btn-primary mb-3 custom-button"
        onClick={handleShowPricingPopup}
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
            <div>Pricing: {ele.price}</div>
            <div>No of People: {ele.numberOfPeople}</div>
          </div>
        ))}
        <p>No of People: {miniPrices.noOfPeople}</p>
      </div>
      <div>
        <h3>MAX:</h3>
        <p>Pricing: {maxPrices.pricing}</p>
        <p>No of People: {maxPrices.noOfPeople}</p>
      </div>
    </div>
  );
};

export default TheatrePrice;

import { useState } from "react";
import PricingPopup from "./PricingPopup";
import "react-datepicker/dist/react-datepicker.css";

const TheatrePrice = () => {
  // State for showing/hiding Pricing Popup
  const [showPricingPopup, setShowPricingPopup] = useState(false);

  // State for new pricing value
  const [newPricing, setNewPricing] = useState(1000);

  // State for number of people
  const [noOfPeople, setNoOfPeople] = useState(0);

  // State for MINI prices and number of people
  const [miniPrices, setMiniPrices] = useState({
    pricing: 0,
    noOfPeople: 0,
  });

  // State for MAX prices and number of people
  const [maxPrices, setMaxPrices] = useState({
    pricing: 0,
    noOfPeople: 0,
  });

  // State to track whether the pricing input is selected
  const [isPricingInputSelected, setIsPricingInputSelected] = useState(false);

  // State to track whether the number of people input is selected
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
    // Assuming you have a function to calculate MINI and MAX values based on form inputs
    const miniValues = calculateMiniValues(newPricing, noOfPeople);
    const maxValues = calculateMaxValues(newPricing, noOfPeople);

    // Update state with the new MINI and MAX values
    setMiniPrices(miniValues);
    setMaxPrices(maxValues);

    // Close the Pricing Popup
    handleClosePricingPopup();
  };

  const calculateMiniValues = (pricing, noOfPeople) => {
    // Your logic to calculate MINI values
    return {
      pricing: pricing * 0.8, // Example: 80% of the input pricing
      noOfPeople: noOfPeople + 2, // Example: Increase by 2 people
    };
  };

  const calculateMaxValues = (pricing, noOfPeople) => {
    // Your logic to calculate MAX values
    return {
      pricing: pricing * 1.2, // Example: 120% of the input pricing
      noOfPeople: noOfPeople + 5, // Example: Increase by 5 people
    };
  };

  return (
    <div id="main-container" className="mt-3">
      <h2 id="main-title" className="text-center mb-4">
        Theatre Pricing
      </h2>

      {/* Button to show Pricing Popup */}
      <button
        id="pricing-popup-button"
        type="button"
        className="btn btn-primary mb-3 custom-button"
        onClick={handleShowPricingPopup}
      >
        Add Pricing
      </button>

      {/* Pricing Popup */}
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

      {/* Display current prices and no of people values for MINI and MAX */}
      <div>
        <h3>MINI:</h3>
        <p>Pricing: {miniPrices.pricing}</p>
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

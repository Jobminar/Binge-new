import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import '../mini/mini-home.css';
import grid from '../../assets/images/grid.png';
import Booknow from '../../assets/images/Frame 11.png'

const Largehome = () => {

  // slot selection usestate
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    date: "",
    numberOfPeople: "",
    hours: "",
    event: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const today = new Date().toISOString().split("T")[0];


  //  Date update 
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const [date, setDate] = useState(formatDate(new Date().toISOString().split("T")[0]));

  useEffect(() => {
      // Update date state with inputValues.date
      setDate(inputValues.date ? formatDate(inputValues.date) : formatDate(new Date().toISOString().split("T")[0]));
  }, [inputValues.date]);


  // local storage and slot selction

  const handleSlotSelection = (event, time) => {
    if (event.target.checked) {
      if (!selectedSlot) {
        setSelectedSlot(time);
        sessionStorage.setItem('selectedSlot', JSON.stringify({ date, time }));
      } else {
        event.target.checked = false; // Unchecks the checkbox if already selected
        alert("You can only select one slot.");
      }
    } else {
      setSelectedSlot(null);
    
    }
  };
  
//functionality to go to next page
  const handleNextPage = () => {
    const selectedSlot = sessionStorage.getItem('selectedSlot');
    if (selectedSlot) {
      navigate("/userinputslarge");
    } else {
      alert("Please select a slot before proceeding.");
    }
  };
  return (
    <div className="mini-home-con">
      <div className="mini-head">
        <h1>
          LUXI<span>THEATER</span>
        </h1>
        <img
          src={grid}
          alt="grid"
          onClick={() => {
            navigate("/navbar");
          }}
        />
      </div>
      {/* input title section */}
      <div className="input-head">
          <p className="input1tittle">Check slot availability</p>
          <p className="input1tittle">Event</p>
      </div>
      <div className="input-section">
        {/* date input */}
        <div className="input-sub">
          <input
            type="date"
            className="input1"
            name="date"
            value={inputValues.date}
            onChange={handleInputChange}
            min={today}
          />
        </div>
        {/* Event */}
        <div className="input-sub">
        <select
          className="input4"
          name="event"
          value={inputValues.event}
          onChange={handleInputChange}
          required // Add 'required' if you want to enforce selection
        >
          <option value="" disabled selected>
            Select an event
          </option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Other parties">Others</option>
        </select>
      </div>


      </div>

      {/* table section */}
      <div className="table-section">
        <h2 className="slots">Slots</h2>
        <table>
          <tr>
            <th className="thead">Date</th>
            <th className="thead">Time</th>
            <th className="thead">Price</th>
          </tr>
          <tr>
            <td>{date}</td>
            <td>10:00 am - 01:00 pm</td>
            <td>2999</td>
            <td>
            <input
                                type="checkbox"
                                onChange={(event) => handleSlotSelection(event, '10:00 am - 01:00 pm')}
                                disabled={selectedSlot && selectedSlot !== '10:00 am - 01:00 pm'}
                            />
                        </td>
          </tr>
          <tr>
            <td>{date}</td>
            <td>02:00 pm - 05:00 pm</td>
            <td>2999</td>
            <td>
            <input
                                type="checkbox"
                                onChange={(event) => handleSlotSelection(event, '02:00 pm - 05:00 pm')}
                                disabled={selectedSlot && selectedSlot !== '02:00 pm - 05:00 pm'}
                            />
                        </td>
          </tr>
          <tr>
            <td>{date}</td>
            <td>06:00 pm - 09:00 pm</td>
            <td>2999</td>
            <td>
            <input
                                type="checkbox"
                                onChange={(event) => handleSlotSelection(event, '06:00 pm - 09:00 pm')}
                                disabled={selectedSlot && selectedSlot !== '06:00 pm - 09:00 pm'}
                            />
                        </td>
          </tr>
          <tr>
            <td>{date}</td>
           <td>10:00 pm - 12:00 am</td>
            <td>2999</td>
            <td>
            <input
                                type="checkbox"
                                onChange={(event) => handleSlotSelection(event, '10:00 pm - 12:00 am')}
                                disabled={selectedSlot && selectedSlot !== '10:00 am - 01:00 pm'}
                            />
                        </td>
          </tr>
         
        </table>
        <div
          className="book-now"
          onClick={() => {
            handleNextPage();
          }}
        >
          <img src={Booknow} alt="book-now" />
        </div>
      </div>
      <div className="mobile-view">
        <div className="date-section">
          <div className="date-sub-section">
            <h1>DATE</h1>
            <p>20 November 2023</p>
          </div>
          <div className="date-sub-section">
            <h1>Availability</h1>
            <p>Available</p>
          </div>
        </div>
        <div className="mobile-table">
          <table>
            <tr>
              <th>No.of People</th>
              <th>Time</th>

              <th>Price</th>
            </tr>
            <tr>
              <td>2-4 people</td>
              <td>7:00 pm - 10:00 pm</td>

              <td>2500</td>
            </tr>
            <tr>
              <td>2-4 people</td>
              <td>7:00 pm - 10:00 pm</td>

              <td>2500</td>
            </tr>
            <tr>
              <td>2-4 people</td>
              <td>7:00 pm - 10:00 pm</td>

              <td>2500</td>
            </tr>
            <tr>
              <td>2-4 people</td>
              <td>7:00 pm - 10:00 pm</td>

              <td>2500</td>
            </tr>
            <tr>
              <td>2-4 people</td>
              <td>7:00 pm - 10:00 pm</td>

              <td>2500</td>
            </tr>
          </table>
          <div
            className="book-now"
            onClick={() => {
              navigate("/userinputslarge");
            }}
          >
            <img src={Booknow} alt="book-now" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Largehome;

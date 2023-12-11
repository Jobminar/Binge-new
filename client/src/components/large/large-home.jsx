import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../mini/mini-home.css';
import grid from '../../assets/images/grid.png';
import Booknow from '../../assets/images/Frame 11.png'
import uparrow from '../../assets/images/uparrow.png'
import downarrow from '../../assets/images/downarrow.png'

const Largehome = () => {
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

  // const [count, setcount] = useState(1);
  const [hours, sethours] = useState(0);

  

  // const handleIncrement = () => {
  //   setcount(count + 1);
  // };

  // const handleDecrement = () => {
  //   setcount(count - 1);
  // };

  const handleIncrementhours = () => {
    sethours(hours + 1);
  };

  const handleDecrementhours = () => {
    sethours(hours - 1);
  };

  return (
    <div className="mini-home-con">
      <div className="mini-head">
        <h1>
          LARGE<span>THEATER</span>
        </h1>
        <img
          src={grid}
          alt="grid"
          onClick={() => {
            navigate("/navbar");
          }}
        />
      </div>
      {/* input section */}
      <div className="input-head">
        <p className="input1tittle">Check slot availability</p>
        {/* <p className="input1tittle">No of People</p> */}
        <p className="input1tittle">Hours</p>
        <p className="input1tittle">Event</p>
      </div>
      <div className="input-section">
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
        {/* <div className="input-sub">
          <div className="input-buttons">
            <input
              type="text"
              className="input2"
              name="numberOfPeople"
              value={count}
              onChange={handleInputChange}

            />

            <span>
              <img
                src={uparrow}
                alt="uparrow"
                className="uparrow"
                onClick={handleIncrement}
              />
              <img
                src={downarrow}
                alt="downarrow"
                className="downarrow"
                onClick={handleDecrement}
              />
            </span>
          </div>
          {(parseInt(count) > 4 || count <=0) && (
            <p className="reminder">Mini contains less than 0 to 4 persons</p>
          )}
        </div> */}
        <div className="input-sub">
          <div className="input-buttons">
            <input
              type="text"
              className="input3"
              name="hours"
              value={hours}
              onChange={handleInputChange}
            />
            <span>
              <img
                src={uparrow}
                alt="uparrow"
                className="uparrow"
                onClick={handleIncrementhours}
              />
              <img
                src={downarrow}
                alt="downarrow"
                className="downarrow"
                onClick={handleDecrementhours}
              />
            </span>
          </div>
        </div>
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
          <option value="Other parties">Other parties</option>
        </select>
      </div>


      </div>

      {/* table section */}
      <div className="table-section">
        <h2 className="slots">Slots</h2>
        <table>
          <tr>
            <th className="thead">Date</th>
            <th className="thead">No.of People</th>
            <th className="thead">Time</th>
            <th className="thead">Availability</th>
            <th className="thead">Price</th>
          </tr>
          <tr>
            <td>20 november 2023</td>
            <td>2-4 people</td>
            <td>7:00 pm - 10:00 pm</td>
            <td>Available</td>
            <td>2500</td>
          </tr>
          <tr>
            <td>20 november 2023</td>
            <td>2-4 people</td>
            <td>7:00 pm - 10:00 pm</td>
            <td>Available</td>
            <td>2500</td>
          </tr>
          <tr>
            <td>20 november 2023</td>
            <td>2-4 people</td>
            <td>7:00 pm - 10:00 pm</td>
            <td>Available</td>
            <td>2500</td>
          </tr>
          <tr>
            <td>20 november 2023</td>
            <td>2-4 people</td>
            <td>7:00 pm - 10:00 pm</td>
            <td>Available</td>
            <td>2500</td>
          </tr>
          <tr>
            <td>20 november 2023</td>
            <td>2-4 people</td>
            <td>7:00 pm - 10:00 pm</td>
            <td>Available</td>
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

import { useState } from 'react';
import './form.css'

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    numOfPeople: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorsData = {};

    // Validation: Mobile number should contain exactly 10 digits
    if (formData.mobile.length !== 10) {
      errorsData.mobile = 'Mobile number should be 10 digits';
    }

    // Validation: Check if the email is in proper format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errorsData.email = 'Please enter a valid email';
    }

    // Set errors or submit the form
    if (Object.keys(errorsData).length > 0) {
      setErrors(errorsData);
    } else {
      // Submit the form - Here, you can perform further actions with formData
      console.log('Form submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='input-data'>
        <label>Name:</label><br/>
        <input
        className='user-input'
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className='input-data'> 
        <label>Mobile Number:</label><br/>
        <input
        className='user-input'
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        {errors.mobile && <span className="error">{errors.mobile}</span>}
      </div>
      <div className='input-data'>
        <label>Email:</label><br/>
        <input
        className='user-input'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className='input-data'>
        <label>Number of People:</label><br/>
        <input
        className='user-input'
          type="number"
          name="numOfPeople"
          value={formData.numOfPeople}
          onChange={handleChange}
          required
        />
      </div>
     
    </form>
  );
};

export default FormComponent;

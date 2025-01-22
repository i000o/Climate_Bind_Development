import React, { useState } from 'react';
import blue from './blue.svg';
import './UserRegistration.css';
import { useNavigate } from 'react-router-dom';
import RegisteredPage from './RegisteredPage.js';

function UserRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    console.log('1: handleSubmit started');
    e.preventDefault();
    console.log('2: e.preventDefault() called');
    setLoading(true);
    console.log('3: setLoading(true) called');
    fetch('http://localhost:8001/Climate_Bind_Development/form_capture.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }) 
      .then(response => response.json())
      .then(data => {
        console.log('5: response.json() processed', data);
        if (data.success) {
          console.log('6: Registration successful');
          alert('Registration successful!');
          navigate('./RegisteredPage');
        } else {
          console.log('7: Registration failed');
          setErrorMessage('Registration failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        console.log('8: fetch catch block executed')
        setErrorMessage('An error occurred.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <form className="row g-2" onSubmit={handleSubmit}>
      <div className="form-group">
        <input autoComplete="off" type="text" pattern="[a-zA-Z ]+" className="form-control" name="name" value={formData.name} onChange={handleChange} required placeholder="Your first name" />
      </div>
      <div className="form-group">
        <input autoComplete="off" type="email" className="form-control" name="email"
          value={formData.email} onChange={handleChange} required placeholder="Email address" />
      </div>
      <div className="form-group">
        <input autoComplete="off" type="password" className="form-control"
          name="password" value={formData.password} onChange={handleChange} required placeholder="Choose a strong password" />
      </div>
      <div id="error-message" className="error" aria-live="polite">{errorMessage}</div>
      <button type="submit" className="btn btn-secondary">
        Register
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"
          id="spinnerRegister" style={{ display: loading ? 'inline-block' : 'none' }}></span>
      </button>
      <div id="registerPlaceholder"></div>
    </form>
  );
}

export default UserRegistration;

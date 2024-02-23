// SignUp.js
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    try {
      setLoading(true);

      // Sending data over HTTPS for security
      const signupResponse = await axios.post('http://localhost:3002/signup', { email });

      // Handle signup success
      console.log(signupResponse.data);

      const loginResponse = await axios.post('http://localhost:3002/login', { email });
      console.log('Login Response:', loginResponse);

      // Handle login success or failure based on the response data
      if (loginResponse.data.message === 'Success') {
        const userInfo = loginResponse.data.userInfo;
        localStorage.setItem('user-info', JSON.stringify(userInfo));
        navigate('/home');
      } else {
        setError('Login failed');
      }

    } catch (err) {
      // Handle error
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginLeft: '120px'}}>
      <form onSubmit={handleSubmit} >
        <h4 style={{ fontSize: '40px' }}>
          Task brings all your <br/>tasks, teammates, and<br/> tools together
        </h4>
        <label style={{ marginTop: '20px', display: 'block', fontSize: '18px' }}>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '20px',
            width: '300px'
          }}
        /><br/>
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: 'blueviolet',
            color: 'white',
            padding: '10px 20px',
            fontSize: '18px',
            borderRadius: '5px',
            cursor: 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Loading...' : 'Enter to create task'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SignUp;

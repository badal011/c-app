// LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from JSON server and store it in localStorage
    const fetchData = async () => {
      try {
        const response = await fetch(' http://localhost:3001/login');
        const data = await response.json();
        localStorage.setItem('users', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Input validation
    if (name === 'username') {
      setLoginData({
        ...loginData,
        [name]: value.slice(0, 50), // Limit to 50 characters
      });
    } else if (name === 'password') {
      setLoginData({
        ...loginData,
        [name]: value.slice(0, 50), // Limit to 50 characters
      });
    }
  };

  const handleLogin = () => {
    // Check if either username or password is missing
    if (!loginData.username && !loginData.password) {
      toast.error('Username and password are required');
      return;
    }

    if (!loginData.username) {
      toast.error('Username is required');
      return;
    }

    if (!loginData.password) {
      toast.error('Password is required');
      return;
    }

    // Check user credentials in localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    const user = storedUsers.find(u => u.username === loginData.username && u.password === loginData.password);

    if (user) {
      console.log('Login successful');
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      console.error('Invalid credentials');
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#e6f2ff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ width: '90%', maxWidth: '400px', border: 'none', marginTop: '5vh' }}>
        <Card.Body>
          <Card.Title className="text-center">
            <i className='fa fa-user fa-4x' style={{color:'#80b3ff'}}></i>
          </Card.Title>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={loginData.username} onChange={handleChange} placeholder="Enter username" maxLength={50} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Enter password" maxLength={50} />
            </Form.Group>

            <Button variant="primary" onClick={handleLogin} style={{ margin: '10px' }}>
              Login
            </Button>

            <Card.Text className="text-center">
              Don't have an account? <NavLink to="/r">Create one</NavLink>.
            </Card.Text>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
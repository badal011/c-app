// RegistrationPage.jsx
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Input validation
    if (name === 'username' && value.length > 30) {
      console.error('Username is required');
      toast.error('Username is required');
      return;
    }

    if (name === 'password' && value.length > 50) {
      console.error('Password is required');
      toast.error('Password is required');
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    // Add your validation logic here
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Save user data to JSON server
      fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('User registered:', data);
          // Save user information in localStorage
          localStorage.setItem('currentUser', JSON.stringify(data));
          // Show alert after successful registration
          toast.success('Registration successful! Now you can log in.');
          // Navigate to dashboard or profile page after successful registration
          navigate('/dashboard');
        })
        .catch((error) => console.error('Error registering user:', error));
    }
  };

  return (
    <div style={{ backgroundColor: '#e6f2ff', minHeight: '100vh', padding: '10px' }}>
      <div className="d-flex justify-content-center">
        <Card style={{ width: '100%', maxWidth: '400px', margin: '20px', border: 'none' }}>
          <Card.Body>
            <Card.Title className="text-center">Registration Page</Card.Title>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  maxLength="30"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  isInvalid={errors.username}
                />
                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  maxLength="50"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  isInvalid={errors.firstName}
                />
                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  maxLength="50"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  isInvalid={errors.lastName}
                />
                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  maxLength="50"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  maxLength="50"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  isInvalid={errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  maxLength="50"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  isInvalid={errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" onClick={handleSubmit} style={{ margin: '10px', marginLeft: '40px' }}>
                Register
              </Button>
              <Button variant="secondary" onClick={() => navigate(-1)} style={{ margin: '10px', marginLeft: '40px' }}>
                Back
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationPage;

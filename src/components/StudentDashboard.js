// Import necessary components and styles
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import CourseList from './CourseList';  // Adjust the import path based on your project structure

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    // Fetch user data from the API on component mount
    axios.get('http://localhost:3001/login')
      .then(response => {
        const userData = response.data[0];
        setUser(userData);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const fetchUserProfile = () => {
    // Show the profile modal
    setModalShow(true);
  };

  return (
    <div className="container mt-4">
      {/* Welcome Message */}
      <div className="text-start">
        {user && <p>Welcome, {user.username}!</p>}
      </div>

      {/* Profile Button */}
      <div className="text-end">
        <Button
          variant="link"
          size="lg"
          onClick={fetchUserProfile}
        >
          Profile
        </Button>
      </div>

      {/* Display CourseList component */}
      
      <CourseList onEnroll={(courseId) => console.log(`Enrolling in course ${courseId}`)} />

      {/* Profile Modal */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user && (
            <div>
              <p>ID: {user.id}</p>
              <p>Username: {user.username}</p>
              <p>First Name: {user.firstname}</p>
              <p>Last Name: {user.lastname}</p>
              <p>Email: {user.email}</p>
              {/* Add other user information as needed */}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentDashboard;

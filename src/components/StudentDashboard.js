import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const fetchUserProfile = () => {
    // Fetch user data from the API
    axios.get('http://localhost:3001/login')
      .then(response => {
        const userData = response.data[0];
        setUser(userData);
        setModalShow(true); // Show the modal after fetching data
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  return (
    <div className="container mt-4 text-end">
      <Button
        variant="link"
        size="lg"
        onClick={fetchUserProfile}
      >
       profile
      </Button>

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

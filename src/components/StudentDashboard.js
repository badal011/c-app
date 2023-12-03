import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseList from './CourseList';
import axios from 'axios';

const StudentDashboard = ({ enrolledCourses }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username);
    }
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const response = await axios.post(`http://localhost:3001/enroll/${courseId}`);
      const updatedEnrolledCourses = response.data;

      console.log('Enrollment successful!');
      console.log('Updated enrolled courses:', updatedEnrolledCourses);
    } catch (error) {
      console.error('Error enrolling in the course:', error);
    }
  };

  const handleUpdateUsername = () => {
    const newUsername = prompt('Enter your new username:');
    if (newUsername) {
      // You can implement logic here to update the username in the backend or wherever it's stored
      setUsername(newUsername);
      // You might want to update the username in localStorage or send it to the server
    }
  };

  return (
    <div className="container mt-4">
      <div className="text-end">
        <p className="text-muted">
          Welcome, {username}!
          <button className="btn btn-link" onClick={handleUpdateUsername}>
            Update Username
          </button>
        </p>
      </div>

      <h2 className="mb-4">Student Dashboard</h2>

      <CourseList onEnroll={handleEnroll} />
    </div>
  );
};

export default StudentDashboard;

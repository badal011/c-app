// StudentDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Fetch enrolled courses from API
    axios.get('https://656ac257dac3630cf7274639.mockapi.io/api/:endpoint/enrolled-courses')
      .then(response => setEnrolledCourses(response.data))
      .catch(error => console.error('Error fetching enrolled courses:', error));
  }, []);

  return (
    <div>
      <h2>Student Dashboard</h2>
      <ul>
        {enrolledCourses.map(course => (
          <li key={course.id}>
            {course.name} - {course.instructor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDashboard;

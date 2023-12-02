// CourseList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from API
    axios.get('https://656ac257dac3630cf7274639.mockapi.io/api/:endpoint/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div>
      <h2>Course Listing</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <Link to={`/course/${course.id}`}>
              {course.name} - {course.instructor}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;

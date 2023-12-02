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
      {courses.map(course => (
        <div key={course.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h3>
            <Link to={`/course/${course.id}`}>
              {course.name}
            </Link>
          </h3>
          <p><strong>Instructor:</strong> {course.instructor}</p>
          <p><strong>Description:</strong> {course.description}</p>
          <p><strong>Status:</strong> {course.enrollmentStatus}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p><strong>Schedule:</strong> {course.schedule}</p>
          <p><strong>Location:</strong> {course.location}</p>
          <p><strong>Prerequisites:</strong> {course.prerequisites.join(', ')}</p>
          <details>
            <summary><strong>Syllabus:</strong></summary>
            <ul>
              {course.syllabus.map(item => (
                <li key={item.week}>
                  <strong>Week {item.week}:</strong> {item.topic} - {item.content}
                </li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </div>
  );
}

export default CourseList;

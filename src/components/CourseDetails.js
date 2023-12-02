// CourseDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Fetch course details from API based on id
    axios.get(`https://656ac257dac3630cf7274639.mockapi.io/api/:endpoint/courses/${id}`)
      .then(response => setCourse(response.data))
      .catch(error => console.error('Error fetching course details:', error));
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Course Details</h2>
      <h3>{course.name}</h3>
      <p>{course.description}</p>
      {/* Display other course details */}
    </div>
  );
}

export default CourseDetails;

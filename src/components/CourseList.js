// CourseList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from API
    axios.get('http://localhost:3001/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {courses.length > 0 ? (
        courses.map(course => (
          <div key={course.id} style={styles.courseCard}>
            <h3 style={styles.courseTitle}>
              <Link to={`/course/${course.id}`} style={styles.courseLink}>
                {course.name}
              </Link>
            </h3>
            <img src={course.thumbnail} alt={course.name} style={styles.courseImage} />
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Status:</strong> {course.enrollmentStatus}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Schedule:</strong> {course.schedule}</p>
            <p><strong>Location:</strong> {course.location}</p>

            <details style={styles.syllabusDetails}>
              <summary style={styles.summary}><strong>Syllabus:</strong></summary>
              <ul>
                {course.syllabus.map(item => (
                  <li key={item.week}>
                    <strong>Week {item.week}:</strong> {item.topic} - {item.content}
                  </li>
                ))}
              </ul>
            </details>

            <div>
              <h4>Students:</h4>
              <ul>
                {course.students.map(student => (
                  <li key={student.id}>{student.name} - {student.email}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
}

const styles = {
  courseCard: {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px',
    maxWidth: '250px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',

    ':hover': {
      transform: 'scale(1.05)',
    },
  },
  courseTitle: {
    marginBottom: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  courseLink: {
    textDecoration: 'none',
    color: '#333',
  },
  courseImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '8px',
  },
  syllabusDetails: {
    marginTop: '8px',
  },
  summary: {
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default CourseList;

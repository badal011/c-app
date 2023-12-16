import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [isEnrolled, setEnrolled] = useState(false); // State to track enrollment status
  const { id } = useParams();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course detail:', error);
      }
    };

    fetchCourseDetail();
  }, [id]);

  const handleEnroll = () => {
    // Placeholder for the enrollment logic
    // In a real application, you might make an API call to enroll the user in the course
    // For now, we'll just update the local state
    setEnrolled(true);
    alert('Enrollment successful!');
  };

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card bg-light mb-3">
        <div className="card-header">
          <h2 className="mb-0">{course.name}</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p className="card-text"><strong>Instructor:</strong> {course.instructor}</p>
              <p className="card-text"><strong>Description:</strong> {course.description}</p>

              {/* Additional course details */}
              <div>
                <h3>Course Information</h3>
                <p className="card-text"><strong>Duration:</strong> {course.duration}</p>
                <p className="card-text"><strong>Schedule:</strong> {course.schedule}</p>
                <p className="card-text"><strong>Location:</strong> {course.location}</p>
              </div>
            </div>

            <div className="col-md-6">
              <h3>Syllabus</h3>
              <ul className="list-group">
                {course.syllabus.map((item) => (
                  <li key={item.week} className="list-group-item">
                    <strong>Week {item.week}:</strong> {item.topic} - {item.content}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <h3>Enrolled Students</h3>
            <ul className="list-group">
              {course.students.map((student) => (
                <li key={student.id} className="list-group-item">
                  {student.name} - {student.email}
                </li>
              ))}
            </ul>
          </div>

          {/* Back button to navigate to the course list */}
          <Link to="/dashboard" className="btn btn-outline-secondary mt-3 me-3">
            Back
          </Link>

          {/* Enroll button with conditional rendering based on enrollment status */}
          {!isEnrolled ? (
            <button className="btn btn-primary mt-3" onClick={handleEnroll}>
              Enroll
            </button>
          ) : (
            <p className="text-success mt-3">Enrolled</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

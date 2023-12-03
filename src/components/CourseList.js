// CourseList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch courses from API
    axios.get('http://localhost:3001/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">Courses</h2>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or instructor"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="button">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div key={course.id} className="col mb-4">
              <Link to={`/course/${course.id}`} className="text-decoration-none text-dark">
                <div className="card h-100">
                  <img src={course.thumbnail} alt={course.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{course.name}</h5>
                    <p className="card-text"><strong>Instructor:</strong> {course.instructor}</p>
                    <p className="card-text"><strong>Status:</strong> {course.enrollmentStatus}</p>
                    <p className="card-text"><strong>Duration:</strong> {course.duration}</p>
                    <p className="card-text"><strong>Location:</strong> {course.location}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="col">No courses available.</p>
        )}
      </div>
    </div>
  );
}

export default CourseList;

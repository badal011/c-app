// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import StudentDashboard from './components/StudentDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CourseList/>} />
        <Route path="/course/:id" element={<CourseDetails/>} />
        <Route path="/dashboard" element={<StudentDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Header.js
import React from 'react';

const Header = ({ userName }) => {
  return (
    <header>
      <div>
        <span>Welcome, {userName}!</span>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';

const Header = () => {
  return (
      <header>
        <div className="container">
          <nav className="main">
            <ul className="main_nav_list">
              <li className="nav_link">
                <a href="/">Main</a>
              </li>
              <li className="nav_link">
                <a href="/sections">Sections</a>
              </li>
              <li className="nav_link">
                <a href="/me">My name</a>
              </li>
              <li className="nav_link">
                <a href="/upload">+ Upload</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
  );
};

export default Header;

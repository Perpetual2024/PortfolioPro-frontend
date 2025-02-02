import React from 'react'
import { Link } from "react-router-dom";
import '../App.css'
function Navbar(){
    return (
        
        <nav className="navbar">
        <div className="navbar-container">
          <ul className='navbar-links'>
            <li>
              <Link to="/">PortfolioPro</Link>
            </li>
            <li>
              <Link to="/profiles">ProfilePage</Link>
            </li>
            <li>
              <Link to="/projects">ProjectPage</Link>
            </li>
            <li>
              <Link to="/skills">SkillList</Link>
            </li>
            
          </ul>
          <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
        </div>
  
        
      </nav>
  
    )
}
export default Navbar;  
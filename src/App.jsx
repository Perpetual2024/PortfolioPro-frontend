import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProfilePage'
import ProfilePage from './pages/ProjectPage'
import Comments from './components/Comment'
import Bookmark   from './components/Bookmark'
import SkillList from './components/SkillList'
import About from './pages/About'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
          <div className="routes"> 
        <Navbar  />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profiles" element={<ProjectPage />} />
          <Route path="/projects" element={<ProfilePage />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/bookmarks" element={<Bookmark />} />
          <Route path="/skills" element={<SkillList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
      
  )
}

export default App

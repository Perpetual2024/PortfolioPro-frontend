import React, {useEffect, useState} from 'react'
import { fetchProject } from '../data/api'
import ProjectList from '../components/ProjectList'


function HomePage() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchProject().then(data => setProjects(data))
  }, [])
  return (
    <div>

      <h1>Showcase Your Work with PortfolioPro</h1>
      <p>Ready to take your portfolio to the next level? Join PortfolioPro today and start building your online presence. Whether you're showcasing your latest project or exploring the work of others, PortfolioPro is here to help you shine</p>
      <div>
        < ProjectList/>
        <li>
        </li>
      </div>

    
    
    </div>
  )
}

export default HomePage
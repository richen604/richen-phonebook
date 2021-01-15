import React from 'react'
import './RichenBadge.css'
import {
  FaGithubSquare,
  FaStackOverflow,
  FaTwitterSquare,
  FaLinkedin,
  FaCodepen,
  FaMedium,
} from 'react-icons/fa'
import { IconContext } from 'react-icons'

export default function RichenBadge() {
  return (
    <div id="badge">
      <div className="left-container">
        <h4>Technologies used for this project</h4>
        <ul>
          <li>React</li>
          <li>Express</li>
          <li>Node</li>
          <li>MongoDB</li>
        </ul>
      </div>
      <div className="right-container">
        <div id="profile-container">
          <a href="https://github.com/richen604">
            <img id="profile-img" src="https://i.imgur.com/WAPsV1w.jpg" />
          </a>
        </div>
        <IconContext.Provider value={{ className: 'profile-icons' }}>
          <div className="profile-icon-container">
            <a href="https://github.com/richen604">
              <FaGithubSquare />
            </a>
            <a href="https://stackoverflow.com/users/story/15002438">
              <FaStackOverflow />
            </a>
            <a href="https://twitter.com/_richenn">
              <FaTwitterSquare />
            </a>
            <a href="www.linkedin.com/in/richenn">
              <FaLinkedin />
            </a>
            <a href="https://codepen.io/richen604">
              <FaCodepen />
            </a>
            <a href="https://medium.com/@richardhenninger">
              <FaMedium />
            </a>
          </div>
        </IconContext.Provider>
        <h4 className="profile-message">
          Like my content? Take a look for more!
        </h4>
      </div>
    </div>
  )
}

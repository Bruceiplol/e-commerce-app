import "./Hero.css"
import React from 'react'
import hero from '../../resources/hero-img.jpeg'

const Hero = () => {
  return (
    <div className="hero-section">
      <img src={hero} className="hero-img" alt="sneaker-poster"/>
    </div>
  )
}

export default Hero;
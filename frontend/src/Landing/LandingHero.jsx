import React from 'react'
import Hero from './components/Hero'
import {Problem} from './components/Problem'
import {Solution} from './components/Solution'
import {HowItWorks} from './components/HowItWorks'
import {Features} from './components/Features'
import {Audience} from './components/Audience'
import Comparison from './components/Comparison'
import SocialProof from './components/SocialProof'
import {FinalCTA} from './components/FinalCTA'
import Footer from './components/Footer'

const LandingHero = () => {
  return (
    <div>
    <Hero />
    <Problem />
    <Solution />
    <HowItWorks />
    <Features />
    <Audience />
    <Comparison />
    <SocialProof />
    <FinalCTA />
    <Footer />
    </div>
  )
}

export default LandingHero

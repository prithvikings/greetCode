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
import Navbar from "./components/Navbar";

const LandingHero = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navbar />
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

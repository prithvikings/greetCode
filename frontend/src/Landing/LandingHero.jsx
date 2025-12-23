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
import {FaqsSection} from './components/faqs-1';
import { useRef } from "react";
const LandingHero = () => {
  const featuresRef = useRef(null);
  const faqRef = useRef(null);
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 selection:bg-sky-500/30 ">
      <Navbar featuresRef={featuresRef} faqRef={faqRef} />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
       <div ref={featuresRef}>
        <Features />
      </div>
      <Audience />
      <Comparison />
      <SocialProof />
      <FinalCTA />
     <div ref={faqRef}>
        <FaqsSection />
      </div>
      <Footer />
    </div>
  )
}

export default LandingHero
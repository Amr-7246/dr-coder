'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React , { useEffect } from 'react'

const HeroLearMask = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('#amr', {
        scrollTrigger: {
          trigger: "#hero-lear-mask",
          scrub: true,
          start: "10% top",
        },
        right: '1%' ,
      })
    })
    return () => ctx.revert();
  },[] )

  return (
    <div id='hero-lear-mask' className="w-full h-full absolute z-[-1] overflow-hidden">
      <div id='amr' className='!font-rubik-puddles px-5 absolute bottom-[10%] lg:bottom-[0%] right-[-60%] md:right-[-20%] lg:right-[-30%]  '>
        <h2 className='!text-[3.5rem]  absolute top-[-5px] right-2 opacity-30 '>
          <span  >Dr.</span><span>Coder()</span>
        </h2>
        <h2  className='!text-[3.5rem] '>
          <span className='' >Dr.</span><span>Coder()</span>
        </h2>
      </div>
    </div>
  )
}

export default HeroLearMask

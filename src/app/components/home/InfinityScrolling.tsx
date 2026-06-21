'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  AIDeveloper, backend, freelancer, frontend, fullstack, mern1, mern2, programmer, projectManger, systemDesign, systemDesign2
} from '../../assets'

gsap.registerPlugin(ScrollTrigger)

const scrollingItems = [
  { icon: AIDeveloper, label: 'AI Developer' },
  { icon: backend, label: 'Backend Developer' },
  { icon: freelancer, label: 'Freelancer' },
  { icon: frontend, label: 'Frontend specialized' },
  { icon: fullstack, label: 'Full Stack Developer' },
  // { icon: mern1, label: 'MERN Stack Developer' },
  { icon: mern2, label: 'MERN Stack Developer' },
  { icon: programmer, label: 'Programmer' },
  { icon: projectManger, label: 'Project Manager' },
  { icon: systemDesign, label: 'System Designer' },
  // { icon: systemDesign2, label: 'System Designer 2' }
]

const InfinityScrolling = () => {
  const wrapperRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.scroll-item')
      const totalWidth = items.length * 320 // 300px + gap
      const duration = 60
  
      gsap.to(trackRef.current, {
        x: `-=${totalWidth / 2}`, // move by half total length
        duration,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) // loop back smoothly
        }
      })
    })
    return () => ctx.revert() 
  }, [])

  return (
    <div ref={wrapperRef} className='w-[100%] mx-auto relative overflow-hidden py-[100px]'>
      <div ref={trackRef} className='flex flex-row gap-[50px] w-fit' >
        {[...Array(2)].flatMap(() =>
          Array.from({ length: 10 }).map((_, idx) => (
            <div
              className='scroll-item rounded-lg w-fit h-[80px] !text-[var(--text)] text-[20px] flex gap-[50px] justify-center items-center flex-shrink-0 '
              key={idx + Math.random()}
            >
              {scrollingItems.map((item, index) => (
                <div key={index} className='flex flex-col items-center gap-3'>
                  <img src={item.icon} alt={item.label} className='w-[100px] h-[100px] object-contain' />
                  <span className=''>{item.label}</span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Optional: Fades on sides */}
      <div className='bg-gradient-to-r from-[var(--black)] via-transparent to-transparent h-full w-[500px] absolute left-0 top-0 z-10' />
      <div className='bg-gradient-to-l from-[var(--black)] via-transparent to-transparent h-full w-[500px] absolute right-0 top-0 z-10' />
    </div>
  )
}

export default InfinityScrolling

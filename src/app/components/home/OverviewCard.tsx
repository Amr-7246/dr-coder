/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import Topper from '../Topper';
import SmartLearning from './SmartLearning';
import TextAnimator from '../TextAnimator';
import { IconicBtn } from '@/src/components/ui/Buttons';
import { ASSETS } from '@/src/assets';
import Image from 'next/image';

export const OverviewCard = () => {
  //~ Start Hooks & Data ########################
    const controls = useAnimation();
    const ref = useRef(null);
    const comingSoonRef = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const comingSoonView = useInView(comingSoonRef, { once: true, margin: '-100px' });
    //TODO: get that from the backend
      const expirence = 2
      const ProjectsCount = 15
    //& Number animation
      const [expNum, setExpNum] = useState(0);
      const [projNum, setProjNum] = useState(0);

  //~ end Hooks & Data ########################
  //~ Start logic ########################

    //& Animation function
      useEffect(() => {
        if (inView) {
          controls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } });
          // Animate numbers
          let start : any = null;
          const duration = 1200; // ms
          const animate = (timestamp : any) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setExpNum(Math.floor(progress * expirence)); 
            setProjNum(Math.floor(progress * ProjectsCount));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setExpNum(1);
              setProjNum(16);
            }
          };
          requestAnimationFrame(animate);
        }
      }, [inView, controls]);

  //~ end logic ########################
  return (
    <div className="flex-center flex-col gap-[150px] py-8 px-4" style={{ color: 'var(--text)', background: 'var(--main)' }}>

      <Topper text= { {left : 'about me' , right : 'Amr Ehab - Software developer'} } className={''} />
      {/*//& fast pref Section */}
        <div className='gap-[60px] flex-col lg:flex-row-reverse flex-center lg:!items-start '>

          <div>
            <motion.img src={ASSETS.home.amr} alt="Amr" className="rounded-full w-[250px] h-[250px] lg:w-[400px] lg:h-[500px] lg:rounded-md shadow-lg shadow-[var(--shadow)] mb-6" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ objectFit: 'cover' }} ref={ref} />
          </div>

          <div  className='flex flex-col gap-6 lg:w-[60%] w-full'>
            <motion.div  className=" text-[15px]! text-center relative flex flex-col gap-5 border-b border-stone-700/50 pb-8 text-lg md:text-xl font-medium w-full mb-6" initial={{ opacity: 0, y: 40 }} animate={controls} style={{ wordSpacing: " 5px " , color: 'var(--text)' }} >
              <h2 className='text-[25px] text-brand-green flex lg:justify-start justify-center'>My Name is Amr Ehab,</h2>
              <p className=''>
                I`m a <span className='text-white font-frijole'> fullstack software Developer</span> with practical, end-to-end experience crafting scalable, high-performance, and visually dynamic <span className='text-[var(--orange)] font-frijole'> web/moblie applications </span> from clean, <span className='text-[var(--orange)] font-frijole'>animated UIs </span>to backend logics and DB operations . . . . .
                <span className=''> While I operate as a full-stack freelancer, I have intentionally chosen to <span className='text-[var(--green)] font-frijole'>specialize in Frontend Engineering </span>not just coding interfaces, but engineering immersive, interactive, performance-driven, accessible experiences powered by tools like
                  <span className='text-white font-ribeye'> React.js, Next.js, </span>
                  <span className='text-brand-orange font-ribeye'>GSAP, Framer Motion, </span>
                  <span className='text-brand-green font-ribeye'>and TypeScript. . . .</span>
                </span>
              </p>
              {/* <TextAnimator text={fastPref} className={''} animation={'chuncks'} /> */}
            </motion.div>
            <div className='flex flex-col lg:flex-row gap-x-8 gap-y-4 border-b border-stone-700/50 pb-8 items-center justify-center'>
              <motion.div className="  flex flex-row gap-8 justify-center items-center mb-6" initial={{ opacity: 0, y: 40 }} animate={controls} >
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold orange-text-gradient" style={{ color: 'var(--orange)' }}>{expNum}+</span>
                  <span className="text-base mt-1" style={{ color: 'var(--text)' }}>Years Exp.</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold orange-text-gradient" style={{ color: 'var(--orange)' }}>{projNum}+</span>
                  <span className="text-base mt-1" style={{ color: 'var(--text)' }}>Projects</span>
                </div>
              </motion.div>
              <motion.a href="https://github.com/Amr-7246/dr-coder" className="pb-3"  initial={{ opacity: 0, y: 40 }} animate={controls} whileHover={{ scale: 0.99 }} whileTap={{ scale: 0.97 }} >
                <IconicBtn text={'visit my repos'} icon={<FaArrowRight />} iconStyle={" text-text "} buttonColors={"bg-stone-300/10 shadow-lg shadow-stone-500/10 btn backdrop-blur-6xl text-orange-500 px-8 "} />
              </motion.a>
            </div>
          </div>

        </div>
      {/*//& Mindset Section */}
        <div className='flex flex-col gap-[20px] ' >

          {/*//& Companies Emploee mindset */}
              <div className='flex-center flex-col lg:flex-row gap-[20px] ' >

                <div className=' w-[40%]'>
                  <Image width={500} height={500} src={ASSETS.home.banner} alt="banner" className="w-fit" />
                </div>

                <h2 className='text-white text-[2rem] text-center mb-10 '>
                  Get the agility and 
                  <span className=' text-brand-orange! ml-1 '> high-level vision </span>
                  of a solo expert who owns the outcome from start to finish
                </h2>

              </div>

              <div className='flex-center flex-col lg:flex-row-reverse gap-[20px] ' >

                <div className=' w-[40%]'>
                  <Image width={500} height={500} src={ASSETS.home.greenBanner} alt="banner" className="w-fit"/>
                </div>

                <h2 className='text-white text-[2rem] text-center mb-10 '>
                  Bring in a professional who 
                  <span className=' text-brand-green! ml-1 '> instantly adapts to your culture,</span>
                  respects the hierarchy, and protects your team ecosystem
                </h2>

              </div>

        </div>
      {/*//& Smart Learning section*/}
      <div className="hidden md:flex">
        <SmartLearning />
        </div>
    </div>
  );
}

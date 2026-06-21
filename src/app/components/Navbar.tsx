'use client'

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ASSETS } from '@/src/assets';

const navLinks = [
  { id: "/", title: "Home", },
  { id: "#about", title: "About", },
  { id: "/experines", title: "Experines", },
  { id: "/contact", title: "Contact", },
  { id: "/Resume.pdf", title: "Resume", },
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [showImgCard, setShowImgCard] = useState(false);
  const [suggestIdx, setSuggestIdx] = useState(0);

  // Suggestion cycling effect (fade up)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSuggestIdx((prev) => (prev + 1) % navLinks.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const list = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <nav className='w-[100%] fixed !bg-[var(--black)] border-b !border-[var(--border)] shadow-lg !shadow-[var(--shadow)] backdrop-blur-lg z-20'  style={{ backgroundColor: 'rgb(144 89 255 / 15%)' }} >
        <div className='flex items-center justify-between w-full px-4 py-2 '>
          {/* Left Part */}
            <div className='flex items-center gap-2'>
              <Image
                src={ASSETS.brand.logo} width={70} height={70} 
                className='rounded-full object-cover md:w-[70px] md:h-[70px] w-[60px] h-[60px] mr-2 cursor-pointer shadow-md hover:opacity-80 transition-opacity duration-300'
                alt="my imge"
                onClick={() => setShowImgCard(true)}
              />
              <a className='cursor-pointer hidden md:flex !text-[var(--text)]' href='#about'>Amr Ehab</a>
            </div>
          {/* right part */}
            <div className='group flex items-center justify-center gap-5 flex-row-reverse '>
              {/* Custome Open Side bar button */}
                <div onClick={list} className='flex cursor-pointer w-10 h-4 flex-col justify-around items-center'>
                  <span className={`${toggle ? 'transform rotate-45' : 'transform rotate-0'}
                                      ${toggle ? 'top-[3px]' : 'top-0'}
                                      ${toggle ? 'bg-[var(--orange)]' : 'bg-[var(--text)] '}
                                      ${toggle ? 'w-[60%]' : 'w-[100%]'}
                                      group-hover:bg-linear-to-r from-[var(--from)] via-[var(--via)] to-[var(--to)]
                                      duration-[500ms] relative w-[100%] h-[3px] rounded-[100%] `}></span>
                  <span className={`${toggle ? 'transform rotate-[-45deg]' : 'transform rotate-0'}
                                    ${toggle ? 'top-[-5px]' : 'top-0'}
                                    ${toggle ? 'bg-[var(--orange)]' : 'bg-[var(--text)] '}
                                    ${toggle ? 'w-[60%]' : 'w-[100%]'}
                                    group-hover:bg-gradient-to-r from-[var(--from)] via-[var(--via)] to-[var(--to)]
                                    duration-[500ms] relative w-[100%] h-[3px] rounded-[100%] `}></span>
                </div>
              {/* Custome Open Side bar button */}
              {/* Suggestion for sidebar links with fade up effect */}
                <div className='relative flex flex-row items-center gap-2 ml-4 w-[185px] h-[60px]'>
                  
                  {/* Isolate the animation viewport with layout limits */}
                  <div className="relative flex-1 h-full overflow-hidden flex items-center justify-end">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={suggestIdx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, ease: [0.6, 0.05, 0.28, 0.99] }}
                        className='relative w-fit flex items-center justify-end px-2 py-1 min-h-[40px] text-right whitespace-nowrap'
                        style={{ pointerEvents: 'auto' }}
                      >
                        <span className='text-sm text-white'>{navLinks[suggestIdx]?.title} ?!</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <a 
                    href={navLinks[suggestIdx]?.id} 
                    className='flex-shrink-0 !text-[var(--green)] w-[40px] h-[40px] rounded-full flex items-center justify-center p-2 border !border-[var(--green)] underline underline-offset-2 hover:!text-[var(--hovered-text)] transition-colors duration-300' 
                  >Go</a>
                </div>
              {/* Suggestion for sidebar links */}
            </div>
        </div>

        {/* Image Card Modal */}
          <div  className={`fixed top-[45vh] inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${showImgCard ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ backdropFilter: showImgCard ? 'blur(4px)' : 'none' }} >
            <div className={`relative rounded-md p-4 flex flex-col items-center transition-all duration-500 ${showImgCard ? 'scale-100' : 'scale-95'}`} style={{ width: 260 }}>
              <button className='absolute top-2 right-2 !text-[var(--text)] hover:!text-[var(--hovered-text)] hover:rotate-[-20deg] hover:scale-[1.1] duration-700 transition text-xl' onClick={() => setShowImgCard(false)} >
                <FaTimes />
              </button>
              <Image width={70} height={70} src={ASSETS.brand.logo} alt="my imge" className='rounded-md w-58 h-68 object-cover border !border-[var(--border)] shadow-md mb-2' />
            </div>
          </div>
        {/* Side bar */}
          <div style={{ transition: 'all 1000ms cubic-bezier(0.6, -0.16, 0.44, 1.25)' }} className={` !bg-[var(--dark-orange)] backdrop-blur-md ${toggle ? 'w-[90%] h-[250px] left-1/2 top-[120%] md:w-[300px] md:h-[350px] md:left-[78%] lg:left-[80%] transform -translate-x-1/2' : 'w-[0px] h-[0px] z-10 left-[90%] top-[70%]  md:left-[95%] md:top-[50%] rounded-[100%]'}  duration-[700ms] overflow-hidden mx-auto z-10 rounded-[20px] absolute `}>
            <div className={` h-[100%] w-full flex-col justify-center py-6`}>
              <ul className='flex !bg-[var(--orange)]/50 flex-col w-full md:py-[60px] h-full'>
                <li className={` ${toggle ? 'opacity-1' : 'opacity-0'} duration-[600ms] delay-[300ms] flex flex-col h-full  py-[2px] items-center justify-center`}>
                  {
                    navLinks.map((link) => (
                      <a onClick={list} key={link.id} className=' not-last:border-b w-[90%] !border-[var(--border)] !text-[var(--text)]  h-[100%] flex items-center justify-center text-center hover:!text-[var(--hovered-text)]  ' href={`${link.id}`}>
                        {link.title}
                      </a>
                    ))
                  }
                </li>
                {/* <button className='btn' onClick={HandleLangChange} >change that lang</button> */}
              </ul>
            </div>
          </div>
      </nav>
    </>
  );
};

export default Navbar;

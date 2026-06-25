/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { OverviewCard } from '..';
import Topper from '../Topper';
import { services } from '@/src/assets';
import Image from 'next/image';

const defaultOptions = {
  reverse:        false,
  max:            35,   
  perspective:    1000, 
  scale:          1.1,  
  speed:          1000, 
  transition:     true, 
  axis:           null, 
  reset:          true,  
  easing:         "cubic-bezier(.03,.98,.52,.99)",  
}

const imageOptions = {
  max: 45,        
  scale: 1.2,     
  speed: 1500,  
  reset: true,
};

const ServiceCard = ({ name, icon }: { name:string, icon:string}) => (
  <Tilt options={defaultOptions} className="xs:w-[250px] w-[250px]">
    <div className="w-full green-pink-gradient p-px rounded-[20px] shadow-card" >
      <div className="bg-(--black)! rounded-[20px] py-5 px-12 min-h-70 flex justify-evenly items-center flex-col">
        <Tilt options={imageOptions}>
          <Image 
            width={200} 
            height={200} 
            src={icon} 
            alt="web-development" 
            className="w-16 h-16 object-contain cursor-pointer transition-transform" 
            loading="lazy" 
          />
        </Tilt>
        <h3 className="text-brand-text-warm! text-[20px] font-bold text-center">{name}</h3>
      </div>
    </div>
  </Tilt>
);

export const About = () => {

  return (
    <>
      <motion.div className=' mb-10 flex flex-col gap-10' id='about'>
        <div>
          <OverviewCard/>
        </div>
      </motion.div>
      <div>
        <Topper text= { {left : 'Tech Stack' , right : 'My recent technologies'} } className={''} />
        <div className="my-20 flex flex-wrap justify-center gap-10">
          {services.map((service) => (
            <ServiceCard key={service.name} name={service.name} icon={service.icon}/>
          ))}
        </div>
      </div>
    </>
  );
};

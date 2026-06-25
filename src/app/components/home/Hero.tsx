'use client'

import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import HeroLearMask from "./HeroLearMask";
import { ASSETS } from "@/src/assets";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative flex flex-row items-center lg:justify-between justify-center overflow-hidden w-full h-[100vh] mx-auto">
      
      {/* left text Section */}
        <div className={` inset-0  w-full lg:w-fit  flex flex-row items-start gap-5`}>
          <div className="flex flex-col justify-center items-center mt-[40px]">
            <div className="w-5 h-5 rounded-full bg-[var(--orange)]" />
            <div className="w-1 sm:h-120 h-80 violet-gradient" />
          </div>

          <div className="pt-[50px]">
            <h1 className={` !text-[3.5rem] !sm:text-[2rem] !font-rubik-puddles !text-[var(--text)]`}>
              Hi, Im <span className="text-[var(--orange)]">Amr</span>
            </h1>
            <div className={`text-[1.1rem] mt-2 text-[var(--text)]`}>
              I am
              <Typewriter
                options={{
                  strings: [ "a web frontEnd specialized ", " a fullStack software developer ", " working as a freelancer " , "a web frontEnd specialized " ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: "natural",
                }}
              />
            </div>
            {/* Animated Active Element */}
              <div className=" px-3 mt-1 text-[var(--orange)] gap-3 font-black w-fit flex justify-center items-center">
                Open<span className="hidden ml-[-9px] md:flex ">to work</span>
                <DotLottieReact
                  src={ASSETS.home.openToWork}
                  loop
                  autoplay
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
            {/* Animated Active Element */}
          </div>
        </div>
      {/* left text Section */}
      {/* SVG Element */}
        <div className="  hidden lg:flex lg:mr-[2%] xl:mr-[6%] lg:w-[400px] lg:h-[400px] ">
          <Image width={600} height={600} className="" src={ ASSETS.home.heroImg } alt="hero" />
        </div>
      {/* SVG Element */}
      {/* Animated Button for pined projects */}
        <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
          <a href="#pin">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-secondary mb-1"
              />
            </div>
          </a>
        </div>
      {/* Animated Button for pined projects */}
      <HeroLearMask/>
    </section>
  );
};

export default Hero;

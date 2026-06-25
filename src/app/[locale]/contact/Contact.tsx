/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import EarthCanvas from "./Earth";
import { slideIn } from "../../utility/motion";
import { contact } from "@/src/assets";

const Contact = () => {
  const [WhichContactM, setWhichContactM] = useState('')

  const HandelContact = (navLink:any) => {
    if (navLink == 'Phone') {
      if( WhichContactM == 'Phone'){
        setWhichContactM('')
      }else{
        setWhichContactM('Phone')
      }
    } else if (navLink == 'Mail') {
      if( WhichContactM == 'Mail'){
        setWhichContactM('')
      }else{
        setWhichContactM('Mail')
      }
    } else {
      window.open(navLink,'_blank')
      setWhichContactM('')
    }
}
  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`} id="contact">
      <motion.div variants={slideIn("left", "tween", 0.2, 1)} className="flex-[0.75] items-center flex flex-col p-8 rounded-2xl">
        <p className={"sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider"}>Get in touch</p>
        <h3 className={"text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]"}>Contact Me</h3>
        <div className="flex  flex-wrap my-[30px]">
          {contact.map((item:any, idx:number) => (
            <div key={idx} className="relative">
              <img onClick={() => HandelContact(item.navLink)} className="w-[50px] h-[50px] rounded-full mx-2 boxShadow animate-up-down cursor-pointer " src={item.icon} alt={item.name} />
              <div className={`${WhichContactM == item.navLink ? 'flex' : 'hidden'} duration-700 !bg-[var(--border)]/10 right-[-150%] backdrop-blur-md p-3 rounded-lg  font-black absolute `}>
                { WhichContactM &&
                  WhichContactM == 'Phone' ?
                  <div className="flex gap-3 items-center justify-center">
                    <p className="text-[15px] text-center !text-[var(--green)]">{item.Number}</p>
                  </div>
                  :
                  WhichContactM == 'Mail'  ?
                  <div className="flex gap-3 items-center justify-center">
                    <p className="text-[15px] text-center  !text-[var(--orange)]">{item.Number}</p>
                  </div>
                  : ''
                }
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas />
      </motion.div>
    </div>
  )
}
export default Contact;

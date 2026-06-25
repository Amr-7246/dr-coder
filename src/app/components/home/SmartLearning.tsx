'use client';

import { useEffect, useRef, useState, JSX } from 'react';
import { FaLightbulb, FaLaptopCode, FaRocket, FaDatabase, FaBrain, FaCloud } from 'react-icons/fa';
import { MdExplore, MdSecurity } from 'react-icons/md';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Interfaces for pre-calculated positions to prevent layout shifts
interface ItemPosition {
  top: string;
  left: string;
}

const SmartLearning = () => {
  // 2. Explicit DOM ref typing for elements and collection arrays
  const container = useRef<HTMLDivElement | null>(null);
  const horizMask = useRef<HTMLDivElement | null>(null);
  const vertMask = useRef<HTMLDivElement | null>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 3. Mount tracker states to bypass Server-Side Rendering inconsistencies
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [iconPositions, setIconPositions] = useState<ItemPosition[]>([]);
  const [textPositions, setTextPositions] = useState<ItemPosition[]>([]);

  const icons: JSX.Element[] = [
    <FaLightbulb key="l1" />, <MdExplore key="e1" />, <FaLaptopCode key="lc1" />, <FaRocket key="r1" />,
    <MdExplore key="e2" />, <FaLaptopCode key="lc2" />, <FaRocket key="r2" />,<FaDatabase key="d1" />,
    <FaBrain key="b1" />, <FaCloud key="c1" />, <MdSecurity key="s1" />, <FaBrain key="b2" />, <FaCloud key="c2" />, <MdSecurity key="s2" />
  ];

  const texts: string[] = [
    'Always Learning', 'Discover New Tech', 'Build & Code',
    'Innovate Faster', 'Secure by Design'
  ];

  // 4. Generate positions exactly once inside the client's browser environment
  useEffect(() => {
    const calculatedIcons = icons.map(() => ({
      top: `${gsap.utils.random(10, 80)}%`,
      left: `${gsap.utils.random(5, 90)}%`,
    }));

    const calculatedTexts = texts.map(() => ({
      top: `${gsap.utils.random(15, 85)}%`,
      left: `${gsap.utils.random(5, 90)}%`,
    }));

    setIconPositions(calculatedIcons);
    setTextPositions(calculatedTexts);
    setIsMounted(true);
  }, []);

  // 5. Run GSAP sequences only after styles have cleanly mounted
  useEffect(() => {
    if (!isMounted || !container.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out', duration: 1.5 },
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
          toggleActions: 'restart none none reset',
        },
      });

      tl.fromTo(horizMask.current,
        { clipPath: 'inset(0 50% 0 50%)' },
        { clipPath: 'inset(0 0% 0 0%)' }
      ).fromTo(vertMask.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)' },
        '<'
      );

      const motionTypes = ['floating', 'fadeInOut', 'pulsed'];
      const colors = ['text-white', 'text-amber-200', 'text-green-400'];

      // ICON animations
      iconRefs.current.forEach((el, i) => {
        if (!el) return;
        const motionType = motionTypes[i % motionTypes.length];
        const color = colors[i % colors.length];
        el.className = el.className.replace(/text-\w+-?\d*/, color);

        const trigger = {
          trigger: container.current,
          start: 'top 90%',
          toggleActions: 'play pause resume reset',
        };

        if (motionType === 'floating') {
          gsap.fromTo(el,
            { opacity: 0, y: gsap.utils.random(20, 50), scale: 0.9 },
            {
              opacity: 1,
              y: `-=${gsap.utils.random(30, 60)}`,
              scale: 1,
              duration: gsap.utils.random(2.5, 4),
              ease: 'power2.inOut',
              yoyo: true,
              repeat: -1,
              delay: i * 0.15,
              scrollTrigger: trigger
            }
          );
        } else if (motionType === 'fadeInOut') {
          gsap.fromTo(el,
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1.09,
              duration: gsap.utils.random(1.5, 2.5),
              ease: 'power2.inOut',
              yoyo: true,
              repeat: -1,
              delay: i * 0.2,
              scrollTrigger: trigger
            }
          );
        } else if (motionType === 'pulsed') {
          gsap.fromTo(el,
            { opacity: 0.3 },
            {
              opacity: 1,
              duration: gsap.utils.random(1, 1.8),
              ease: 'power2.inOut',
              yoyo: true,
              repeat: -1,
              delay: i * 0.25,
              scrollTrigger: trigger
            }
          );
        }
      });

      // TEXT animations
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        const motionType = motionTypes[i % motionTypes.length];
        const color = colors[i % colors.length];
        el.className = el.className.replace(/text-\w+-?\d*/, color);

        const trigger = {
          trigger: container.current,
          start: 'top 90%',
          toggleActions: 'play pause resume reset',
        };

        if (motionType === 'floating') {
          gsap.fromTo(el,
            { opacity: 0, y: gsap.utils.random(20, 50), scale: 0.95 },
            {
              opacity: 1,
              y: `-=${gsap.utils.random(25, 55)}`,
              scale: 1,
              duration: gsap.utils.random(2.5, 4),
              ease: 'power2.inOut',
              yoyo: true,
              repeat: -1,
              delay: i * 0.2,
              scrollTrigger: trigger
            }
          );
        } else if (motionType === 'fadeInOut') {
          gsap.fromTo(el,
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1.05,
              duration: gsap.utils.random(1.8, 2.8),
              ease: 'power2.inOut',
              yoyo: true,
              repeat: -1,
              delay: i * 0.25,
              scrollTrigger: trigger
            }
          );
        } else if (motionType === 'pulsed') {
          gsap.fromTo(el,
            { opacity: 0.4 },
            {
              opacity: 1,
              duration: gsap.utils.random(1.2, 2),
              ease: 'power2.inOut',
              yoyo: true,
              repeat: -1,
              delay: i * 0.3,
              scrollTrigger: trigger
            }
          );
        }
      });

    }, container);

    return () => ctx.revert();
  }, [isMounted]);

  // 6. Return layout placeholder while server renders code structure safely
  if (!isMounted) {
    return (
      <div ref={container} className="flex justify-center items-center flex-row gap-[100px] w-full min-h-[300px] relative overflow-hidden">
        <div className="opacity-0">Loading Animations...</div>
      </div>
    );
  }

  return (
    <div ref={container} className="flex justify-center items-center flex-row gap-[100px] w-full relative overflow-hidden ">

      {icons.map((icon, i) => (
        <div
          key={`icon-${i}`}
          ref={(el) => { iconRefs.current[i] = el; }}
          className="absolute text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] opacity-0"
          style={{
            top: iconPositions[i]?.top || '0%',
            left: iconPositions[i]?.left || '0%',
            fontSize: '1.8rem',
            zIndex: 1,
          }}
        >
          {icon}
        </div>
      ))}

      {texts.map((txt, i) => (
        <div
          key={`text-${i}`}
          ref={(el) => { textRefs.current[i] = el; }}
          className="absolute text-white text-sm drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] opacity-0"
          style={{
            top: textPositions[i]?.top || '0%',
            left: textPositions[i]?.left || '0%',
            zIndex: 1,
          }}
        >
          {txt}
        </div>
      ))}

      <div className="flex justify-center items-center flex-col relative z-10">
        <div
          ref={horizMask}
          className="relative"
          style={{ clipPath: 'inset(0 50% 0 50%)' }}
        >
          <div className=" bg-black border-y border-white flex justify-center items-center flex-row gap-5 p-3 h-[80px]">
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent text-[16px]">Data Structure</span>
            <span className="w-[10vw] h-[2px] bg-white" />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent text-[16px]">Software building</span>
            <span className="w-[10vw] h-[2px] bg-white" />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent text-[16px]">Backend</span>
            <span className="w-[10vw] h-[2px] bg-white" />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent text-[16px]">AI-based systems</span>
          </div>
        </div>

        <div
          ref={vertMask}
          className="relative mt-[-1px]"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          <div className="bg-black flex justify-center items-center flex-col gap-5 border border-y-0 border-white p-3 w-fit">
            <span className="w-[2px] h-[100px] bg-white" />
            <span className="text-orange">Frontend</span>
            <span className="w-[2px] h-[100px] bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartLearning;

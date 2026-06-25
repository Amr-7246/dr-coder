'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const SaturnLoader = () => {
  const containerRef = useRef(null);
  const saturnRef = useRef(null);
  const ringRef = useRef(null);
  const orbit1Ref = useRef(null);
  const orbit2Ref = useRef(null);
  const orbit3Ref = useRef(null);
  const ball1Ref = useRef(null);
  const ball2Ref = useRef(null);
  const ball3Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const saturn = saturnRef.current;
    const ring = ringRef.current;
    const ball1 = ball1Ref.current;
    const ball2 = ball2Ref.current;
    const ball3 = ball3Ref.current;
    const orbit1 = orbit1Ref.current;
    const orbit2 = orbit2Ref.current;
    const orbit3 = orbit3Ref.current;

    const tl = gsap.timeline();

    // Initial setup
    gsap.set([ball1, ball2, ball3], { scale: 0,opacity: 0 });
    gsap.set(saturn, { scale: 0.5,opacity: 0 });
    gsap.set(ring, { scale: 0,opacity: 0,rotation: -45 });

    // Saturn entrance animation
    tl.to(saturn, {scale: 1,opacity: 1,duration: 1,ease: "back.out(1.7)"})
    .to(ring, {scale: 1,opacity: 0.6,duration: 0.8,ease: "back.out(1.2)"}, "-=0.5")
    .to([ball1, ball2, ball3], {scale: 1,opacity: 1,duration: 0.6,stagger: 0.2,ease: "back.out(1.7)"}, "-=0.3");

    // Continuous animations
    // Saturn floating
    gsap.to(saturn, {y: -8,duration: 2,ease: "power2.inOut",yoyo: true,repeat: -1});

    // Ring rotation
    gsap.to(ring, {rotation: 315,duration: 8,ease: "none",repeat: -1});

    // Orbit rotations with different speeds and directions
    gsap.to(orbit1, {rotation: 360,duration: 4,ease: "none",repeat: -1});
    gsap.to(orbit2, {rotation: -360,duration: 6,ease: "none",repeat: -1});

    gsap.to(orbit3, {rotation: 360,duration: 8,ease: "none",repeat: -1});

    //& Ball pulsing animations
    gsap.to(ball1, {
      scale: 1.2,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    gsap.to(ball2, {
      scale: 1.3,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.5
    });

    gsap.to(ball3, {
      scale: 1.1,
      duration: 1.8,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1
    });

    // Container subtle rotation
    gsap.to(container, {
      rotation: 5,
      duration: 10,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    return () => {
      gsap.killTweensOf([container, saturn, ring, ball1, ball2, ball3, orbit1, orbit2, orbit3]);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent overflow-hidden">
      <div 
        ref={containerRef}
        className="relative w-80 h-80 flex items-center justify-center"
      >
        {/* Saturn Core */}
        <div 
          ref={saturnRef}
          className="absolute w-20 h-20 rounded-full z-10"
          style={{
            background: `radial-gradient(circle at 30% 30%, var(--orange), var(--dark-orange))`,
            boxShadow: `0 0 30px var(--orange), inset -5px -5px 15px rgba(0,0,0,0.3)`
          }}
        />

        {/* Saturn Ring */}
        <div 
          ref={ringRef}
          className="absolute w-32 h-8 border-4 rounded-full z-5"
          style={{
            borderColor: 'var(--text)',
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            opacity: 0.6
          }}
        />

        {/* Orbit 1 */}
        <div 
          ref={orbit1Ref}
          className="absolute w-48 h-48 border border-dashed rounded-full opacity-20"
          style={{ borderColor: 'var(--text)' }}
        >
          <div 
            ref={ball1Ref}
            className="absolute w-4 h-4 rounded-full -top-2 left-1/2 transform -translate-x-1/2"
            style={{
              background: `radial-gradient(circle at 30% 30%, var(--orange), var(--dark-orange))`,
              boxShadow: `0 0 15px var(--orange)`
            }}
          />
        </div>

        {/* Orbit 2 */}
        <div 
          ref={orbit2Ref}
          className="absolute w-64 h-64 border border-dashed rounded-full opacity-15"
          style={{ borderColor: 'var(--text)' }}
        >
          <div 
            ref={ball2Ref}
            className="absolute w-5 h-5 rounded-full -top-2.5 left-1/2 transform -translate-x-1/2"
            style={{
              background: `radial-gradient(circle at 30% 30%, var(--text), var(--dark-orange))`,
              boxShadow: `0 0 18px var(--text)`
            }}
          />
        </div>

        {/* Orbit 3 */}
        <div 
          ref={orbit3Ref}
          className="absolute w-80 h-80 border border-dashed rounded-full opacity-10"
          style={{ borderColor: 'var(--text)' }}
        >
          <div 
            ref={ball3Ref}
            className="absolute w-3 h-3 rounded-full -top-1.5 left-1/2 transform -translate-x-1/2"
            style={{
              background: `radial-gradient(circle at 30% 30%, var(--dark-orange), var(--orange))`,
              boxShadow: `0 0 12px var(--dark-orange)`
            }}
          />
        </div>

        {/* Ambient glow effect */}
        <div 
          className="absolute w-40 h-40 rounded-full opacity-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle, var(--orange), transparent)`,
            animation: 'pulse 3s ease-in-out infinite'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

export default SaturnLoader;
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useCallback, useMemo } from 'react';
import Particles from 'react-tsparticles'; //TODO: use tsparticles/react new version instead
import { loadSlim } from 'tsparticles-slim';

const LayerMask = () => {
  //& Initialize tsParticles engine + Particle configuration for fire sparks effect
  const particlesInit = useCallback(async (engine:any) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = useMemo(() => ({
    background: {color: {value: "transparent",},},
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {enable: true,mode: "push",},
        onHover: {enable: true,mode: "bubble",},
        resize: true,
      },
      modes: {
        grab: {distance: 170,links: {opacity: 0.45,}},
        push: {quantity: 8},
        bubble: {
          distance: 100,
          size: 8,
          duration: 2,
          opacity: 1,
        },
      },
    },
    particles: {
      color: {value: "var(--orange)",},
      links: {enable: false,},
      move: {
        direction: "top",
        enable: true,
        outModes: {
          default: "out",
          top: "out",
          bottom: "bounce",
        },
        random: true,
        speed: { min: 3, max: 8 },
        straight: false,
        gravity: {enable: true,acceleration: -2,},
      },
      number: {
        density: {enable: true,area: 1200,},
        value: 120,
      },
      opacity: {
        value: { min: 0.6, max: 1 },
        animation: {
          enable: true,
          speed: 4,
          minimumValue: 0,
          sync: false,
          startValue: "max",
          destroy: "min",
        },
      },
      shape: {
        type: ["circle", "triangle"],
      },
      size: {
        value: { min: 1, max: 6 },
        animation: {
          enable: true,
          speed: 8,
          minimumValue: 0.1,
          sync: false,
          startValue: "max",
          destroy: "min",
        },
      },
      life: {
        duration: {sync: false,value: { min: 1, max: 3 },},
        count: 1,
      },
      emitters: {
        direction: "top",
        rate: {quantity: 10,delay: 0.1,},
        size: {width: 100,height: 0,},
        position: {x: 50,y: 100,},
      },
    },
    detectRetina: true,
  }), []);

  return (
    <div className="w-full h-full fixed top-0 left-0 z-[-1] overflow-hidden">
      {/* Start SVG Filter Definitions */}
        <svg className="absolute w-0 h-0">
          <defs>

            <filter id="smokeFilter" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                baseFrequency="0.01 0.02"
                numOctaves="6"
                seed="8"
                stitchTiles="stitch"
                type="fractalNoise"
              >
                <animateTransform
                  attributeName="baseFrequency"
                  dur="25s"
                  values="0.01 0.02;0.015 0.03;0.01 0.02"
                  repeatCount="indefinite"
                />
              </feTurbulence>

              <feColorMatrix
                type="matrix"
                values="1 1 1 0 0
                        1 1 1 0 0
                        1 1 1 0 0
                        0 0 0 1 0"
              />

              <feComponentTransfer>
                <feFuncA type="discrete" tableValues="0.05 0.1 0.2 0.3 0.4" />
              </feComponentTransfer>

              <feGaussianBlur stdDeviation="2" />
            </filter>

            <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

          </defs>
        </svg>

      {/* Animated Smoke Background */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Start the Multiple Smoke Layers */}
        <div className="absolute inset-0">
          {/* Primary Smoke Layer */}
            {/* <div className="absolute inset-0 opacity-5 animate-smoke-drift"
              style={{
                  background: `radial-gradient(ellipse at 30% 70%, var(--text, #6b7280) 0%, transparent 40%),
                              radial-gradient(ellipse at 70% 30%, var(--text, #6b7280) 0%, transparent 45%),
                              radial-gradient(ellipse at 50% 50%, var(--text, #6b7280) 0%, transparent 35%)`,
                filter: 'url(#smokeFilter) blur(50px)',
                animation: 'smokeRise 18s ease-in-out infinite',
              }}
            /> */}

          {/* Secondary Smoke Layer */}
            {/* <div className="absolute inset-0 opacity-10 animate-smoke-drift-2"
              style={{
                  background: `radial-gradient(ellipse at 20% 80%, var(--text, #6b7280) 0%, transparent 50%),
                              radial-gradient(ellipse at 80% 20%, var(--text, #6b7280) 0%, transparent 55%),
                              radial-gradient(ellipse at 60% 60%, var(--text, #6b7280) 0%, transparent 40%)`,
                filter: 'url(#smokeFilter) blur(70px)',
                animation: 'smokeRise2 22s ease-in-out infinite reverse',
              }}
            /> */}

          {/* Wispy Smoke Trails */}
            <div  className="absolute inset-0 opacity-5"
              style={{
                  background: `linear-gradient(45deg,
                              transparent 20%,
                              var(--text, #6b7280) 40%,
                              transparent 60%),
                              linear-gradient(-45deg,
                              transparent 30%,
                              var(--text, #6b7280) 50%,
                              transparent 70%)`,
                filter: 'blur(40px)',
                animation: 'smokeSwirl 30s linear infinite',
              }}
            />
        </div>
      {/* End the Multiple Smoke Layers */}

      {/* tsParticles for Fire Sparks */}
      < Particles id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0"
      />

      {/* The Fire Embers with CSS */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-80"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `var(--orange, #ff6b35)`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px var(--orange, #ff6b35)`,
                filter: 'url(#glowFilter)',
                animation: `fireEmber ${Math.random() * 2 + 3}s ease-out ${Math.random() * 2}s infinite`,
              }}
            />
          ))}
        </div>

      {/* Start the Custom CSS Animations */}
        <style jsx>{`
          @keyframes smokeRise {
            0% { transform: translateY(20px) rotate(0deg) scaleX(1); }
            25% { transform: translateY(-5px) rotate(2deg) scaleX(1.1); }
            50% { transform: translateY(-15px) rotate(-1deg) scaleX(0.9); }
            75% { transform: translateY(-8px) rotate(1deg) scaleX(1.05); }
            100% { transform: translateY(20px) rotate(0deg) scaleX(1); }
          }

          @keyframes smokeRise2 {
            0% { transform: translateY(15px) rotate(0deg) scaleY(1); }
            30% { transform: translateY(-10px) rotate(-2deg) scaleY(1.2); }
            60% { transform: translateY(-20px) rotate(1deg) scaleY(0.8); }
            100% { transform: translateY(15px) rotate(0deg) scaleY(1); }
          }

          @keyframes smokeSwirl {
            0% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(90deg) scale(1.1); }
            50% { transform: rotate(180deg) scale(0.9); }
            75% { transform: rotate(270deg) scale(1.05); }
            100% { transform: rotate(360deg) scale(1); }
          }

          @keyframes fireEmber {
            0% {
              opacity: 0.8;
              transform: translateY(0) scale(1);
            }
            20% {
              opacity: 1;
              transform: translateY(-20px) scale(1.2);
            }
            80% {
              opacity: 0.6;
              transform: translateY(-80px) scale(0.8);
            }
            100% {
              opacity: 0;
              transform: translateY(-120px) scale(0.3);
            }
          }

          .animate-smoke-drift {
            animation: smokeRise 18s ease-in-out infinite;
          }

          .animate-smoke-drift-2 {
            animation: smokeRise2 22s ease-in-out infinite reverse;
          }
        `}</style>
      {/* Start the Custom CSS Animations */}

    </div>
  );
};

export default LayerMask;












// import React, { useCallback, useMemo, useEffect, useState } from 'react';
// import Particles from 'react-tsparticles';
// import { loadSlim } from 'tsparticles-slim';

// const LayerMask = () => {
//   const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

//   // Track mouse movement
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const x = (e.clientX / window.innerWidth) * 100;
//       const y = (e.clientY / window.innerHeight) * 100;
//       setMousePos({ x, y });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // Initialize tsParticles engine
//   const particlesInit = useCallback(async (engine) => {
//     await loadSlim(engine);
//   }, []);

//   // Enhanced particle configuration for realistic fire sparks
//   const particlesOptions = useMemo(() => ({
//     background: {
//       color: {
//         value: "transparent",
//       },
//     },
//     fpsLimit: 120,
//     interactivity: {
//       events: {
//         onClick: {
//           enable: true,
//           mode: ["push", "bubble"],
//         },
//         onHover: {
//           enable: true,
//           mode: "attract",
//         },
//         resize: true,
//       },
//       modes: {
//         push: {
//           quantity: 15,
//         },
//         attract: {
//           distance: 200,
//           duration: 0.8,
//           factor: 8,
//         },
//         bubble: {
//           distance: 150,
//           size: 12,
//           duration: 0.5,
//           opacity: 1,
//         },
//       },
//     },
//     particles: {
//       color: {
//         value: ["#ff4500", "#ff6b00", "#ff8c00", "#ffa500", "#ffff00"],
//       },
//       links: {
//         enable: false,
//       },
//       move: {
//         direction: "top",
//         enable: true,
//         outModes: {
//           default: "out",
//           top: "out",
//           bottom: "bounce",
//           left: "bounce",
//           right: "bounce",
//         },
//         random: true,
//         speed: { min: 2, max: 12 },
//         straight: false,
//         gravity: {
//           enable: true,
//           acceleration: -0.5,
//         },
//         angle: {
//           offset: 0,
//           value: 90,
//         },
//         attract: {
//           enable: true,
//           rotateX: 600,
//           rotateY: 1200,
//         },
//       },
//       number: {
//         density: {
//           enable: true,
//           area: 800,
//         },
//         value: 200,
//       },
//       opacity: {
//         value: { min: 0.3, max: 1 },
//         animation: {
//           enable: true,
//           speed: 6,
//           minimumValue: 0,
//           sync: false,
//           startValue: "max",
//           destroy: "min",
//         },
//       },
//       shape: {
//         type: ["circle", "triangle", "star"],
//         options: {
//           star: {
//             sides: 4,
//           },
//         },
//       },
//       size: {
//         value: { min: 0.5, max: 8 },
//         animation: {
//           enable: true,
//           speed: 12,
//           minimumValue: 0.1,
//           sync: false,
//           startValue: "random",
//           destroy: "min",
//         },
//       },
//       life: {
//         duration: {
//           sync: false,
//           value: { min: 0.8, max: 4 },
//         },
//         count: 1,
//       },
//       twinkle: {
//         particles: {
//           enable: true,
//           frequency: 0.05,
//           opacity: 1,
//         },
//       },
//       emitters: [
//         {
//           direction: "top",
//           rate: {
//             quantity: 8,
//             delay: 0.05,
//           },
//           size: {
//             width: 120,
//             height: 10,
//           },
//           position: {
//             x: 20,
//             y: 100,
//           },
//         },
//         {
//           direction: "top",
//           rate: {
//             quantity: 12,
//             delay: 0.08,
//           },
//           size: {
//             width: 150,
//             height: 15,
//           },
//           position: {
//             x: 50,
//             y: 100,
//           },
//         },
//         {
//           direction: "top",
//           rate: {
//             quantity: 6,
//             delay: 0.1,
//           },
//           size: {
//             width: 100,
//             height: 8,
//           },
//           position: {
//             x: 80,
//             y: 100,
//           },
//         },
//       ],
//     },
//     detectRetina: true,
//   }), []);

//   return (
//     <div className="w-full h-full fixed top-0 left-0 z-[-1] overflow-hidden">
//       {/* Enhanced SVG Filter Definitions */}
//       <svg className="absolute w-0 h-0">
//         <defs>
//           {/* Advanced Smoke Filter */}
//           <filter id="advancedSmokeFilter" x="-50%" y="-50%" width="200%" height="200%">
//             <feTurbulence
//               baseFrequency="0.008 0.015"
//               numOctaves="8"
//               seed="12"
//               stitchTiles="stitch"
//               type="fractalNoise"
//               result="turbulence"
//             >
//               <animateTransform
//                 attributeName="baseFrequency"
//                 dur="35s"
//                 values="0.008 0.015;0.012 0.025;0.006 0.012;0.008 0.015"
//                 repeatCount="indefinite"
//               />
//             </feTurbulence>
//             <feColorMatrix
//               in="turbulence"
//               type="matrix"
//               values="0.8 0.8 0.8 0 0
//                       0.7 0.7 0.7 0 0
//                       0.6 0.6 0.6 0 0
//                       0 0 0 1 0"
//               result="smokeColor"
//             />
//             <feComponentTransfer in="smokeColor" result="smokeAlpha">
//               <feFuncA type="discrete" tableValues="0.02 0.05 0.1 0.15 0.25 0.35" />
//             </feComponentTransfer>
//             <feGaussianBlur in="smokeAlpha" stdDeviation="8" result="blurredSmoke" />
//             <feComposite in="blurredSmoke" in2="turbulence" operator="multiply" />
//           </filter>

//           {/* Enhanced Glow Filter */}
//           <filter id="enhancedGlow" x="-100%" y="-100%" width="300%" height="300%">
//             <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
//             <feColorMatrix in="coloredBlur" type="matrix"
//               values="1 0.5 0 0 0
//                       0.8 0.3 0 0 0
//                       0.2 0.1 0 0 0
//                       0 0 0 1 0" result="glowColor"/>
//             <feMerge>
//               <feMergeNode in="glowColor"/>
//               <feMergeNode in="coloredBlur"/>
//               <feMergeNode in="SourceGraphic"/>
//             </feMerge>
//           </filter>

//           {/* Heat Distortion Filter */}
//           <filter id="heatDistortion" x="0%" y="0%" width="100%" height="100%">
//             <feTurbulence
//               baseFrequency="0.02 0.08"
//               numOctaves="3"
//               result="distortionNoise"
//             >
//               <animateTransform
//                 attributeName="baseFrequency"
//                 dur="8s"
//                 values="0.02 0.08;0.03 0.12;0.02 0.08"
//                 repeatCount="indefinite"
//               />
//             </feTurbulence>
//             <feDisplacementMap
//               in="SourceGraphic"
//               in2="distortionNoise"
//               scale="15"
//             />
//           </filter>
//         </defs>
//       </svg>

//       {/* Dark atmospheric base */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

//       {/* Multiple Enhanced Smoke Layers */}
//       <div className="absolute inset-0">
//         {/* Primary Cinematic Smoke Layer */}
//         <div
//           className="absolute inset-0 opacity-60"
//           style={{
//             background: `radial-gradient(ellipse at ${mousePos.x * 0.3 + 25}% ${mousePos.y * 0.5 + 60}%,
//                          rgba(120, 120, 120, 0.8) 0%,
//                          rgba(80, 80, 80, 0.4) 25%,
//                          transparent 50%),
//                          radial-gradient(ellipse at ${mousePos.x * 0.4 + 70}% ${mousePos.y * 0.3 + 30}%,
//                          rgba(100, 100, 100, 0.6) 0%,
//                          rgba(60, 60, 60, 0.3) 30%,
//                          transparent 55%),
//                          radial-gradient(ellipse at ${mousePos.x * 0.2 + 45}% ${mousePos.y * 0.6 + 45}%,
//                          rgba(140, 140, 140, 0.7) 0%,
//                          rgba(90, 90, 90, 0.4) 25%,
//                          transparent 45%)`,
//             filter: 'url(#advancedSmokeFilter)',
//             animation: 'cinematicSmokeRise 25s ease-in-out infinite',
//             transform: `translate(${(mousePos.x - 50) * 0.1}px, ${(mousePos.y - 50) * 0.05}px)`,
//           }}
//         />

//         {/* Secondary Layered Smoke */}
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             background: `radial-gradient(ellipse at ${mousePos.x * 0.6 + 15}% ${mousePos.y * 0.4 + 75}%,
//                          rgba(110, 110, 110, 0.9) 0%,
//                          rgba(70, 70, 70, 0.5) 35%,
//                          transparent 65%),
//                          radial-gradient(ellipse at ${mousePos.x * 0.3 + 85}% ${mousePos.y * 0.2 + 25}%,
//                          rgba(95, 95, 95, 0.7) 0%,
//                          rgba(55, 55, 55, 0.4) 40%,
//                          transparent 70%)`,
//             filter: 'url(#advancedSmokeFilter)',
//             animation: 'cinematicSmokeRise2 30s ease-in-out infinite reverse',
//             transform: `translate(${(mousePos.x - 50) * 0.15}px, ${(mousePos.y - 50) * 0.08}px)`,
//           }}
//         />

//         {/* Wispy Heat Distortion */}
//         <div
//           className="absolute inset-0 opacity-25"
//           style={{
//             background: `linear-gradient(${mousePos.x * 2}deg,
//                          transparent 15%,
//                          rgba(130, 130, 130, 0.3) 35%,
//                          transparent 55%),
//                          linear-gradient(${-mousePos.y * 1.5}deg,
//                          transparent 25%,
//                          rgba(105, 105, 105, 0.4) 45%,
//                          transparent 75%)`,
//             filter: 'url(#heatDistortion)',
//             animation: 'smokeSwirl 40s linear infinite',
//           }}
//         />
//       </div>

//       {/* tsParticles for Enhanced Fire Sparks */}
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         options={particlesOptions}
//         className="absolute inset-0"
//       />

//       {/* Cinematic Fire Embers with Mouse Interaction */}
//       <div className="absolute inset-0">
//         {[...Array(25)].map((_, i) => {
//           const baseX = (i * 4) % 100;
//           const baseY = 80 + (i * 2) % 40;
//           const mouseInfluenceX = (mousePos.x - baseX) * 0.02;
//           const mouseInfluenceY = (mousePos.y - baseY) * 0.015;

//           return (
//             <div
//               key={i}
//               className="absolute rounded-full"
//               style={{
//                 width: `${Math.random() * 4 + 1}px`,
//                 height: `${Math.random() * 8 + 3}px`,
//                 left: `${baseX + mouseInfluenceX}%`,
//                 top: `${baseY + mouseInfluenceY}%`,
//                 background: `linear-gradient(180deg,
//                            #ffff00 0%,
//                            #ff8c00 30%,
//                            #ff4500 70%,
//                            #dc143c 100%)`,
//                 boxShadow: `
//                   0 0 ${Math.random() * 15 + 8}px #ff6b00,
//                   0 0 ${Math.random() * 25 + 15}px rgba(255, 107, 0, 0.6),
//                   0 0 ${Math.random() * 35 + 25}px rgba(255, 69, 0, 0.3)
//                 `,
//                 filter: 'url(#enhancedGlow)',
//                 animation: `cinematicFireEmber ${Math.random() * 5 + 4}s ease-out ${Math.random() * 3}s infinite`,
//                 opacity: 0.9,
//               }}
//             />
//           );
//         })}
//       </div>

//       {/* Floating Heat Particles */}
//       <div className="absolute inset-0">
//         {[...Array(40)].map((_, i) => (
//           <div
//             key={`heat-${i}`}
//             className="absolute rounded-full"
//             style={{
//               width: `${Math.random() * 2 + 0.5}px`,
//               height: `${Math.random() * 2 + 0.5}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               background: `rgba(255, ${Math.floor(Math.random() * 100 + 155)}, 0, ${Math.random() * 0.8 + 0.2})`,
//               animation: `floatingHeat ${Math.random() * 8 + 6}s linear ${Math.random() * 4}s infinite`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Enhanced CSS Animations */}
//       <style jsx>{`
//         @keyframes cinematicSmokeRise {
//           0% {
//             transform: translateY(30px) rotate(0deg) scaleX(1) scaleY(1);
//             opacity: 0.6;
//           }
//           25% {
//             transform: translateY(-15px) rotate(3deg) scaleX(1.2) scaleY(0.9);
//             opacity: 0.8;
//           }
//           50% {
//             transform: translateY(-40px) rotate(-2deg) scaleX(0.8) scaleY(1.3);
//             opacity: 0.4;
//           }
//           75% {
//             transform: translateY(-20px) rotate(2deg) scaleX(1.1) scaleY(0.95);
//             opacity: 0.7;
//           }
//           100% {
//             transform: translateY(30px) rotate(0deg) scaleX(1) scaleY(1);
//             opacity: 0.6;
//           }
//         }

//         @keyframes cinematicSmokeRise2 {
//           0% {
//             transform: translateY(25px) rotate(0deg) scaleY(1) scaleX(1);
//             opacity: 0.4;
//           }
//           30% {
//             transform: translateY(-25px) rotate(-3deg) scaleY(1.4) scaleX(0.7);
//             opacity: 0.6;
//           }
//           60% {
//             transform: translateY(-50px) rotate(2deg) scaleY(0.6) scaleX(1.5);
//             opacity: 0.3;
//           }
//           100% {
//             transform: translateY(25px) rotate(0deg) scaleY(1) scaleX(1);
//             opacity: 0.4;
//           }
//         }

//         @keyframes smokeSwirl {
//           0% { transform: rotate(0deg) scale(1) skewX(0deg); }
//           25% { transform: rotate(90deg) scale(1.1) skewX(5deg); }
//           50% { transform: rotate(180deg) scale(0.9) skewX(-3deg); }
//           75% { transform: rotate(270deg) scale(1.05) skewX(2deg); }
//           100% { transform: rotate(360deg) scale(1) skewX(0deg); }
//         }

//         @keyframes cinematicFireEmber {
//           0% {
//             opacity: 0;
//             transform: translateY(0) translateX(0) scale(0.5) rotate(0deg);
//           }
//           10% {
//             opacity: 1;
//             transform: translateY(-10px) translateX(${Math.random() * 20 - 10}px) scale(1) rotate(${Math.random() * 45}deg);
//           }
//           30% {
//             opacity: 1;
//             transform: translateY(-40px) translateX(${Math.random() * 30 - 15}px) scale(1.3) rotate(${Math.random() * 90}deg);
//           }
//           70% {
//             opacity: 0.7;
//             transform: translateY(-120px) translateX(${Math.random() * 50 - 25}px) scale(0.8) rotate(${Math.random() * 180}deg);
//           }
//           90% {
//             opacity: 0.3;
//             transform: translateY(-180px) translateX(${Math.random() * 40 - 20}px) scale(0.4) rotate(${Math.random() * 270}deg);
//           }
//           100% {
//             opacity: 0;
//             transform: translateY(-220px) translateX(${Math.random() * 60 - 30}px) scale(0.1) rotate(360deg);
//           }
//         }

//         @keyframes floatingHeat {
//           0% {
//             transform: translateY(0) translateX(0) scale(1);
//             opacity: 0.2;
//           }
//           25% {
//             transform: translateY(-30px) translateX(10px) scale(1.2);
//             opacity: 0.6;
//           }
//           50% {
//             transform: translateY(-60px) translateX(-5px) scale(0.8);
//             opacity: 0.4;
//           }
//           75% {
//             transform: translateY(-90px) translateX(15px) scale(1.1);
//             opacity: 0.3;
//           }
//           100% {
//             transform: translateY(-120px) translateX(-10px) scale(0.5);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LayerMask;






























// import React, { useCallback, useMemo } from 'react';
// import Particles from 'react-tsparticles';
// import { loadSlim } from 'tsparticles-slim';

// const LayerMask = () => {
//   // Initialize tsParticles engine
//   const particlesInit = useCallback(async (engine) => {
//     await loadSlim(engine);
//   }, []);

//   // Particle configuration for sparks effect
//   const particlesOptions = useMemo(() => ({
//     background: {
//       color: {
//         value: "transparent",
//       },
//     },
//     fpsLimit: 120,
//     interactivity: {
//       events: {
//         onClick: {
//           enable: true,
//           mode: "push",
//         },
//         onHover: {
//           enable: true,
//           mode: "repulse",
//         },
//         resize: true,
//       },
//       modes: {
//         push: {
//           quantity: 4,
//         },
//         repulse: {
//           distance: 200,
//           duration: 0.4,
//         },
//       },
//     },
//     particles: {
//       color: {
//         value: ["#FFD700", "#FFA500", "#FF6347", "#FF69B4", "#00CED1", "#9370DB"],
//       },
//       links: {
//         color: "#ffffff",
//         distance: 150,
//         enable: false,
//         opacity: 0.1,
//         width: 1,
//       },
//       move: {
//         direction: "none",
//         enable: true,
//         outModes: {
//           default: "bounce",
//         },
//         random: true,
//         speed: 2,
//         straight: false,
//       },
//       number: {
//         density: {
//           enable: true,
//           area: 800,
//         },
//         value: 80,
//       },
//       opacity: {
//         value: 0.8,
//         random: {
//           enable: true,
//           minimumValue: 0.3,
//         },
//         animation: {
//           enable: true,
//           speed: 3,
//           minimumValue: 0.1,
//           sync: false,
//         },
//       },
//       shape: {
//         type: ["circle", "star"],
//         options: {
//           star: {
//             sides: 5,
//           },
//         },
//       },
//       size: {
//         value: { min: 1, max: 4 },
//         animation: {
//           enable: true,
//           speed: 5,
//           minimumValue: 0.5,
//           sync: false,
//         },
//       },
//     },
//     detectRetina: true,
//   }), []);

//   return (
//     <div className="w-full h-full fixed top-0 left-0 z-[-1] overflow-hidden">
//       {/* SVG Filter Definitions */}
//       <svg className="absolute w-0 h-0">
//         <defs>
//           <filter id="hazeFilter" x="0%" y="0%" width="100%" height="100%">
//             <feTurbulence
//               baseFrequency="0.02 0.01"
//               numOctaves="4"
//               seed="5"
//               stitchTiles="stitch"
//               type="fractalNoise"
//             >
//               <animateTransform
//                 attributeName="baseFrequency"
//                 dur="20s"
//                 values="0.02 0.01;0.03 0.015;0.02 0.01"
//                 repeatCount="indefinite"
//               />
//             </feTurbulence>
//             <feColorMatrix
//               type="saturate"
//               values="0"
//             />
//             <feComponentTransfer>
//               <feFuncA type="discrete" tableValues="0.1 0.2 0.3 0.4 0.5" />
//             </feComponentTransfer>
//             <feGaussianBlur stdDeviation="1" />
//           </filter>

//           <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
//             <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
//             <feMerge>
//               <feMergeNode in="coloredBlur"/>
//               <feMergeNode in="SourceGraphic"/>
//             </feMerge>
//           </filter>
//         </defs>
//       </svg>

//       {/* Animated Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 animate-pulse-slow" />

//       {/* Start Multiple Haze Layers */}
//         <div className="absolute inset-0">
//           {/* Primary Haze Layer */}
//             {/* <div className="absolute inset-0 opacity-30 animate-drift-slow"
//               style={{
//                   background: `radial-gradient(ellipse at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
//                               radial-gradient(ellipse at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
//                               radial-gradient(ellipse at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)`,
//                 filter: 'url(#hazeFilter) blur(40px)',
//                 animation: 'float 15s ease-in-out infinite alternate',
//               }}
//             /> */}

//           {/* Secondary Haze Layer */}
//             {/* <div  className="absolute inset-0 opacity-20 animate-drift-reverse"
//               style={{
//                   background: `radial-gradient(ellipse at 60% 30%, rgba(255, 215, 0, 0.2) 0%, transparent 60%),
//                               radial-gradient(ellipse at 10% 70%, rgba(255, 105, 180, 0.2) 0%, transparent 60%),
//                               radial-gradient(ellipse at 90% 90%, rgba(0, 206, 209, 0.2) 0%, transparent 60%)`,
//                 filter: 'url(#hazeFilter) blur(60px)',
//                 animation: 'float-reverse 20s ease-in-out infinite alternate',
//               }}
//             /> */}

//           {/* Tertiary Moving Haze */}
//             {/* <div className="absolute inset-0 opacity-15"
//               style={{
//                   background:`conic-gradient(from 0deg at 50% 50%,
//                               rgba(147, 112, 219, 0.1) 0deg,
//                               rgba(255, 20, 147, 0.1) 90deg,
//                               rgba(0, 191, 255, 0.1) 180deg,
//                               rgba(50, 205, 50, 0.1) 270deg,
//                               rgba(147, 112, 219, 0.1) 360deg)`,
//                 filter: 'blur(80px)',
//                 animation: 'rotate 30s linear infinite',
//               }}
//             /> */}
//         </div>
//       {/* End Multiple Haze Layers */}

//       {/* tsParticles for Sparks */}
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         options={particlesOptions}
//         className="absolute inset-0"
//       />

//       {/* Additional Floating Sparks with CSS */}
//       <div className="absolute inset-0">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full opacity-60"
//             style={{
//               width: `${Math.random() * 4 + 2}px`,
//               height: `${Math.random() * 4 + 2}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               background: `hsl(${Math.random() * 360}, 70%, 60%)`,
//               filter: 'url(#glowFilter)',
//               animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 2}s infinite alternate`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Custom CSS Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
//           25% { transform: translate(-10px, -10px) rotate(1deg) scale(1.05); }
//           50% { transform: translate(15px, -5px) rotate(-1deg) scale(0.95); }
//           75% { transform: translate(-5px, 10px) rotate(0.5deg) scale(1.02); }
//         }

//         @keyframes float-reverse {
//           0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
//           25% { transform: translate(10px, 10px) rotate(-1deg) scale(0.98); }
//           50% { transform: translate(-15px, 5px) rotate(1deg) scale(1.03); }
//           75% { transform: translate(5px, -10px) rotate(-0.5deg) scale(0.99); }
//         }

//         @keyframes rotate {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         @keyframes sparkle {
//           0%, 100% { opacity: 0.6; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.5); }
//         }

//         .animate-drift-slow {
//           animation: float 15s ease-in-out infinite alternate;
//         }

//         .animate-drift-reverse {
//           animation: float-reverse 20s ease-in-out infinite alternate;
//         }

//         .animate-pulse-slow {
//           animation: pulse 4s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LayerMask;

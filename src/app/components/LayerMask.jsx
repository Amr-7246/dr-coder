/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useCallback, useMemo } from 'react';
import Particles from 'react-tsparticles'; //TODO: use tsparticles/react new version instead
import { loadSlim } from 'tsparticles-slim';

const LayerMask = () => {
  //& Initialize tsParticles engine + Particle configuration for fire sparks effect
  const particlesInit = useCallback(async (engine) => {
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
        // grab: {distance: 170,links: {opacity: 0.45,}},
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

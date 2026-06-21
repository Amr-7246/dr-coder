/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import React, {useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Topper from '../../Topper';
import SelectedProject, { SideBarShell } from './SelectedProject';
import { FaProjectDiagram } from 'react-icons/fa';
import {frontProjects, pinnedProjects} from '@/src/app/api/route'
import { IconicBtn } from '@/src/components/ui/Buttons';
import { Project } from '@/src/app/types/types';
import toast from 'react-hot-toast';
import SaturnLoader from '../../SaturnLoader';

gsap.registerPlugin(ScrollTrigger);

const PinedProjects = () => {
  const ProjectsLength = 5
  const containerRef = useRef(null);
  //& get the projects
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSelectionData  = async () => {
            try {
                const query = await frontProjects();
                if (query.success && query.data) {
                    setProjects(query.data);
                } else {
                    toast.error(query.error || 'Something went wrong loading Projects');
                }
            } catch (err) {
                toast.error('Failed to connect to the server' + err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSelectionData()
    }, [])
  //&################################ Start the animation logic
      useEffect(() => {
        const ctx = gsap.context(() => {
          const projectScrollDistance = window.innerHeight * 2 ;
          const totalScrollDistance = ProjectsLength * projectScrollDistance;

          //& Select project elements
            const items = gsap.utils.toArray('.pagenation');
            const bgImg = gsap.utils.toArray('.bg-image');
            const projectCard = gsap.utils.toArray('.project-card');

          //& Select sidebar elements
            const sidebarItems = gsap.utils.toArray('.sidebar-item');
            const sidebarTitles = gsap.utils.toArray('.sidebar-title');
            const sidebarNumbers = gsap.utils.toArray('.sidebar-number');
            const sidebarContent = gsap.utils.toArray('.sidebar-content');
            const sidebarProgressBars = gsap.utils.toArray('.sidebar-progress-bar');
            const sidebarDescriptions = gsap.utils.toArray('.sidebar-description');

          //& Set initial states for project elementes
            gsap.set(bgImg, { opacity: 0 });
            gsap.set(projectCard, { y: '100%', opacity: 0 });

          //& Set initial states for sidebar
            gsap.set(sidebarTitles, { color: 'var(--text)' });
            gsap.set(sidebarNumbers, { color: 'var(--text)' });
            gsap.set(sidebarContent, { height: 0, opacity: 0 });
            gsap.set(sidebarProgressBars, { scaleX: 0 });
            gsap.set(sidebarDescriptions, { opacity: 0, y: 10 });

          //& Pin the main container
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: 'top top',
              end: () => `+=${totalScrollDistance}`,
              scrub: 1,
              pin: true,
            });

          //! Animate each project and corresponding sidebar
            let cumulativeOffset = 0;
            items.forEach((item:any, i) => {
              const start = `top+=${cumulativeOffset} top`;
              const end = `+=${projectScrollDistance}`;
              const projectBg = item.querySelector('.bg-image');
              const projectCard = item.querySelector('.project-card');

              //& Get corresponding sidebar elements
                const sidebarItem = sidebarItems[i];
                const sidebarTitle = sidebarTitles[i];
                const sidebarNumber = sidebarNumbers[i];
                const thisSideBarContent:any = sidebarContent[i];
                const sidebarProgressBar:any = sidebarProgressBars[i];
                const sidebarDescription:any = sidebarDescriptions[i];

              //~ Start animating the project area
                const tl = gsap.timeline({
                  scrollTrigger : ({
                      trigger: item,
                      start: start,
                      end: end,
                      scrub: 1,
                    })
                  })

                tl.to(projectBg, { opacity: 1, })
                .to(projectCard, { opacity: 1, y:'0%'} , "<")
                .to(projectCard, { opacity: 0, y:'-150%'} )
                .to( projectBg ,{opacity:0} )
              //~ End animating the project area
              //~ Start animating the sidbare area
                ScrollTrigger.create({
                  trigger: item,
                  start: start,
                  end: end,
                  scrub: 1,
                  onUpdate: (self) => {
                    const progress = self.progress;

                    //& Animate sidebar elements
                      if (progress > 0) {

                        gsap.to([sidebarTitle, sidebarNumber], {
                          color: 'var(--orange)',
                          duration: 0.8,
                          ease: "none"
                        });

                        //* Expand sidebar content
                        gsap.to(thisSideBarContent, {
                          height: 'auto',
                          opacity: 1,
                          duration: 0.8,
                          ease: "none"
                        });

                        //* Animate progress bar
                        gsap.to(sidebarProgressBar, {
                          scaleX: progress,
                          duration: 0.1,
                          ease: "none"
                        });

                        //* Show description
                        gsap.to(sidebarDescription, {
                          opacity: 1 ,
                          y: 0,
                          duration: 0.8,
                          ease: "none"
                        });
                    } else {
                        //* Reset to inactive state
                        gsap.to([sidebarTitle, sidebarNumber], {
                          color: 'var(--text)',
                          duration: 0.8,
                          ease: "none"
                        });

                        gsap.to(thisSideBarContent, {
                          height: 0,
                          opacity: 0,
                          duration: 0.8,
                          ease: "none"
                        });

                        gsap.to(sidebarProgressBar, {
                          scaleX: 0,
                          duration: 0.8,
                          ease: "none"
                        });

                        gsap.to(sidebarDescription, {
                          opacity: 0,
                          y: 10,
                          duration: 0.8 ,
                          ease: "none"
                        });
                    }
                  },
                  onLeave: () => {
                  //* Reset sidebar to inactive state
                    gsap.to([sidebarTitle, sidebarNumber], {
                      color: 'var(--text)',
                      duration: 0.8,
                      ease: "none"
                    });

                    gsap.to(thisSideBarContent, {
                      height: 0,
                      opacity: 0,
                      duration: 0.8,
                      ease: "none"
                    });

                    gsap.to(sidebarProgressBar, {
                      scaleX: 0,
                      duration: 0.8,
                      ease: "none"
                    });

                    gsap.to(sidebarDescription, {
                      opacity: 0,
                      y: 10,
                      duration: 0.8 ,
                      ease: "none"
                    });
                  },
                  // onLeaveBack: () => {
                  //   //* Reset sidebar to inactive state
                  //   gsap.to([sidebarTitle, sidebarNumber], {
                  //     color: 'var(--text)',
                  //     duration: 0.3,
                  //     ease: "power2.out"
                  //   });

                  //   gsap.to(thisSideBarContent, {
                  //     height: 0,
                  //     opacity: 0,
                  //     duration: 0.3,
                  //     ease: "power2.out"
                  //   });
                  // }
                });
              //~ End animating the sidbare area
              cumulativeOffset += projectScrollDistance;
            });

        }, containerRef);

        return () => ctx.revert();
      }, []);
  //&################################ End  the animation logic
  if(isLoading) {return (<SaturnLoader/>)}
  if(!projects||projects.length < 1) {toast.success('there is no pinned projects yet'); return}
  return (
    <div id='pin' ref={containerRef} className='w-full flex flex-col gap-5 '>

      <Topper text= { {left : 'My Work' , right : 'Selected Projects'} } className={'!w-[90%] !mx-auto'} />

      <div className='w-full h-screen flex flex-row relative' >

        {/* Projects Container */}
          <div className='w-full lg:w-[70%] h-full relative overflow-hidden '>
            {projects.map((proj, idx) => (
              <SelectedProject key={idx} className={''} project={proj} idx={idx}/>
            ))}
          </div>

        {/* SideBarShell */}
          <div className='w-[30%] hidden lg:flex h-full flex-col gap-5 pt-[15px]'>
            {projects.map((proj, idx) => (
              <SideBarShell key={idx} className={''} project={proj} idx={idx}/>
            ))}
          </div>

      </div>

      <div className='mb-[20px] py-5 flex-center md:gap-[100px] gap-[20px] w-full backdrop-blur-xl '>
        <p className='flex flex-row'>just a few <span className='hidden md:flex' >, see more right here</span> . . . </p>
        <IconicBtn text={"All Projects"} icon={<FaProjectDiagram />} iconStyle={" text-orange-500 "} buttonColors={"bg-stone-400/10 shadow-lg shadow-stone-500/10 btn backdrop-blur-6xl text-orange-500 px-8 "} />
        {/* <a href={'/experines'} className='btn'>All Projects</a> */}
      </div>

    </div>
  )
}

export default PinedProjects

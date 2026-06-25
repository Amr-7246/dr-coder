/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Project } from '@/src/app/types/types';

const SelectedProject = ({ className , project, idx}:{ className:string, project:Project, idx:number}) => {
  return (
    <div key={idx} id={`project-${idx}`} className={ `pagenation ${className} h-[100%] absolute inset-0 flex-center `}>
    
      {/* Background Image */}
        <div className='bg-image absolute inset-0'>
            <img 
            id={`project-bg-${idx}`}
            src={project.thumbUrl||''} 
            alt="project background"
            className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 z-[10]" />
        </div>

      {/* Project Card */}
        <div  id={`project-card-${idx}`} className='project-card translate-y-[100%] relative z-[15] w-[350px] h-[200px] md:w-[500px] md:h-[300px] rounded-lg overflow-hidden shadow-2xl' >
            <img 
            src={project.thumbUrl||''} 
            className='w-full h-full object-cover' 
            alt="project showcase" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-white font-bold text-xl">{project.title}</h3>
            </div>
        </div>

    </div>
  )
}

export const SideBarShell = ({ className , project, idx}:{ className:string, project:Project, idx:number}) => {
  const openWeb = (link:any) => {
    if (link) {
      window.open(link, "_blank");
    } else {
      console.log("No link provided");
    }
  };

  return (
    <div
      onClick={() => openWeb(project.liveLink)}
      key={idx}
      className={`sidebar-item p-4 w-full cursor-pointer border-b border-[var(--border)] bg-[var(--main)] ${className}`}
    >
      {/* Always visible: Project Title and Number */}
      <div className="sidebar-header flex items-center justify-between">
        <h3 className="sidebar-title font-semibold text-[var(--text)]">
          {project.title}
        </h3>
        <span className="sidebar-number text-sm font-mono text-[var(--text)]">
          {String(idx + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Expandable content: Progress bar and description */}
      <div className="sidebar-content mt-3">
        {/* Progress bar */}
        <div className="sidebar-progress-container mb-3">
          <div className="w-full h-[1px] bg-[var(--text)] rounded-full overflow-hidden">
            <div className="sidebar-progress-bar h-full bg-[var(--orange)] origin-left scale-x-0"></div>
          </div>
        </div>

        {/* Project description */}
        <div className="sidebar-description">
          <p className="">{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SelectedProject
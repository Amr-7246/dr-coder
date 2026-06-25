/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from "react";
import "react-vertical-timeline-component/style.min.css";
import ProjectsCategories from "./ProjectsCategories";
import SaturnLoader from "../SaturnLoader";
import Topper from '../Topper';
import { VerticalTimeline } from "react-vertical-timeline-component";
import { Project, Category } from "../../types/types";
import { getProjects, getCategories } from "../../api/route"; 
import toast from "react-hot-toast";
import { ExperienceCard } from "./ExperienceCard";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [WhichCate, setWhichCate] = useState<number | null>(null);

  //& Fetch Categories once on component mount
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const query = await getCategories();
        if (query.success && query.data) {
          setCategories(query.data);
        } else {
          toast.error(query.error || 'Something went wrong loading categories');
        }
      } catch (err) {
        toast.error('Failed to load categories: ' + err);
      }
    };
    fetchCategoriesData();
  }, []);

  //& Fetch Projects dynamically whenever the selected category changes
  useEffect(() => {
    const fetchSelectionData = async () => {
      setIsLoading(true);
      try {
        const query = await getProjects(WhichCate);
        if (query.success && query.data) {
          setProjects(query.data);
        } else {
          toast.error(query.error || 'Something went wrong loading Projects');
        }
      } catch (err) {
        toast.error('Failed to connect to the server: ' + err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSelectionData();
  }, [WhichCate]);

  if(isLoading) {return <SaturnLoader/>}

  return (
    <>
      <ProjectsCategories 
        categories={categories} 
        WhichCate={WhichCate} 
        setWhichCate={setWhichCate} 
      />
      
      {isLoading ? (
        <SaturnLoader />
      ) : (
        <div id='projects' className="my-20 max-w-125 lg:max-w-500 mx-auto flex flex-col gap-10">
          <Topper text={{ left: 'My Work', right: 'Develop Your Dream App Now' }} className={''} />
          
          {projects.length < 1 ? (
            <p className="text-center text-gray-400 my-10">No projects found for this category.</p>
          ) : (
            <VerticalTimeline>
              {projects.map((project: Project, index: any) => (
                <ExperienceCard key={`project-${project.id || index}`} project={project} />
              ))}
            </VerticalTimeline>
          )}
        </div>
      )}
    </>
  );
};

export default Projects;

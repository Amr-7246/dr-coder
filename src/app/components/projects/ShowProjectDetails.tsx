'use client'
import React from 'react'
import { useGetEntity } from '../../APIs'
import { Project } from '../../types/projectsTypes'
import { motion } from 'framer-motion'
import { FaGithub, FaLink, FaStar } from 'react-icons/fa'
import { AiFillPicture } from 'react-icons/ai'
import { IoImagesOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom'

const ShowProjectDetails = () => {
  const { id } = useParams()
  const { data: project } = useGetEntity<Project>(`portfolio/project/${id}`)

  if (!project) {
    return (
      <div className="flex-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    )
  }

  return (
    <div className="mx-auto p-6 bg-stone-900/50 backdrop-blur-sm rounded-lg shadow-lg">
      {/* Project Header */}
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)]">{project.title}</h1>
        <p className="text-lg text-[var(--text)]/80">{project.shortDesc}</p>

        {/* Project Stats */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaStar className="text-[var(--orange)]" />
            <span className="text-[var(--text)]">{project.rating}</span>
          </div>
          <div className="text-[var(--text)]/60">
            Views: {project.views}
          </div>
          <div className="px-3 py-1 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-sm">
            {project.status}
          </div>
        </div>
      </div>

      {/* Media Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Main Image */}
        <div className="md:col-span-2 aspect-video rounded-lg overflow-hidden">
          {project.thumbnail && (
            <img
              src={project.thumbnail.secure_url}
              alt={project.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>

        {/* Links and Info */}
        <div className="space-y-4">
          {/* Repository Link */}
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors group"
            >
              <FaGithub className="text-xl text-[var(--orange)]" />
              <span className="text-[var(--text)] group-hover:text-white">View Repository</span>
            </a>
          )}

          {/* Live Demo Link */}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors group"
            >
              <FaLink className="text-xl text-[var(--orange)]" />
              <span className="text-[var(--text)] group-hover:text-white">Live Demo</span>
            </a>
          )}

          {/* Gallery Preview */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="p-4 bg-stone-800 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <IoImagesOutline className="text-xl text-[var(--orange)]" />
                <span className="text-[var(--text)]">Gallery</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {project.gallery.slice(0, 6).map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-md overflow-hidden">
                    <img
                      src={img.secure_url}
                      alt={`gallery-${idx}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tech Stack */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 p-2 bg-stone-800 rounded-lg"
              >
                <img src={tech.secure_url} alt={tech.name} className="w-6 h-6" />
                <span className="text-[var(--text)]">{tech.name}</span>
                {tech.version && (
                  <span className="text-[var(--text)]/60 text-sm">v{tech.version}</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Full Description */}
      <div className="prose prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-[var(--text)] mb-4">About the Project</h2>
        <div className="text-[var(--text)]/80 leading-relaxed whitespace-pre-wrap">
          {project.description}
        </div>
      </div>

      {/* Videos Section */}
      {project.videos && project.videos.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Project Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.videos.map((video, idx) => (
              <div key={idx} className="aspect-video rounded-lg overflow-hidden bg-stone-800">
                <video
                  src={video.url}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Images */}
      {project.images && project.images.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-4">More Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="aspect-video rounded-lg overflow-hidden group"
              >
                <img
                  src={img.secure_url}
                  alt={`project-image-${idx}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowProjectDetails

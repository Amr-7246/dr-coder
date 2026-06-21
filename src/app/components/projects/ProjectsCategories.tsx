/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from "../../types/types";
import CateCard from "./CateCard"
import { motion } from "framer-motion";

interface ProjectsCategoriesProps {
  categories: Category[];
  WhichCate: number | null;
  setWhichCate: (cateId: number | null) => void;
}

const ProjectsCategories = ({ categories, WhichCate, setWhichCate }: ProjectsCategoriesProps) => {
  
  const getCategoryIdByName = (name: string): number | null => {
    const found = categories.find(c => c.name.toLowerCase() === name.toLowerCase());
    return found ? found.id : null;
  };

  return (
    <div className=' w-full flex flex-col items-center border-b border-[var(--border)]'>
      {/* start Top Animated Cards */}
        <div className="pb-10  text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className=" !text-transparent !bg-clip-text !bg-gradient-to-tr from-[var(--orange)] via-[var(--via)] to-[var(--to)] text-center text-3xl md:text-5xl col-span-2 row-span-1 font-bold mb-[20px] "
          >
            My Projects
          </motion.h2>
          <p>It absolutely crazy to look back at how my portfolio has grown over time! From simple designs to professional, visually stunning projects, each iteration reflects a leap in skills and creativity.</p>
        </div>
        
        <div className='relative w-full min-h-[50vh] lg:h-[60vh] border-b border-[var(--border)]'>
        {categories
          .slice(0, 3)
          .map((cate, idx) => {
            const positionalStyles = [
              {
                className: "aiFullstack z-0 top-1/2 left-[25%] -rotate-12 hidden md:flex",
                defaultImg: "/bg_2/photo_37_2025-07-27_07-50-15.jpg"
              },
              {
                className: "animations z-[1] top-1/2 left-1/2",
                defaultImg: "/bg_2/photo_16_2025-07-27_07-50-15.jpg"
              },
              {
                className: "frontend z-[2] top-1/2 left-[75%] rotate-12 hidden md:flex",
                defaultImg: "/bg_2/photo_6_2025-07-27_07-50-15.jpg"
              }
            ];
            const design = positionalStyles[idx];

            return (
              <CateCard 
                key={cate.id} 
                setWhichCate={setWhichCate} 
                img={cate.thumbUrl || design.defaultImg} 
                iAmHere={cate.id} 
                className={design.className} 
                text={cate.name} 
              />
            );
          })}
        </div>

      {/* end Top Animated Cards */}

      {/* cate buttons */}
        <div className=' w-full flex flex-wrap justify-center items-center gap-5 p-5'>
          <a href="#projects">
            <div 
              className={` ${WhichCate === null ? ' shadow-(--shadow) text-brand-orange border-brand-orange bg-transparent ' : ''} btn `} 
              onClick={() => setWhichCate(null)}
            >
              All
            </div>
          </a>
          {categories.map((category) => (
            <a key={category.id} href="#projects">
              <div 
                className={` ${WhichCate === category.id ? ' shadow-[var(--shadow)] text-[var(--orange)] border-[var(--orange)] bg-transparent ' : ''} btn flex items-center gap-2 `} 
                onClick={() => setWhichCate(category.id)}
              >
                <span>{category.name}</span>
                {(category as any)._count?.projects !== undefined && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${WhichCate === category.id ? 'bg-[var(--orange)] text-black' : 'bg-neutral-800 text-neutral-400'}`}>
                    {(category as any)._count.projects}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      {/* cate buttons */}
    </div>
  )
}

export default ProjectsCategories;

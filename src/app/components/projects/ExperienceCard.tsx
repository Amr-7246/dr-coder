/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiExternalLink } from "react-icons/fi";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Project } from "../../types/types";
import { ASSETS } from "@/src/assets";

export const ExperienceCard = ({ project }: {project:Project}) => {
        const openWeb = (link:any) => {
        if (link) {
            window.open(link, "_blank");
        } else {
            console.log("No link provided");
        }
        };
        return (
        <VerticalTimelineElement
        contentStyle={{
            backgroundImage: `url(${project?.thumbUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            color: "var(--text)",
            backgroundColor: "var(--black)",
            padding:'0px',
        }}
            contentArrowStyle={{ borderRight: "7px solid var(--border)" }}
            dateClassName="absolute opacity-[0]"
            iconStyle={{ background: project?.iconColor || "var(--black)" }}
            icon={
            <div className="flex justify-center items-center w-full h-full">
                <img
                src={project?.iconUrl||ASSETS.brand.logo}
                alt={project?.title}
                onClick={() => openWeb(project?.liveLink)}
                className="w-[70%] object-contain cursor-pointer  hover:scale-[1.2] transition-transform duration-300 hover:rotate-[20deg]"
                />
            </div>
            }
        >
            {/* ############# Card Content */}
            <div className="  flex flex-col md:h-[350px] h-[290px] justify-between !text-[var(--text)] ">
                <div className="justify-center flex flex-wrap mt-[20%] gap-2 ">
                    <h3 className = "!bg-black py-2 px-5 rounded-lg items-center w-fit backdrop-blur-lg md:text-[19px] text-[15px] text-center justify-center flex-center  font-bold cursor-pointer hover:!text-[var(--orange)] flex hover:underline"
                        onClick={() => openWeb(project?.liveLink)}
                        >
                        {project?.title}<span className=" m-2 text-center " ><FiExternalLink/></span>
                    </h3>
                </div>

                <div className=" pb-2 px-3 list-disc mx-auto w-full h-fit backdrop-blur-lg bg-black/80! space-y-2">
                    <p className=" !font-black text-[14px] text-center tracking-wider !text-[var(--orange)] ">
                    {project?.description}
                    </p>
                </div>
            </div>
            {/* ############# Card Content */}
        </VerticalTimelineElement>
        )
  };
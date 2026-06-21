import React from "react";
import { BallCanvas } from "../canvas";
import Topper from "../Topper";
import { technologies } from "@/src/assets";

const renderTechnologies = () => {
  return technologies.map(({ name, icon }:{ name:string, icon:string }) => (
    <div className="w-28 h-28" key={name}>
      <BallCanvas icon={icon} />
    </div>
  ));
};

const Tech = () => (
  <div className="flex-col flex gap-25">
    <Topper text= { {left : 'tech stack' , right : 'the technologies that I had used above'} } className={''} />
    <div className="flex flex-row flex-wrap justify-center gap-10 text-brand-text-warm!">
      {renderTechnologies()}
    </div>
  </div>
);

export default Tech;

import React from 'react'


//& ThreeDBtn
export const ThreeDBtn = ({text,icon, buttonColors, spanColors}:{text:string|any,icon?:any, buttonColors :string, spanColors:string} ) => {
  const butDefualt = buttonColors == "" ? "shadow-black/50 bg-black text-white" : ""
  const spanDefualt = spanColors == "" ? "bg-white" : ""
  return (
    <button className={`cursor-pointer flex-center gap-3 px-8 py-2 w-fit shadow-lg ${butDefualt} relative ${buttonColors}`}>
      <span className={`absolute top-[6px] right-[6px] ${spanDefualt} w-full h-full -z-1  ${spanColors}`}  />
      <span className='' >{icon}</span>
      {text}
    </button>
  )
}

//& IconicBtn
export const IconicBtn = ({text,icon, iconStyle, buttonColors}:{text:string|any, icon:any, iconStyle:string, buttonColors :string}) => {

  const butDefualt = buttonColors == "" ? "shadow-black/50 bg-black text-white" : ""
  return (
    <button className={`font-Jost cursor-pointer font-black flex-center rounded-xl gap-3 px-3 py-2 w-fit shadow-lg text-[15px] ${butDefualt} relative ${buttonColors}`}>
      <span className={` flex-center p-1 rounded-full w-8 h-8 text-[15px] ${iconStyle} `}>{icon}</span>
      {text}
    </button>
  )
}

//& glassBtn
export const glassBtn = ({text, icon, iconStyle, buttonColors}:{text:string|any, icon:any, iconStyle:string, buttonColors :string}) => {

  const butDefualt = buttonColors == "" ? "shadow-black/50 bg-black text-white" : ""
  return (
    <button className={`font-Jost cursor-pointer font-black flex-center rounded-xl gap-3 px-3 py-2 w-fit shadow-lg text-[15px] ${butDefualt} relative ${buttonColors}`}>
      <span className={` flex-center p-1 rounded-full w-8 h-8 text-[15px] ${iconStyle} `}>{icon}</span>
      {text}
    </button>
  )
}

// & CuttedBtn
export const CuttedBtn = ({
  text,
  icon,
  iconStyle,
  buttonColors,
  textStyle,
  svgStyle,
}: {
  text: string | any
  icon?: any
  iconStyle?: string
  buttonColors?: string
  textStyle?: string
  svgStyle?: string
}) => {
  const butDefualt =
    buttonColors == "" ? "shadow-black/50 bg-black text-white" : ""

  return (
    <button
      className={`py-2 px-4 font-Jost cursor-pointer font-black relative group w-fit shadow-lg text-[15px] flex items-center gap-2 ${butDefualt} ${buttonColors}`}
      style={{
        clipPath:
          "polygon(10% 0%, 90% 0%, 100% 25%, 100% 75%, 90% 100%, 10% 100%, 0% 75%, 0% 25%)",
      }}
    >
      {icon && (
        <span
          className={`flex-center w-7 h-7 text-[16px] ${iconStyle}`}
        >
          {icon}
        </span>
      )}
      <span className={`block ${textStyle}`}>{text}</span>

      {/* Decorative SVG inside button */}
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${svgStyle}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
      >
        <polygon
          points="20,0 180,0 200,20 200,60 180,80 20,80 0,60 0,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
    </button>
  )
}

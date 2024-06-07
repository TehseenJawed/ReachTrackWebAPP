// import React from 'react'
// import SemiCircleProgressBar from "react-progressbar-semicircle";

// const AnalyticProgress = ({label, percentage}) => {
//     const dynamicDiameter = () => {
//         console.log('....',window.innerWidth, window.innerWidth < 1024, window.innerWidth >= 768);
//         if(window.innerWidth > 2000) {
//             return 200
//         }
//         if(window.innerWidth < 1024 && window.innerWidth >= 768) {
//             return 130
//         }
//         else {
//             return 130
//         }
//     } 
//     return (
//         <div className='flex flex-col justify-center items-center w-full'>
//             <div className='relative'>
//                 <SemiCircleProgressBar
//                     percentage={percentage}
//                     diameter={dynamicDiameter()}
//                     strokeWidth={7}
//                 />
//                 <div className='text-4xl text-primary font-bold absolute top-6 left-[35%] font-segoeui 3xl:text-5xl 3xl:top-9'>{percentage}</div>
//             </div>
//             <div className='text-md font-bold mt-3 opacity-75 3xl:text-xl md:text-xs'>{label}</div>
//         </div>
//     )
// }

// export default AnalyticProgress



import React, { useContext } from "react";
import theme from 'tailwindcss/colors' // path may vary
// import colors from 'usetailwind'


import { motion } from "framer-motion";
// import { Box } from "../box";
// import { Flex } from "../flex";
// import { Counter } from "../counter";
// import { IntersectionContext } from "../intersection-observer";
// import { theme } from "../../theme";

const AnalyticProgress = ({
    percentage,
    counter = true,
    stroke = '#4285F4',
    number= "0",
    // emptyStroke = "#e2e2e2",
    emptyStroke = stroke,
    emptyStrokeOpacity = 0.25,
    // emptyStrokeOpacity = 1,
    duration = 1.5,
    delay = 0.5,
    size = 100,
    strokeWidth = 6,
    label,
    handleSelectLiveVehicles,
}) => {
    //   const { inView } = useContext(IntersectionContext);
    const radius = 55;
    const circumference = Math.ceil(2 * Math.PI * radius);
    const fillPercents = Math.abs(
        Math.ceil((circumference / 100) * (percentage - 100))
    );

    const transition = {
        duration: duration,
        delay: delay,
        ease: "easeIn"
    };

    const variants = {
        hidden: {
            strokeDashoffset: circumference,
            transition
        },
        show: {
            strokeDashoffset: fillPercents,
            transition
        }
    };

    return (
        <div onClick={() => handleSelectLiveVehicles()} className="cursor-pointer relative flex justify-center items-center w-[120px] h-[100px]">
            <div className="w-full h-full absolute top-0 ">
                <svg
                    viewBox="0 0 100 100"
                    version="1.1"
                    style={{
                        position: "absolute",
                        width: '100%',
                        // top:"0px",
                        transform: "rotate(-90deg)",
                        overflow: "visible",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                >
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        className="circle"
                        strokeWidth={strokeWidth}
                        stroke={emptyStroke}
                        strokeOpacity={emptyStrokeOpacity}
                        fill="transparent"
                    />
                </svg>
                <svg
                    viewBox="0 0 100 100"
                    width={size}
                    height={size}
                    style={{
                        position: "absolute",
                        // top:"0px",
                        width: '100%',
                        transform: "rotate(-90deg)",
                        overflow: "visible",
                        //   marginLeft: -size
                    }}
                >
                    <motion.circle
                        cx="50"
                        cy="50"
                        r={radius}
                        strokeWidth={strokeWidth}
                        stroke={stroke}
                        fill="transparent"
                        strokeDashoffset={fillPercents}
                        strokeDasharray={circumference}
                        variants={variants}
                        initial="hidden"
                        animate={true ? "show" : "hidden"}
                    />
                </svg>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="text-black text-lg font-bold">{number}</div>
                <div className="text-primary text-md font-bold">{label}</div>
            </div>
        </div>
    );
};

export default AnalyticProgress;
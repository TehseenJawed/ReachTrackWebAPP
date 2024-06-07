import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// buildStyles({
//     rotation: 0.25,
//     strokeLinecap: 'round',
//     textSize: '20px',
//     pathTransitionDuration: 0.5,
//     pathColor: `#07D635`,
//     textColor: '#4682B4',
//     trailColor: '#F1F2F6',
//     backgroundColor: '#3e98c7',

// })
import React, { useState } from 'react'

const VehicleProgress = ({label, progress}) => {
    const [count, setCount] = useState(0)
    setTimeout(() => {
        setCount(progress)
    }, 0)
    return (
        <div className='flex flex-col items-center m-4'>
            <CircularProgressbar
                minValue={0}
                className='w-24 h-24'
                maxValue={100}
                strokeWidth={6}
                value={count}
                text={`${count}`}
                styles={{
                    // Customize the root svg element
                    root: {},
                    // Customize the path, i.e. the "completed progress"
                    path: {
                        // Path color
                        stroke: `#07D635`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',
                        // Customize transition animation
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        // Rotate the path
                        transform: 'rotate(0.08turn)',
                        transformOrigin: 'center center',
                    },
                    // Customize the circle behind the path, i.e. the "total progress"
                    trail: {
                        // Trail color
                        stroke: '#F1F2F6',
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',
                        // Rotate the trail
                        transform: 'rotate(0turn)',
                        transformOrigin: 'center center',
                    },
                    // Customize the text
                    text: {
                        // Text color
                        fill: '#4285F4',
                        // Text size
                        fontWeight:600,
                        fontSize: '30px',
                    },
                    // Customize background - only used when the `background` prop is true
                    background: {
                        fill: '#3e98c7',
                    },
                }}
            />
            <div className='text-lg mt-2'>{label}</div>

        </div>
    )
}

export default VehicleProgress
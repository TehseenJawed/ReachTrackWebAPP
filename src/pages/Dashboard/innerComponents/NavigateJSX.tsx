import React from 'react'

// const NavigateJSX = ({ value, title, icon, key }) => {
//     return (
//         <div key={key} className='w-full flex flex-col justify-center items-center bg-slate-200 py-2'>
//             {icon()}
//             <h2 className='text-md text-blue text-[#03abce]'>{value}</h2>
//             <p className='text-[#242a2b] text-xs'>{title}</p>
//         </div>
//     )
// }

const NavigateJSX = ({ value, title, icon, key }) => {
    return (
        <div key={key} className='w-8/12 flex justify-evenly items-center py-2'>
            {icon()}
            <p className='text-[#242a2b] w-2/6 pl-2 text-xl'>{title}</p>
            <h2 className='text-2xl text-blue my-2'>{value}</h2>
        </div>
    )
}

export default NavigateJSX;
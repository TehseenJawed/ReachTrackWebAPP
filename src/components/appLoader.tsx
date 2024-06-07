import React from 'react'
import { SVGLoader } from 'assets/svg_icons'
const AppLoader = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
        <div className='w-24'>
          <SVGLoader />
        </div>
    </div>
  )
}

export default AppLoader
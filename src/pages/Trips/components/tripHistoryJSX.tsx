import React, { Dispatch } from 'react'
import { withStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import { LocationCordProps } from 'typecasts';

interface TripHistoryProps {
  setOpen: Dispatch<boolean>
  setPosition: Dispatch<LocationCordProps>
  openMapView: Dispatch<boolean>
}

const TripHistory = (props:TripHistoryProps) => {
  const {setOpen, setPosition, openMapView} = props
  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      background: 'none',
      color: 'none',
      maxWidth: 220,
      fontSize: 12,
      padding: 5,
      border: 'none',
    },
  }))(Tooltip);
  return (
    <div className='flex justify-between mb-6'>
      <div className='w-[20%] flex flex-col justify-center items-center text-center cursor-pointer md:w-[23%]' onClick={() => setOpen(true)}>
        <div className='text-[15px] md:text-xs text-black font-bold'>08:20 PM</div>
        <div className='text-[15px] md:text-xs md:w-full w-[280px] text-[#4285F4] leading-6 border-b-[#00000010] border-b pb-4 '>Fahad Education Sector 11 Landhi Karachi Sindh</div>
      </div>
      <div className='w-[50%] flex justify-center items-center relative border-b-[#00000010] border-b'>
        <div className='h-2 w-2 rounded-full bg-primary' />
        <div className='border-b-2 w-full h-0 border-b-primary border-dashed' />
        <div className='h-2 w-2 rounded-full bg-primary' />
        <div className='absolute md:top-[0.5rem] xl:top-[0rem]'>
          <div className='text-sm font-bold cursor-pointer md:text-xs' onClick={() => openMapView(true)}>Map View</div>
          <HtmlTooltip
            title={
              // <React.Fragment>
                <div className='backdrop-blur-md bg-white/50 border-white border rounded-md p-2 text-black'>
                  <div>
                    Harsh acceleration: 0
                  </div>
                  <div>
                    Sudden Brake: 0
                  </div>
                  <div>
                    Sharp Turn: 0
                  </div>
                  <div>
                    Overspeeding: 0
                  </div>
                  <div>
                    Unfasten Seatbelt: 0
                  </div>
                </div>
              // </React.Fragment>
            }
          >
            <div className='text-sm font-bold cursor-pointer mt-4 md:text-xs'>Violations</div>
          </HtmlTooltip>
        </div>
      </div>
      <div className='w-[20%] md:w-[23%] flex flex-col justify-center items-center text-center cursor-pointer' onClick={() => setOpen(true)}>
        <div className='text-[15px] text-black font-bold md:text-xs'>08:20 PM</div>
        <div className='text-[15px] w-[280px] md:w-full md:text-xs text-[#4285F4] leading-6 border-b-[#00000010] border-b pb-2'>Fahad Education Sector 11 Landhi Karachi Sindh</div>
      </div>

    </div>
  )
}

export default TripHistory
import React, { useState } from 'react'
import { DropIcon } from 'assets/svg_icons'
import { useSelector, useDispatch } from 'react-redux'
import { TRACKER } from '../redux/reducers/trackReducer'
import { getVehicleByGroups } from '../redux/actions/trackActions'

const defaultProps:any = {
    border: true,
    primaryStyle: true,
    placeholder: 'Select',
    tracker: {}, 
    setTracker: () => console.log('New')
}

const TrackerSelection = ({ tracker, setTracker, placeholder, border, primaryStyle }) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const trackerData = useSelector(TRACKER)
    const selectField = (value) => {
        setTracker(value)
        setOpen(!open)
        // @ts-ignore
        // dispatch(getVehicleByGroups(value?.id))
    }
    return (
        <div className='relative'>
            <div onClick={() => setOpen(!open)} className={`flex  ${primaryStyle ? "" : "w-44"} justify-between ${border && "border border-black/20"} p-2 rounded-md cursor-pointer overflow-auto`}>
                <div className={`${primaryStyle ? "text-primary font-bold xl:text-[17px]" : "xl:text-[14px]"}  md:text-[9px] 3xl:text-lg mr-1`}>
                    {
                        tracker?.name ? tracker?.name : placeholder
                    }
                </div>
                {/* <DropIcon /> */}
            </div>
            {
                open && (
                    <div className={`w-full h-24 absolute border border-black/20 rounded-lg mt-0 overflow-auto backdrop-blur-lg bg-white `}>
                        {
                            trackerData.length ? (
                                trackerData.map((v: any, i) => {
                                    return (
                                        <div className='ml-2 mt-2'>
                                            <div onClick={() => selectField(v)} className='hover:bg-primary/30 cursor-pointer py-1 text-left'>
                                                {v?.imei}
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className=''>No Results</div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

TrackerSelection.defaultProps = defaultProps

export default TrackerSelection

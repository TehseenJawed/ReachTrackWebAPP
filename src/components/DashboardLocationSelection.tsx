import React, { useState } from 'react'
import { DropIcon } from 'assets/svg_icons'
import { useSelector, useDispatch } from 'react-redux'
import { GEOFENCEAREA, GROUP_DATA, SELECTED_GEOFENCE } from '../redux/reducers/trackReducer'
import { updateSelectedGroupVehicles } from '../redux/actions/trackActions'

const defaultProps: any = {
    border: true,
    primaryStyle: true,
    placeholder: 'Select',
    group: {},
    setGroup: () => console.log('New'),
    zIndex: 0,
}

const DashboardLocationSelection = ({ handleChangeLiveData = (data, selectedGeofenceData, label) => console.log(''), geofenceArea, placeholder, border, primaryStyle, zIndex }) => {
    const [open, setOpen] = useState(false)
    const geofenceData = useSelector(GEOFENCEAREA)
    const selectedGeofence = useSelector(SELECTED_GEOFENCE)
    const dispatch = useDispatch()
    console.log('Selected geofence ... ', selectedGeofence, geofenceData);

    const selectField = (value, label = "") => {
        setOpen(!open)
        if (label === 'all') {
            // @ts-ignore
            dispatch(updateSelectedGroupVehicles(value))
            handleChangeLiveData(null, value, label)
        } else {
            // @ts-ignore
        dispatch(updateSelectedGroupVehicles(value))
        handleChangeLiveData(null, value, null)
        }
    }
    return (
        <div className='ml-2' style={{ zIndex: zIndex }}>
            {
                open && <div onClick={() => setOpen(!open)} className='cursor-pointer w-[130%] h-auto absolute left-0 -top-28' />
            }
            <div className='font-normal'>
                <div onClick={() => setOpen(!open)} className={`${primaryStyle ? "" : ""} ${border && "border border-black/20"} rounded-md cursor-pointer`}>
                    <div className={`mr-1 text-black font-bold text-lg`}>
                        {
                            selectedGeofence?.name ? selectedGeofence?.name : placeholder
                        }
                    </div>
                </div>
                {
                    open && <div className=' h-[250px]' />
                }
                {
                    open && (
                        <div className={`max-h-[250px] absolute -left-[0px] top-[33px] rounded-lg mt-0 overflow-auto min-w-[12rem] text-sm pb-4`}>
                            <div className='ml-2 mt-2'>
                                <div onClick={() => selectField({}, 'all')} className='hover:bg-primary/30 cursor-pointer py-1 text-left'>
                                    All
                                </div>
                            </div>
                            {
                                geofenceData.length ? (
                                    geofenceData.map((v: any, i) => {
                                        return (
                                            <div className='ml-2 mt-2'>
                                                <div onClick={() => selectField(v)} className='hover:bg-primary/30 cursor-pointer py-1 text-left'>
                                                    {v?.name}
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className='w-full text-center'>No Results</div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

DashboardLocationSelection.defaultProps = defaultProps

export default DashboardLocationSelection

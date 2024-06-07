import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { SearchBlackSVG, AddIconSVG } from 'assets/svg_icons';
import GeofenceMap from './geofenceMap';
import { useDispatch, useSelector } from 'react-redux';
import { GROUP_DATA, GROUP_VEHICLES, VEHICLES_DATA } from '../../../redux/reducers/trackReducer';
import { createGeoFenceAction, getVehicleByGroups, updateGeoFenceAction, updateGroupVehicles, updateRouteFenceAction } from '../../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import Slider from '@mui/material/Slider';
import UpdateGeofenceMap from './updateGeofenceMap';

const UpdateGeofenceArea = ({setOpen, data}) => {
    const [tabs, setTabs] = useState<string>("vehicle")
    const [fenceType, setFenceType] = useState<string>()
    const [mapData, setMapData] = useState<any>([])
    const [speed, setSpeed] = useState<any>(null)
    const [buffer, setBuffer] = useState<any>(false)

    const [openSpeed, setOpenSpeed] = useState<any>(null)
    const [routerfenceData, setRouterfenceData] = useState<any>(data)
    const [selectedGroup, setSelectedGroup] = useState()
    const vehicleData = useSelector(VEHICLES_DATA)
    const groupData = useSelector(GROUP_DATA)
    const groupVehicleData = useSelector(GROUP_VEHICLES)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    console.log('BUFFER .. ',data);
    
    const handleChangeEntryExit = (type) => {
        if (routerfenceData?.alerts?.includes(type)) {
            const newObj = {
                ...routerfenceData,
                alerts: routerfenceData?.alerts.filter(value => value !== type)
            }
            setRouterfenceData(newObj)
        } else {
            const newObj = {
                ...routerfenceData,
                alerts: [...routerfenceData?.alerts, type]
            }
            setRouterfenceData(newObj)
        }
    }

    const handleAddRemoveVehicle = (id) => {
        console.log('I am in ', routerfenceData?.vehicles?.includes(id));

        if (routerfenceData?.vehicles?.includes(id)) {
            const newObj = {
                ...routerfenceData,
                vehicles: routerfenceData?.vehicles?.filter(value => value !== id)
            }
            setRouterfenceData(newObj)
        } else {
            const newObj = {
                ...routerfenceData,
                vehicles: [...routerfenceData?.vehicles, id]
            }
            setRouterfenceData(newObj)
        }
    }

    const handleSubmit = () => {
        const newObj = {
            alerts: routerfenceData?.alerts,
            description: routerfenceData?.description,
            name: routerfenceData?.name,
            speed: routerfenceData?.speed,
            type: routerfenceData?.type,
            vehicles: routerfenceData?.vehicles,
            ...mapData,
        }
        console.log('NEW SUBMIT ',newObj )
        //@ts-ignore
        dispatch(updateRouteFenceAction(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant }), data?.id))
        setRouterfenceData({
            vehicles: [],
            alerts: []
        })
        setMapData(null)
        setOpen(false)
    }
    
    const handleSwitchTab = (str) => {
        if (tabs !== str) {
            setTabs(str)
        }
    }

    const handleAddGroupVehicles = (id) => {
        //@ts-ignore
        dispatch(getVehicleByGroups(id))
        setSelectedGroup(id)
    }

    useEffect(() => {
        setMapData(data?.path)
        const isBuffer = data?.buffer_size ? true : false
        setBuffer(isBuffer)
    }, [])
    // useEffect(() => {
    //     if (groupVehicleData[0]) {
    //         const newObj = {
    //             ...routerfenceData,
    //             vehicles: groupVehicleData?.map((v,i) => (v?.id))
    //         }
    //         setRouterfenceData(newObj)
    //     }
    // }, [groupVehicleData])
    return (
        <div className=' w-full h-screen flex justify-between  mt-6'>
            <div className='h-screen  overflow-auto w-[25%]'>
                <div className='text-lg text-black/30'>
                    <div className='font-bold'>Routefence Name *</div>
                    <input type="text" value={routerfenceData?.name} onChange={(e) => setRouterfenceData({ ...routerfenceData, name: e.target.value })} className='backdrop-blur-md text-lg bg-white/40 mt-2 border-2 border-black/10 !rounded-3xl w-full p-2 pl-3' placeholder='Eg. Schools, factories' />
                </div>
                <div className='text-lg text-black/30 mt-2'>
                    <div className='font-bold'>Description</div>
                    <textarea value={routerfenceData?.description} onChange={(e) => setRouterfenceData({ ...routerfenceData, description: e.target.value })} className='backdrop-blur-md text-lg bg-white/40 mt-2 border-2 border-black/30 !rounded-xl w-full p-2 pl-3' placeholder='Extra details about the geofence'></textarea>
                </div>

                <div className='text-lg text-black/30'>
                    <div className='font-bold flex items-end'>
                        Source From 
                        <div onClick={() => setMapData([])} className='bg-black w-[50px] mt-4 h-6 ml-4 rounded-xl flex justify-center items-center text-center text-white text-xs font-bold cursor-pointer shadow-lg shadow-black-500/50'>Reset</div>
                    </div> 
                    <input type="text" disabled value={mapData[0] ? `${mapData[0]?.lat}, ${mapData[0]?.lng}` : ""} className='backdrop-blur-md text-lg bg-white/40 mt-2 border-2 border-black/10 !rounded-3xl w-full p-2 pl-3' placeholder='Eg. Schools, factories' />
                </div>

                <div className='text-lg text-black/30'>
                    <div className='font-bold'>Destination/To</div>
                    <input type="text" value={mapData[1] ? `${mapData[1]?.lat}, ${mapData[1]?.lng}` : ""} disabled className='backdrop-blur-md text-lg bg-white/40 mt-2 border-2 border-black/10 !rounded-3xl w-full p-2 pl-3' placeholder='Eg. Schools, factories' />
                </div>

                <div className='text-lg text-black/30'>
                    <div className='font-bold'>Buffer (meters)</div>
                    <input type="text" value={routerfenceData?.buffer_size} disabled className='backdrop-blur-md text-lg bg-white/40 mt-2 border-2 border-black/10 !rounded-3xl w-full p-2 pl-3' placeholder='Eg. Schools, factories' />
                </div>

                <div className='flex mb-4'>
                    {/* <div className='bg-black w-[150px] mt-4 h-10 rounded-xl flex justify-center items-center text-center text-white text-sm font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                        <div className='ml-4'>Get Route</div>
                    </div> */}
                    <div onClick={() => setBuffer(true)} className='bg-black w-[150px] mt-4 h-10 rounded-xl flex justify-center ml-4 items-center text-center text-white text-sm font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                        <div className='ml-4'>Add Buffer</div>
                    </div>
                </div>

                <div className='backdrop-blur-md text-lg bg-white/40 w-full rounded-xl border border-black/10 mt-2'>
                    <div className='mt-4 mx-2 w-11/12'>
                        <div className='flex mb-2'>
                            <div onClick={() => handleSwitchTab('vehicle')} className={`text-lg text-darkGray font-bold border-primary px-2 cursor-pointer ${tabs === 'vehicle' ? 'border-b-4 ' : ''}`}>
                                Vehicles
                            </div>
                            <div onClick={() => handleSwitchTab('group')} className={`text-lg text-darkGray font-bold border-primary px-2 ml-2 cursor-pointer ${tabs === 'group' ? 'border-b-4 ' : ''}`}>
                                Groups
                            </div>
                        </div>

                        {
                            tabs === 'vehicle' && (
                                <div>
                                    <div className='relative flex items-cente w-full mt-4'>
                                        <input
                                            type='text'
                                            placeholder="Search"
                                            className='text-sm w-full p-2 backdrop-blur-md bg-white/0  border text-black/60 border-black/30 rounded-md'

                                        // id="outlined-start-adornment"
                                        />
                                        <SearchBlackSVG className="absolute right-[5%] top-[25%]" />
                                    </div>

                                    <div className='my-6 ml-4'>
                                        {
                                            vehicleData[0] && (
                                                vehicleData?.map((v: any, i) => (
                                                    <label className='flex justify-start items-center mt-2 text-lg'>
                                                        <input type="checkbox" checked={routerfenceData?.vehicles?.includes(v?.id)} onClick={() => handleAddRemoveVehicle(v?.id)} className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
                                                        <div className='font-bold ml-2'>{v?.number_plate}</div>
                                                        <div className='text-black/50 ml-2'>{v?.name} {v?.model}</div>
                                                    </label>
                                                ))
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }

                        {
                            tabs === 'group' && (
                                <div>
                                    <div className='relative flex items-cente w-full mt-4'>
                                        <input
                                            type='text'
                                            placeholder="Search"
                                            className='text-sm w-full p-2 backdrop-blur-md bg-white/0  border text-black/60 border-black/30 rounded-md'

                                        // id="outlined-start-adornment"
                                        />
                                        <SearchBlackSVG className="absolute right-[5%] top-[25%]" />
                                    </div>

                                    <div className='my-6 ml-4'>
                                        {
                                            groupData[0] && (
                                                groupData?.map((v: any, i) => (
                                                    <label className='flex justify-start items-center mt-2 text-lg'>
                                                        <input type="checkbox" checked={selectedGroup === v?.id} onClick={() => handleAddGroupVehicles(v?.id)} className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
                                                        <div className='font-bold ml-2'>{v?.name}</div>
                                                    </label>
                                                ))
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className='backdrop-blur-md text-lg bg-white/40 w-full rounded-xl border border-black/10 px-3 py-2 mt-4'>
                    <div className='font-bold text-black/30'>Enable Speed</div>
                    <label className='flex justify-start items-center mt-2 text-lg'>
                        <input checked={openSpeed === true} onClick={() => setOpenSpeed(!openSpeed)} type="checkbox" className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
                        <div className='font-bold ml-2'>Speed</div>
                    </label>
                    {
                        openSpeed && <Slider defaultValue={speed} aria-label="Default" onChange={(e:any) => setSpeed(e?.target?.value)} valueLabelDisplay="auto" max={200}/>
                    }
                </div>

                <div className='backdrop-blur-md text-lg bg-white/40 w-full rounded-xl border border-black/10 px-3 py-2 mt-4'>
                    <div className='font-bold text-black/30'>Alert On</div>
                    <label className='flex justify-start items-center mt-2 text-lg'>
                        <input type="checkbox" checked={routerfenceData?.entry_enabled} onClick={() => handleChangeEntryExit('ENTRY')} className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
                        <div className='font-bold ml-2'>Entry</div>
                    </label>
                    <label className='flex justify-start items-center mt-2 text-lg'>
                        <input type="checkbox" checked={routerfenceData?.entry_enabled} onClick={() => handleChangeEntryExit('EXIT')} className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
                        <div className='font-bold ml-2'>Exit</div>
                    </label>
                </div>

                <div onClick={handleSubmit} className='bg-primary w-[250px] mt-4 h-11 rounded-xl flex justify-center px-4 items-center text-center text-white text-sm font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                    <AddIconSVG />
                    <div className='ml-4'>Update Geofence</div>
                </div>
            </div>
            <div className='h-[96%] w-[70%] overflow-auto border border-black/10 rounded-xl mr-2'>
                <UpdateGeofenceMap mapData={mapData} buffer={buffer} setMapData={setMapData} />
            </div>
        </div>
        
    )
}

export default UpdateGeofenceArea
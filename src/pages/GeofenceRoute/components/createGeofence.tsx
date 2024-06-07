import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { SearchBlackSVG, AddIconSVG } from 'assets/svg_icons';
import GeofenceMap from './geofenceMap';
import { useDispatch, useSelector } from 'react-redux';
import { GROUP_DATA, GROUP_VEHICLES, VEHICLES_DATA } from '../../../redux/reducers/trackReducer';
import { createGeoFenceAction, createRouteFenceAction, getVehicleByGroups, updateGroupVehicles } from '../../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import Slider from '@mui/material/Slider';

const CreateGeofence = ({ setOpen }) => {
    const [tabs, setTabs] = useState<string>("vehicle")
    const [mapData, setMapData] = useState<any>([])
    const [error, setError] = useState<boolean>(false)
    const [openSpeed, setOpenSpeed] = useState<any>(null)
    const [speed, setSpeed] = useState<any>(null)
    const [routeFence, setRouteFence] = useState<any>({
        vehicles: [],
        alerts: [],
        buffer: 20,
        name: "",
        description: ""
    })
    const [buffer, setBuffer] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState()
    const vehicleData = useSelector(VEHICLES_DATA)
    const groupData = useSelector(GROUP_DATA)
    const groupVehicleData = useSelector(GROUP_VEHICLES)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const handleChangeEntryExit = (type) => {
        if (routeFence?.alerts?.includes(type)) {
            const newObj = {
                ...routeFence,
                alerts: routeFence?.alerts.filter(value => value !== type)
            }
            setRouteFence(newObj)
        } else {
            const newObj = {
                ...routeFence,
                alerts: [...routeFence?.alerts, type]
            }
            setRouteFence(newObj)
        }
    }

    const handleAddRemoveVehicle = (id) => {
        console.log('I am in ', routeFence?.vehicles?.includes(id));

        if (routeFence?.vehicles?.includes(id)) {
            const newObj = {
                ...routeFence,
                vehicles: routeFence?.vehicles?.filter(value => value !== id)
            }
            setRouteFence(newObj)
        } else {
            const newObj = {
                ...routeFence,
                vehicles: [...routeFence?.vehicles, id]
            }
            setRouteFence(newObj)
        }
    }

    const handleSubmit = () => {
        if(mapData[0]){
            enqueueSnackbar("Please select two points to calculate routing.", { variant: 'error' })
        }
        else if(routeFence?.name && routeFence?.description && routeFence?.buffer && vehicleData[0]) {
            const newObj = {
                ...routeFence,
                source: [{
                    lat: mapData[0]?.lat,
                    lng: mapData[0]?.lng
                }],
                destination: [{
                    lat: mapData[1]?.lat,
                    lng: mapData[1]?.lng
                }],
                path: [
                    {
                        lat: mapData[0]?.lat,
                        lng: mapData[0]?.lng
                    },
                    {
                        lat: mapData[1]?.lat,
                        lng: mapData[1]?.lng
                    }
                ],
                buffer_size: 20,
                speed_enabled: openSpeed,
            }
            //@ts-ignore
            dispatch(createRouteFenceAction(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant })))
            setRouteFence({
                vehicles: [],
                alerts: []
            })
            setMapData(null)
            setOpen(false)
        } else {
            setError(true)
            enqueueSnackbar("Please fill all fields.", { variant: 'error' })
        }
    }

    const handleSwitchTab = (str) => {
        if (tabs !== str) {
            setTabs(str)
        }
    }

    const handleAddGroupVehicles = (id) => {
        console.log('RUNNING',id);
        
        //@ts-ignore
        dispatch(getVehicleByGroups(id))
        setSelectedGroup(id)

    }
    console.log('222222', groupVehicleData);


    useEffect(() => {
        updateGroupVehicles([])
    }, [])
    useEffect(() => {
        if (groupVehicleData[0]) {
            const newObj = {
                ...routeFence,
                vehicles: groupVehicleData?.map((v, i) => (v?.id))
            }
            setRouteFence(newObj)
        } else {
            const newObj = {
                ...routeFence,
                vehicles: []
            }
            setRouteFence(newObj)
        }

    }, [groupVehicleData])
    return (
        <div className='w-full h-screen flex justify-between'>
            <div className='h-[96%] overflow-auto w-[25%] mt-4 pr-2 border-none'>
                <div className='text-lg text-black/30'>
                    <div className='font-bold'>Routefence Name *</div>
                    <input type="text" value={routeFence?.name} onChange={(e) => setRouteFence({ ...routeFence, name: e.target.value })} className='backdrop-blur-md text-lg bg-white/40 mt-2 border-2 border-black/10 !rounded-3xl w-full p-2 pl-3' placeholder='Eg. Schools, factories' />
                    {
                        (error && routeFence?.name === "") && <div className='text-danger text-[10px]'>*Field is required.</div>
                    }
                </div>
                <div className='text-lg text-black/30 mt-2'>
                    <div className='font-bold'>Description</div>
                    <textarea value={routeFence?.description} onChange={(e) => setRouteFence({ ...routeFence, description: e.target.value })} className='backdrop-blur-md text-lg bg-white/40 mt-2 border-2 border-black/30 !rounded-3xl w-full p-2 pl-3' placeholder='Extra details about the geofence'></textarea>
                    {
                        (error && routeFence?.description === "") && <div className='text-danger text-[10px]'>*Field is required.</div>
                    }
                </div>

                <div className='text-lg text-black/30'>
                    <div className='font-bold flex items-end'>
                        Source From 
                        <div onClick={() => setMapData([])} className='bg-black w-[50px] mt-4 h-6 ml-4 rounded-xl flex justify-center items-center text-center text-white text-xs font-bold cursor-pointer shadow-lg shadow-black-500/50'>Reset</div>
                    </div> 
                    <input type="text" disabled value={mapData[0] ? `${mapData[0]?.lat}, ${mapData[0]?.lng}` : ""} onChange={(e) => setRouteFence({ ...routeFence, name: e.target.value })} className='backdrop-blur-md text-lg bg-white/40 mt-2 border-2 border-black/10 !rounded-3xl w-full p-2 pl-3' placeholder='Eg. Schools, factories' />
                </div>

                <div className='text-lg text-black/30'>
                    <div className='font-bold'>Destination/To</div>
                    <input type="text" value={mapData[1] ? `${mapData[1]?.lat}, ${mapData[1]?.lng}` : ""} disabled onChange={(e) => setRouteFence({ ...routeFence, name: e.target.value })} className='backdrop-blur-md text-lg bg-white/40 mt-2 border-2 border-black/10 !rounded-3xl w-full p-2 pl-3' placeholder='Eg. Schools, factories' />
                </div>

                <div className='text-lg text-black/30'>
                    <div className='font-bold'>Buffer (meters)</div>
                    <input type="text" value={routeFence?.buffer} disabled onChange={(e) => setRouteFence({ ...routeFence, buffer: e.target.value })} className='backdrop-blur-md text-lg bg-white/40 mt-2 border-2 border-black/10 !rounded-3xl w-full p-2 pl-3' placeholder='Eg. Schools, factories' />
                </div>

                <div className='flex mb-4'>
                    <div onClick={() => setBuffer(true)} className='bg-black w-[150px] mt-4 h-10 rounded-xl flex justify-center ml-4 items-center text-center text-white text-sm font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                        <div className='ml-4'>Add Buffer</div>
                    </div>
                </div>

                <div className='backdrop-blur-md text-lg bg-white/40 w-full rounded-3xl border border-black/10 mt-2'>
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
                                                        <input type="checkbox" checked={routeFence?.vehicles?.includes(v?.id)} onClick={() => handleAddRemoveVehicle(v?.id)} className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
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
                        <input type="checkbox" checked={openSpeed === true} onClick={() => setOpenSpeed(!openSpeed)} className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
                        <div className='font-bold ml-2'>Speed</div>
                    </label>
                    {
                        openSpeed && <Slider defaultValue={50} aria-label="Default" onChange={(e: any) => setSpeed(e?.target?.value)} valueLabelDisplay="auto" max={200} />
                    }

                </div>

                <div className='backdrop-blur-md text-lg bg-white/40 w-full rounded-xl border border-black/10 px-3 py-2 mt-4'>
                    <div className='font-bold text-black/30'>Alert On</div>
                    <label className='flex justify-start items-center mt-2 text-lg'>
                        <input type="checkbox" checked={routeFence?.alerts?.includes('ENTRY')} onClick={() => handleChangeEntryExit('ENTRY')} className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
                        <div className='font-bold ml-2'>Entry</div>
                    </label>
                    <label className='flex justify-start items-center mt-2 text-lg'>
                        <input type="checkbox" checked={routeFence?.alerts?.includes('EXIT')} onClick={() => handleChangeEntryExit('EXIT')} className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
                        <div className='font-bold ml-2'>Exit</div>
                    </label>
                </div>

                <div onClick={handleSubmit} className='bg-black w-[250px] mt-4 h-10 rounded-xl flex justify-center px-4 items-center text-center text-white text-sm font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                    <AddIconSVG />
                    <div className='ml-4'>Create Geofence</div>
                </div>
            </div>
            <div className='h-[96%] w-[70%] mt-4 overflow-auto border border-black/10 rounded-xl mr-2'>
                <GeofenceMap mapData={mapData} buffer={buffer} setMapData={setMapData} />
            </div>
        </div>

    )
}

export default CreateGeofence
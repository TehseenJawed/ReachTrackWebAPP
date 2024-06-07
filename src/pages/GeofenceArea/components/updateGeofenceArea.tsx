import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { SearchBlackSVG, AddIconSVG } from 'assets/svg_icons';
import GeofenceMap from './geofenceMap';
import { useDispatch, useSelector } from 'react-redux';
import { GROUP_DATA, GROUP_VEHICLES, VEHICLES_DATA } from '../../../redux/reducers/trackReducer';
import { createGeoFenceAction, getVehicleByGroups, updateGeoFenceAction, updateGroupVehicles } from '../../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import Slider from '@mui/material/Slider';
import UpdateGeofenceMap from './updateGeofenceMap';

const UpdateGeofenceArea = ({setOpen, data}) => {
    const [tabs, setTabs] = useState<string>("vehicle")
    const [fenceType, setFenceType] = useState<string>()
    const [mapData, setMapData] = useState<any>(null)
    const [speed, setSpeed] = useState<any>(null)

    const [openSpeed, setOpenSpeed] = useState<any>(null)
    const [geofenceData, setGeofenceData] = useState<any>(data)
    const [selectedGroup, setSelectedGroup] = useState()
    const vehicleData = useSelector(VEHICLES_DATA)
    const groupData = useSelector(GROUP_DATA)
    const groupVehicleData = useSelector(GROUP_VEHICLES)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    console.log('Data is here ....',data);
    
    const handleChangeEntryExit = (type) => {
        if (geofenceData?.alerts?.includes(type)) {
            const newObj = {
                ...geofenceData,
                alerts: geofenceData?.alerts.filter(value => value !== type)
            }
            setGeofenceData(newObj)
        } else {
            const newObj = {
                ...geofenceData,
                alerts: [...geofenceData?.alerts, type]
            }
            setGeofenceData(newObj)
        }
    }

    const handleAddRemoveVehicle = (id) => {
        console.log('I am in ', geofenceData?.vehicles?.includes(id));

        if (geofenceData?.vehicles?.includes(id)) {
            const newObj = {
                ...geofenceData,
                vehicles: geofenceData?.vehicles?.filter(value => value !== id)
            }
            setGeofenceData(newObj)
        } else {
            const newObj = {
                ...geofenceData,
                vehicles: [...geofenceData?.vehicles, id]
            }
            setGeofenceData(newObj)
        }
    }

    const loopSearch = (selector, type) => {
        if (document.querySelector(selector) != null && document.querySelector(selector)?.hasAttribute('role')) {
            const polygon = document.getElementsByClassName('gmnoprint')[0].childNodes[1].firstChild
            const circle = document.getElementsByClassName('gmnoprint')[0].childNodes[2].firstChild
            if (type === 'polygon') {
                console.log('INSIDE>......', polygon);
                //@ts-ignore
                polygon.click()
                setFenceType(type)
                return
            } else if (type === 'circle') {
                console.log('INSIDE>......', circle);
                //@ts-ignore
                circle.click()
                setFenceType(type)
                return
            }
            return;
        }
    }

    const handleSubmit = () => {
        const newObj = {
            alerts: geofenceData?.alerts,
            description: geofenceData?.description,
            name: geofenceData?.name,
            speed: geofenceData?.speed,
            type: geofenceData?.type,
            vehicles: geofenceData?.vehicles,
            ...mapData,
        }
        console.log('NEW SUBMIT ',newObj )
        //@ts-ignore
        dispatch(updateGeoFenceAction(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant }), data?.id))
        setGeofenceData({
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
        if(data?.speed){
            setSpeed(data?.speed)
            setOpenSpeed(true)
        }
        const newObj = {
            center: data?.center,
            path: data?.path,
            radius: data?.radius,
            type: data?.type
        }
        setMapData(newObj)
    }, [])
    useEffect(() => {
        if (groupVehicleData[0]) {
            const newObj = {
                ...geofenceData,
                vehicles: groupVehicleData?.map((v,i) => (v?.id))
            }
            setGeofenceData(newObj)
        }

    }, [groupVehicleData])
    return (
        <div className=' w-full h-screen flex justify-between  mt-6'>
            <div className='h-screen  overflow-auto w-[25%]'>
                <div className='text-lg text-black/30'>
                    <div className='font-bold'>Geofence Name *</div>
                    <input type="text" value={geofenceData?.name} onChange={(e) => setGeofenceData({ ...geofenceData, name: e.target.value })} className='backdrop-blur-md text-lg bg-white/40 mt-2 border-2 border-black/10 !rounded-xl w-full p-2 pl-3' placeholder='Eg. Schools, factories' />
                </div>
                <div className='text-lg text-black/30 mt-2'>
                    <div className='font-bold'>Description</div>
                    <textarea value={geofenceData?.description} onChange={(e) => setGeofenceData({ ...geofenceData, description: e.target.value })} className='backdrop-blur-md text-lg bg-white/40 mt-2 border-2 border-black/30 !rounded-xl w-full p-2 pl-3' placeholder='Extra details about the geofence'></textarea>
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
                                                        <input type="checkbox" checked={geofenceData?.vehicles?.includes(v?.id)} onClick={() => handleAddRemoveVehicle(v?.id)} className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
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
                    <div className='font-bold text-black/30'>Geofence Type *</div>
                    <label className='flex justify-start items-center mt-2 text-lg'>
                        <input type="checkbox" checked={geofenceData?.type === 'CIRCLE'} onClick={() => loopSearch('.gmnoprint', 'circle')} className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
                        <div className='font-bold ml-2'>Circle</div>
                    </label>
                    <label className='flex justify-start items-center mt-2 text-lg'>
                        <input type="checkbox" checked={geofenceData?.type === 'POLYGON'} onClick={() => loopSearch('.gmnoprint', 'polygon')} className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
                        <div className='font-bold ml-2'>Polygon</div>
                    </label>
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
                        <input type="checkbox" checked={geofenceData?.alerts?.includes('ENTRY')} onClick={() => handleChangeEntryExit('ENTRY')} className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
                        <div className='font-bold ml-2'>Entry</div>
                    </label>
                    <label className='flex justify-start items-center mt-2 text-lg'>
                        <input type="checkbox" checked={geofenceData?.alerts?.includes('EXIT')} onClick={() => handleChangeEntryExit('EXIT')} className='w-[16px] h-[16px] rounded-[5px] border border-black custom-checkbox' name="vehicle1" value="Bike" />
                        <div className='font-bold ml-2'>Exit</div>
                    </label>
                </div>

                <div onClick={handleSubmit} className='bg-primary w-[250px] mt-4 h-11 rounded-xl flex justify-center px-4 items-center text-center text-white text-sm font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                    <AddIconSVG />
                    <div className='ml-4'>Update Geofence</div>
                </div>
            </div>
            <div className='h-[96%] w-[70%] overflow-auto border border-black/10 rounded-xl mr-2'>
                <UpdateGeofenceMap toUpdate={true} geofenceData={mapData} setGeofenceData={setMapData} />
            </div>
        </div>
        
    )
}

export default UpdateGeofenceArea
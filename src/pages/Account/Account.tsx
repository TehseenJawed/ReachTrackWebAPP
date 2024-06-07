import React, { useEffect, useState } from 'react';
import { RightBlueIcon } from 'assets/svg_icons';
import { useSelector, useDispatch } from 'react-redux';
import { DRIVER_DATA, PERMISSIONS } from '../../redux/reducers/trackReducer.tsx';
import { deleteDriverAction } from '../../redux/actions/trackActions.js';
import { useSnackbar } from 'notistack';
import CustomizedSwitches from 'components/customizeSwitch.tsx';
import { motion } from 'framer-motion'
import Slider from '@mui/material/Slider';
import { screenTitles } from 'utils/helpers.tsx';

const Account = () => {
    const [openAddDriver, setOpenAddDriver] = useState(false)
    const [settingTab, setSettingTab] = useState(null)
    const [openEditDriver, setOpenEditDriver] = useState(false)
    const [selectedDriver, setSelectedDriver] = useState(null)
    const [options, setOptions] = useState(null)
    const [openScreen, setOpenScreen] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [editSelectedDriver, setEditSelectedDriver] = useState(null)
    const [viewStyle, setViewStyle] = useState("grid")
    const driver = useSelector(DRIVER_DATA)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const permissions = useSelector(PERMISSIONS)
    const authorizeFeatures = permissions?.filter(value => value.module === 'DRIVER')
    const isListDrivers = authorizeFeatures.filter(value => value.name === 'LIST')
    const isViewDrivers = authorizeFeatures.filter(value => value.name === 'VIEW')
    const isCreateDrivers = authorizeFeatures.filter(value => value.name === 'CREATE')
    const isUpdateDrivers = authorizeFeatures.filter(value => value.name === 'UPDATE')
    const isDeleteDrivers = authorizeFeatures.filter(value => value.name === 'DELETE')
    console.log('authorizeFeatures...', isListDrivers);


    const handleDeleteDriver = (id) => {
        if (isDeleteDrivers[0]) {
            // @ts-ignore
            dispatch(deleteDriverAction(id, (message, variant) => enqueueSnackbar(message, { variant: variant })))
            setSelectedDriver(null)
            setOptions(null)
        } else {
            enqueueSnackbar("You do not have rights to delete driver.", { variant: "error" })
        }
    }
    const handleShowOptions = (id) => {
        if (options === id) {
            setOptions(null)
        } else {
            setOptions(id)
        }
    }

    const handleAddDriver = () => {
        if (isCreateDrivers[0]) {
            setOpenAddDriver(true)
        } else {
            enqueueSnackbar("You do not have rights to add a new driver.", { variant: "error" })
        }
    }

    const handleViewDriver = (v) => {
        if (isViewDrivers[0]) {
            setSelectedDriver(v)
            setViewStyle('list')
        } else {
            enqueueSnackbar("You do not have rights to see details of a driver.", { variant: "error" })
        }
    }

    const handleEditDriver = (v) => {
        if (isUpdateDrivers[0]) {
            setOpenEditDriver(true);
            setEditSelectedDriver(v)
        } else {
            enqueueSnackbar("You do not have rights to update existing driver.", { variant: "error" })
        }
    }

    const notification = [
        {
            title: 'Time Check After Threshold',
            email: true,
            all: true,
        },
        {
            title: 'Ignition On Restricted Hours',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Vehicle Moving Restricted Hours',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Harsh Acceleration',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Sudden Brakes',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Sharp Turn',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Vehicle Idle',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Impact',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Over Speeding',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Unfasten Seatbelt',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Ignition',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Vehicle moving',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Vehicle parked',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Vehicle offline',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Vehicle online',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'GeoFence Entry',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'GeoFence Exit',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'RouteFence Entry',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'RouteFence Exit',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Engine Kill',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Engine Release',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Oil Change',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Tyre Change',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Fatigue',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Fatigue Rest',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Low Fuel',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'High RPM',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Engine Heatup',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Door Status',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Panic Button',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Unknown Driver',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Jamming',
            inapp: true,
            sms: true,
            email: true,
            all: true,
        },
        {
            title: 'Warning Popups',
            all: true,
        },
        {
            title: 'Notification Sound',
            all: true,
        },
    ]
    useEffect(() => {
        document.title = screenTitles?.accounts
    }, [])
    return (
        <div className='w-[100%] px-2 flex flex-col items-center mb-4'>
            <div onClick={() => setSettingTab('Overspeeding')} className='flex w-full p-3 mt-3 backdrop-blur-lg bg-white/40 items-center cursor-pointer rounded-xl'>
                <RightBlueIcon className={settingTab === "Overspeeding" ? "rotate-90" : null} />
                <div className='font-semibold text-[18px] ml-4'>Over speeding Threshold</div>
            </div>
            {
                settingTab === 'Overspeeding' ? (
                    <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className={`flex flex-col w-full justify-between py-4 mt-2 items-center backdrop-blur-md rounded-xl`}>
                        <div className='ml-12 w-full'>
                            <div className='text-[16px] font-semibold'>
                                Select Over speeding threshold value 120 km/h
                            </div>
                            <Slider defaultValue={50} aria-label="Default" onChange={(e: any) => console.log(e?.target?.value)} valueLabelDisplay="auto" max={200} />
                            <div className='bg-primary w-[80px] lg:mt-0 h-9 rounded-xl flex justify-between px-4 items-center text-center text-white text-md font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                                <div className='ml-2'>Save</div>
                            </div>
                        </div>
                    </motion.div>
                ) : null
            }
            <div onClick={() => setSettingTab('FatigueThreshold')} className='flex w-full p-3 mt-3 backdrop-blur-lg bg-white/40 items-center cursor-pointer rounded-xl'>
                <RightBlueIcon className={settingTab === "FatigueThreshold" ? "rotate-90" : null}/>
                <div className='font-semibold text-[18px] ml-4'>Fatigue Threshold</div>
            </div>
            {
                settingTab === 'FatigueThreshold' ? (
                    <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className={`flex flex-col w-full justify-between py-4 mt-2 items-center backdrop-blur-md rounded-xl`}>
                        <div className='ml-12 w-full'>
                            <div className='text-[16px] font-semibold'>
                                Select Fatigue threshold value 240 minutes
                            </div>
                            <Slider defaultValue={50} aria-label="Default" onChange={(e: any) => console.log(e?.target?.value)} valueLabelDisplay="auto" max={200} />
                            <div className='text-[16px] font-semibold'>
                                Select Fatigue Rest threshold value 10 minutes
                            </div>
                            <Slider defaultValue={50} aria-label="Default" onChange={(e: any) => console.log(e?.target?.value)} valueLabelDisplay="auto" max={200} />
                            <div className='bg-primary w-[80px] lg:mt-0 h-9 rounded-xl flex justify-between px-4 items-center text-center text-white text-md font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                                <div className='ml-2'>Save</div>
                            </div>
                        </div>
                    </motion.div>
                ) : null
            }
            <div onClick={() => setSettingTab('Not Responding')} className='flex w-full p-3 mt-3 backdrop-blur-lg bg-white/40 items-center cursor-pointer rounded-xl'>
                <RightBlueIcon className={settingTab === "Not Responding" ? "rotate-90" : null} />
                <div className='font-semibold text-[18px] ml-4'>Not Responding Threshold</div>
            </div>
            {
                settingTab === 'Not Responding' ? (
                    <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className={`flex flex-col w-full justify-between py-4 mt-2 items-center backdrop-blur-md rounded-xl`}>
                        <div className='ml-12 w-full'>
                            <div className='text-[16px] font-semibold'>
                                Select NR threshold value 3 Hours
                            </div>
                            <Slider defaultValue={50} aria-label="Default" onChange={(e: any) => console.log(e?.target?.value)} valueLabelDisplay="auto" max={200} />
                            <div className='bg-primary w-[80px] lg:mt-0 h-9 rounded-xl flex justify-between px-4 items-center text-center text-white text-md font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                                <div className='ml-2'>Save</div>
                            </div>
                        </div>
                    </motion.div>
                ) : null
            }
            <div onClick={() => setSettingTab('Notifications')} className='flex w-full p-3 mt-3 backdrop-blur-lg bg-white/40 items-center cursor-pointer rounded-xl'>
                <RightBlueIcon className={settingTab === "Notifications" ? "rotate-90" : null} />
                <div className='font-semibold text-[18px] ml-4'>Notifications</div>
            </div>
            {
                settingTab === 'Notifications' ? (
                    <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className={`flex flex-col w-full justify-between py-4 mt-2 items-center backdrop-blur-md rounded-xl`}>
                        <div className='ml-12 w-full'>
                            <div className='w-full flex justify-between items-center mt-2'>
                                <div className='w-6/12 font-bold text-[20px]'>
                                    Complaint
                                </div>
                                <div className='w-1/12 font-bold text-[20px]'>
                                    InApp
                                </div>
                                <div className='w-1/12 font-bold text-[20px]'>
                                    SMS
                                </div>
                                <div className='w-1/12 font-bold text-[20px]'>
                                    Email
                                </div>
                                <div className='w-1/12 font-bold text-[20px]'>
                                    All
                                </div>
                            </div>
                            {
                                notification.map((v, i) => (
                                    <div className='w-full flex justify-between items-center mt-2'>
                                        <div className='w-6/12 font-bold text-[20px]'>
                                            {v?.title}
                                        </div>
                                        <div className='w-1/12 font-bold text-[20px]'>
                                            {
                                                v.inapp === true ? <CustomizedSwitches showLabel={false} label={"Analytics"} open={v?.inapp} setOpen={setOpenScreen} /> : null
                                            }
                                        </div>
                                        <div className='w-1/12 font-bold text-[20px]'>
                                            {
                                                v.sms === true ? <CustomizedSwitches showLabel={false} label={"Analytics"} open={v?.sms} setOpen={setOpenScreen} /> : null
                                            }
                                        </div>
                                        <div className='w-1/12 font-bold text-[20px]'>
                                            {
                                                v.email === true ? <CustomizedSwitches showLabel={false} label={"Analytics"} open={v?.email} setOpen={setOpenScreen} /> : null
                                            }
                                        </div>
                                        <div className='w-1/12 font-bold text-[20px]'>
                                            {
                                                v.all === true ? <CustomizedSwitches showLabel={false} label={"Analytics"} open={v?.all} setOpen={setOpenScreen} /> : null
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                            <div className='bg-primary w-[80px] mt-4 h-9 rounded-xl flex justify-between px-4 items-center text-center text-white text-md font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                                <div className='ml-2'>Save</div>
                            </div>
                        </div>
                    </motion.div>
                ) : null
            }
            <div onClick={() => setSettingTab('Driving Score')} className='flex w-full p-3 mt-3 backdrop-blur-lg bg-white/40 items-center cursor-pointer cursor-pointer rounded-xl'>
                <RightBlueIcon className={settingTab === "Driving Score" ? "rotate-90" : null}/>
                <div className='font-semibold text-[18px] ml-4'>Driving Score Configuration</div>
            </div>
            {
                settingTab === 'Driving Score' ? (
                    <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className={`flex flex-col w-full justify-between py-4 mt-2 items-center backdrop-blur-md rounded-xl`}>
                        <div className='ml-12 w-full'>
                            <div className='w-full flex justify-between items-center mt-2'>
                                <div className='w-6/12 font-bold text-[20px]'>
                                  Harsh acceleration
                                </div>
                                <div className='w-1/12 font-bold text-[20px]'>
                                  <CustomizedSwitches showLabel={false} label={"Analytics"} open={true} setOpen={() => console.log('')} /> 
                                </div>
                            </div>
                            <div className='w-full flex justify-between items-center mt-2'>
                                <div className='w-6/12 font-bold text-[20px]'>
                                  Sudden Brakes
                                </div>
                                <div className='w-1/12 font-bold text-[20px]'>
                                  <CustomizedSwitches showLabel={false} label={"Analytics"} open={true} setOpen={() => console.log('')} /> 
                                </div>
                            </div>
                            <div className='w-full flex justify-between items-center mt-2'>
                                <div className='w-6/12 font-bold text-[20px]'>
                                  Sharp Turn
                                </div>
                                <div className='w-1/12 font-bold text-[20px]'>
                                  <CustomizedSwitches showLabel={false} label={"Analytics"} open={true} setOpen={() => console.log('')} /> 
                                </div>
                            </div>
                            <div className='w-full flex justify-between items-center mt-2'>
                                <div className='w-6/12 font-bold text-[20px]'>
                                  Over Speeding
                                </div>
                                <div className='w-1/12 font-bold text-[20px]'>
                                  <CustomizedSwitches showLabel={false} label={"Analytics"} open={true} setOpen={() => console.log('')} /> 
                                </div>
                            </div>
                            <div className='w-full flex justify-between items-center mt-2'>
                                <div className='w-6/12 font-bold text-[20px]'>
                                  Unfasten Seatbelt
                                </div>
                                <div className='w-1/12 font-bold text-[20px]'>
                                  <CustomizedSwitches showLabel={false} label={"Analytics"} open={true} setOpen={() => console.log('')} /> 
                                </div>
                            </div>
                            <div className='bg-primary w-[80px] mt-4 h-9 rounded-xl flex justify-between px-4 items-center text-center text-white text-md font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                                <div className='ml-2'>Save</div>
                            </div>
                        </div>
                    </motion.div>
                ) : null
            }
        </div>
    )
}

export default Account

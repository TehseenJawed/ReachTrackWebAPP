import React, { useState, useEffect } from 'react';
import { BrandCarIconSVG, BrandDropDownSVG, CreateIconBrandSVG } from 'assets/svg_icons';
import { motion } from 'framer-motion'
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import ChangeOilForm from './components/changeOilForm';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { OIL_CHANGE, OTHER_CHANGE, PERMISSIONS, TIRE_CHANGE, VEHICLES_DATA } from '../../redux/reducers/trackReducer';
import { getMaintenanceData } from '../../redux/actions/trackActions';
import ChangeTyreForm from './components/changeTyreForm';
import OtherMaintenance from './components/otherMaintenance';
import HistoryTable from './components/historyTable';
import OtherMaintenanceTable from './components/otherMaintenanceTable';
import { useParams } from 'react-router-dom';
import { screenTitles } from 'utils/helpers';


const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: '#000000',
    width: '100%',
    background: 'none',
    display: 'flex',
    justifyContent: 'flex-start',
    boxShadow: 'none',
    textAlign: 'left',
    transition: '0.4 !important',
    '&:hover': {
        boxShadow: 'none',
        backgroundColor: '#EEECF8',
        transition: '0.4s !important'
    },
}));

const Maintenance = () => {
    const [openSelect, setOpenSelect] = useState(false)
    const [expand, setExpand] = useState<string>(null)
    const [openOilForm, setOpenOilForm] = useState(false)
    const [openTyreForm, setOpenTyreForm] = useState(false)
    const [openOtherMaintenance, setOpenOtherMaintenance] = useState(false)
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const vehicleData = useSelector(VEHICLES_DATA)
    const oilChangeData = useSelector(OIL_CHANGE)
    const tireChangeData = useSelector(TIRE_CHANGE)
    const otherChangeData = useSelector(OTHER_CHANGE)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const params = useParams();

    const permissions = useSelector(PERMISSIONS)
    const authorizeFeatures = permissions?.filter(value => value.module === 'MAINTENANCE')
    const isListGroup = authorizeFeatures.filter(value => value.name === 'LIST')
    // const isViewDrivers = authorizeFeatures.filter(value => value.name === 'VIEW')
    const isCreateFuelGroup = authorizeFeatures.filter(value => value.name === 'CREATE')
    // const isUpdateFuelGroup = authorizeFeatures.filter(value => value.name === 'UPDATE')
    const isDeleteMaintenance = authorizeFeatures.filter(value => value.name === 'DELETE')

    const handleExpand = (text) => {
        if (expand !== text) {
            setExpand(text)
        } else {
            setExpand(null)
        }
    }
    const latestOtherMaintenance = otherChangeData?.OtherMaintenance?.otherLog[0]

    const handleSelectVehicle = (value) => {
        setSelectedVehicle(value)
        setOpenSelect(false)
    }

    const handleCreateOtherMaintenance = (text) => {
        if (text === 'Others') {
            if (isCreateFuelGroup[0]) {
                setOpenOtherMaintenance(true)
            } else {
                enqueueSnackbar("You do not have rights to create new maintenance.", { variant: "error" })
            }
        } else if (text === 'Oil') {
            if (isCreateFuelGroup[0]) {
                setOpenOilForm(true)
            } else {
                enqueueSnackbar("You do not have rights to create new maintenance.", { variant: "error" })
            }
        } else if(text === 'Tire') {
            if (isCreateFuelGroup[0]) {
                setOpenTyreForm(true)
            } else {
                enqueueSnackbar("You do not have rights to create new maintenance.", { variant: "error" })
            }
        }
    }

    useEffect(() => {
        if (selectedVehicle) {
            //@ts-ignore
            dispatch(getMaintenanceData((message, variant) => enqueueSnackbar(message, { variant: variant }), selectedVehicle?.id))
        }
    }, [selectedVehicle])

    useEffect(() => {
        document.title = screenTitles.maintenance
        if (params?.vehicleId) {
            const filterVehicle = vehicleData?.filter((value: any) => value?.number_plate === params?.vehicleId)
            if (filterVehicle[0]) {
                setSelectedVehicle(filterVehicle[0])
            }
        }
    }, [])
    return (
        <div className='w-[100%] px-2'>
            <ChangeOilForm open={openOilForm} setOpen={setOpenOilForm} vehicle={selectedVehicle} />
            <ChangeTyreForm open={openTyreForm} setOpen={setOpenTyreForm} vehicle={selectedVehicle} />
            <OtherMaintenance open={openOtherMaintenance} setOpen={setOpenOtherMaintenance} vehicle={selectedVehicle} />
            <div className=''>
                <div className='flex items-start mt-4'>
                    <div className='flex justify-start items-start backdrop-blur-md p-3 rounded-xl bg-white/40  border-white border-2 border-t-0'>
                        <div className='flex justify-center items-center' onClick={() => setOpenSelect(!openSelect)}>
                            <div className='shadow-base bg-black min-w-[135px] lg:mt-0 h-9 rounded-xl flex justify-between px-4 items-center text-center text-white text-xl font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                                <BrandCarIconSVG />
                                <div className='ml-2'>{selectedVehicle?.number_plate || 'Select'}</div>
                            </div>
                            <div className='shadow-base  bg-black w-[50px] ml-2 border-white border lg:mt-0 h-9 rounded-xl flex justify-between px-4 items-center text-center text-white text-sm font-black cursor-pointer shadow-lg shadow-black-500/50'>
                                <BrandDropDownSVG />
                            </div>
                        </div>
                        <div className='ml-4 text-lg'>
                            <div className='text-2xl'>
                                {`${selectedVehicle?.make || ''} ${selectedVehicle?.model || 'Not Selected'}`}
                            </div>
                            <div className='select-text'>
                                {selectedVehicle?.imei || '0'}
                            </div>
                            <div className='select-text'>
                                Meter Reading: <b>{selectedVehicle?.odo_meter_reading || 0} KM</b>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    openSelect || expand ? <div onClick={() => {setOpenSelect(false); setExpand(null)}} className='w-full h-full absolute left-0 top-0'/> : null
                }
                <div className='flex items-start w-full'>
                    {
                        openSelect && (
                            <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className='lg:w-[190px] md:w-[190px] h-[140px] rounded-lg ml-1 border border-white backdrop-blur-md bg-white/60 absolute top-16 z-40 overflow-auto'>
                                {
                                    vehicleData.map((v: any, i) => <ColorButton key={i} onClick={() => handleSelectVehicle(v)} variant="contained"><div className='text-xs py-1 border-b-[#00000010] border-b'>{v?.number_plate}</div></ColorButton>)
                                }
                            </motion.div>
                        )
                    }
                </div>
            </div>

            <div className='mt-8 w-full flex justify-center items-center !z-100'>
                <div className="w-9/12 relative">
                    {
                        selectedVehicle ?
                            (
                                <div>
                                    <img className='w-full' src={'/assets/vehcile_image3.png'} alt="" />
                                    <div className='absolute bottom-[30%] right-[8%] w-9 h-9 cursor-pointer'>
                                        <div onClick={() => handleExpand('Tire')} className="absolute animate-ping inline-flex">
                                            <div className='bg-primary w-10 h-10 rounded-full'></div>
                                        </div>
                                        <div className='mt-3 ml-3 rounded-full w-4 h-4 bg-primary'></div>
                                        {
                                            expand === 'Tire' && (
                                                <motion.div initial={{ y: -100 }} animate={{ y: 0 }} style={{ zIndex: 100 }} className='w-[258px] -mt-2 relative'>
                                                    <div className='w-full flex justify-end'>
                                                        <div style={!isCreateFuelGroup[0] ? {display: 'none'} : {}} onClick={() => handleCreateOtherMaintenance('Tire')}  className='shadow-base backdrop-blur-md bg-white/50 w-[135px] border mb-2 border-white border-t-0 lg:mt-0 h-9 rounded-lg flex justify-between px-4 items-center text-center text-primary text-xl font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                                                            <CreateIconBrandSVG />
                                                            <div className='ml-2 text-sm'>Change Tyre</div>
                                                        </div>
                                                    </div>
                                                    <div className='w-full p-4 rounded-xl backdrop-blur-xl bg-white/50 border-2 border-white border-t-0'>
                                                        <div className='border-l-[6px] border-[#FF0000] pl-4 min-h-[70px] mb-2'>
                                                            <div className="text-black font-bold text-[18px]">Tyre Change Due</div>
                                                            <div className='text-[14px] mt-2 text-black/80'>
                                                                <div className='flex'>
                                                                    Date:
                                                                    <div className='font-bold text-black ml-2'>{tireChangeData?.tyreChangeDue?.Duration || '00-00-0000'}</div>
                                                                </div>
                                                                <div className='flex'>
                                                                    Mileage:
                                                                    <div className='font-bold text-black ml-2'>{tireChangeData?.tyreChangeDue?.distance || '0'} KM</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='border-l-[6px] border-[#004AD7] pl-4 min-h-[70px] my-4'>
                                                            <div className="text-black font-bold text-[18px]">Since Last Tyre Change</div>
                                                            <div className='text-[14px] mt-2 text-black/80'>
                                                                <div className='flex'>
                                                                    Distance Covered:
                                                                    <div className='font-bold text-black ml-2'>{tireChangeData?.SinceLasttyreChange?.distanceCoverd || '0'} KM</div>
                                                                </div>
                                                                <div className='flex'>
                                                                    Time Elapsed:
                                                                    <div className='font-bold text-black ml-2'>{tireChangeData?.SinceLasttyreChange?.timeCoverd || '0'} Days</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='border-l-[6px] border-[#E4871A] pl-4 min-h-[70px] my-4'>
                                                            <div className="text-black font-bold text-[18px]">Notification</div>
                                                            <div className='text-[14px] mt-2 text-black/80'>
                                                                <div className='flex'>
                                                                    Date:
                                                                    <div className='font-bold text-black ml-2'>{tireChangeData?.tyreNotification?.PendingTime || '00-00-0000'} </div>
                                                                </div>
                                                                <div className='flex'>
                                                                    Mileage:
                                                                    <div className='font-bold text-black ml-2'>{tireChangeData?.tyreNotification?.Distance || '0'} KM</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )
                                        }
                                    </div>

                                    <div className='absolute top-[35%] right-[35%] w-9 h-9 cursor-pointer'>
                                        <div onClick={() => handleExpand('Other')} className=" absolute animate-ping inline-flex">
                                            <div className='bg-primary w-10 h-10 rounded-full'></div>
                                        </div>
                                        <div className='mt-3 ml-3 rounded-full w-4 h-4 bg-primary '></div>
                                        {
                                            expand === 'Other' && (
                                                <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className='w-[258px] -mt-8'>
                                                    <div className='w-full flex justify-end'>
                                                        <div style={!isCreateFuelGroup[0] ? {display: 'none'} : {}} onClick={() => handleCreateOtherMaintenance("Others")} className='shadow-base backdrop-blur-md bg-white/50 w-[175px] border mb-2 border-white border-t-0 lg:mt-0 h-9 rounded-lg flex justify-between px-4 items-center text-center text-primary text-xl font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                                                            <CreateIconBrandSVG />
                                                            <div className='ml-2 text-sm'>Other Maintenance</div>
                                                        </div>
                                                    </div>
                                                    <div className='w-full p-4 rounded-xl backdrop-blur-xl bg-white/50 border-2 border-white border-t-0'>
                                                        <div className="text-black font-bold text-[18px]">Other Change </div>
                                                        {
                                                            latestOtherMaintenance ? (
                                                                <div className='text-base mt-2 text-black/80'>
                                                                    <div className='border-l-[6px] border-[#FF0000] pl-4 min-h-[40px] mb-2'>
                                                                        <div className='flex'>
                                                                            Date:
                                                                            <div className='font-bold text-black ml-2'>{latestOtherMaintenance?.date}</div>
                                                                        </div>
                                                                        <div className='flex'>
                                                                            Type:
                                                                            <div className='font-bold text-black ml-2'>{latestOtherMaintenance?.type} </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='border-l-[6px] border-[#004AD7]  pl-4 min-h-[40px] mb-2'>
                                                                        <div className='flex'>
                                                                            Cost:
                                                                            <div className='font-bold text-black ml-2'>{latestOtherMaintenance?.cost} </div>
                                                                        </div>
                                                                        <div className='flex'>
                                                                            Warranty:
                                                                            <div className='font-bold text-black ml-2'>{latestOtherMaintenance?.warranty} </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='border-l-[6px] border-[#E4871A] pl-4 min-h-[40px] mb-2'>
                                                                        <div className='flex'>
                                                                            Description:
                                                                            <div className='font-bold text-black ml-2'>{latestOtherMaintenance?.description} </div>
                                                                        </div>
                                                                        <div className='flex '>
                                                                            Warranty:
                                                                            <div className='font-bold text-black ml-2'>{latestOtherMaintenance?.warranty} </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className='text-base mt-2 text-black/80'>
                                                                    <div className='flex'>
                                                                        Date:
                                                                        <div className='font-bold text-black ml-2'>00-00-0000</div>
                                                                    </div>
                                                                    <div className='flex'>
                                                                        Mileage:
                                                                        <div className='font-bold text-black ml-2'>0 KM</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }


                                                    </div>
                                                </motion.div>
                                            )
                                        }
                                    </div>

                                    <div className='absolute top-[33%] left-[14%] w-9 h-9 cursor-pointer'>
                                        <div onClick={() => handleExpand("Oil")} className="absolute animate-ping inline-flex">
                                            <div className='bg-primary w-10 h-10 rounded-full'></div>
                                        </div>
                                        <div className='mt-3 ml-3 rounded-full w-4 h-4 bg-primary '></div>
                                        {
                                            expand === 'Oil' && (
                                                <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className='w-[258px] -mt-8'>
                                                    <div style={{ zIndex: 10000 }} className='w-full flex justify-end'>
                                                        <div style={!isCreateFuelGroup[0] ? {display: 'none'} : {}} onClick={() => handleCreateOtherMaintenance("Oil")} className='shadow-base backdrop-blur-md bg-white/50 w-[125px] border mb-2 border-white border-t-0 lg:mt-0 h-9 rounded-lg flex justify-between px-4 items-center text-center text-primary text-xl font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                                                            <CreateIconBrandSVG />
                                                            <div className='ml-2 text-sm'>Change Oil</div>
                                                        </div>
                                                    </div>
                                                    <div className='w-full p-4 rounded-xl backdrop-blur-xl bg-white/50 border-2 border-white border-t-0'>
                                                        <div className='border-l-[6px] border-[#FF0000] pl-4 min-h-[70px] mb-2'>
                                                            <div className="text-black font-bold text-[18px]">Oil Change Due</div>
                                                            <div className='text-[14px] mt-2 text-black/80'>
                                                                <div className='flex'>
                                                                    Date:
                                                                    <div className='font-bold text-black ml-2'>{oilChangeData?.oilChangeDue?.Duration || '00-00-0000'}</div>
                                                                </div>
                                                                <div className='flex'>
                                                                    Mileage:
                                                                    <div className='font-bold text-black ml-2'>{oilChangeData?.oilChangeDue?.distance || '0'} KM</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='border-l-[6px] border-[#004AD7] pl-4 min-h-[70px] my-4'>
                                                            <div className="text-black font-bold text-[18px]">Since Last Oil Change</div>
                                                            <div className='text-[14px] mt-2 text-black/80'>
                                                                <div className='flex'>
                                                                    Distance Covered:
                                                                    <div className='font-bold text-black ml-2'>{oilChangeData?.SinceLastOilChange?.distanceCoverd || '0'} KM</div>
                                                                </div>
                                                                <div className='flex'>
                                                                    Time Elapsed:
                                                                    <div className='font-bold text-black ml-2'>{oilChangeData?.SinceLastOilChange?.timeCoverd || '0'} Days</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='border-l-[6px] border-[#E4871A] pl-4 min-h-[70px] my-4'>
                                                            <div className="text-black font-bold text-[18px]">Notification</div>
                                                            <div className='text-base mt-2 text-black/80'>
                                                                <div className='flex'>
                                                                    Date:
                                                                    <div className='font-bold text-black ml-2'>{oilChangeData?.oilNotification?.PendingTime || '00-00-0000'}</div>
                                                                </div>
                                                                <div className='flex'>
                                                                    Mileage:
                                                                    <div className='font-bold text-black ml-2'>{oilChangeData?.oilNotification?.Distance || '0'} KM</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </motion.div>
                                            )
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className='relative'>
                                    <div className='w-full cursor-pointer flex justify-center items-center text-[25px] text-white h-[500px] -top-4 rounded-xl'>
                                        <div onClick={() => setOpenSelect(true)}>Please select vehicle</div>
                                    </div>
                                    <img style={{ zIndex: -1 }} className='w-full h-[500px] absolute top-0 -z-1' src={'/assets/vehcile_image3.png'} alt="" />
                                </div>
                            )
                    }


                </div>
            </div>
            {
                ['Tire', 'Oil']?.includes(expand) ? <HistoryTable isDeleteMaintenance={isDeleteMaintenance} selectedVehicle={selectedVehicle} option={expand} data={expand === 'Tire' ? tireChangeData?.tyreMaintenance?.tyreChangelog : oilChangeData?.oilMaintenance?.oilChangelog} /> : null
            }
            {
                expand === 'Other' && <OtherMaintenanceTable isDeleteMaintenance={isDeleteMaintenance} selectedVehicle={selectedVehicle} data={otherChangeData?.OtherMaintenance?.otherLog} />
            }

        </div>
    )
}

export default Maintenance

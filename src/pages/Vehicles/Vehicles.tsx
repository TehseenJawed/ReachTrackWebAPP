import React, { useEffect, useState } from 'react';
import { vehicleData } from 'apis/api_response.tsx';
import AlertBox from 'components/alertBox.tsx';
import ComplaintBox from './components/complaintBox.tsx';
import { Button } from '@mui/material'
import { exportExcel } from '../../redux/actions/authActions.js';
import { deleteVehicle, getDriverData, getVehicleAction } from '../../redux/actions/trackActions.js';
import { AddIconSVG, SearchBlackSVG, ExportSVG, BottomBlackIcon } from 'assets/svg_icons.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { VEHICLES_DATA, DRIVER_DATA, PERMISSIONS, GEOFENCEAREA, FUEL_GROUPS } from '../../redux/reducers/trackReducer.tsx';
import AddVehicle from './components/AddVehicle.tsx';
import { useSnackbar } from 'notistack';
import { GridViewSVG, ListViewSVG } from 'assets/svg_icons';
import VehicleCard from './components/vehicleCard.tsx';
import { OptionIconSVG } from 'assets/svg_icons'
import { useParams } from 'react-router-dom';
import EditVehicle from './components/editVehicle.tsx';
import VehicleImage from '../../assets/images/vehcile_image.png'
import CustomizedSwitches from 'components/customizeSwitch.tsx';
import { screenTitles } from 'utils/helpers.tsx';
import { motion } from 'framer-motion'
import DashboardGroupSelection from 'components/DashboardGroupSelection.tsx';
import SelectionField from 'components/SelectionField.tsx';

const Vehicles = () => {
    const [viewStyle, setViewStyle] = useState("grid")
    const [searchField, setSearchField] = useState("")
    const [globalDeselect, setGlobalDeselect] = useState("")
    const [row, setRow] = useState(vehicleData)
    const [isFocus, setIsFocus] = useState(false)
    const [openScreen, setOpenScreen] = useState(false)
    const [openAlert, setOpenAlert] = useState(false);
    const [openComplaint, setOpenComplaint] = useState(false);
    const [editSelectedDriver, setEditSelectedVehicle] = useState(null)
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [options, setOptions] = useState(null)
    const [page, setPage] = useState<number>(0)
    const [addVehicle, setAddVehicle] = useState<boolean>(false)
    const [openEditVehicle, setOpenEditVehicle] = useState(false)
    const [group, setGroup] = useState<any>()
    const [fuelGroup, setFuelGroup] = useState<any>()
    const driver = useSelector(DRIVER_DATA)
    const vehiclesData = useSelector(VEHICLES_DATA)
    const dispatch = useDispatch()
    const params = useParams()
    const permissions = useSelector(PERMISSIONS)
    const authorizeFeatures = permissions?.filter(value => value.module === 'VEHICLE')
    const isViewVehicles = authorizeFeatures.filter(value => value.name === 'VIEW')
    const isCreateVehicles = authorizeFeatures.filter(value => value.name === 'CREATE')
    const isUpdateVehicles = authorizeFeatures.filter(value => value.name === 'UPDATE')
    const isDeleteVehicles = authorizeFeatures.filter(value => value.name === 'DELETE')
    const geofenceArea = useSelector(GEOFENCEAREA)
    const fuelGroupData = useSelector(FUEL_GROUPS)

    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteVehicle = (id) => {
        if (isDeleteVehicles[0]) {
            // @ts-ignore
            dispatch(deleteVehicle(id, (message, variant) => enqueueSnackbar(message, { variant: variant })))
            setSelectedVehicle(null)
            setOptions(null)
        } else {
            enqueueSnackbar("You do not have rights to delete vehicle.", { variant: 'error' })
        }
    }
    const handleShowOptions = (id) => {
        if (options === id) {
            setOptions(null)
        } else {
            setOptions(id)
        }
    }
console.log('isViewVehicles[0] 00',isViewVehicles[0]);

    const handleOpenListView = (v) => {
        console.log('RUNN');
        
        if (isViewVehicles[0]) {
            setViewStyle('list');
            setSelectedVehicle(v);
        } else {
            enqueueSnackbar("You do not have rights to see vehicle details.", { variant: 'error' })
        }
    }

    const handleAddVehicle = () => {
        if (isCreateVehicles[0]) {
            setAddVehicle(true)
        } else {
            enqueueSnackbar("You do not have rights to add vehicle details.", { variant: 'error' })
        }
    }

    const handleEdit = (selectedVehicle) => {
        if (isUpdateVehicles[0]) {
            setOpenEditVehicle(true);
            setEditSelectedVehicle(selectedVehicle)
        } else {
            enqueueSnackbar("You do not have rights to edit vehicle details.", { variant: 'error' })
        }
    }

    const paramSeperator = (value1, value2) => {
        if (value1 && value2) {
            return '&'
        }
        return ''
    }

    const handleOpenOptions = () => {
        if (options) {
            setOptions(false)
        }
    }

    useEffect(() => {
        const searchVehicleCondition = searchField.length >= 2;
        if (searchVehicleCondition || group?.id || fuelGroup?.id) {
            const params = `?${searchVehicleCondition ? `q=${searchField}` : ''}${paramSeperator(searchField, group)}${group ? `group_id=${group.id}` : ''}${paramSeperator(group, fuelGroup?.id)}${paramSeperator(searchField, fuelGroup?.id)}${fuelGroup?.id ? `fuel_group_id=${fuelGroup?.id}` : ''}`
            console.log('params --->> ', params);
            //@ts-ignore
            dispatch(getVehicleAction((message, variant) => enqueueSnackbar(message, { variant: variant }), null, params))
        } else if (searchField.length === 0) {
            //@ts-ignore
            dispatch(getVehicleAction((message, variant) => enqueueSnackbar(message, { variant: variant }), null))
        }
    }, [searchField, group, fuelGroup])

    useEffect(() => {
        document.title = screenTitles?.vehicles
        if (params?.id) {
            setViewStyle('list')
            const filterVehicle = vehiclesData?.filter((value: any) => value.id === params?.id)
            console.log('NEW..', vehiclesData, filterVehicle);
            if (filterVehicle[0]) {
                setSelectedVehicle(filterVehicle[0])
            }
        }
    }, [])
    return (
        <div className='w-[100%] px-2 pb-2 flex flex-col items-center mb-4'>
            <AddVehicle open={addVehicle} setOpen={setAddVehicle} />
            <EditVehicle open={openEditVehicle} setOpen={setOpenEditVehicle} data={editSelectedDriver} setSelectedVehicle={setSelectedVehicle} />
            {globalDeselect !== "" || options ? <div onClick={handleOpenOptions} className='absolute left-[0vh] top-0 h-screen w-full' /> : null}
            <div className='w-full flex justify-between mt-2'>
                <div className='flex items-center w-[650px]'>
                    <div className='flex md:mt-4 xl:mt-0'>
                        <div style={!isCreateVehicles[0] ? { display: 'none' } : {  }} onClick={handleAddVehicle} className='bg-black w-[150px] lg:mt-0 h-9 rounded-xl flex justify-between px-4 items-center text-center text-white text-md font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                            <AddIconSVG />
                            <div className='ml-2'>Add Vehicle</div>
                        </div>
                    </div>

                    <div className='flex items-center relative ml-3'>
                        {
                            !isFocus && <SearchBlackSVG className="absolute left-[10px] top-[7px]" />
                        }
                        <input
                            type="text"
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => searchField === "" && setIsFocus(false)}
                            onChange={(e) => setSearchField(e.target.value)}
                            placeholder="Search Vehicle"
                            className='backdrop-blur-md bg-white/50 border-b border-x rounded-lg border-white/80 w-[200px] h-9 vehicle-search-field'
                            id="outlined-start-adornment"
                        />
                        {/* <BottomBlackIcon className="absolute right-[10px] top-[7px]" /> */}
                    </div>
                    <div className='flex justify-center items-center'>
                        {globalDeselect ? <div onClick={() => setGlobalDeselect("")} className='absolute left-0 w-full h-full' style={{ zIndex: 1 }} /> : null}
                        <div style={{ zIndex: 1 }} className='backdrop-blur-md bg-white/50 border-b border-x rounded-lg border-white/80 h-9 flex justify-center items-center ml-3'>
                            <DashboardGroupSelection options={options} setOptions={setOptions} dashboard={false} globalDeselect={globalDeselect} setGlobalDeselect={setGlobalDeselect} zIndex={100000} group={group} setGroup={setGroup} placeholder={"Group"} border={false} />
                        </div>
                        <div style={{ zIndex: 1 }} className='backdrop-blur-md bg-white/50 border-b border-x rounded-lg border-white/80 h-9 flex justify-center items-center ml-3 '>
                            <SelectionField options={options} setOptions={setOptions} value={fuelGroup} globalDeselect={globalDeselect} setGlobalDeselect={setGlobalDeselect} setValue={setFuelGroup} data={fuelGroupData} placeholder={"Fuel Group"} border={false} viewKey={'name'} />
                        </div>
                    </div>
                </div>

                <div className='flex justify-between items-center w-[220px]'>
                    <div className='flex justify-center items-center'>
                        <div onClick={() => setViewStyle('grid')} className={`${viewStyle === 'grid' && 'bg-black/20 rounded-md'} p-1 m-1 cursor-pointer`}>
                            <GridViewSVG />
                        </div>
                        <div onClick={() => setViewStyle('list')} className={`${viewStyle === 'list' && 'bg-black/20 rounded-md'} p-1 m-1 cursor-pointer`}>
                            <ListViewSVG />
                        </div>
                    </div>
                    <CustomizedSwitches label={"Analytics"} open={openScreen} setOpen={setOpenScreen} />
                </div>

                <div style={{zIndex: 0}} className='w-[300px] flex justify-end items-end'>
                    <Button onClick={() => exportExcel(row, "vehicles.xlsx")} style={{ color: '#fff' }}>
                        <div className='px-4 border-b border-l border-r border-white flex justify-between items-center w-[115px] h-9 bg-black rounded-xl'>
                            <ExportSVG />
                            <span className='text-white font-bold text-base capitalize'>Export</span>
                        </div>
                    </Button>
                    <Button onClick={() => exportExcel(row, "vehicles.xlsx")} style={{ color: '#fff' }}>
                        <div className='px-4 border-b border-l border-r border-white flex justify-between items-center w-[115px] h-9 bg-black rounded-xl'>
                            <ExportSVG />
                            <span className='text-white font-bold text-base capitalize'>Update</span>
                        </div>
                    </Button>
                </div>
            </div>

            <AlertBox states={{ openAlert, setOpenAlert }} />
            <ComplaintBox states={{ openComplaint, setOpenComplaint }} />

            {
                viewStyle === 'list' && (
                    <div className='flex w-full h-[85vh] mt-4'>
                        <div className='w-3/12 text-[14px] flex flex-col justify-start items-start font-semibold'>
                            {
                                vehiclesData.map((v: any, i) => <div onClick={() => handleOpenListView(v)} className={`px-4 py-1 m-0.5 cursor-pointer flex ${selectedVehicle?.number_plate === v?.number_plate && 'bg-black/10'} rounded-lg`}>{v?.number_plate}</div>)
                            }
                        </div>
                        <div className='w-9/12 border-l border-black/20'>
                            {
                                selectedVehicle ? (
                                    <div className='w-[450px] flex flex-col ml-[12vw] relative mt-2'>
                                        <div className='flex w-full justify-end mt-4'>
                                            <div style={!isUpdateVehicles[0] ? { display: 'none' } : {}} onClick={() => handleShowOptions(selectedVehicle?.id)} className='w-6 h-6  flex justify-center items-center cursor-pointer'>
                                                <OptionIconSVG />
                                            </div>
                                            {
                                                options === selectedVehicle?.id && (
                                                    <div className=' backdrop-blur-lg bg-white/40 w-24 absolute top-8 right-4 text-sm z-10 p-2 rounded-md cursor-pointer'>
                                                        <div onClick={() => handleEdit(selectedVehicle)} className='py-2'>Edit</div>
                                                        <div onClick={() => handleDeleteVehicle(selectedVehicle?.id)} className='py-2 text-danger'>Delete</div>
                                                    </div>
                                                )
                                            }
                                        </div>

                                        <div onClick={() => setOptions(null)} className='flex justify-center w-full my-6'>
                                            <img className='w-10/12' src={VehicleImage} alt={"Car"} />
                                        </div>

                                        <div className='text-darkGray text-xs font-semibold'>
                                            <div className='mt-1 font-bold text-black text-lg select-text'>{selectedVehicle?.name || 'N/A'}</div>
                                            <div className=' font-bold text-black text-sm select-text'>{selectedVehicle?.number_plate || 'N/A'}</div>
                                            <div className='my-1 select-text'>{selectedVehicle?.odo_meter_reading || 'N/A'} KMS ODOMETER</div>
                                            <div className='my-1 select-text'>Tracker IMEI - {selectedVehicle?.imei || 'N/A'}</div>
                                        </div>

                                        <div className='text-darkGray text-xs font-semibold mt-2'>
                                            <div className='mt-1 font-bold text-black text-base'>INFORMATION</div>
                                            <div className='my-1 select-text'>Shift Hours {`${selectedVehicle?.shift_hours} Hrs` || 'Not Available'} </div>
                                            <div className='my-1 select-text'>Shift Time {`${selectedVehicle?.shift_time}` || 'Not Available'} </div>
                                            <div className='my-1 select-text'>{`${selectedVehicle?.make} ${selectedVehicle?.model}` || 'Make and Modal not available'}</div>
                                            {/* <div className='my-1'>{selectedVehicle?.color || 'Color Not Available'}</div> */}
                                            <div className='my-1 select-text'>{selectedVehicle?.fuel_group_name || 'No Fuel Group Available'}</div>
                                        </div>

                                        <div className='w-full mt-10 mb-4 text-[12px] text-black/80'>
                                            <div className='w-full flex justify-between items-center text-center pb-1 border-b border-black/10 mt-2'>
                                                <div className=''>Shift</div>
                                                <div className='font-bold select-text'>{`${selectedVehicle?.shift_hours} Hrs` || "N/A"}</div>
                                            </div>
                                            <div className='w-full flex justify-between items-center text-center pb-1 border-b border-black/10 mt-2'>
                                                <div className=''>Category</div>
                                                <div className='font-bold select-text'>{selectedVehicle.category || "N/A"}</div>
                                            </div>
                                            <div className='w-full flex justify-between items-center text-center pb-1 border-b border-black/10 mt-2'>
                                                <div className=''>Car Type</div>
                                                <div className='font-bold select-text'>{selectedVehicle?.type || "N/A"}</div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='w-[450px] flex flex-col ml-[9vw]'>
                                        <div className='flex w-full justify-center items-center mt-4 text-4xl text-black/20 font-semi-bold'>
                                            <div>
                                                No Active Driver
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
            {
                viewStyle === 'grid' && (
                    <VehicleCard globalDeselect={globalDeselect} setGlobalDeselect={setGlobalDeselect} handleOpenOptions={handleOpenOptions} handleEdit={handleEdit} isUpdateVehicles={isUpdateVehicles} handleOpenListView={(e) => handleOpenListView(e)} data={vehiclesData} carImage={VehicleImage} viewStyle={viewStyle} setViewStyle={setViewStyle} handleDeleteVehicle={handleDeleteVehicle} setOpenEditVehicle={setOpenEditVehicle} setEditSelectedVehicle={setEditSelectedVehicle} options={options} setOptions={setOptions} />
                )
            }
        </div>
    )
}

export default Vehicles

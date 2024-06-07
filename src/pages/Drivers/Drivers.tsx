import React, { useState, useEffect } from 'react';
import AddDrivers from './components/addDrivers.tsx';
import { AddIconSVG, ExportSVG, GridViewSVG, ListViewSVG, SearchBlackSVG, BottomBlackIcon } from 'assets/svg_icons';
import { OptionIconSVG } from 'assets/svg_icons'
import { useSelector, useDispatch } from 'react-redux';
import { DRIVER_DATA, PERMISSIONS, VEHICLES_DATA } from '../../redux/reducers/trackReducer.tsx';
import DriverCard from './components/driverCard.tsx';
import { deleteDriverAction, getDriverData } from '../../redux/actions/trackActions.js';
import { useSnackbar } from 'notistack';
import EditDriver from './components/editDriver';
import { Button } from '@mui/material'
import CustomizedSwitches from 'components/customizeSwitch.tsx';
import { exportExcel } from '../../redux/actions/authActions.js';
import { screenTitles } from 'utils/helpers.tsx';
import DashboardGroupSelection from 'components/DashboardGroupSelection.tsx';
import SelectionField from 'components/SelectionField.tsx';
import Gavatar from 'components/gavatar.tsx';

const Drivers = () => {
    const [openAddDriver, setOpenAddDriver] = useState(false)
    const [searchDriver, setSearchDriver] = useState("")
    const [globalDeselect, setGlobalDeselect] = useState("")
    const [openEditDriver, setOpenEditDriver] = useState(false)
    const [selectedDriver, setSelectedDriver] = useState(null)
    const [openScreen, setOpenScreen] = useState(null)
    const [options, setOptions] = useState(null)
    const [isFocus, setIsFocus] = useState(false)
    const [editSelectedDriver, setEditSelectedDriver] = useState(null)
    const [viewStyle, setViewStyle] = useState("grid")
    const [group, setGroup] = useState<any>()
    const [selectedVehicle, setSelectedVehicle] = useState<any>()
    const driver = useSelector(DRIVER_DATA)
    const vehicles = useSelector(VEHICLES_DATA)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const permissions = useSelector(PERMISSIONS)
    const authorizeFeatures = permissions?.filter(value => value.module === 'DRIVER')
    const isListDrivers = authorizeFeatures.filter(value => value.name === 'LIST')
    const isViewDrivers = authorizeFeatures.filter(value => value.name === 'VIEW')
    const isCreateDrivers = authorizeFeatures.filter(value => value.name === 'CREATE')
    const isUpdateDrivers = authorizeFeatures.filter(value => value.name === 'UPDATE')
    const isDeleteDrivers = authorizeFeatures.filter(value => value.name === 'DELETE')

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

    const handleOpenOptions = () => {
        console.log('options',globalDeselect);
        if(globalDeselect) {
            setGlobalDeselect("")
        }
        if(options) {
            setOptions(false)
        }
    }

    const handleViewDriver = (v) => {
        if (isViewDrivers[0]) {
            setSelectedDriver(v)
            setViewStyle('list')
        } else {
            enqueueSnackbar("You do not have rights to see details of a driver.", { variant: "error" })
        }
        if(options) {
            setOptions(false)
        }
    }

    const handleEditDriver = (v) => {
        if (isUpdateDrivers[0]) {
            setOpenEditDriver(true);
            setEditSelectedDriver(v)
            setSelectedDriver(v)
        } else {
            enqueueSnackbar("You do not have rights to update existing driver.", { variant: "error" })
        }
    }
    const paramSeperator = (value1, value2) => {
        if(value1 && value2) {
            return '&'
        }
        return ''
    }
    
    useEffect(() => {
        const searchDriverCondtion = searchDriver?.length >= 2
        if (searchDriverCondtion || group?.id || selectedVehicle?.id) {
            const params = `?${searchDriverCondtion ? `q=${searchDriver}` : ''}${paramSeperator(searchDriverCondtion, group)}${group ? `group_id=${group.id}` : ''}${paramSeperator(group, selectedVehicle?.id)}${paramSeperator(searchDriverCondtion, selectedVehicle?.id)}${selectedVehicle?.id ? `vehicle_id=${selectedVehicle?.id}` : ''}`
            console.log('params....',params);
            //@ts-ignore
            dispatch(getDriverData((message, variant) => enqueueSnackbar(message, { variant: variant }), null, params))
        } else if (searchDriver.length === 0) {
            //@ts-ignore
            dispatch(getDriverData((message, variant) => enqueueSnackbar(message, { variant: variant }), null))
        }
    }, [searchDriver, group, selectedVehicle])

    useEffect(() => {
        if(selectedDriver?.id) {
            const filteredData = driver?.filter(v => v?.id == selectedDriver?.id)
            if(filteredData[0]) {
                setSelectedDriver(filteredData[0])
            }
        }
    }, [driver])

    useEffect(() => {
        document.title = screenTitles?.drivers;
    }, [])
    return (
        <div className='w-[100%] px-2 flex flex-col items-center mb-4'>
            <EditDriver open={openEditDriver} setOpen={setOpenEditDriver} setSelectedDriver={setSelectedDriver} data={editSelectedDriver} />
            <AddDrivers open={openAddDriver} setOpen={setOpenAddDriver} />
            {(globalDeselect !== "" || options) ? <div onClick={handleOpenOptions} style={{zIndex: 1}} className='absolute left-0 w-full top-0 h-[100vh]'/> : null}
            <div className='w-full flex justify-between mt-2'>
                <div className='flex items-center w-[650px]'>
                    <div className='flex md:mt-4 xl:mt-0'>
                        <div style={!isCreateDrivers[0] ? { display: 'none' } : {}} className='bg-black w-[150px] lg:mt-0 h-9 rounded-xl flex justify-between px-4 items-center text-center text-white text-md font-bold cursor-pointer shadow-lg shadow-black-500/50' onClick={handleAddDriver}>
                            <AddIconSVG />
                            <div>Add Driver</div>
                        </div>

                    </div>

                    <div className='flex items-center relative ml-3'>
                        {
                            !isFocus && <SearchBlackSVG className="absolute left-[10px] top-[7px]" />
                        }
                        <input
                            type="text"
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => searchDriver === "" && setIsFocus(false)}
                            placeholder="Search Driver"
                            onChange={(e) => setSearchDriver(e.target.value)}
                            className='backdrop-blur-md bg-white/50 border-b border-x rounded-lg border-white/80 w-[200px] h-9 vehicle-search-field'
                            id="outlined-start-adornment"
                        />
                        {/* <BottomBlackIcon className="absolute right-[10px] top-[7px]" /> */}
                    </div>
                    <div className='flex justify-center items-center' style={{zIndex: 100000}}>
                        <div className='backdrop-blur-md bg-white/50 border-b border-x rounded-lg border-white/80 h-9 flex justify-center items-center ml-3'>
                           <DashboardGroupSelection options={options} setOptions={setOptions}  dashboard={false} globalDeselect={globalDeselect} setGlobalDeselect={setGlobalDeselect} group={group} setGroup={setGroup} placeholder={"Group"} border={false} />
                        </div>
                        <div className='backdrop-blur-md bg-white/50 border-b border-x rounded-lg border-white/80 h-9 flex justify-center items-center ml-3'>
                            <SelectionField options={options} setOptions={setOptions} globalDeselect={globalDeselect} setGlobalDeselect={setGlobalDeselect} expand={true} value={selectedVehicle} setValue={setSelectedVehicle} data={vehicles} placeholder={"Vehicles"} border={false} viewKey={'name'} />
                        </div>
                    </div>
                </div>

                <div className='flex justify-between items-center w-[220px]'>
                    <div style={{zIndex: 1}} className='flex justify-center items-center'>
                        <div onClick={() => setViewStyle('grid')} className={`${viewStyle === 'grid' && 'bg-black/20 rounded-md'} p-1 m-1 cursor-pointer`}>
                            <GridViewSVG />
                        </div>
                        <div onClick={() => setViewStyle('list')} className={`${viewStyle === 'list' && 'bg-black/20 rounded-md'} p-1 m-1 cursor-pointer`}>
                            <ListViewSVG />
                        </div>
                    </div>
                    <CustomizedSwitches label={"Analytics"} open={openScreen} setOpen={setOpenScreen} />
                </div>

                <div className='w-[300px] flex justify-end items-end'>
                    <Button onClick={() => exportExcel(driver, "vehicles.xlsx")} style={{ color: '#fff' }}>
                        <div className='px-4 border-b border-l border-r border-white flex justify-between items-center w-[115px] h-9 bg-black rounded-xl'>
                            <ExportSVG />
                            <span className='text-white font-bold text-base capitalize'>Export</span>
                        </div>
                    </Button>
                    <Button onClick={() => exportExcel(driver, "vehicles.xlsx")} style={{ color: '#fff' }}>
                        <div className='px-4 border-b border-l border-r border-white flex justify-between items-center w-[115px] h-9 bg-black rounded-xl'>
                            <ExportSVG />
                            <span className='text-white font-bold text-base capitalize'>Update</span>
                        </div>
                    </Button>
                </div>
            </div>

            {
                viewStyle === 'list' && (
                    <div className='flex w-full h-[85vh] mt-4'>
                        <div className='w-3/12 text-[14px] flex flex-col justify-start items-start font-semibold'>
                            {
                                driver.map((v, i) => <div onClick={() => handleViewDriver(v)} className={`px-4 py-1 m-0.5 cursor-pointer flex ${selectedDriver?.name === v?.name && 'bg-black/10'} rounded-lg`}>{v?.name}</div>)
                            }
                        </div>
                        <div className='w-9/12 border-l border-black/20'>
                            {
                                selectedDriver ? (
                                    <div className='w-[450px] flex flex-col ml-[12vw] relative'>
                                        <div className='flex w-full justify-end mt-4'>
                                            <div style={!isUpdateDrivers[0] ? { display: 'none' } : {}} onClick={() => handleShowOptions(selectedDriver?.id)} className='w-6 h-6  flex justify-center items-center cursor-pointer'>
                                                <OptionIconSVG />
                                            </div>
                                            {
                                                options === selectedDriver?.id && (
                                                    <div  className=' backdrop-blur-lg bg-white/40 w-24 absolute top-8 right-4 text-sm z-10 p-2 rounded-md cursor-pointer'>
                                                        <div onClick={() => {handleEditDriver(selectedDriver); handleOpenOptions()}} className='py-2'>Edit</div>
                                                        <div onClick={() => {handleDeleteDriver(selectedDriver?.id); handleOpenOptions();}} className='py-2 text-danger'>Delete</div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className='flex justify-center w-full'>
                                          <Gavatar size={80} fontSize={30} username={`${selectedDriver?.name}`}/>
                                        </div>
                                        <div className='text-md mt-4 font-black select-text'>
                                            {selectedDriver?.name || "N/A"}
                                        </div>
                                        <div className='text-sm mt-1 font-bold select-text'>
                                            {selectedDriver?.vehicle?.number_plate || "N/A"}
                                        </div>

                                        <div className='w-full mt-10 mb-4 text-[12px] text-black/80'>
                                            <div className='w-full flex justify-between items-center text-center pb-1 border-b border-black/10 mt-2'>
                                                <div className=''>Date Of Joining</div>
                                                <div className='font-bold select-text'>{selectedDriver?.date_of_joining || "N/A"}</div>
                                            </div>
                                            <div className='w-full flex justify-between items-center text-center pb-1 border-b border-black/10 mt-2'>
                                                <div className=''>Group</div>
                                                <div className='font-bold select-text'>{selectedDriver?.group_name || "Main"}</div>
                                            </div>
                                            <div className='w-full flex justify-between items-center text-center pb-1 border-b border-black/10 mt-2'>
                                                <div className=''>License Valid</div>
                                                <div className='font-bold select-text'>{"-"}</div>
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
                viewStyle === 'grid' && <DriverCard setGlobalDeselect={setGlobalDeselect} handleOpenOptions={handleOpenOptions} globalDeselect={globalDeselect} isUpdateDrivers={isUpdateDrivers} handleViewDriver={handleViewDriver} handleEditDriver={handleEditDriver} data={driver} setSelectedDriver={setSelectedDriver} setViewStyle={setViewStyle} handleDeleteDriver={handleDeleteDriver} setOpenEditDriver={setOpenEditDriver} setEditSelectedDriver={setEditSelectedDriver} selectedDriver={selectedDriver} options={options} setOptions={setOptions} />
            }
        </div>
    )
}

export default Drivers

import React, { useEffect, useState } from 'react';
import { DownloadBlueSVG, DropIcon, SearchBlackSVG, ImportBlueSVG, CreateBlueSVG } from 'assets/svg_icons';
import TextField from '@mui/material/TextField';
import ReportComponent from './components/reportComponent';
import { reportDataContent } from 'apis/api_response';
import Checkbox from '@mui/material/Checkbox';
import { screenTitles } from 'utils/helpers';


const Reports = () => {
    const [selectedReport, setSelectedReport] = useState(null)
    const [currentScreen, setCurrentScreen] = useState(0)
    const [activeSection, setActiveSection] = useState("columns")
    console.log('Selected data...', selectedReport);
    const checkboxJSX = (labelText) => {
        const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
        return (
            <div className='flex items-center my-2'>
                <Checkbox {...label} />
                <div className='text-lg font-bold'>{labelText}</div>
            </div>
        )
    }

    const columnData = [
        {
            label: "Select All"
        },
        {
            label: "Plate Number"
        },
        {
            label: "Vehicle Make & Model"
        },
        {
            label: "Driver Name"
        },
        {
            label: "Item Name"
        },
        {
            label: "Driver Serial Number"
        },
        {
            label: "Group"
        },
        {
            label: "IMEI"
        },
        {
            label: "Alarm Type"
        },
        {
            label: "Time"
        },
        {
            label: "Alarm Location"
        },
    ]

    const alarmType = [
        {
            label: "Ignition"
        },
        {
            label: "Vehicle Parked"
        },
        {
            label: "Device Plug-In"
        },
        {
            label: "Device Plug-Out"
        },
        {
            label: "Vibration"
        },
        {
            label: "Impact"
        },
        {
            label: "Moving"
        },
        {
            label: "Idle"
        },
        {
            label: "Low Fuel"
        },
        {
            label: "High RPM"
        },
        {
            label: "Engine Heat Up"
        },
        {
            label: "Door Status"
        },
        {
            label: "Panic"
        },
        {
            label: "Jammer Detection"
        },
    ]

    useEffect(() => {
        document.title = screenTitles?.reports
    }, [])

    if (currentScreen === 0) {
        return (
            <div className='w-[100%] px-2 flex flex-col items-center mb-4'>
                <div className='flex justify-between w-full m-4'>
                    <div className='flex justify-center items-center'>
                        <div className='relative ml-2 rounded-xl overflow-auto border-b-2 border-l border-r border-white '>
                            <TextField
                                placeholder="Search Route Fence"
                                className='ad-driver-btn backdrop-blur-md bg-white/40 font-black !text-sm'
                                id="outlined-start-adornment"
                                sx={{ width: '20rem' }}
                                InputProps={{
                                    startAdornment: <SearchBlackSVG />
                                }}
                            />
                            <DropIcon className="absolute right-4 top-[30%]" />
                        </div>
                        <div className='backdrop-blur-md bg-white/40 font-black text-xs ml-2 p-2 rounded-md'>
                            Total Route Fence: 5
                        </div>
                    </div>

                    <div className='flex justify-center items-center'>
                        <div className='flex justify-between items-center border-black border-2 rounded-xl py-2 px-6 backdrop-blur-md bg-black mx-2 cursor-pointer'>
                            <DownloadBlueSVG />
                            <div className='text-white ml-4 font-bold'>Download</div>
                        </div>
                        <div className='flex justify-between items-center border-black border-2 rounded-xl py-2 px-6 backdrop-blur-md bg-black mx-2 cursor-pointer'>
                            <ImportBlueSVG />
                            <div className='text-white ml-4 font-bold'>Import Route Fence</div>
                        </div>
                        <div className='flex justify-between items-center border-black border-2 rounded-xl py-2 px-6 backdrop-blur-md bg-black mx-2 cursor-pointer'>
                            <CreateBlueSVG />
                            <div className='text-white ml-4 font-bold'>Create Route Fence</div>
                        </div>
                    </div>
                </div>
                <div className='w-full backdrop-blur-md bg-white/40 p-4 rounded-xl h-[90vh] overflow-auto'>
                    <div className='w-full flex justify-between items-center'>
                        <div className='flex'>
                            <div className='text-lg font-black ml-2'>Export</div>
                            <div className='text-lg mx-3'>Report Type</div>
                            {">"}
                            <div className='text-lg text-black/30 mx-3'>Columns</div>
                            {">"}
                            <div className='text-lg text-black/30 ml-3'>Interval</div>
                        </div>
                        <div className='flex justify-between items-center border-black bg-black border-2 rounded-xl py-2 px-6 mx-2 cursor-pointer'>
                            <div className='text-white ml-4 font-bold'>Schedule Report</div>
                        </div>
                    </div>
                    {
                        reportDataContent.map((v, i) => <ReportComponent reportInfo={v} handleSelectReport={setSelectedReport} handleChangePage={setCurrentScreen} />)
                    }
                </div>
            </div>
        )
    }

    else if (currentScreen === 1 || currentScreen === 2) {
        return (
            <div className='w-[100%] px-2 flex flex-col items-center my-4'>
                <div className='w-full backdrop-blur-md bg-white/40 p-4 rounded-xl h-[96vh] overflow-auto'>
                    <div className='w-full flex justify-between items-center'>
                        <div className='flex'>
                            <div className='text-lg font-black ml-2'>Export</div>
                            <div className='text-lg mx-3'>Report Type</div>
                            {">"}
                            <div className='text-lg text-black/30 mx-3'>Columns</div>
                            {">"}
                            <div className='text-lg text-black/30 ml-3'>Interval</div>
                        </div>
                        <div className='flex justify-center items-center border-primary border-2 backdrop-blur-md bg-white/30 rounded-xl py-2 px-6 mx-2 cursor-pointer'>
                            <div className='text-primary font-bold'>Schedule Report</div>
                        </div>
                    </div>

                    <div className='flex justify-between items-center py-6 border-black/10 border-y mt-2'>
                        <div className='flex justify-center items-center border-primary border-2 backdrop-blur-md bg-white/30 rounded-xl py-2 px-6 mx-2 cursor-pointer'>
                            <div className='text-primary font-bold'>Previous</div>
                        </div>
                        <div className='text-center'>
                            <div className='font-bold'>Select Columns</div>
                            <div>Selected columns to be displayed in report</div>
                        </div>
                        <div className='flex justify-center items-center border-primary border-2 backdrop-blur-md bg-white/30 rounded-xl py-2 px-6 mx-2 cursor-pointer'>
                            {
                                currentScreen === 2  ? <div onClick={() => setCurrentScreen(1)} className='text-primary font-bold'>Export</div> : <div onClick={() => setCurrentScreen(2)} className='text-primary font-bold'>Next</div>
                            }
                        </div>
                    </div>

                    <div className='flex mt-2'>
                        <div onClick={() => setActiveSection("columns")} className={`${activeSection === "columns" && 'border-b-4'} border-primary text-darkGray cursor-pointer font-bold text-lg`}>Columns</div>
                        <div onClick={() => setActiveSection("alarmType")} className={`${activeSection === "alarmType" && 'border-b-4'} border-primary text-darkGray cursor-pointer font-bold ml-6 text-lg`}>Alarm Type</div>
                    </div>

                    <div className='flex'>
                        {
                            activeSection === "columns" && (
                                <div className='w-5/12'>
                                    {
                                        columnData.map((v, i) => {
                                            return (
                                                <>
                                                    {checkboxJSX(v.label)}
                                                </>
                                            )
                                        })
                                    }
                                </div>

                            )
                        }
                        {
                            activeSection === "alarmType" && (
                                <div className='w-5/12'>
                                    {
                                        alarmType.map((v, i) => {
                                            return (
                                                <>
                                                    {checkboxJSX(v.label)}
                                                </>
                                            )
                                        })
                                    }
                                </div>

                            )
                        }
                        {
                            currentScreen === 2 && (
                                <div className='w-5/12 flex flex-col'>
                                    <TextField
                                        id="report-date"
                                        label="Start Date"
                                        type="date"
                                        defaultValue="2024-01-01"
                                        style={{
                                            marginLeft: 1,
                                            marginRight: 1,
                                            width: 200,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="report-date"
                                        label="End Date"
                                        type="date"
                                        defaultValue="2024-01-02"
                                        style={{
                                            marginLeft: 1,
                                            marginRight: 1,
                                            width: 200,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="report-date"
                                        label="Start Time"
                                        type="time"
                                        defaultValue="00:00"
                                        style={{
                                            marginLeft: 1,
                                            marginRight: 1,
                                            width: 200,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="report-date"
                                        label="End Time"
                                        type="time"
                                        defaultValue="00:00"
                                        style={{
                                            marginLeft: 1,
                                            marginRight: 1,
                                            width: 200,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
        )
    }
}

export default Reports;

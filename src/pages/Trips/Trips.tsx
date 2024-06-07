import React, { useEffect, useState } from 'react';
import { CalendarActionSVG, ExpandWhiteIcon, VehicleWhiteSVG, ExpandWhiteIconSVG } from 'assets/svg_icons';
import { TextField } from '@mui/material';
import TripHistory from './components/tripHistoryJSX';
import TripLocation from './components/tripLocation';
import { LocationCordProps } from 'typecasts';
import MapView from './components/mapView';
import { vehicleData } from 'apis/api_response';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { motion } from 'framer-motion'
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

const Trips = () => {
    const [openTrip, setOpenTrip] = useState<boolean>(false)
    const [openSelect, setSelect] = useState<boolean>(false)
    const [selectedPosition, setSelectedPosition] = useState<LocationCordProps>({ latitude: '33.697925463311556', longitude: '73.07286025956002' })
    const [mapView, setMapView] = useState<boolean>(false)


    useEffect(() => {
        document.title = screenTitles?.historyTrips;
    }, [])
    return (
        <div className='w-full h-screen flex justify-end z-10'>
            <TripLocation open={openTrip} setOpen={setOpenTrip} longitude={selectedPosition.longitude} latitude={selectedPosition.latitude} />
            <MapView open={mapView} setOpen={setMapView} longitude={selectedPosition.longitude} latitude={selectedPosition.latitude} />
            <div className='w-full mr-4 md:mr-2 mt-2 relative'>
                <div className='w-full backdrop-blur-md bg-white/60 text-2xl rounded-md py-2 border md:h-auto border-white '>

                    <div className='flex justify-between md:flex-col lg:flex-row md:items-end m-1'>
                        <div onClick={() => setSelect(!openSelect)} className='flex lg:w-[300px] relative md:w-[60%] justify-between cursor-pointer'>
                            <div className='bg-black px-3 md:py-3 lg:py-2 w-[80%] flex justify-start items-center rounded-xl shadow-lg'>
                                <VehicleWhiteSVG className="ml-3" />
                                <div className='text-sm text-white ml-4 font-black'>Select</div>
                            </div>
                            <div className='bg-black w-2/12 flex justify-evenly items-center rounded-xl shadow-lg'>
                                <ExpandWhiteIconSVG color="#fff" />
                            </div>
                        </div>

                        {
                            openSelect && (
                                <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className='lg:w-[300px] md:w-[60%] h-[140px] rounded-lg ml-1 border border-white backdrop-blur-md bg-white/60 absolute top-16 z-40 overflow-auto'>
                                    {
                                        vehicleData.map((v, i) => <ColorButton key={i} variant="contained"><div className='text-xs py-1 border-b-[#00000010] border-b'>{v?.plate_number}</div></ColorButton>)
                                    }
                                </motion.div>
                            )
                        }

                        <div className='flex justify-between md:w-[94%] lg:w-[700px]'>
                            <div className='bg-black p-1 md:py-2 lg:py-1 w-full flex justify-between items-center rounded-xl md:mt-2 lg:mt-0 shadow-lg'>
                                <div className='flex'>
                                    <div className='text-sm md:text-xs text-white ml-4'>From:</div>
                                    <div className='text-sm md:text-xs text-white ml-4 font-black'>9th February, 2024</div>
                                    <div className='text-sm md:text-xs text-white ml-4'>To:</div>
                                    <div className='text-sm md:text-xs text-white ml-4 font-black'>9th February, 2024</div>
                                </div>
                                <div className='flex'>
                                    <div className='w-8 h-8 mr-4 cursor-pointer rounded-full bg-white flex justify-center items-center'>
                                        <CalendarActionSVG />
                                    </div>
                                    <div className='bg-white rounded-full w-[150px] h-8 text-sm flex justify-center items-center text-black font-bold cursor-pointer'>
                                        Filter
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full my-4'>
                        <div className='flex justify-between'>
                            <div className='w-[250px] text-center'>
                                <div className='font-bold text-sm'>Date</div>
                                <div className='text-sm h-12'>
                                    <TextField
                                        id="date-trip"
                                        label="From"
                                        type="date"
                                        variant="standard"
                                        defaultValue="2017-05-24"
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
                                <div className='text-sm mt-2 md:-mt-2 h-12'>
                                    <TextField
                                        id="date-trip"
                                        label="To"
                                        variant="standard"
                                        type="date"
                                        defaultValue="2017-05-24"
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
                            </div>
                            <div className='w-[60%] text-center md:w-[40%]'>
                                <div className='font-bold text-sm md:text-xs'>Last Location</div>
                                <div className='text-sm h-12 flex justify-center items-end xl:items-center md:text-xs'>Raheel Property Dealers Sector 10 Landhi Karachi Sindh</div>
                                <div className='text-sm h-12 flex justify-center items-end xl:items-center md:text-xs '>Mashallah Biryani Center Shah Faisal-Korangi Link Sector 10 Landhi Karachi Sindh</div>
                            </div>
                            <div className='w-[15%] text-center  md:w-[15%]'>
                                <div className='font-bold text-sm md:text-xs'>Distance</div>
                                <div className='text-sm h-12 flex justify-center items-end md:text-xs'>82.5 KM</div>
                                <div className='text-sm h-12 flex justify-center items-end md:items-center md:text-xs'>12 KM</div>
                            </div>
                            <div className='w-[15%] text-center'>
                                <div className='font-bold text-sm md:text-xs'>Violations</div>
                                <div className='text-sm h-12 flex justify-center items-end md:text-xs'>0</div>
                                <div className='text-sm h-12 flex justify-center items-end md:text-xs md:items-center'>0</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full backdrop-blur-md bg-white/60 mt-2 md:h-[68vh] lg:h-[74vh] text-2xl rounded-md py-2 border border-white overflow-auto -z-50'>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v, i) => <TripHistory setOpen={setOpenTrip} setPosition={setSelectedPosition} openMapView={setMapView} />)
                    }
                </div>

            </div>
        </div>
    )
}

export default Trips

import React, { useState, useRef, useEffect } from 'react';
import { AddIconSVG, ExpandIconSVG } from 'assets/svg_icons';
import { motion } from 'framer-motion'
import { speedData } from 'apis/api_response';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Map from 'components/liveMap';
import { PlaybackVehicleDataProps, VehicleDataProps } from '@/typecasts/index.tsx';
import { playbackVehicleData } from 'apis/api_response';
import Skeleton from '@mui/material/Skeleton';
import PlaybackTable from './components/playbackTable';
import SearchPlayback from './components/searchPlayback';
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

const Playback = () => {
    const [openSpeed, setOpenSpeed] = useState(false)
    const [vehicleData, setVehicleData] = useState<VehicleDataProps>();
    const [openCriteria, setOpenCriteria] = useState(true);
    const [loading, setLoading] = useState(false)
    const [selectedPlayback, setSelectedPlayback] = useState<PlaybackVehicleDataProps>(playbackVehicleData[0])
    const playRef = useRef<any>()
    const handleChangeDuration = (e) => {
        console.log('NEW...', e);
    }
    const handleChangeVehicle = (e) => {
        console.log('NEW...', e);
        // handleChange(e)
    }
    const resetPlaybackTable = () => {
        setSelectedPlayback(playbackVehicleData[0])
        clearInterval(playRef.current)
    }

    const playPlaybackTable = () => {
        playRef.current = setInterval(() => {
            setSelectedPlayback((prev) => {
                const ind = playbackVehicleData.map(v => v.id).indexOf(prev?.id)
                if (ind + 1 === playbackVehicleData.length) {
                    clearInterval(playRef.current)
                }
                return playbackVehicleData[ind + 1]
            });
        }, 200)
    }

    const alertJSX = (label, percentage, times) => <div className='my-6'>
        <div className='text-sm text-black mb-1 font-semibold'>{label}</div>
        <motion.div
            className="w-full bg-[#D9D9D966] h-4 rounded-full flex justify-between items-center"
        >
            <motion.div
                className="bg-success h-4 rounded-full w-[0%]"
                animate={{
                    // height:  100,
                    width: percentage,
                }}
                transition={{
                    duration: 1
                }}
            />
            <div className='text-xs mr-4'>{times}</div>
        </motion.div>
    </div>
    
    useEffect(() => {
        document.title = screenTitles?.historyPlayback
    }, [])
    return (
        <div className='w-[100%] h-screen overflow-auto flex flex-col items-center mb-4 '>
            <SearchPlayback open={openCriteria} setOpen={setOpenCriteria} vehicle={vehicleData} handleChangeVehicle={setVehicleData} loading={loading} setLoading={setLoading}/>
            <div className='w-[99%] 3xl:w-[97%] h-8 mr-4 mt-3'>
                <div className='lg:h-[10vh] 2xl:h-[9vh] md:h-[15vh]'>
                    <div className='flex md:flex-col lg:flex-row l w-full justify-between items-end'>
                        <div className='bg-black shadow-lg lg:w-[60%] md:w-full md:text-sm md:h-10 rounded-xl flex justify-between px-4 items-center text-center text-white'>
                            <div><b>LC-2128</b></div>
                            <div>NA</div>
                            <div>Start Date: <b>23-10-2023 14:00</b></div>
                            <div>End Date: <b>24-10-2023 14:00</b></div>
                        </div>
                        <div className='bg-black shadow-lg w-[200px] md:mt-4 lg:mt-0 h-9 rounded-xl flex justify-between px-4 items-center text-center text-white text-md font-bold cursor-pointer' onClick={() => setOpenCriteria(true)}>
                            <AddIconSVG />
                            <div>Change Criteria</div>
                        </div>
                    </div>
                    <div className='flex mt-4'>
                        <div onClick={() => setOpenSpeed(!openSpeed)} className='text-black shadow-sm text-sm font-bold border border-white py-1.5 px-4 rounded-xl overflow-hidden backdrop-blur-md bg-white/40 cursor-pointer flex justify-between items-center w-[200px]'>
                            <div>Speed</div>
                            <div className='font-black'>1x</div>
                            <ExpandIconSVG />
                        </div>
                        <div onClick={playPlaybackTable} className='text-white text-sm py-1.5 px-4 rounded-xl flex justify-center items-center w-[100px] bg-black shadow-lg cursor-pointer ml-4'>
                            <div>Play</div>
                        </div>
                        <div onClick={resetPlaybackTable} className='text-white text-sm py-1.5 px-4 rounded-xl flex justify-center items-center w-[100px] bg-black shadow-lg cursor-pointer ml-4'>
                            <div>Reset</div>
                        </div>
                    </div>
                </div>
                {
                    openSpeed && (
                        <motion.div initial={{ y: 20 }} animate={{ y: 55 }} className='md:w-[200px] h-[140px] rounded-lg border border-white backdrop-blur-md bg-white/40 absolute md:top-28 lg:top-16 z-40 overflow-auto'>
                            {
                                speedData.map((v, i) => <ColorButton key={i} variant="contained"><div className='text-xs py-1 border-b-[#00000010] border-b'>{v?.speed}</div></ColorButton>)
                            }
                        </motion.div>
                    )
                }
                <div className='w-full flex justify-between md:mt-4 3xl:mt-2 md:flex-col xl:flex-row'>
                    <div className='xl:w-[75%] md:w-full '>
                        <div className='w-full h-[43vh] rounded-xl overflow-hidden border-white border'>
                            <Map />
                        </div>
                        <div className='w-full md:h-[43.5vh] xl:h-[44.5vh] rounded-xl overflow-hidden border-white border mt-3 backdrop-blur-md bg-white/40'>
                            {
                                loading ?
                                    <div className='w-full'><Skeleton variant="rounded" width={'100%'} height={500} /></div>
                                    :
                                    <div className='w-full'>
                                        <PlaybackTable selectedPlayback={selectedPlayback} setSelectedPlayback={setSelectedPlayback} />
                                    </div>
                            }
                        </div>
                    </div>
                    <div className='xl:w-[24%] md:w-full md:mt-4 xl:mt-0'>
                        <div className='w-full flex justify-between'>
                            <div className='w-[48%] rounded-xl border-white border backdrop-blur-md bg-white/10 p-2 h-[9vh]'>
                                <div className='text-lg text-black font-bold'>Distance</div>
                                <div className='md:text-[35px] xl:text-[32px] -mt-2 text-primary font-semibold'>82 Km</div>
                            </div>
                            <div className='w-[48%] rounded-xl border-white border backdrop-blur-md bg-white/10 p-2 h-[9vh]'>
                                <div className='text-lg text-black font-bold'>Idle Time</div>
                                <div className='md:text-[35px] xl:text-[32px] -mt-2 text-primary font-semibold'>28 min</div>
                            </div>
                        </div>
                        <div className='rounded-xl border-white border backdrop-blur-md bg-white/10 p-2 h-[9vh] mt-4'>
                            <div className='text-lg text-black font-bold'>Average Speed</div>
                            <div className='md:text-[35px] xl:text-[32px] -mt-2 text-primary font-semibold'>32 Km/Hr</div>
                        </div>
                        <div className='rounded-xl border-white border py-1 px-4 my-4 md:h-[67vh] overflow-auto'>
                            {alertJSX('Harsh Accelaration', '50%', '0 times')}
                            {alertJSX('Sudden Brakes', '50%', '0 times')}
                            {alertJSX('Sharp Turn', '50%', '0 times')}
                            {alertJSX('Overspeeding', '50%', '0 times')}
                            {alertJSX('Unfasten Seatbelt', '50%', '0 times')}
                            {alertJSX('Ignition', '50%', '0 times')}
                            {alertJSX('GeoFence Entry', '50%', '0 times')}
                            {alertJSX('GeoFence Exit', '50%', '0 times')}
                            {alertJSX('Fatigue', '50%', '0 times')}
                            {alertJSX('Stops', '50%', '3 times')}
                            {alertJSX('Distance', '50%', '28KM')}
                            {alertJSX('Idle Time', '50%', '0 Min')}
                            {alertJSX('Idle Count', '50%', '0')}
                            {alertJSX('Average Speed', '50%', '13.27 KM/H')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Playback

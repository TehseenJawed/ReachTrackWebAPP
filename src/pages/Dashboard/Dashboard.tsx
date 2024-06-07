import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACCESSTOKEN } from '../../redux/reducers/authReducer'
import TrackableOptions from './innerComponents/TrackableOption';
import { geoFenceData } from 'apis/api_response';
import { FleetTrackBlueSVGIcon, FleetTrackBlackSVGIcon, RightBlueIcon, AnalyticsBlueIconSVG, AnalyticsBlackIconSVG, BottomBlueIcon, RightBlackIcon } from 'assets/svg_icons';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { motion } from 'framer-motion'
import { useSnackbar } from 'notistack';
import AnalyticProgress from 'components/analyticProgress';
import { ALL_LIVE_VEHICLES_DATA, ANALYTICS, GEOFENCEAREA, LIVE_VEHICLES_DATA } from '../../redux/reducers/trackReducer';
import { getInitialData, updateLiveVehicleData, updateSelectedGroup } from '../../redux/actions/trackActions';
import { formatAMPM, formatDate } from '../../redux/actions/authActions';
import DashboardGroupSelection from 'components/DashboardGroupSelection';
import DashboardLocationSelection from 'components/DashboardLocationSelection';
import { screenTitles } from 'utils/helpers';

const Home = () => {
  const [geofence, setGeofence] = useState(geoFenceData[0])
  const [group, setGroup] = useState<any>()
  const [openDetails, setOpenDetails] = useState([""])
  const [globalDeselect, setGlobalDeselect] = useState("")
  const dispatch = useDispatch()
  const geofenceArea = useSelector(GEOFENCEAREA)
  const accessTokenRedux = useSelector(ACCESSTOKEN)
  const analyticsData = useSelector(ANALYTICS)
  const access_token = localStorage.getItem("access_token")
  const allLiveData: any = useSelector(ALL_LIVE_VEHICLES_DATA)
  const liveVehicles: any = useSelector(LIVE_VEHICLES_DATA)
  const { enqueueSnackbar } = useSnackbar();
  const accessToken = access_token || accessTokenRedux

  const handleChangeTrackVahicle = () => {
  }

  const openModal = (section: string) => {
    if (openDetails.includes(section)) {
      // setOpenDetails("")
      const newArr = openDetails.filter(v => v !== section)
      setOpenDetails(newArr)
    } else {
      setOpenDetails([...openDetails, section])
    }
  }

  const handleChangeLiveData = (data, selectedGeofenceData = null, label = null) => {
    if (selectedGeofenceData?.id) {
      const fiterToData = data ? JSON.parse(data) : allLiveData
      const filteredArray = fiterToData?.filter(obj => selectedGeofenceData?.vehicles?.includes(obj.id));
      dispatch(updateLiveVehicleData(filteredArray))
    } else if (label === 'all') {
      dispatch(updateLiveVehicleData(allLiveData))
    } else {
      dispatch(updateLiveVehicleData(JSON.parse(data)))
    }
  }

  const handleSelectLiveVehicles = (type) => {
    if (type === 'total') {
      dispatch(updateLiveVehicleData(allLiveData))
    } else {
      const filterData = allLiveData?.filter((v) => v?.status === type)
      dispatch(updateLiveVehicleData(filterData))
    }
  }

  useEffect(() => {
    if(group?.id) {
      dispatch(updateSelectedGroup(group))
    }
  },[group])

  useEffect(() => {
    if (accessToken) {
      setTimeout(() => {
        // @ts-ignore
        dispatch(getInitialData((message, variant) => enqueueSnackbar(message, { variant: variant }), accessToken))
      }, 2000);
    }
  }, [accessToken])
  useEffect(() => {
    document.title = screenTitles.dashboard
  }, [])
  return (
    <div style={{ zIndex: 100000 }} className='w-[100%] px-2 pb-2 flex flex-col items-center mb-4'>
      <div className='w-full flex flex-col items-end '>
        <div className='xl:w-[98%] 2xl:w-[99%] md:mr-2 xl:mr-4'>

          <div className='flex w-full items-start mr-4 mt-2 justify-between h-[32px]'>
            {
              openDetails.includes('fleet') ? (
                <div onClick={() => openModal('fleet')} className='flex md:w-[33%] xl:w-[17%] cursor-pointer'>
                  <div className='backdrop-blur-md bg-white/50 md:w-9/12 xl:w-[86%] p-2 flex justify-center items-start rounded-xl border-b-2 border-white'>
                    <FleetTrackBlueSVGIcon />
                    <div style={{ fontWeight: '700' }} className='text-[13px] text-primary ml-2'>Fleet Tracking</div>
                  </div>
                  <div className='backdrop-blur-md bg-white/50 w-[40px] ml-1 flex justify-evenly items-center rounded-md border-b-2 border-white'>
                    <BottomBlueIcon />
                  </div>
                </div>
              ) : (
                <div onClick={() => openModal('fleet')} className='flex md:w-[33%] xl:w-[17%] cursor-pointer'>
                  <div className='backdrop-blur-md bg-white/50 md:w-9/12 xl:w-[86%] p-2 flex justify-center items-start rounded-xl border-b-2 border-white'>
                    <FleetTrackBlackSVGIcon />
                    <div style={{ fontWeight: '700' }} className='text-[13px] text-black/80 ml-2'>Fleet Tracking</div>
                  </div>
                  <div className='backdrop-blur-md bg-white/50 w-[40px] ml-1 flex justify-evenly items-center rounded-md border-b-2 border-white'>
                    <RightBlackIcon />
                  </div>
                </div>
              )
            }

            <div onClick={() => openModal('filter')} className='md:w-[30%] justify-between md:m-1 md:flex lg:hidden cursor-pointer'>
              <div className='backdrop-blur-md bg-white/60 w-9/12 p-2 flex justify-evenly items-center rounded-full border-b-2 border-white'>
                <div className='3xl:text-xl md:text-xs'>FILTER</div>
              </div>
              <div className='backdrop-blur-md bg-white/60 w-[40px] flex justify-evenly items-center rounded-md border-b-2 border-white'>
                <RightBlueIcon />
              </div>
            </div>

            <div className='w-8/12 justify-center items-start md:hidden lg:flex '>

              <div className='backdrop-blur-lg bg-white/10 w-[320px] flex justify-between rounded-xl border border-white border-t-0 px-4 py-1 mx-1'>
                <div className='text-primary text-lg font-bold'>
                  {formatDate(new Date())}
                </div>
                <div className='text-black text-lg'>
                  {formatAMPM(new Date)} (PST)
                </div>
              </div>

              <div className='backdrop-blur-lg bg-white/10 relative min-w-[180px] flex h-auto justify-between rounded-xl border border-white border-t-0 px-4 py-1 mx-1'>
                <div className='text-black w-full flex justify-between text-[18px]'>
                  {/* <div onClick={() => globalDeselect === "All" ? setGlobalDeselect("") : setGlobalDeselect("All")} className='w-full h-full absolute left-0 top-0' /> */}
                  Groups:
                  <DashboardGroupSelection globalDeselect={globalDeselect} setGlobalDeselect={setGlobalDeselect} blur={true} group={group} setGroup={setGroup} placeholder={"All"} border={false} />
                </div>
              </div>

              <div className='backdrop-blur-lg bg-white/10 relative min-w-[180px] flex h-auto justify-between rounded-xl border border-white border-t-0 px-4 py-1 mx-1'>
                <div className='text-black w-full flex justify-between text-[18px]'>
                  Location:
                  <DashboardLocationSelection handleChangeLiveData={handleChangeLiveData} geofenceArea={geofenceArea} placeholder={"All"} border={false} />
                </div>
              </div>

            </div>
            {
              openDetails.includes('analytics') ? (
                <div onClick={() => openModal("analytics")} className='flex md:w-[33%] xl:w-[17%] cursor-pointer'>
                  <div className='backdrop-blur-md bg-white/50 w-[86%] p-2 flex justify-center items-start rounded-xl border-b-2 border-white'>
                    <AnalyticsBlueIconSVG />
                    <div style={{ fontWeight: '700' }} className='text-[13px] text-primary ml-2'>Analytics</div>
                  </div>
                  <div className='backdrop-blur-md bg-white/50 w-[40px] flex justify-evenly items-center rounded-md border-b-2 border-white ml-1'>
                    <BottomBlueIcon />
                  </div>
                </div>
              ) : (
                <div onClick={() => openModal("analytics")} className='flex md:w-[33%] xl:w-[17%] cursor-pointer'>
                  <div className='backdrop-blur-md bg-white/50 w-[86%] p-2 flex justify-center items-start rounded-xl border-b-2 border-white'>
                    <AnalyticsBlackIconSVG />
                    <div style={{ fontWeight: '700' }} className='text-[13px] text-black/80 ml-2'>Analytics</div>
                  </div>
                  <div className='backdrop-blur-md bg-white/50 w-[40px] flex justify-evenly items-center rounded-md border-b-2 border-white ml-1'>
                    <RightBlackIcon />
                  </div>
                </div>
              )
            }
          </div>

          <div className='w-full h-1 flex justify-between md:justify-evenly lg:justify-between mr-4'>
            <div className={`md:w-[33%] lg:w-[29%] xl:w-[17%]`}>
              {
                openDetails.includes('fleet') && (
                  <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className={`flex max-h-[93vh] overflow-auto mt-2 md:-ml-1 xl:ml-0 flex-col w-full items-center backdrop-blur-md bg-white/60 rounded-2xl border-2 border-white border-t-0`}>
                    {
                      liveVehicles?.map((v, i) => <TrackableOptions key={i} carLable={v?.numberPlate} updatedAt={v?.updated_at} status={v?.status} alerts={v.alerts} clickHandler={handleChangeTrackVahicle} />)
                    }
                  </motion.div>
                )
              }
            </div>

            <div className={`w-[19%] md:w-[30%] `}>
              {
                openDetails.includes('filter') && (
                  <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className={`flex  overflow-auto flex-col w-full justify-between py-4 mt-2 items-center backdrop-blur-md bg-white/60 rounded-2xl border border-white`}>
                    <div className='flex flex-col justify-center items-center w-full'>
                      <div className='text-black font-bold 3xl:text-xl md:text-xs flex w-full h-8 justify-center items-center hover:bg-primary hover:text-white cursor-pointer transition'>
                        31st January, 2024
                      </div>
                      <div className='text-black md:text-xs flex h-8 justify-center items-center hover:bg-primary hover:text-white cursor-pointer transition'>
                        01:59 am (PT)
                      </div>
                      <div className='text-black md:text-xs w-full flex justify-evenly items-end cursor-pointer'>
                        Location:
                        <TextField
                          id="filled-select-location"
                          className={`bg-none text-xs border-none w-24`}
                          select
                          variant="standard"
                          defaultValue={geofence?.location}
                          onChange={(e: any) => setGeofence(e.target.value)}
                        >
                          {geoFenceData.map((v) => (
                            <MenuItem className='text-xs' value={v.location}>{v['location']}</MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>
                  </motion.div>
                )}
            </div>

            <div className={`md:w-[33%] md:ml-2 lg:w-[28%] xl:w-[17%]`}>
              {
                openDetails.includes('analytics') && (
                  <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className={`h-[93vh] overflow-auto  py-4 mt-2 backdrop-blur-md bg-white/60 rounded-2xl border-2 border-white border-t-0`}>
                    <div className='flex h-[1100px] flex-col w-full justify-between items-center '>
                      <AnalyticProgress handleSelectLiveVehicles={() => handleSelectLiveVehicles('ignition')} percentage={(analyticsData?.ignition / analyticsData?.total) * 100} number={analyticsData?.ignition} label="Ignition" />
                      <AnalyticProgress handleSelectLiveVehicles={() => handleSelectLiveVehicles('moving')} percentage={(analyticsData?.moving / analyticsData?.total) * 100} number={analyticsData?.moving} label="Moving" />
                      <AnalyticProgress handleSelectLiveVehicles={() => handleSelectLiveVehicles('unplug')} percentage={(analyticsData?.unplugged / analyticsData?.total) * 100} number={analyticsData?.unplug} label="Unplug" />
                      <AnalyticProgress handleSelectLiveVehicles={() => handleSelectLiveVehicles('parked')} percentage={(analyticsData?.parked / analyticsData?.total) * 100} number={analyticsData?.parked} label="Parked" />
                      <AnalyticProgress handleSelectLiveVehicles={() => handleSelectLiveVehicles('idle')} percentage={(analyticsData?.idle / analyticsData?.total) * 100} number={analyticsData?.idle} label="Idle" />
                      <AnalyticProgress handleSelectLiveVehicles={() => handleSelectLiveVehicles('offline')} percentage={(analyticsData?.offline / analyticsData?.total) * 100} number={analyticsData?.offline} label="Offline" />
                      <AnalyticProgress handleSelectLiveVehicles={() => handleSelectLiveVehicles('connecting')} percentage={(analyticsData?.connecting / analyticsData?.total) * 100} number={analyticsData?.connecting} label="Connecting" />
                      <AnalyticProgress handleSelectLiveVehicles={() => handleSelectLiveVehicles('inactive')} percentage={(analyticsData?.inactive / analyticsData?.total) * 100} number={analyticsData?.inactive} label="Inactive" />
                      <AnalyticProgress handleSelectLiveVehicles={() => handleSelectLiveVehicles('total')} percentage={(analyticsData?.total / analyticsData?.total) * 100} number={analyticsData?.total} label="Total" />
                    </div>
                  </motion.div>
                )
              }
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Home

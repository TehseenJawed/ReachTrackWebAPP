import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { IdleSymbolSVG, LiveCarSVG, MovingSymbolSVG, OfflineSymbolSVG, ParkedSymbolSVG, RefreshSymbolSVG, ReportAlertSVG, ServicesSVGIcon, WarningSVGIcon, WheelSVGIcon } from 'assets/svg_icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateActiveTrackVehicle } from '../../../redux/actions/trackActions';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    width: '100%',
    borderBottom: '0.5px solid #00000020',
    boxShadow: 'none',
    background: 'none',
    transition: '0.4 !important',
    '&:hover': {
        boxShadow: 'none',
        backgroundColor: '#EEECF8',
        transition: '0.4s !important'
    },
}));

export default function TrackableOptions({ key, carLable, status, clickHandler, alerts, updatedAt }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const statusJSX = (status) => {
        switch (true) {
            case status === 'moving':
                return <div className='flex justify-start items-center'>
                    <MovingSymbolSVG />
                    <div className='text-primary md:text-[8px] ml-1 2xl:text-[9px] capitalize'>Moving</div>
                </div>
            case status === 'ignition':
                return <div className='flex justify-start items-center'>
                    <IdleSymbolSVG />
                    <div className='text-primary ml-1 text-[9px] capitalize'>Ignition</div>
                </div>
            case status === 'idle':
                return <div className='flex justify-start items-center'>
                    <IdleSymbolSVG />
                    <div className='text-primary ml-1 text-[9px] capitalize'>Idle</div>
                </div>
            case status === 'parked':
                return <div className='flex justify-start items-center'>
                    <ParkedSymbolSVG />
                    <div className='text-primary ml-1 text-[9px] capitalize'>Parked</div>
                </div>
            case status === 'unplugged':
                return <div className='flex justify-start items-center'>
                    <ParkedSymbolSVG />
                    <div className='text-primary ml-1 text-[9px] capitalize'>Unplugged</div>
                </div>
            case status === 'inactive':
                return <div className='flex justify-start items-center'>
                    <ParkedSymbolSVG />
                    <div className='text-primary ml-1 text-[9px] capitalize'>Inactive</div>
                </div>
            case status === 'offline':
                return <div className='flex justify-start items-center'>
                    <OfflineSymbolSVG />
                    <div className='text-primary ml-1 text-[9px] capitalize'>Offline</div>
                </div>
            case status === 'connecting':
                return <div className='flex justify-start items-center'>
                    <OfflineSymbolSVG />
                    <div className='text-primary ml-1 text-[9px] capitalize'>Connecting</div>
                </div>
            default:
                return <div className='flex justify-start items-center'>
                    <OfflineSymbolSVG />
                    <div className='text-primary ml-1 text-[9px] capitalize'>No Status</div>
                </div>
        }
    }

    const handleOpenReport = () => {
        navigate(`/maintenance/${carLable}`)
    }

    function timeAgo(timestamp) {
        const now = new Date().getTime();
        const difference = now - timestamp;
      
        const minutes = Math.floor(difference / 60000);
        
        if (minutes === 0) {
          return 'Just now';
        } else if (minutes/60 > 24) {
          return `${Math.round(minutes/(60*24))} days ago`;
        } else if (minutes >= 60) {
          return `${Math.round(minutes/60)} hours ago`;
        } else {
          return 'More than 1 day ago';
        }
      }
    const timestamp = new Date(updatedAt).getTime();
    const handleNavigateScreen = () => {
        const newObj = {
            carLable, 
            status, 
            clickHandler, 
            alerts, 
            updatedAt
        }
        // navigate('/vehicles');
        dispatch(updateActiveTrackVehicle(newObj))
    }

    return (
        <ColorButton key={key} onClick={clickHandler} variant="contained">
            <div onClick={handleNavigateScreen} className='w-full flex justify-between items-center'>
                <div className='flex items-center md:w-[30%] 2xl:w-[35%]'>
                    <div className=''>
                        <LiveCarSVG className='' color={'#000'} />
                    </div>
                    <span style={{fontWeight: '700'}} className='ml-1 text-black opacity-80 text-[12px]'>{carLable}</span>
                </div>
                {/* <div onClick={handleOpenReport} className='relative'>
                    <ReportAlertSVG />
                    <div className='text-[9px] absolute top-[7px] left-[30%]'>03</div>
                </div> */}
                <div className='w-[120px]'>
                    {statusJSX(status)}
                    <div className='flex justify-start items-center'>
                        <RefreshSymbolSVG />
                        <div className='text-textColor ml-1 text-[9px] lowercase'>
                           {
                            timeAgo(timestamp)
                           }
                        </div>
                    </div>
                </div>
            </div>
        </ColorButton>
    );
}
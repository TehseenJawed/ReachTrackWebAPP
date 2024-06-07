import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NOTIFICATIONS } from '../redux/reducers/trackReducer';
import { expandNotificationAction, updateNotificationAction } from '../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import { BrandCarIconSVG } from 'assets/svg_icons';
import { Link, useNavigate } from 'react-router-dom';

const NotificationSideMenu = () => {
    const notificationData = useSelector(NOTIFICATIONS)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formattedDate = formatter.format(date);
        return formattedDate;
    }

    const setReadNotification = (data) => {
        const newData = {
            is_acknowledged: true
        }
        // @ts-ignore
        dispatch(updateNotificationAction(newData, (message, variant) => enqueueSnackbar(message, { variant: variant }), data?.id, navigate))
    }

    const handleShowAllNotification = () => {
        dispatch(expandNotificationAction(false))
    }

    const handleNavigateNotification = (v) => {
        navigate('/dashboard')
        dispatch(expandNotificationAction(false))
    }

    return (
        <div style={{ zIndex: 10000 }} className='w-[300px] h-[97%] bg-white rounded-xl overflow-auto absolute top-[1rem] left-[7rem] shadow-2xl'>
            <div className='w-full border-b-2 h-[98%] border-white p-2 flex flex-col justify-between'>
                <div>
                    <div className='w-full flex justify-center items-center text-[18px] text-primary'>Notifications</div>
                    {
                        notificationData?.slice(0, 6)?.map((v, i) => (
                            <div className='w-full backdrop-blur-md cursor-pointer bg-white/30 rounded-xl p-2 mb-2 h-[100px] relative shadow-xl'>
                                {!v?.is_acknowledged &&
                                    <div className='absolute right-4  animate-ping inline-flex'>
                                        <div className='bg-primary w-3 h-3 rounded-full text-[6px]'></div>
                                    </div>}
                                <div className='flex justify-start'>
                                    <div className='bg-primary p-1 px-4 text-xs text-white font-bold rounded-xl flex-wrap'>{v?.event?.type}</div>
                                </div>
                                <div className='flex w-full justify-end items-start'>
                                    <div className='mt-2 text-xs w-[68%] h-[50px] overflow-auto'>{v?.message} {v?.message}</div>
                                    <div className='text-xs text-black/50 w-[30%] h-full flex flex-col justify-between items-end'>
                                        {
                                            !v?.is_acknowledged && <div onClick={() => setReadNotification(v)} className='text-[10px] text-black/50 bg-black/10 rounded-xl px-2 cursor-pointer ml-2'>mark as read</div>
                                        }
                                        {formatDate(v?.created_at)}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    !notificationData[0] ? <div className='text-[15px] w-full text-center mt-4'>No Notifications available</div> : null
                }
                {
                    notificationData?.length >= 6 ? <Link onClick={handleShowAllNotification} to='/notification'><div className='text-primary w-full flex justify-center items-center my-4 cursor-pointer'>Show all</div></Link> : null
                }
            </div>
        </div>
    )
}

export default NotificationSideMenu
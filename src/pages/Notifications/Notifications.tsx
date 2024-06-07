import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NOTIFICATIONS } from '../../redux/reducers/trackReducer.tsx';
import { useSnackbar } from 'notistack';
import { updateNotificationAction } from '../../redux/actions/trackActions.js';
import { useNavigate } from 'react-router-dom';
import { screenTitles } from 'utils/helpers';

const Notifications = () => {
    const notifications = useSelector(NOTIFICATIONS)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const setReadNotification = (data) => {
        const newObj = {
            is_acknowledged: true
        }
        // @ts-ignore
        dispatch(updateNotificationAction(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant }), data?.id, navigate))
    }
    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formattedDate = formatter.format(date);
        return formattedDate;
    }
    const handleSwitchScreen = (v) => {
        console.log('V--->',v);
        navigate('/dashboard')
    }
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        document.title = screenTitles.notification
      },[])
    return (
        <div className='w-[100%] px-2 pb-2 flex flex-col items-center mb-4'>
            <div className='text-[23px] font-bold text-primary'>Notifications</div>
            {
                notifications?.map((v, i) => (
                    <div className='w-full cursor-pointer backdrop-blur-md bg-white/30 rounded-xl p-2 mb-2 h-[100px] relative'>
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
                                    !v?.is_acknowledged  && <div onClick={() => setReadNotification(v)} className='text-[10px] text-black/50 bg-black/10 rounded-xl px-2 cursor-pointer ml-2'>mark as read</div>
                                }
                                {formatDate(v?.created_at)}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Notifications

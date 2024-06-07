import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { SVGLoaderBlack } from 'assets/svg_icons';
import { useSelector } from 'react-redux';
import { LIVENOTIFICATION } from '../redux/reducers/authReducer';

const AlertComponent = ({value, index}) => {
    console.log('value ---',value);
    
    return (
        <Stack key={index} sx={{ width: '100%' }} className='mt-2' style={{zIndex: 10000,}} spacing={2}>
            <Alert severity="error">
                <AlertTitle className='flex justify-start items-center'>
                    <SVGLoaderBlack className="mr-2" width={25} height={25}/>
                    {value?.event_type}
                </AlertTitle>
                {value?.notification_message}
            </Alert>
        </Stack>
    )
}

export default AlertComponent
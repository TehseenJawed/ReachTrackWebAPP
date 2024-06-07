import React from 'react'
import { ChildProps } from 'typecasts';
import { useLoadScript } from "@react-google-maps/api";
import Map from 'components/liveMap';
import { EXPAND } from '../redux/reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
const { REACT_APP_NODE_ENV, REACT_APP_GOOGLE_MAP_KEY } = process.env;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    paddingLeft: theme.spacing(-((window.outerWidth / 100) - (window.outerWidth >= 1600 ? 23 : (window.outerWidth <= 1024 ? window.outerWidth <= 768 ? 17.5 : 18.5 : 20.5)))),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth - 85}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: -10,
    }),
}));

const drawerWidth = 100;

const MapLayout = ({ children }: ChildProps) => {
    const expand = useSelector(EXPAND)
    const showMap = ['/dashboard', '/history/trips', '/login']
    const blurMap = ['/history/playback', '/drivers', '/reports', '/notification', '/vehicles', '/maintenance', '/account', '/geofence/area', '/geofence/route', '/fuelgroup', '/groups', '/users']
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: REACT_APP_GOOGLE_MAP_KEY,
        libraries: ["places", "drawing"],
    });
    
    return (
        <div className='w-full bg-white'>
            <div style={{zIndex: 100}} className={`absolute top-0 right-0 ${blurMap.includes(window.location.pathname) || window.location.pathname.includes('/vehicles') || window.location.pathname.includes('/drivers') || window.location.pathname.includes('/maintenance') || window.location.pathname.includes('/profile') ? 'backdrop-blur-md bg-white/10 w-[96%] pl-[4px] !overflow-x-hidden' : 'w-[96%]'} `}>
                <Main open={expand} className={`w-full z-10 ${window.location.pathname === '/dashboard' ? '' : 'h-screen'}`}>
                    {children}
                </Main>
            </div>
            {
                (isLoaded && showMap.includes(window.location.pathname)) && <Map />
            }
            <div style={{backgroundImage: "url('/assets/images/mapImage.png')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className={`w-full h-full bg-white z-0 ${showMap.includes(window.location.pathname) ? 'hidden' : 'flex'} `} ></div>
        </div>
    )
}

export default MapLayout

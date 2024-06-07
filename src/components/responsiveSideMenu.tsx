import { BrandSVGSmallIcon, DashboardSVG, DrawerSVGIcon, DriversSVG, GeofenceSVG, GroupSVGMenuIcon, HistorySVG, MaintenanceSVG, NotificationSVG, ReportsSVG, SearchSVG, SettingSVG, VehicleSVG, VehicleSVGNewIcon } from '../assets/svg_icons';
import { expandMenu } from '../redux/actions/authActions';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { EXPAND, EXPANDSEARCH, USER } from '../redux/reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DelayTooltips from './toolTip';
import MenuOptions from './menuOption';
import { expandSearchFunction } from '../redux/actions/authActions';
import DivideImage from '../assets/images/divideicon.png'
import NotificationSideMenu from 'components/notificationSideMenu';
import { EXPANDNOTIFICATION, PERMISSIONS } from '../redux/reducers/trackReducer';
import { expandNotificationAction, updateSearchResults } from '../redux/actions/trackActions';
import Gavatar from './gavatar';

const drawerWidth = 90;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    background: 'none',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    overflowY: 'auto',
    height: '100%',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    background: 'none',
    height: '100%',
    width: `calc(${theme.spacing(8)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',

        // '& .MuiDrawer-paper': sidepaper(theme),
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
            '& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
                background: 'none !important'
            },
        }),
    }),
);

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    paddingLeft: theme.spacing(-((window.outerWidth / 100) - (window.outerWidth >= 1600 ? 23 : (window.outerWidth <= 1024 ? window.outerWidth <= 768 ? 17.5 : 18.5 : 20.5)))),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth - 65}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

export default function SideMenu({ children }) {
    // const [open, setOpen] = useState(true);
    const expand = useSelector(EXPAND)
    const userData: any = useSelector(USER)
    const expandSearch = useSelector(EXPANDSEARCH)
    const expandNotification = useSelector(EXPANDNOTIFICATION)
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate()
    const [innermenu, setInnerMenu] = useState([])
    const menuItem = [
        {
            label: '',
            icon: () => <DrawerSVGIcon className={expand ? "sidemenu-unselect" : "sidemenu-icon"} />,
            message: "",
            href: undefined,
            activeScreen: [''],
            innerScreen: undefined,
        },
        {
            label: 'Search',
            icon: () => <SearchSVG className={expand ? "sidemenu-unselect" : "sidemenu-icon"} />,
            message: "",
            href: undefined,
            activeScreen: [''],
            innerScreen: undefined,
        },
        {
            label: 'Dashboard',
            icon: () => <DashboardSVG className={expand ? window.location.pathname === '/dashboard' ? "sidemenu-select" : "sidemenu-unselect" : window.location.pathname === '/dashboard' ? "sidemenu-select" : "sidemenu-unselect sidemenu-icon"} />,
            message: <div>Live Real Time Display. Analytics and Summary also available.</div>,
            href: '/dashboard',
            activeScreen: ['/dashboard'],
            innerScreen: undefined,
        },
        {
            label: 'Vehicles',
            icon: () => <VehicleSVGNewIcon className={expand ? window.location.pathname === '/vehicles' ? "sidemenu-select" : "sidemenu-unselect " : window.location.pathname === '/vehicles' ? "sidemenu-select" : "sidemenu-unselect sidemenu-icon"} />,
            message: <div>Add all your vehicles here.</div>,
            href: '/vehicles',
            activeScreen: ['/vehicles'],
            innerScreen: undefined,
        },
        {
            label: 'History',
            icon: () => <HistorySVG className={expand ? ['/history/playback', '/history/playback', '/history/trips', '/history/observations'].includes(window.location.pathname) ? "sidemenu-select" : "sidemenu-unselect " : ['/history/playback', '/history/playback', '/history/trips', '/history/observations'].includes(window.location.pathname) ? "sidemenu-select" : "sidemenu-unselect sidemenu-icon"} />,
            message: <div>Real Time Playback, Trip Activity & Observations.</div>,
            href: '/history/playback',
            activeScreen: ['/history/playback', '/history/playback', '/history/trips', '/history/observations'],
            innerScreen: [
                {
                    href: '/history/playback',
                    label: 'Playback'
                },
                {
                    href: '/history/trips',
                    label: 'Trips'
                },
                // {
                //     href: '/history/observations',
                //     label: 'Observation'
                // },
            ]
        },
        {
            label: 'Drivers',
            icon: () => <DriversSVG className={expand ? ['/drivers'].includes(window.location.pathname) ? "sidemenu-select" : "sidemenu-unselect " : ['/drivers'].includes(window.location.pathname) ? "sidemenu-select" : "sidemenu-unselect sidemenu-icon"} />,
            message: <div>Master Data Center.</div>,
            href: '/drivers',
            activeScreen: ['/drivers'],
            innerScreen: undefined,
        },
        {
            label: 'Maintenance',
            icon: () => <MaintenanceSVG className={expand ? ['/maintenance'].includes(window.location.pathname) ? "sidemenu-select" : "sidemenu-unselect" : ['/maintenance'].includes(window.location.pathname) ? "sidemenu-select" : "sidemenu-unselect sidemenu-icon"} />,
            message: <div>Oil Alerts, Tire Activity & Maintenance Reports.</div>,
            href: '/maintenance',
            activeScreen: ['/maintenance'],
            innerScreen: undefined,
        },
        {
            label: 'Groups',
            icon: () => <GroupSVGMenuIcon className={expand ? ['/groups', '/fuelgroup'].includes(window.location.pathname) ? "sidemenu-select" : "sidemenu-unselect" : ['/groups', '/fuelgroup'].includes(window.location.pathname) ? "sidemenu-select" : "sidemenu-unselect sidemenu-icon"} />,
            message: <div>Fuel: An add on device available to precisely monitor fuel consumption.</div>,
            href: '/groups',
            activeScreen: ['/groups', '/fuelgroup'],
            innerScreen: [
                {
                    href: '/groups',
                    label: 'Groups'
                },
                {
                    href: '/fuelgroup',
                    label: 'Fuel Group'
                },
            ]
        },
        {
            label: 'Geofence',
            icon: () => <GeofenceSVG className={expand ? ['/geofence/area'].includes(window.location.pathname) ? "sidemenu-select" : "sidemenu-unselect" : ['/geofence/area'].includes(window.location.pathname) ? "sidemenu-select" : "sidemenu-unselect sidemenu-icon"} />,
            message: <div>A virtual fence to send entry/exit & route alerts.</div>,
            href: '/geofence/area',
            activeScreen: ['/geofence/area'],
            innerScreen: [
                {
                    href: '/geofence/area',
                    label: 'Area'
                },
                {
                    href: '/geofence/route',
                    label: 'Route'
                },
            ],
        },
        {
            label: 'Reports',
            icon: () => <ReportsSVG className={expand ? window.location.pathname === '/reports' ? ['/reports'].includes(window.location.pathname) ? "sidemenu-select" : "sidemenu-unselect" : "sidemenu-unselect " : ['/reports'].includes(window.location.pathname) ? "sidemenu-select" : "sidemenu-unselect sidemenu-icon"} />,
            message: <div>Reports to help optimize your supply chain and reduce costs.</div>,
            href: '/reports',
            activeScreen: ['/reports'],
            innerScreen: undefined,
        },
    ]
    const opens = Boolean(anchorEl);
    const permissions = useSelector(PERMISSIONS);
    const authorizeFeatures = permissions?.filter(value => value.module === 'USER')
    const isViewUsers = authorizeFeatures.filter(value => value.name === 'VIEW')
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSelect = ({ href }) => {
        navigate(href)
    }
    console.log('userData ----> ', userData);

    return (
        <div className='flex w-full'>
            <Drawer className='sidemenu-class h-full absolute' variant="permanent" open={expand}>
                <div className={`bg-gradient-to-r from-white from-50% to-white/60 to-90% h-screen overflow-auto ${expand ? '' : 'h-auto'} w-full backdrop-blur-md`}>
                    <List className={`flex flex-col justify-between `}>
                        <div>
                            {/* <ListItem disablePadding sx={{ display: 'block' }} className='w-24 h-16 menu-icon'>
                                <ListItemButton
                                >
                                    <ListItemIcon
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <BrandSVGSmallIcon />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem> */}
                            {/* <br /> */}

                            <MenuOptions expand={expand} anchorEl={anchorEl} navigate={navigate} handleSelect={handleSelect} handleClose={handleClose} menuItems={innermenu} open={opens} />
                            {menuItem?.map(({ label, icon, href, innerScreen, activeScreen, message }, index) => {
                                const changeScreen = (event: React.MouseEvent<HTMLElement>) => {
                                    if(expandNotification) {
                                        dispatch(expandNotificationAction(false))
                                    }
                                    if (href) {
                                        if (!innerScreen) {
                                            navigate(href)
                                        } else {
                                            setInnerMenu(innerScreen)
                                            setAnchorEl(event.currentTarget);
                                        }
                                    } else {
                                        if (label === "Search") {
                                            dispatch(expandSearchFunction(!expandSearch))
                                            dispatch(updateSearchResults([]))
                                        } else {
                                            dispatch(expandMenu(!expand))
                                        }
                                    }
                                }
                                console.log('New...',label);
                                
                                if(label === 'Users' && true) {
                                    return null
                                } else {
                                    return (
                                        <ListItem key={label} id="fade-button" onClick={changeScreen} aria-controls={expand ? 'fade-menu' : undefined} className='side-app relative' disablePadding sx={{ display: 'block' }}>
                                            <DelayTooltips enter={1000} leave={300} placement="right-end" message={message}>
                                                <ListItemButton
                                                    sx={{
                                                        minHeight: 0,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        // px: 2.5,
                                                    }}
                                                >
                                                    <div className={` flex justify-center flex-col rounded-xl ${expand ? 'w-20' : 'w-14 pb-2'} items-center pt-2 ${activeScreen.includes(window.location.pathname) && "bg-bgActive"}`}>
                                                        <ListItemIcon
                                                            sx={{
                                                                minWidth: 0,
                                                                justifyContent: 'center'
                                                            }}
                                                        >
                                                            {icon()}
                                                        </ListItemIcon>
                                                        <ListItemText primaryTypographyProps={{ fontSize: '13px' }} className={`${activeScreen.includes(window.location.pathname) ? "text-primary" : "text-black"} text-xs`} primary={label} sx={{ display: expand ? 'flex' : 'none', fontSize: 12 }} />
                                                    </div>
                                                </ListItemButton>
                                            </DelayTooltips>
                                        </ListItem>
                                    )
                                }
                                
                            })}
                        </div>

                        <div>
                            <ListItem onClick={() => dispatch(expandNotificationAction(!expandNotification))} disablePadding sx={{ display: 'block' }}>
                                <DelayTooltips enter={1000} leave={300} placement="right-end" message={<div>This is the dashboard to track vehicles. <br />You can use it to see live status of your vehicles.</div>}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <NotificationSVG className={expandNotification ? "sidemenu-select" : "sidemenu-unselect sidemenu-icon"} />
                                        </ListItemIcon>
                                    </ListItemButton>
                                </DelayTooltips>
                            </ListItem>
                            <div className='w-full flex justify-center'>
                                <img src={DivideImage} alt="" />
                            </div>
                            <ListItem onClick={(event) => {
                                setInnerMenu([
                                    {
                                        href: '/account',
                                        label: 'Account'
                                    },
                                    {
                                        href: '/users',
                                        label: 'Users'
                                    },
                                    {
                                        href: '/profile',
                                        label: 'Profile'
                                    },
                                ]); 
                                setAnchorEl(event.currentTarget);
                                dispatch(expandNotificationAction(false));
                            }} disablePadding sx={{ display: 'block' }}>
                                <DelayTooltips enter={1000} leave={300} placement="right-end" message={"Settings."}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <SettingSVG className={['/setting'].includes(window.location.pathname) ? "sidemenu-select" : "sidemenu-unselect"} />
                                        </ListItemIcon>
                                        <ListItemText primaryTypographyProps={{ fontSize: '13px' }} className={`${window.location.pathname === '/setting' ? "text-primary" : "text-black"}`} primary={"Setting"} sx={{ opacity: expand ? 1 : 0 }} />
                                    </ListItemButton>
                                </DelayTooltips>
                            </ListItem>

                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={(event) => {
                                        setInnerMenu([
                                            {
                                                href: '/logout',
                                                label: 'Logout'
                                            },
                                        ]); 
                                        setAnchorEl(event.currentTarget);
                                        dispatch(expandNotificationAction(false));
                                    }}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <IconButton sx={{ p: 0 }}>
                                            <Gavatar username={`${userData?.first_name} ${userData?.last_name}`}/>
                                        </IconButton>
                                    </ListItemIcon>
                                    <ListItemText className='text-primary' primaryTypographyProps={{ fontSize: '11px' }} primary={`${userData?.first_name} ${userData?.last_name}`} sx={{ opacity: expand ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </div>
                    </List>
                </div>
            </Drawer>

            {/* <Box component="main" className='bg-bgColor h-screen overflow-auto flex justify-end' sx={{ flexGrow: 1, }}>
                {children}
            </Box> */}
            <Main open={expand} className='h-screen overflow-auto flex justify-end relative' sx={{ flexGrow: 1, }}>
                {expandNotification && <NotificationSideMenu />}
                {expandNotification && <div style={{zIndex: 1000}} onClick={() => dispatch(expandNotificationAction(!expandNotification))} className='w-full h-full absolute left-0 top-0'/>}
                {children}
            </Main>
        </div>
    );
}
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import EmbedMap from 'components/embedMap';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IoIosCheckmarkCircle } from "react-icons/io";


interface MapViewProps {
    open: boolean,
    setOpen: React.Dispatch<boolean>
    longitude: string
    latitude: string
}

export default function MapView(props: MapViewProps) {
    const { open, setOpen, longitude, latitude } = props
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const listData = [
        {
            icon: () => <IoIosCheckmarkCircle size={25} color="red" />,
            label: "Harsh Acceleration",
            value: "0 times",
        },
        {
            icon: () => <IoIosCheckmarkCircle size={25} color="orange" />,
            label: "Sudden Brake",
            value: "0 times",
        },
        {
            icon: () => <IoIosCheckmarkCircle size={25} color="blue" />,
            label: "Sharp Turn",
            value: "0 times",
        },
        {
            icon: () => <IoIosCheckmarkCircle size={25} color="purple" />,
            label: "Overspeeding",
            value: "0 times",
        },
        {
            icon: undefined,
            label: "Unfasten Seatbelt",
            value: "0 times",
        },
        {
            icon: undefined,
            label: "Ignition",
            value: "10 times",
        },
        {
            icon: undefined,
            label: "GeoFence Entry",
            value: "0 times",
        },
        {
            icon: undefined,
            label: "Fatigue",
            value: "0 times",
        },
        {
            icon: undefined,
            label: "Stops",
            value: "6 times",
        },
        {
            icon: undefined,
            label: "Distance",
            value: "21KM",
        },
        {
            icon: undefined,
            label: "Idle Time",
            value: "0 Min",
        },
        {
            icon: undefined,
            label: "Idle Count",
            value: "0",
        },
        {
            icon: undefined,
            label: "Average Speed",
            value: "10.63 KM/H",
        },
    ]

    return (
        <div className=''>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <div className='absolute top-[50%] left-[50%] md:w-[70%] xl:w-[45%] h-[90%] overflow-auto backdrop-blur-sm bg-white/60 p-4 border-white border rounded-xl' style={{ transform: 'translate(-50%, -50%)' }}>
                        <EmbedMap longitude={longitude} latitude={latitude} />

                        <List
                            sx={{ width: '100%', maxWidth: '100%' }}
                            aria-label="contacts"
                        >
                            {
                                listData.map((v, i) => (
                                    <ListItem>
                                        <ListItemButton>
                                            {
                                                v?.icon && (
                                                    <ListItemIcon>
                                                        {v?.icon()}
                                                    </ListItemIcon>
                                                )
                                            }
                                            <ListItemText inset={!v?.icon} primary={v?.label} />
                                            <div className='text-black'>{v.value}</div>
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
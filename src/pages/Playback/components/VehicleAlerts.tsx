import React, {useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IoIosCheckmarkCircle } from "react-icons/io";
const VehicleAlerts = () => {
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

    const handleChangeDuration = (e) => {
        console.log('NEW...', e);
    }
    const handleChangeVehicle = (e) => {
        console.log('NEW...', e);
    }
    return (
        <List
            sx={{ width: '100%', maxWidth: '29%', bgcolor: 'background.paper' }}
            className="h-[500px] overflow-auto"
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
                            <div className='text-gray-light'>{v.value}</div>
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
    )
}

export default VehicleAlerts
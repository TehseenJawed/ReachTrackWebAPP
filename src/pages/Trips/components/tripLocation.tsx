import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import EmbedMap from 'components/embedMap';


interface TripLocationProps {
    open: boolean,
    setOpen: React.Dispatch<boolean>
    longitude: string
    latitude: string
}

export default function TripLocation(props:TripLocationProps) {
    const {open, setOpen, longitude, latitude} = props
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
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
                    <div className='absolute top-[50%] left-[50%] md:w-[70%] xl:w-[40%] backdrop-blur-sm bg-white/60 p-4 border-white border rounded-xl' style={{ transform: 'translate(-50%, -50%)'}}>
                        <EmbedMap longitude={longitude} latitude={latitude} />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
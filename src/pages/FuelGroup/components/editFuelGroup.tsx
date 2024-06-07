import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputField from 'components/inputField';
import { useDispatch } from 'react-redux';
import { editFuelGroupAction } from '../../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';

export default function EditFuelGroup({ open, setOpen, data }) {
    const [groupData, setGroupData] = useState<any>(data)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    console.log('Now...',groupData,data);
    
    const handleClose = () => {
        setOpen(false);
    };

    const resetStates = () => {
        setGroupData({})
        handleClose()
    }

    const handleSubmit = () => {
        const editGroup = {
            ...groupData,
        }
        //@ts-ignore
        dispatch(editFuelGroupAction(editGroup, () => (message, variant) => enqueueSnackbar(message, { variant: variant })))
        resetStates()
    }

    const contentJSX = () => {
        return (
            <div className='flex flex-wrap w-full'>
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"FUEL GROUP NAME"} placeholder={"Fuel Group Name"} value={groupData?.name} setChange={(e) => setGroupData({ ...groupData, name: e.target.value })} />
            </div>
        )
    }
    useEffect(() => {
        if(data?.name) {
            setGroupData(data)
        }
    },[open])
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Edit Fuel Group</DialogTitle>
                <DialogContent>
                    {contentJSX()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
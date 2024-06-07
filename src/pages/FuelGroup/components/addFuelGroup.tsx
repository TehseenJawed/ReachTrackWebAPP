import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputField from 'components/inputField';
import Slider from '@mui/material/Slider';
import GroupSelection from 'components/GroupSelection';
import { useDispatch, useSelector } from 'react-redux';
import { VEHICLES_DATA, GROUP_VEHICLES } from '../../../redux/reducers/trackReducer';
import Checkbox from '@mui/material/Checkbox';
import { createFuelGroupAction } from '../../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import GroupStepper from 'components/GroupStepper';
import GroupTree from 'components/GroupTree';

const marks = [
    {
        value: 50,
        label: '50km/h',
    },
    {
        value: 150,
        label: '150km/h',
    },
    {
        value: 200,
        label: '200km/h',
    },
];


export default function AddFuelGroup({ open, setOpen }) {
    const [groupData, setGroupData] = useState<any>({
        name: ""
    })
    const [error, setError] = useState<boolean>(false)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const handleClose = () => {
        setOpen(false);
    };

    const resetStates = () => {
        setGroupData({})
        handleClose()
    }

    const handleSubmit = () => {
        if (groupData?.name) {
            const addGroup = {
                ...groupData,
            }
            //@ts-ignore
            dispatch(createFuelGroupAction(addGroup, () => (message, variant) => enqueueSnackbar(message, { variant: variant })))
            resetStates()
        }
        else {
            setError(true)
            enqueueSnackbar("Fill all fields available.", { variant: 'error' })
        }
    }

    const contentJSX = () => {
        return (
            <div className='flex flex-wrap w-full'>
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"FUEL GROUP NAME"} error={error ? groupData?.name == "" : false} placeholder={"Fuel Group Name"} value={groupData?.name} setChange={(e) => setGroupData({ ...groupData, name: e.target.value })} />
            </div>
        )
    }

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
                <DialogTitle>Add New Fuel Group</DialogTitle>
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
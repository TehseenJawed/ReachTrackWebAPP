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
import { getVehicleByGroups, updateGroup } from '../../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import GroupStepper from 'components/GroupStepper';

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


export default function EditGroup({ open, setOpen, editGroupData, setEditGroupData }) {
    const [groupData, setGroupData] = useState<any>()
    const [error, setError] = useState<boolean>(false)
    const [group, setGroup] = useState<any>(editGroupData)
    const groupVehicles = useSelector(VEHICLES_DATA)
    const selectedGroupVehicles = useSelector(GROUP_VEHICLES)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const handleClose = () => {
        setOpen(false);
    };
    console.log('GROUP....', editGroupData);

    const resetStates = () => {
        setGroup(null)
        setGroupData({})
        handleClose()
    }

    const handleSubmit = () => {
        if (editGroupData?.name && editGroupData?.description) {
            const editGroup = {
                name: editGroupData?.name,
                description: editGroupData?.description,
                over_speeding_threshold: editGroupData?.over_speeding_threshold,
                vehicles: editGroupData?.vehicles
            }
            console.log('createGroup --->>', editGroup);
            //@ts-ignore
            dispatch(updateGroup(editGroup, () => (message, variant) => enqueueSnackbar(message, { variant: variant }), editGroupData?.id))
            resetStates()
        } else {
            setError(true)
            enqueueSnackbar("Please fill complete fields.", { variant: 'error' })
        }
    }

    const contentJSX = () => {
        return (
            <div className='flex flex-wrap w-full'>
                <InputField className="w-full mt-4" fieldClassName="w-full" error={error ? editGroupData?.name === "" : false} label={"GROUP NAME"} placeholder={"Group Name"} value={editGroupData?.name} setChange={(e) => setEditGroupData({ ...editGroupData, name: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" error={error ? groupData?.description === "" : false} label={"GROUP DESCRIPTION"} placeholder={"Group Description"} value={editGroupData?.description} setChange={(e) => setEditGroupData({ ...editGroupData, description: e.target.value })} />
                <label className='mt-4 text-xs'>Select Over Speeding Threshold Value</label>
                <div className='w-[95%] ml-2'>
                    <Slider
                        className='mt-2'
                        marks={marks}
                        step={10}
                        value={editGroupData?.over_speeding_threshold}
                        valueLabelDisplay="auto"
                        min={50}
                        max={200}
                        // @ts-ignore
                        onChange={(e) => setEditGroupData({ ...editGroupData, over_speeding_threshold: e?.target?.value })}
                    />
                </div>
                <label className='mt-2 text-xs'>Select Vehicles</label>
                {
                    editGroupData?.parent_id ? (
                        selectedGroupVehicles?.length ? (
                            <div className='w-full mt-2 flex'>
                                {
                                    selectedGroupVehicles.map((v: any, i) => (
                                        <div className='border border-black/20 p-1 rounded-xl pr-3'>
                                            <Checkbox onClick={() => setEditGroupData({ ...editGroupData, vehicles: [v.id] })} {...{ inputProps: { 'aria-label': v?.number_plate } }} />
                                            {v?.number_plate}
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='w-full text-center'>No vehicle available in this group</div>
                        )
                    ) : (
                        groupVehicles[0] ? (
                            <div className='w-full mt-2 flex'>
                                {
                                    groupVehicles.map((v: any, i) => (
                                        <div className='border border-black/20 p-1 rounded-xl pr-3'>
                                            <Checkbox onClick={() => setEditGroupData({ ...editGroupData, vehicles: [v.id] })} {...{ inputProps: { 'aria-label': v?.number_plate } }} />
                                            {v?.number_plate}
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='w-full text-center'>No vehicle selected</div>
                        )
                    )
                }
            </div>
        )
    }
    useEffect(() => {
        if(editGroupData?.parent_id) {
            // @ts-ignore
            dispatch(getVehicleByGroups(editGroupData?.parent_id))
        }
    }, [])
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
                <DialogTitle>Update Group</DialogTitle>
                <DialogContent>
                    {contentJSX()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Update</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
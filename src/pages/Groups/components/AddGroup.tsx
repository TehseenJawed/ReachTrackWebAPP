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
import { createGroup, getVehicleByGroups } from '../../../redux/actions/trackActions';
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


export default function AddGroup({ open, setOpen }) {
    const [groupData, setGroupData] = useState<any>({
        name: "",
        description: "",
        over_speeding_threshold: 0,

    })
    const [error, setError] = useState<boolean>(false)
    const [group, setGroup] = useState<any>(null)
    const groupVehicles = useSelector(VEHICLES_DATA)
    const selectedGroupVehicles = useSelector(GROUP_VEHICLES)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const handleClose = () => {
        setOpen(false);
    };

    const resetStates = () => {
        setGroup(null)
        setGroupData({})
        handleClose()
    }

    const handleSubmit = () => {
        if (groupData?.name && groupData?.description) {
            const addGroup = {
                ...groupData,
                parent_id: group?.id,
            }
            //@ts-ignore
            dispatch(createGroup(addGroup, () => (message, variant) => enqueueSnackbar(message, { variant: variant })))
            resetStates()
        } else {
            setError(true)
            enqueueSnackbar("Please fill all fields.", { variant: "error" })
        }
    }

    const contentJSX = () => {
        return (
            <div className='flex flex-wrap w-full'>
                <div className='h-[120px] w-full overflow-auto'>
                    <GroupTree group={group} setGroup={setGroup} placeholder={"Select Parent Group"} />
                </div>
                {/* <GroupStepper group={group} setGroup={setGroup} placeholder={"Select Parent Group"}/> */}
                <InputField className="w-full mt-4" fieldClassName="w-full" error={error ? groupData?.name === "" : false} label={"GROUP NAME"} placeholder={"Group Name"} value={groupData?.name} setChange={(e) => setGroupData({ ...groupData, name: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" error={error ? groupData?.description === "" : false} label={"GROUP DESCRIPTION"} placeholder={"Group Description"} value={groupData?.description} setChange={(e) => setGroupData({ ...groupData, description: e.target.value })} />
                <label className='mt-4 text-xs'>Select Over Speeding Threshold Value</label>
                <div className='w-[95%] ml-2'>
                    <Slider
                        className='mt-2'
                        marks={marks}
                        step={10}
                        valueLabelDisplay="auto"
                        min={50}
                        max={200}
                        // @ts-ignore
                        onChange={(e) => setGroupData({ ...groupData, over_speeding_threshold: e?.target?.value })}
                    />
                </div>
                <label className='mt-2 text-xs'>Select Vehicles</label>
                {
                    group ? (
                        selectedGroupVehicles.length ? (
                            <div className='w-full mt-2 flex'>
                                {
                                    selectedGroupVehicles.map((v: any, i) => (
                                        <div className='border border-black/20 p-1 rounded-xl pr-3'>
                                            <Checkbox onClick={() => setGroupData({ ...groupData, vehicles: [v.id] })} {...{ inputProps: { 'aria-label': v?.number_plate } }} />
                                            {v?.number_plate}
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='w-full text-center'>No vehicle available in this group</div>
                        )
                    ) : (
                        !!groupVehicles ? (
                            <div className='w-full mt-2 flex'>
                                {
                                    groupVehicles.map((v: any, i) => (
                                        <div className='border border-black/20 p-1 rounded-xl pr-3'>
                                            <Checkbox onClick={() => setGroupData({ ...groupData, vehicles: [v.id] })} {...{ inputProps: { 'aria-label': v?.number_plate } }} />
                                            {v?.number_plate}
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='w-full text-center'>No vehicle available</div>
                        )
                    )
                }
            </div>
        )
    }


    useEffect(() => {
        if(group?.id) {
            // @ts-ignore
            dispatch(getVehicleByGroups(group?.id))
        }
    }, [group])
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
                <DialogTitle>Add New Group</DialogTitle>
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
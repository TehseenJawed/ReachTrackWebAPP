import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputField from 'components/inputField';
import Slider from '@mui/material/Slider';
import GroupSelection from 'components/GroupSelection';
import { useDispatch, useSelector } from 'react-redux';
import { VEHICLES_DATA, GROUP_VEHICLES, TRACKER, FUEL_GROUPS } from '../../../redux/reducers/trackReducer';
import Checkbox from '@mui/material/Checkbox';
import { createVehicle } from '../../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import GroupTree from 'components/GroupTree';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function AddVehicle({ open, setOpen }) {
    const [vehicleData, setVehicleData] = useState<any>({
        name: "",
        number_plate: "",
        make: "",
        model: "",
        year: "",
        color: "",
        odo_meter_reading: "",
        type: "",
        vehicle_registration_no: "",
        category: "",
        shift_hours: "",
        shift_time: "",
        benchmark: "",
        tracker_id: "",
        group_id: "",
        // fuel_group_id: null,
    })
    const [error, setError] = useState(false)
    const [group, setGroup] = useState<any>(null)
    const groupVehicles = useSelector(VEHICLES_DATA)
    const selectedGroupVehicles = useSelector(GROUP_VEHICLES)
    const trackerData = useSelector(TRACKER)
    const fuelGroup = useSelector(FUEL_GROUPS)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const handleClose = () => {
        setOpen(false);
    };
    console.log('groupVehicles....', !!groupVehicles);

    const resetStates = () => {
        setGroup(null)
        setVehicleData({})
        handleClose()
    }

    const handleSubmit = () => {
        if (vehicleData?.name && group?.id && vehicleData?.tracker_id && vehicleData?.number_plate && vehicleData?.make && vehicleData?.model && vehicleData?.year && vehicleData?.color && vehicleData?.odo_meter_reading && vehicleData?.type && vehicleData?.vehicle_registration_no && vehicleData?.category && vehicleData?.shift_hours && vehicleData?.shift_time && vehicleData?.benchmark) {
            const vehicle = {
                ...vehicleData,
                group_id: group?.id,
            }
            console.log('createVehicle --->>', vehicle);
            //@ts-ignore
            dispatch(createVehicle(vehicle, () => (message, variant) => enqueueSnackbar(message, { variant: variant })))
            resetStates()
        } else {
            enqueueSnackbar("Please fill all fields.", { variant: 'error' })
            setError(true)
        }
    }
    
    const contentJSX = () => {
        return (
            <div className='flex flex-wrap w-full'>
                {/* <GroupSelection group={group} setGroup={setGroup} placeholder={"Select Group"} /> */}
                <label className='block text-xs mr-1 mb-1'>SELECT GROUP*</label>
                <div className='h-[120px] w-full overflow-auto'>
                    <GroupTree group={group} setGroup={setGroup} placeholder={"Select Parent Group"} />
                    {
                        (error && !group?.id) && <div className='text-danger text-[8px]'>*Please select any group.</div>
                    }
                </div>
                <FormControl sx={{ m: 0, minWidth: '100%' }} size="small">
                    <InputLabel id="demo-select-small-label">Select Tracker</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label={'IMEI'}
                        onChange={(e) => setVehicleData({ ...vehicleData, tracker_id: e.target.value })}
                    >
                        {
                            trackerData?.length === 0 ? (
                                <MenuItem disabled>No data available</MenuItem>
                            ) : (
                                trackerData.map((v, i) => <MenuItem key={i} value={v?.id}>{v?.imei}</MenuItem>)
                            )
                        }
                    </Select>
                    {
                        (error && vehicleData?.tracker_id === "") && <div className='text-danger text-[8px]'>*Field is required.</div>
                    }
                </FormControl>
                {/* <FormControl sx={{ m: 0, minWidth: '100%', mt: 2 }} size="small">
                    <InputLabel id="demo-select-small-label">Select FuelGroup</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label={'Fuel Group'}
                        onChange={(e) => setVehicleData({ ...vehicleData, fuel_group_id: e.target.value })}
                    >
                        {
                            fuelGroup.map((v, i) => <MenuItem key={i} value={v?.id}>{v?.name}</MenuItem>)
                        }
                    </Select>
                </FormControl> */}
                {/* <SelectBox options={fuelGroup} handleChange={(e) => setVehicleData({ ...vehicleData, fuel_group_id: e.target.value })} value={vehicleData?.fuel_group_id} label={"Fuel Group"} /> */}
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"NAME*"} error={error ? vehicleData?.name == "" : false} placeholder={"Vehicle Name"} value={vehicleData?.name} setChange={(e) => setVehicleData({ ...vehicleData, name: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"NUMBER PLATE*"} error={error ? vehicleData?.number_plate == "" : false} placeholder={"Vehicle Number Plate"} value={vehicleData?.number_plate} setChange={(e) => setVehicleData({ ...vehicleData, number_plate: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"MAKE*"} error={error ? vehicleData?.make == "" : false} placeholder={"Vehicle Make"} value={vehicleData?.make} setChange={(e) => setVehicleData({ ...vehicleData, make: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"MODEL*"} error={error ? vehicleData?.model == "" : false} placeholder={"Vehicle Model"} value={vehicleData?.model} setChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"YEAR*"} error={error ? vehicleData?.year == "" : false} placeholder={"Vehicle Year"} value={vehicleData?.year} setChange={(e) => setVehicleData({ ...vehicleData, year: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"COLOR*"} error={error ? vehicleData?.color == "" : false} placeholder={"Vehicle Color"} value={vehicleData?.color} setChange={(e) => setVehicleData({ ...vehicleData, color: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"ODOMETER READING*"} error={error ? vehicleData?.odo_meter_reading == "" : false} placeholder={"Vehicle Odometer Reading"} value={vehicleData?.odo_meter_reading} setChange={(e) => setVehicleData({ ...vehicleData, odo_meter_reading: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"TYPE*"} error={error ? vehicleData?.type == "" : false} placeholder={"Vehicle Type"} value={vehicleData?.type} setChange={(e) => setVehicleData({ ...vehicleData, type: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"VEHICLE REGISTRATION NO*"} error={error ? vehicleData?.vehicle_registration_no == "" : false} placeholder={"Vehicle Registration No"} value={vehicleData?.vehicle_registration_no} setChange={(e) => setVehicleData({ ...vehicleData, vehicle_registration_no: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"CATEGORY*"} error={error ? vehicleData?.category == "" : false} placeholder={"Vehicle Category"} value={vehicleData?.category} setChange={(e) => setVehicleData({ ...vehicleData, category: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"SHIFT HOURS*"} error={error ? vehicleData?.shift_hours == "" : false} placeholder={"Shift Hours"} value={vehicleData?.shift_hours} setChange={(e) => setVehicleData({ ...vehicleData, shift_hours: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"SHIFT TIME*"} error={error ? vehicleData?.shift_time == "" : false} placeholder={"Shift Time"} value={vehicleData?.shift_time} setChange={(e) => setVehicleData({ ...vehicleData, shift_time: e.target.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" label={"BENCHMARK*"} error={error ? vehicleData?.benchmark == "" : false} placeholder={"Benchmark"} value={vehicleData?.benchmark} setChange={(e) => setVehicleData({ ...vehicleData, benchmark: e.target.value })} />
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
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogContent>
                    {contentJSX()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>CREATE</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
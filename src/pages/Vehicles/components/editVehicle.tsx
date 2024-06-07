import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SelectField from 'components/selectField';
import { useDispatch, useSelector } from 'react-redux';
import InputField from 'components/inputField';
import { FUEL_GROUPS, GROUP_DATA, TRACKER, VEHICLES_DATA } from '../../../redux/reducers/trackReducer'
import { updateDriver, updateVehicle } from '../../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';

export default function EditVehicle({ open, setOpen, data, setSelectedVehicle }) {
    const [vehicleData, setVehicleData] = useState<any>(null)
    const [error, setError] = useState<any>(false)
    const vehiclesData = useSelector(VEHICLES_DATA)
    const trackerData = useSelector(TRACKER)
    const groupData = useSelector(GROUP_DATA)
    const fuelGroupData = useSelector(FUEL_GROUPS)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()

    const handleClose = () => {
        console.log('NNNNNNNooooo');
        setVehicleData(null)
        setOpen(false);
    };

    const handleUpdate = () => {
        const newObj = {
            // ...(vehicleData?.name !== data?.name ? { name: vehicleData?.name} : {}),
            ...(vehicleData?.tracker_id !== data?.tracker_id ? { tracker_id: vehicleData?.tracker_id } : {}),
            ...(vehicleData?.fuel_group_id !== data?.fuel_group_id ? { fuel_group_id: vehicleData?.fuel_group_id } : {}),
            ...(vehicleData?.group_id !== data?.group_id ? { group_id: vehicleData?.group_id } : {}),
            ...(vehicleData?.make !== data?.make ? { make: vehicleData?.make } : {}),
            ...(vehicleData?.model !== data?.model ? { model: vehicleData?.model } : {}),
            ...(vehicleData?.number_plate !== data?.number_plate ? { number_plate: vehicleData?.number_plate } : {}),
            // ...(vehicleData?.vehicle_registration_no !== data?.vehicle_registration_no ? { vehicle_registration_no: vehicleData?.vehicle_registration_no} : {}),
            ...(vehicleData?.shift_hours !== data?.shift_hours ? { shift_hours: vehicleData?.shift_hours } : {}),
            ...(vehicleData?.shift_time !== data?.shift_time ? { shift_time: vehicleData?.shift_time } : {}),
            // ...(vehicleData?.benchmark !== data?.benchmark ? { benchmark: vehicleData?.benchmark} : {}),
            ...(vehicleData?.type !== data?.type ? { type: vehicleData?.type } : {}),
            ...(vehicleData?.category !== data?.category ? { category: vehicleData?.category } : {}),
            ...(vehicleData?.odo_meter_reading !== data?.odo_meter_reading ? { odo_meter_reading: vehicleData?.odo_meter_reading } : {}),
            // ...(vehicleData?.cluster !== data?.cluster ? { cluster: vehicleData?.cluster} : {}),
            // ...(vehicleData?.region !== data?.region ? { region: vehicleData?.region} : {}),
            // ...(vehicleData?.ibc_vbc_department !== data?.ibc_vbc_department ? { ibc_vbc_department: vehicleData?.ibc_vbc_department} : {}),
            // ...(vehicleData?.date_of_joining !== data?.date_of_joining ? { date_of_joining: vehicleData?.date_of_joining} : {})
        }

        if (vehicleData?.imei === "" || vehicleData?.shift_time === "" || vehicleData?.fuel_group_id === "" || vehicleData?.group_id === "" || vehicleData?.make === "" || vehicleData?.model === "" || vehicleData?.number_plate === "" || vehicleData?.shift_hours === "" || vehicleData?.shift_hours === "" || vehicleData?.type === "" || vehicleData?.category === "" || vehicleData?.category === "" || vehicleData?.odo_meter_reading === "") {
            enqueueSnackbar('You cannot send an empty field', { variant: 'error' })
        } else {
            // @ts-ignore
            dispatch(updateVehicle(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant }), vehicleData?.id))
            setSelectedVehicle(null)
            handleClose()
        }

        // if (vehicleData?.name && vehicleData?.imei && vehicleData?.fuel_group_id && vehicleData?.group_id && vehicleData?.make && vehicleData?.model && vehicleData?.number_plate && vehicleData?.vehicle_registration_no && vehicleData?.shift_hours && vehicleData?.benchmark && vehicleData?.type && vehicleData?.category && vehicleData?.odo_meter_reading && vehicleData?.cluster && vehicleData?.region && vehicleData?.ibc_vbc_department && vehicleData?.date_of_joining !== "Invalid Date") {

        // } else {
        //     setError(true)
        //     enqueueSnackbar("Please fill the empty fields.", { variant: "error" })
        // }
    }
    console.log('333333', vehicleData?.imei, trackerData);

    const contentJSX = () => {
        return (
            <div className='flex flex-wrap w-full'>
                <SelectField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"TRACKER"} handleChange={(e) => setVehicleData({ ...vehicleData, tracker_id: e.target.value })} value={vehicleData?.tracker_id} options={trackerData} objKey="imei" receive={'id'} />
                {
                    error && vehicleData?.imei === "" && <div className='text-danger text-[8px]'>*Field is required.</div>
                }
                <SelectField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"FUEL GROUP"} handleChange={(e) => setVehicleData({ ...vehicleData, fuel_group_id: e.target.value })} value={vehicleData?.fuel_group_id} options={fuelGroupData} objKey="name" receive="id" />
                {
                    error && vehicleData?.fuel_group_id === "" && <div className='text-danger text-[8px]'>*Field is required.</div>
                }
                <SelectField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"GROUP"} handleChange={(e) => setVehicleData({ ...vehicleData, group_id: e.target.value })} value={vehicleData?.group_id} options={groupData} objKey="name" receive="id" />
                {
                    error && vehicleData?.group_id === "" && <div className='text-danger text-[8px]'>*Field is required.</div>
                }
                {/* <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"NAME"} error={error ? vehicleData?.name == "" : false} placeholder={"Name"} value={vehicleData?.name} setChange={(e) => setVehicleData({ ...vehicleData, name: e.target.value })} /> */}
                <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"MAKE"} error={error ? vehicleData?.make == "" : false} placeholder={"Make"} value={vehicleData?.make} setChange={(e) => setVehicleData({ ...vehicleData, make: e.target.value })} />
                <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"MODEL"} error={error ? vehicleData?.model == "" : false} placeholder={"Model"} value={vehicleData?.model} setChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })} />
                <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"NUMBER PLATE"} error={error ? vehicleData?.number_plate == "" : false} placeholder={"Number Plate"} value={vehicleData?.number_plate} setChange={(e) => setVehicleData({ ...vehicleData, number_plate: e.target.value })} />
                {/* <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"REGISTRATION NO"} error={error ? vehicleData?.vehicle_registration_no == "" : false} placeholder={"Registration No"} value={vehicleData?.vehicle_registration_no} setChange={(e) => setVehicleData({ ...vehicleData, vehicle_registration_no: e.target.value })} /> */}
                <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" type='number' label={"SHIFT HOURS"} error={error ? vehicleData?.shift_hours == "" : false} placeholder={"Shift Hours"} value={vehicleData?.shift_hours} setChange={(e) => setVehicleData({ ...vehicleData, shift_hours: e.target.value })} />
                <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"SHIFT TIME"} error={error ? vehicleData?.shift_time == "" : false} placeholder={"Shift Time"} value={vehicleData?.shift_time} setChange={(e) => setVehicleData({ ...vehicleData, shift_time: e.target.value })} />
                {/* <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"BENCHMAKR"} error={error ? vehicleData?.benchmark == "" : false} placeholder={"Shift Hours"} value={vehicleData?.benchmark} setChange={(e) => setVehicleData({ ...vehicleData, benchmark: e.target.value })} /> */}
                <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"TYPE"} error={error ? vehicleData?.type == "" : false} placeholder={"Type"} value={vehicleData?.type} setChange={(e) => setVehicleData({ ...vehicleData, type: e.target.value })} />
                <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"CATEGORY"} error={error ? vehicleData?.category == "" : false} placeholder={"Category"} value={vehicleData?.category} setChange={(e) => setVehicleData({ ...vehicleData, category: e.target.value })} />
                <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"ODOMETER READING"} error={error ? vehicleData?.odo_meter_reading == "" : false} placeholder={"Odomoter Reading"} value={vehicleData?.odo_meter_reading} setChange={(e) => setVehicleData({ ...vehicleData, odo_meter_reading: e.target.value })} />
                {/* <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"CLUSTER"} error={error ? vehicleData?.cluster == "" : false} placeholder={"Cluster"} value={vehicleData?.cluster} setChange={(e) => setVehicleData({ ...vehicleData, cluster: e.target.value })} /> */}
                {/* <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"REGION"} error={error ? vehicleData?.region == "" : false} placeholder={"Region"} value={vehicleData?.region} setChange={(e) => setVehicleData({ ...vehicleData, region: e.target.value })} /> */}
                {/* <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"IBC/VBC/Department"} error={error ? vehicleData?.ibc_vbc_department == "" : false} placeholder={"IBC/VBC/Department"} value={vehicleData?.ibc_vbc_department} setChange={(e) => setVehicleData({ ...vehicleData, ibc_vbc_department: e.target.value })} /> */}
                {/* <SelectField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"VEHICLE NUMBER PLATE"} handleChange={(e) => setVehicleData({...vehicleData, vehicle_number_plate: e.target.value})} value={vehicleData?.number_plate} options={vehiclesData} objKey="number_plate" /> */}
                {/* <div className='mt-3'>
                    <label className='block text-xs mr-1 mb-1' my-1>DATE</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField']}>
                            <DateField id='datefield-input' value={dayjs(vehicleData?.date_of_joining)} onChange={(e) => setVehicleData({ ...vehicleData, date_of_joining: dayjs(e)?.format("YYYY-MM-DD") })} />
                        </DemoContainer>
                        {
                            error && vehicleData?.date_of_joining === "Invalid Date" && <div className='text-danger text-[8px]'>*Field is required.</div>
                        }
                    </LocalizationProvider>
                </div> */}
            </div>
        )
    }

    useEffect(() => {
        console.log('DATA...', vehicleData);

        if (open) {
            setVehicleData(data)
        }
    }, [open === true])
    return (
        <React.Fragment>
            <Dialog
                open={open}
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
                <DialogTitle>Update Vehicle (IMEI: {vehicleData?.imei})</DialogTitle>
                <DialogContent>
                    {contentJSX()}
                </DialogContent>
                <DialogActions>
                    <div className='w-full flex justify-end items-center'>
                        <Button onClick={handleClose}>CANCEL</Button>
                        <Button className='ml-4' onClick={handleUpdate}>UPDATE</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SelectField from 'components/selectField';
import { useDispatch, useSelector } from 'react-redux';
import InputField from 'components/inputField';
import { VEHICLES_DATA } from '../../../redux/reducers/trackReducer'
import { updateDriver } from '../../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';

export default function EditDriver({ open, setOpen, data, setSelectedDriver }) {
    const [driverData, setDriverData] = useState<any>(data)
    const [error, setError] = useState<boolean>(false)
    const vehicleData = useSelector(VEHICLES_DATA)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()

    const handleClose = () => {
        setDriverData(null)
        setOpen(false);
    };

    const handleUpdate = () => {
        const newObj = {
            ...(driverData?.name !== data?.name && { driver_name: driverData?.name }),
            ...(driverData?.vehicle_id !== data?.vehicle?.id && { vehicle_id: driverData?.vehicle_id }),
            // ...(driverData?.ibutton_value !== data?.ibutton_value && {ibutton_value: driverData?.ibutton_value}),
            // ...(driverData?.date_of_joining !== data?.date_of_joining && {date_of_joining: driverData?.date_of_joining}),
        }
        if (driverData?.name === "" || driverData?.vehicle_id === "") {
            enqueueSnackbar('You cannot send an empty field', { variant: 'error' })
        }
        if (true) {
            // @ts-ignore
            dispatch(updateDriver(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant }), driverData?.id))
            handleClose()
        } else {
            setError(true)
            enqueueSnackbar("Please fill all fields.", { variant: "error" })
        }
    }
    console.log('DAta', driverData?.vehicle?.number_plate);

    const contentJSX = () => {
        return (
            <div className='flex flex-wrap w-full'>
                <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" error={error ? driverData?.name === "" : false} label={"DRIVER NAME"} placeholder={"Search Vehicle"} value={driverData?.name} setChange={(e) => setDriverData({ ...driverData, name: e.target.value })} />
                {/* <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" error={error ? driverData?.serial_number === "" : false} label={"SERIAL NUMBER"} placeholder={"Search Vehicle"} value={driverData?.serial_number} setChange={(e) => setDriverData({ ...driverData, serial_number: e.target.value })} /> */}

                <div className='w-3/6 mt-3'>
                    <SelectField className="w-3/6" fieldClassName="w-[220px]" label={"VEHICLE"} handleChange={(e) => setDriverData({ ...driverData, vehicle_id: e.target.value })} value={driverData?.vehicle_id} options={vehicleData} objKey="number_plate" receive={'id'} />
                    {
                        error && driverData?.vehicle_number_plate === "" && <div className='text-danger text-[8px]'>*Field is required.</div>
                    }
                </div>
                {/* <div className='mt-3'>
                    <label className='block text-xs mr-1 mb-1' my-1>DATE</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField']}>
                            <DateField id='datefield-input' value={dayjs(driverData?.date_of_joining)} onChange={(e) => setDriverData({ ...driverData, date_of_joining: dayjs(e)?.format("YYYY-MM-DD") })} />
                        </DemoContainer>
                        {
                            error && driverData?.date_of_joining == "Invalid Date" && <div className='text-danger text-[8px]'>*Field is required.</div>
                        }
                    </LocalizationProvider>
                </div> */}
                {/* <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" label={"DATE OF JOINING"} placeholder={"Search Vehicle"} value={driverData?.date_of_joining} setChange={(e) => setDriverData({...driverData, date_of_joining: e.target.value})} /> */}
                {/* <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" error={error ? driverData?.ibutton_value === "" : false} label={"iButton Value"} placeholder={"Search Vehicle"} value={driverData?.ibutton_value} setChange={(e) => setDriverData({ ...driverData, ibutton_value: e.target.value })} /> */}
            </div>
        )
    }

    useEffect(() => {
        const newObj = {
            name: data?.name,
            // serial_number: data?.serial_number,
            vehicle_id: data?.vehicle?.id,
            date_of_joining: data?.date_of_joining,
            // ibutton_value: data?.ibutton_value,
            id: data?.id,
        }
        setDriverData(newObj)
    }, [open])
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
                <DialogTitle>Update Driver</DialogTitle>
                <DialogContent>
                    {contentJSX()}
                </DialogContent>
                <DialogActions>
                    <div className='w-full flex justify-end'>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleUpdate}>UPDATE</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
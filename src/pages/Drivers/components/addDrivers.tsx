import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
//@ts-ignore
import Papa from "papaparse";
import SelectField from 'components/selectField';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DriverDataProps } from '@/typecasts';
import InputField from 'components/inputField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector, useDispatch } from 'react-redux';
import { VEHICLES_DATA } from '../../../redux/reducers/trackReducer';
import { createDriverAction } from '../../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';

export default function AddDrivers({ open, setOpen }) {
    const [driverData, setDriverData] = useState<any>({
        driver_name: "",
        // serial_number: "",
        vehicle_id: "",
        date_of_joining: "",
        // ibutton_value: ""
    })
    const [error, setError] = useState<boolean>(false)
    const vehicleData = useSelector(VEHICLES_DATA)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const onDownload = () => {
        const link = document.createElement("a");
        link.download = `drivers.csv`;
        link.href = "./assets/download_files/drivers.csv";
        link.click();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        if (driverData?.driver_name && driverData?.vehicle_id && driverData?.date_of_joining !== "Invalid Date") {
            // @ts-ignore
            dispatch(createDriverAction(driverData, (message, variant) => enqueueSnackbar(message, { variant: variant }), handleClose))
            setDriverData(null)
        } else {
            enqueueSnackbar("Please fill all fields.", { variant: 'error' })
            setError(true)
        }
    }
    console.log('DATA...', driverData?.date_of_joining);

    const contentJSX = () => {
        return (
            <div className='flex flex-wrap w-full'>
                <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" error={error ? driverData?.driver_name === "" : false} label={"DRIVER NAME"} placeholder={"Add Driver Name"} value={driverData?.driver_name} setChange={(e) => setDriverData({ ...driverData, driver_name: e?.target?.value })} />
                {/* <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" error={error ? driverData?.serial_number === "" : false} label={"SERIAL NUMBER"} placeholder={"Add Serial Number"} value={driverData?.serial_number} setChange={(e) => setDriverData({ ...driverData, serial_number: e?.target?.value })} /> */}

                <div className='w-3/6 mt-4'>
                    <SelectField className="" fieldClassName="w-[220px]" label={"VEHICLE NUMBER PLATE"} handleChange={(e) => setDriverData({ ...driverData, vehicle_id: e?.target?.value })} value={driverData?.vehicle_id} options={vehicleData} objKey="number_plate" receive={"id"} />
                    {
                        error && driverData?.vehicle_id === "" && <div className='text-danger text-[8px]'>*Field is required.</div>
                    }
                </div>
                <div className='mt-3'>
                    <label className='block text-xs mr-1 mb-1' my-1>DATE</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField']}>
                            <DateField id='datefield-input' value={driverData?.date_of_joining} onChange={(e) => setDriverData({ ...driverData, date_of_joining: dayjs(e)?.format("YYYY-MM-DD") })} />
                        </DemoContainer>
                        {
                            (error && driverData?.date_of_joining === "Invalid Date" || driverData?.date_of_joining === "") && <div className='text-danger text-[8px]'>*Field is required.</div>
                        }
                    </LocalizationProvider>
                </div>
                {/* <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" error={error ? driverData?.ibutton_value === "" : false} label={"iButton Value"} placeholder={"Search Vehicle"} value={driverData?.ibutton_value} setChange={(e) => setDriverData({ ...driverData, ibutton_value: e?.target?.value })} /> */}
            </div>
        )
    }
    return (
        <React.Fragment>
            <Dialog
                open={open}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event?.preventDefault();
                        const formData = new FormData(event?.currentTarget);
                        const formJson = Object.fromEntries((formData as any)?.entries());
                        const email = formJson?.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add a new driver</DialogTitle>
                <div className='flex ml-3 '>
                    <Button onClick={onDownload} className='border-grey '>Download Template</Button>
                    {/* <Button onClick={handleClose}>Import Drivers</Button> */}
                    {
                        //@ts-ignore
                    }
                    <label htmlFor="file-upload" className="custom-file-upload">
                        {
                            driverData ? 'TEMPLATE UPLOADED' : 'UPLOAD TEMPLATE'
                        }
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        accept=".csv,.xlsx,.xls"
                        onChange={(e) => {
                            const files = e.target.files;
                            console.log(files);
                            if (files) {
                                Papa.parse(files[0], {
                                    complete: function (results) {
                                        console.log("Finished:", results.data);
                                        const newObj: any = {
                                            // serial_number: results.data[1][0],
                                            driver_name: results.data[1][1],
                                            date_of_joining: results.data[1][2],
                                            vehicle_id: results.data[1][3],
                                            // ibutton_value: results.data[1][4],
                                        }
                                        console.log('hhhhh', newObj);

                                        setDriverData(newObj)
                                    }
                                }
                                )
                            }
                        }}
                    />
                </div>
                <DialogContent>
                    {contentJSX()}
                </DialogContent>
                <DialogActions>
                    <div className='w-full flex justify-end'>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>CREATE</Button>
                    </div>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}
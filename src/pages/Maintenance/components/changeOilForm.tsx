import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import InputField from 'components/inputField.tsx';
import { useDispatch } from 'react-redux';
import { createOilMaintenance, getMaintenanceData, getOilMaintenance } from '../../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#4285F4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#4285F4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: '#4285F4',
        }),
        '& .QontoStepIcon-completedIcon': {
            color: '#4285F4',
            zIndex: 1,
            fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    }),
);

function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <IoCheckmarkDoneOutline className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const steps = ['Current Mileage', 'Oil Change', 'Change Due', 'Reminder', 'Remarks', "Summary"];

export default function ChangeOilForm({ open, setOpen, vehicle }) {
    const [formData, setFormData] = useState<any>({
        current_meter_reading: "",
        last_change_date: "",
        last_change_mileage: "",
        remarks: "",
        remind_mileage: "",
        remind_time: "",
        expiry_time: "",
        expiry_mileage: "",

    })
    const [step, setStep] = useState(0)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        setOpen(false);
        setStep(0)
        setFormData({
            current_meter_reading: "",
            last_change_date: "",
            last_change_mileage: "",
            remarks: "",
            remind_mileage: "",
            remind_time: "",
            expiry_time: "",
            expiry_mileage: "",
          })
    };
    const handleNext = () => {
        if (step === steps.length - 1) {
            handleClose()
        } else {
            switch (true) {
                case step === 0:
                    console.log('again step 0000', step);

                    if (formData?.current_meter_reading.length > 0) {
                        setStep(step + 1)
                    } else {
                        enqueueSnackbar('Please fill the form completely', { variant: 'error' })
                    }
                    break;
                case step === 1:
                    if (formData?.last_change_date.length > 0 && formData?.last_change_mileage.length > 0) {
                        if(Number(formData?.current_meter_reading) >= Number(formData?.last_change_mileage)) {
                            setStep(step + 1)
                        } else {
                            enqueueSnackbar('Last change mileage cannot be greater than current meter reading', { variant: 'error' })
                        }
                    } else {
                        enqueueSnackbar('Please fill the form completely', { variant: 'error' })
                    }
                    break;
                case step === 2:
                    if (formData?.remind_time.length > 0 && formData?.remind_mileage.length > 0) {
                        setStep(step + 1)
                    } else {
                        enqueueSnackbar('Please fill the form completely', { variant: 'error' })
                    }
                    break;
                case step === 3:
                    if (formData?.expiry_time.length > 0 && formData?.expiry_mileage.length > 0) {
                        setStep(step + 1)
                    } else {
                        enqueueSnackbar('Please fill the form completely', { variant: 'error' })
                    }
                    break;
                case step === 4:
                    if (formData?.remarks.length > 0) {
                        setStep(step + 1)
                    } else {
                        enqueueSnackbar('Please fill the form completely', { variant: 'error' })
                    }
                    break;
            }
        }
    }
    const handleBack = () => {
        setStep(step - 1)
    }
    const handleLoad = async () => {
        // setOpen(false)
        const newObj = {
            current_meter_reading: Number(formData?.current_meter_reading),
            expiry_mileage: Number(formData?.expiry_mileage),
            expiry_time: Number(formData?.expiry_time),
            last_change_date: formData?.last_change_date,
            last_change_mileage: Number(formData?.last_change_mileage),
            remarks: formData?.remarks,
            remind_mileage: Number(formData?.remind_mileage),
            remind_time: Number(formData?.remind_time),
            vehicle_id: vehicle?.id,
            is_notified: false
        }
        // @ts-ignore
        await dispatch(createOilMaintenance(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant })))

        // @ts-ignore
        await dispatch(getOilMaintenance((message, variant) => enqueueSnackbar(message, { variant: variant }), vehicle?.id))
        handleClose()
    }

    const contentJSX = () => {
        switch (true) {
            case step === 0:
                return (
                    <div>
                        <label className='text-sm'>Meter Reading</label>
                        <input className="w-full p-2" type={"number"} placeholder={"Meter Reading"} value={formData?.current_meter_reading} onChange={(e) => setFormData({ ...formData, current_meter_reading: e.target.value })} />
                    </div>
                )

            case step === 1:
                return (
                    <div>
                        <label className='text-sm'>Date</label>
                        <input className="w-full p-2" type={"date"} placeholder={"Date"} value={formData?.last_change_date} onChange={(e) => setFormData({ ...formData, last_change_date: e.target.value })} />
                        <label className='text-sm'>Mileage</label>
                        <input className="w-full mt-4 p-2" type={"number"} placeholder={"Mileage"} value={formData?.last_change_mileage} onChange={(e) => setFormData({ ...formData, last_change_mileage: e.target.value })} />
                    </div>
                )
            case step === 2:
                return (
                    <div>
                        <label className='text-sm'>Duration (Days)</label>
                        <input className="w-full p-2" type={"number"} placeholder={"Duration (Days)"} value={formData?.remind_time} onChange={(e) => setFormData({ ...formData, remind_time: e.target.value })} />
                        <label className='text-sm'>Distance (km)</label>
                        <input className="w-full mt-4 p-2" type={"number"} placeholder={"Distance (km)"} value={formData?.remind_mileage} onChange={(e) => setFormData({ ...formData, remind_mileage: e.target.value })} />
                    </div>
                )
            case step === 3:
                return (
                    <div>
                        <label className='text-sm'>Days Left before due date</label>
                        <input className="w-full p-2" type={"number"} placeholder={"Days Left before due date"} value={formData?.expiry_time} onChange={(e) => setFormData({ ...formData, expiry_time: e.target.value })} />
                        <label className='text-sm'>Distance left before due date</label>
                        <input className="w-full mt-4 p-2" type={"number"} placeholder={"Distance left before due date"} value={formData?.expiry_mileage} onChange={(e) => setFormData({ ...formData, expiry_mileage: e.target.value })} />
                    </div>
                )
            case step === 4:
                return (
                    <div>
                        <label className='text-sm'>Remarks</label>
                        <InputField className="w-full mt-4 p-2" type={"text"} rows={'2'} fieldClassName="w-full" label={"Remarks"} placeholder={"Remarks..."} value={formData?.remarks} setChange={(e) => setFormData({ ...formData, remarks: e.target.value })} />
                    </div>
                )
            case step === 5:
                return (
                    <div className='w-full border border-black'>
                        <div className='w-full bg-bgColor text-black text-center font-semibold p-1 border border-black'>Mileage</div>
                        <div className='flex'>
                            <div className='text-center w-6/12 font-semibold p-1 border border-black'>Current</div>
                            <div className='text-center w-6/12 font-semibold p-1 border border-black'>Modified</div>
                        </div>
                        <div className='flex'>
                            <div className='text-center w-6/12 p-1 border border-black'>{formData?.current_meter_reading}</div>
                            <div className='text-center w-6/12 p-1 border border-black'>{formData?.last_change_mileage}</div>
                        </div>
                        
                        <div className='w-full bg-bgColor text-black text-center font-semibold p-1 border border-black'>Oil Change</div>
                        <div className='flex'>
                            <div className='text-center w-6/12 font-semibold p-1 border border-black'>Date</div>
                            <div className='text-center w-6/12 font-semibold p-1 border border-black'>Mileage</div>
                        </div>
                        <div className='flex'>
                            <div className='text-center w-6/12 p-1 border border-black'>{formData?.last_change_date}</div>
                            <div className='text-center w-6/12 p-1 border border-black'>{formData?.last_change_mileage}</div>
                        </div>
                        
                        <div className='w-full bg-bgColor text-black text-center font-semibold p-1 border border-black'>Change Due</div>
                        <div className='flex'>
                            <div className='text-center w-6/12 font-semibold p-1 border border-black'>Distance (KM)</div>
                            <div className='text-center w-6/12 font-semibold p-1 border border-black'>Duration (Days)</div>
                        </div>
                        <div className='flex'>
                            <div className='text-center w-6/12 p-1 border border-black'>{formData?.remind_time}</div>
                            <div className='text-center w-6/12 p-1 border border-black'>{formData?.remind_mileage}</div>
                        </div>
                        
                        <div className='w-full bg-bgColor text-black text-center font-semibold p-1 border border-black'>Reminder</div>
                        <div className='flex'>
                            <div className='text-center w-6/12 font-semibold p-1 border border-black'>Days left before due date (Days)</div>
                            <div className='text-center w-6/12 font-semibold p-1 border border-black'>Distance left before due date (KM)</div>
                        </div>
                        <div className='flex'>
                            <div className='text-center w-6/12 p-1 border border-black'>{formData?.expiry_time}</div>
                            <div className='text-center w-6/12 p-1 border border-black'>{formData?.expiry_mileage}</div>
                        </div>

                        <div className='w-full bg-bgColor text-black text-center font-semibold p-1 border border-black'>Reminder</div>
                        <div className='w-full text-black text-center p-1 border border-black'>{formData?.remarks}</div>

                    </div>
                )
        }
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
                <DialogTitle className='w-[400px]'>Change Oil</DialogTitle>
                <Stepper alternativeLabel activeStep={step} connector={<QontoConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <DialogContent>
                    {contentJSX()}
                </DialogContent>
                <DialogActions>
                    {
                        [1,2,3,4].includes(step) ? <Button onClick={handleBack}>Back</Button> : <Button onClick={handleClose}>Cancel</Button>
                    }
                    {
                        step === 5 ? <Button onClick={handleLoad}>Confirm</Button> : <Button onClick={handleNext}>Next</Button>
                    }
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}
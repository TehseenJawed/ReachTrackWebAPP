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
import { createOtherMaintenance, createTyreMaintenance, getMaintenanceData, getOtherMaintenance } from '../../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import SelectField from 'components/selectField';

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

const steps = ['Type', 'Description', 'Date', 'Cost', 'Warrenty', "Remarks", "Summary"];

export default function OtherMaintenance({ open, setOpen, vehicle }) {
    const [formData, setFormData] = useState<any>({
        type: "",
        description: "",
        date: "",
        cost: "",
        warranty: "",
        is_notified: false,
        remarks: "",
        vehicle_id: "",
    })
    const [step, setStep] = useState(0)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const unitOfCost = [
        {
            unit: 'USD',
        },
        {
            unit: 'PKR',
        },
    ]

    const handleClose = () => {
        setOpen(false);
        setStep(0)
        setFormData({
            type: "",
            description: "",
            date: "",
            cost: "",
            warranty: "",
            is_notified: false,
            remarks: "",
            vehicle_id: "",
        })
    };
    const handleNext = () => {
        if (step === steps.length - 1) {
            handleClose()
        } else {
            switch (true) {
                case step === 0:
                    console.log('again step 0000', step);

                    if (formData?.type.length > 0) {
                        setStep(step + 1)
                    } else {
                        enqueueSnackbar('Please fill the form completely', { variant: 'error' })
                    }
                    break;
                case step === 1:
                    if (formData?.description.length > 0) {
                        setStep(step + 1)
                    } else {
                        enqueueSnackbar('Please fill the form completely', { variant: 'error' })
                    }
                    break;
                case step === 2:
                    if (formData?.date.length > 0) {
                        setStep(step + 1)
                    } else {
                        enqueueSnackbar('Please fill the form completely', { variant: 'error' })
                    }
                    break;
                case step === 3:
                    if (formData?.cost.length > 0 && formData?.cost_unit) {
                        setStep(step + 1)
                    } else {
                        enqueueSnackbar('Please fill the form completely', { variant: 'error' })
                    }
                    break;
                case step === 4:
                    if (formData?.warranty.length > 0) {
                        setStep(step + 1)
                    } else {
                        enqueueSnackbar('Please fill the form completely', { variant: 'error' })
                    }
                    break;
                case step === 5:
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
            ...(formData?.type ? {type: formData?.type} : {}),
            ...(formData?.description ? {description: formData?.description} : {}),
            ...(formData?.cost ? {cost: Number(formData?.cost)} : {}),
            ...(formData?.cost_unit ? {cost_unit: formData?.cost_unit} : {}),
            ...(formData?.date ? {date: formData?.date} : {}),
            ...(formData?.warranty ? {warranty: Number(formData?.warranty)} : {}),
            ...(formData?.remarks ? {remarks: formData?.remarks} : {}),
            is_notified: false,
            vehicle_id: vehicle?.id,
        }
        console.log('Data...',formData,newObj);
        
        // @ts-ignore
        await dispatch(createOtherMaintenance(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant })))
        // @ts-ignore
        await dispatch(getOtherMaintenance((message, variant) => enqueueSnackbar(message, { variant: variant }), vehicle?.id))
        handleClose()
    }

    const contentJSX = () => {
        switch (true) {
            case step === 0:
                return (
                    <div>
                        <label className='text-sm'>Maintenace Type</label>
                        <input className="w-full p-2" type={"text"} placeholder={"e.g Tunning"} value={formData?.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} />
                    </div>
                )

            case step === 1:
                return (
                    <div>
                        <InputField className="w-full mt-4 p-2" type={"text"} rows={'2'} fieldClassName="w-full" label={"Add Details"} placeholder={"Description..."} value={formData?.description} setChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                )
            case step === 2:
                return (
                    <div>
                        <label className='text-sm'>Date</label>
                        <input className="w-full p-2" type={"date"} placeholder={"Date"} value={formData?.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                    </div>
                )
            case step === 3:
                return (
                    <div>
                        <div className='w-full mt-4'>
                            <SelectField className="w-full mt-4" fieldClassName="w-full" label={"UNIT"} handleChange={(e) => setFormData({ ...formData, cost_unit: e.target.value })} value={formData?.cost_unit} options={unitOfCost} objKey="unit" />
                            {
                                // error && driverData?.vehicle_number_plate === "" && <div className='text-danger text-[8px]'>*Field is required.</div>
                            }
                        </div>
                        <label className='text-sm'>Cost</label>
                        <input className="w-full p-2" type={"number"} placeholder={"Cost"} value={formData?.cost} onChange={(e) => setFormData({ ...formData, cost: e.target.value })} />
                    </div>
                )
            case step === 4:
                return (
                    <div>
                        <label className='text-sm'>Warranty</label>
                        <input className="w-full p-2" type={"number"} placeholder={"0 Year"} value={formData?.warranty} onChange={(e) => setFormData({ ...formData, warranty: e.target.value })} />
                    </div>
                )
            case step === 5:
                return (
                    <div>
                        <InputField className="w-full mt-4 p-2" type={"text"} rows={'2'} fieldClassName="w-full" label={"Remarks"} placeholder={"Add Your Remark"} value={formData?.remarks} setChange={(e) => setFormData({ ...formData, remarks: e.target.value })} />
                    </div>
                )
            case step === 6:
                return (
                    <div className='w-full border border-black'>
                        <div className='w-full bg-bgColor text-black text-center font-semibold p-1 border border-black'>Maintenance Type</div>
                        <div className='w-full text-black text-center p-1 border border-black'>{formData?.type || 'N/A'}</div>

                        <div className='w-full bg-bgColor text-black text-center font-semibold p-1 border border-black'>Description</div>
                        <div className='w-full text-black text-center p-1 border border-black'>{formData?.description || 'N/A'}</div>

                        <div className='w-full bg-bgColor text-black text-center font-semibold p-1 border border-black'>Date</div>
                        <div className='w-full text-black text-center p-1 border border-black'>{formData?.date || 'N/A'}</div>

                        <div className='w-full bg-bgColor text-black text-center font-semibold p-1 border border-black'>Cost</div>
                        <div className='w-full text-black text-center p-1 border border-black'>{formData?.cost || 'N/A'}</div>

                        <div className='w-full bg-bgColor text-black text-center font-semibold p-1 border border-black'>Currency</div>
                        <div className='w-full text-black text-center p-1 border border-black'>{formData?.cost_unit || 'N/A'}</div>

                        <div className='w-full bg-bgColor text-black text-center font-semibold p-1 border border-black'>Warranty</div>
                        <div className='w-full text-black text-center p-1 border border-black'>{`${formData?.warranty} Years` || 'N/A'}</div>

                        <div className='w-full bg-bgColor text-black text-center font-semibold p-1 border border-black'>Remarks</div>
                        <div className='w-full text-black text-center p-1 border border-black'>{formData?.remarks || 'N/A'}</div>

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
                <DialogTitle className='w-[400px]'>Other Maintenance</DialogTitle>
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
                        [1, 2, 3, 4, 5].includes(step) ? <Button onClick={handleBack}>Back</Button> : <Button onClick={handleClose}>Cancel</Button>
                    }
                    {
                        step === 6 ? <Button onClick={handleLoad}>Confirm</Button> : <Button onClick={handleNext}>Next</Button>
                    }
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}
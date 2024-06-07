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
import SelectField from 'components/selectField';
import { vehicleData } from 'apis/api_response';
import DateField from 'components/dateField';

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

const steps = ['Select Vehicle', 'Select Date'];

export default function CreateGroup({ open, setOpen }) {
    const [step, setStep] = useState(0)
    const handleClose = () => {
        setOpen(false);
    };
    const handleNext = () => {
        if (step === steps.length - 1) {
            handleClose()
        } else {
            setStep(step + 1)
        }
    }
    const handleBack = () => {
        setStep(step - 1)
    }
    const handleLoad = () => {
        // setLoading(true)
        setOpen(false)
        setTimeout(() => {
            // setLoading(false)
        }, 1000)
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
                <DialogTitle className='w-[400px]'>Search Criteria</DialogTitle>
                <DialogContent>
                    <div className='w-full'>
                        <div className='text-md my-2 tracking-wider	'>Start Date</div>
                        <DateField classNamePicker={' ml-2'} />
                        <div className='text-md my-2 tracking-wider	'>End Date</div>
                        <DateField classNamePicker={' ml-2'} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLoad}>Confirm</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}
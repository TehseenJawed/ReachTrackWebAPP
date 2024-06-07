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
import { DriverDataProps } from '@/typecasts';
import InputField from 'components/inputField';
import { useSelector, useDispatch } from 'react-redux';
import { ROLES } from '../../../redux/reducers/trackReducer';
import { actionInviteUser, directUserRegister } from '../../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import GroupSelection from 'components/GroupSelection';
import { validEmail, validPassword } from 'utils/RegixUtils';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

export default function InviteUser({ open, setOpen, setOptions }) {
    const [userData, setUserData] = useState<any>({
        role_id: "",
        username: "",
        designation: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
        city: "",
        address: "",
        country: "",
    })
    const [showCreds, setShowCreds] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [errorField, setErrorField] = useState<any>({})
    const [formType, setFormType] = useState<string>('Invite User')
    const [group, setGroup] = useState<any>(null)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const userRoles = useSelector(ROLES)

    const handleClose = () => {
        setUserData({
            role_id: "",
            username: "",
            designation: "",
            password: "",
            first_name: "",
            last_name: "",
            phone: "",
            city: "",
            address: "",
            country: "",
        })
        setOpen(false);
        setShowCreds(false);
        setOptions(null)
    };

    const handleSubmit = () => {
        if (formType === 'Invite User') {
            const newObj = {
                ...(userData?.username && { username: userData?.username }),
                ...(userData?.role_id && { role_id: userData?.role_id }),
                ...(userData?.designation && { designation: userData?.designation }),
                ...(group?.id && { group_id: group?.id })
            }
            if (!validEmail.test(newObj?.username)) {
                setErrorField({ type: 'email', message: 'Email format is incorrect.' })
                // enqueueSnackbar('Email format is incorrect.', { variant: 'error' })
                return
            }
            if (newObj?.username && newObj?.role_id) {
                // @ts-ignore
                dispatch(actionInviteUser(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant }), handleClose))
            } else {
                // enqueueSnackbar("Please fill all fields.", { variant: 'error' })
                setError(true)
            }
        } else if (formType === 'Create New User') {
            const newObj = {
                ...(userData?.role_id && { role_id: userData?.role_id }),
                ...(userData?.username && { username: userData?.username }),
                ...(userData?.designation && { designation: userData?.designation }),
                ...(userData?.password && { password: userData?.password }),
                ...(userData?.first_name && { first_name: userData?.first_name }),
                ...(userData?.last_name && { last_name: userData?.last_name }),
                ...(userData?.phone && { phone: userData?.phone }),
                ...(userData?.city && { city: userData?.city }),
                ...(userData?.address && { address: userData?.address }),
                ...(userData?.country && { country: userData?.country }),
                group_id: group?.id
            }
            if (!validEmail.test(newObj?.username)) {
                setErrorField({ type: 'email', message: 'Email format is incorrect.' })
                enqueueSnackbar('Email format is incorrect.', { variant: 'error' })
                return
            }
            if (!validPassword.test(newObj?.password)) {
                setErrorField({ type: 'password', message: 'Password must be 8 characters. It should have atleast 1 number' })
                enqueueSnackbar('Password must be 8 characters. It should have atleast 1 number', { variant: 'error' })
                return
            }
            if (newObj?.username && newObj?.role_id && newObj?.password && newObj?.first_name) {
                // @ts-ignore
                dispatch(directUserRegister(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant }), setShowCreds))
            } else {
                enqueueSnackbar("Please fill all fields.", { variant: 'error' })
                setError(true)
            }
        }
    }

    const handleChangeForm = (formTitle) => {
        if (formTitle !== formType) {
            setFormType(formTitle)
        }
    };

    const inviteFormContentJSX = () => {
        return (
            <div className='flex flex-wrap w-full'>
                <div className='w-3/6 mt-4'>
                    <SelectField className="" fieldClassName="w-[220px]" label={"USER ROLE*"} handleChange={(e) => setUserData({ ...userData, role_id: e?.target?.value })} value={userData?.role_id} options={userRoles} objKey="name" receive="id" />
                    {
                        error && userData?.role_id === "" && <div className='text-danger text-[8px]'>*Field is required.</div>
                    }
                </div>
                <div className='w-3/6 mt-4'>
                    <GroupSelection group={group} setGroup={setGroup} placeholder={"SELECT GROUP"} />
                    {/* {
                        error && group === null && <div className='text-danger text-[8px]'>*Field is required.</div>
                    } */}
                </div>
                <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" error={errorField?.type && true} errorMessage={errorField?.message} label={"EMAIL*"} placeholder={"user@rtss.com"} value={userData?.username} setChange={(e) => setUserData({ ...userData, username: e?.target?.value })} />
                <InputField className="w-3/6 mt-4" fieldClassName="w-full" error={false} label={"DESIGNATION"} placeholder={"Designation"} value={userData?.designation} setChange={(e) => setUserData({ ...userData, designation: e?.target?.value })} />
            </div>
        )
    }

    const createFormContentJSX = () => {
        return (
            <div className='flex flex-wrap w-full'>
                <div className='w-3/6 mt-4'>
                    <SelectField className="" fieldClassName="w-[220px]" label={"USER ROLE*"} handleChange={(e) => setUserData({ ...userData, role_id: e?.target?.value })} value={userData?.role_id} options={userRoles} objKey="name" receive="id" />
                    {
                        error && userData?.role_id === "" && <div className='text-danger text-[8px]'>*Field is required.</div>
                    }
                </div>
                <div className='w-3/6 mt-4'>
                    <GroupSelection group={group} setGroup={setGroup} placeholder={"SELECT GROUP"} />
                    {
                        error && group?.id && <div className='text-danger text-[8px]'>*Field is required.</div>
                    }
                </div>
                <InputField className="w-3/6 mt-4" fieldClassName="w-full" error={errorField?.type && true} label={"EMAIL*"} placeholder={"user@rtss.com"} value={userData?.username} setChange={(e) => setUserData({ ...userData, username: e?.target?.value })} />
                <InputField className="w-3/6 mt-4" type="password" fieldClassName="w-full" error={error ? userData?.password === "" : false} label={"PASSWORD*"} placeholder={"******"} value={userData?.password} setChange={(e) => setUserData({ ...userData, password: e?.target?.value })} />

                <InputField className="w-3/6 mt-4" fieldClassName="w-full" error={error ? userData?.first_name === "" : false} label={"FIRST NAME*"} placeholder={"First Name"} value={userData?.first_name} setChange={(e) => setUserData({ ...userData, first_name: e?.target?.value })} />
                <InputField className="w-3/6 mt-4" fieldClassName="w-full" error={false} label={"LAST NAME"} placeholder={"Last Name"} value={userData?.last_name} setChange={(e) => setUserData({ ...userData, last_name: e?.target?.value })} />

                <InputField className="w-3/6 mt-4" fieldClassName="w-full" error={false} label={"PHONE NO"} placeholder={"Phone No"} value={userData?.phone} setChange={(e) => setUserData({ ...userData, phone: e?.target?.value })} />
                <InputField className="w-3/6 mt-4" fieldClassName="w-full" error={false} label={"CITY"} placeholder={"City"} value={userData?.city} setChange={(e) => setUserData({ ...userData, city: e?.target?.value })} />

                <InputField className="w-full mt-4" fieldClassName="w-full" error={false} label={"ADDRESS"} placeholder={"Address"} value={userData?.address} setChange={(e) => setUserData({ ...userData, address: e?.target?.value })} />

                <InputField className="w-3/6 mt-4" fieldClassName="w-full" error={false} label={"COUNTRY"} placeholder={"Country"} value={userData?.country} setChange={(e) => setUserData({ ...userData, country: e?.target?.value })} />
                <InputField className="w-3/6 mt-4" fieldClassName="w-full" error={false} label={"DESIGNATION"} placeholder={"Designation"} value={userData?.designation} setChange={(e) => setUserData({ ...userData, designation: e?.target?.value })} />
            </div>
        )
    }

    const handleCopyToClipboard = (userData) => {
        navigator.clipboard.writeText(`Email: ${userData?.username} Passowrd: ${userData?.password}`)
        enqueueSnackbar("Credentials are copied.", { variant: 'success' })
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
                <DialogTitle>{formType}</DialogTitle>
                <div className='flex justify-evenly'>
                    <label onClick={() => handleChangeForm('Invite User')} className={`w-5/12 h-24 flex flex-col justify-center items-center border cursor-pointer ${formType === 'Invite User' ? 'bg-black border-white text-white' : 'border-darkGray/50 text-darkGray/50'} `}>
                        INVITE USER
                        <div className='text-sm mt-2'>Send an invitation email to users</div>
                    </label>
                    <label onClick={() => handleChangeForm('Create New User')} className={`w-5/12 h-24 flex flex-col justify-center items-center border cursor-pointer ${formType === 'Create New User' ? 'bg-black border-white text-white' : 'border-darkGray/50 text-darkGray/50'}`}>
                        CREATE NEW USER
                        <div className='text-sm mt-2 text-center'>Create account directly from the dashboard.</div>
                    </label>
                </div>
                <DialogContent>
                    {
                        formType === 'Invite User' ? inviteFormContentJSX() : null
                    }
                    {
                        formType === 'Create New User' ? createFormContentJSX() : null
                    }
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={showCreds}
                        onClose={handleClose}
                        closeAfterTransition
                        // slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={open}>
                            <div className='absolute top-[50%] left-[50%] md:w-[50%] xl:w-[35%] h-[250px] overflow-auto backdrop-blur-sm bg-white p-4 border-white border rounded-xl' style={{ transform: 'translate(-50%, -50%)' }}>
                                <div>
                                    <div className='w-full text-[20px]'>USER CREDENTIALS</div>
                                    <img onClick={() => handleCopyToClipboard(userData)} className='cursor-pointer w-[30px] h-[30px] float-end -mt-[35px]' src={'./assets/images/copy.png'} alt="icon" />
                                </div>
                                <div className='m-[25px]'>
                                    <div className='text-[16px]'>
                                        <span className='max-w-[120px]'>Email:</span>
                                        <span className='ml-4'>{userData?.username}</span>
                                    </div>
                                    <div className='text-[16px]'>
                                        <span className='max-w-[120px]'>Password:</span>
                                        <span className='ml-4'>{userData?.password}</span>
                                    </div>
                                    <div onClick={handleClose} className='mt-[60px] cursor-pointer text-primary '>
                                        CLOSE
                                    </div>
                                </div>
                                {/* <div className='w-full flex justify-center items-center mt-4'>
                                    <div onClick={handleClose} className='w-[200px] h-[50px] cursor-pointer flex justify-center items-center bg-primary text-white'>
                                        CLOSE
                                    </div>
                                </div> */}
                            </div>
                        </Fade>
                    </Modal>
                </DialogContent>
                <DialogActions>
                    <div className='w-full flex justify-between'>
                        <Button onClick={handleClose}>CANCEL</Button>
                        <Button onClick={handleSubmit}>{formType === 'Invite User' ? 'INVITE' : 'CREATE'}</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
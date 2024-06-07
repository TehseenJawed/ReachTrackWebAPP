import { acceptInvitation } from '../../redux/actions/trackActions';
import InputField from 'components/inputField';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import { validPassword } from 'utils/RegixUtils';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const AcceptInvitation = () => {
    const [userData, setUserData] = useState<any>({
        first_name: "",
        last_name: "",
        phone: "",
        password: "",
    })
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [searchParams] = useSearchParams()
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClose = () => {
        navigate('/login')
    }

    const handleSubmit = () => {
        //@ts-ignore
        if (!validPassword.test(userData?.password)) {
            enqueueSnackbar('Password must be 8 characters. It should have atleast 1 number', { variant: 'error' })
            setError(true)
            return
        }
        if (userData?.first_name && userData?.last_name && userData?.password) {
            const showCard = () => {
                setOpen(true);
                setTimeout(() => {
                    handleClose()
                })
            }
            //@ts-ignore
            dispatch(acceptInvitation(userData, `token=${searchParams.get('token')}&refer_to=${searchParams.get('refer_to')}`, (message, variant) => enqueueSnackbar(message, { variant: variant }), showCard))
        } else {
            setError(true)
        }
    }
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                closeAfterTransition
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <div className='absolute top-[50%] left-[50%] md:w-[50%] xl:w-[35%] h-[250px] overflow-auto backdrop-blur-sm bg-white p-4 border-white border rounded-xl' style={{ transform: 'translate(-50%, -50%)' }}>
                        <div>
                            <div className='w-full text-[20px]'>YOUR ACCOUNT HAS ACTIVATED</div>
                        </div>
                        <div className='m-[25px]'>
                            <div className='text-[16px]'>
                                <span className='max-w-[120px]'>Thank you so much to activate your account. You will be redirected to the login screen</span>
                            </div>
                            <div className='text-[30px] mt-6'>
                                Redirecting to the Login Screen...
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>

            <div className='p-8 shadow-lg'>
                <div className='w-full text-center mb-4 font-bold text-[20px]'>Activate Your Account</div>
                <InputField className="w-full mt-4" fieldClassName="w-full" error={error ? userData?.first_name === "" : false} label={"FIRST NAME*"} placeholder={"first name"} value={userData?.first_name} setChange={(e) => setUserData({ ...userData, first_name: e?.target?.value })} />
                <InputField className="w-full mt-4" fieldClassName="w-full" error={error ? userData?.last_name === "" : false} label={"LAST NAME*"} placeholder={"last name"} value={userData?.last_name} setChange={(e) => setUserData({ ...userData, last_name: e?.target?.value })} />
                <InputField className="w-full mt-4" type='phone' fieldClassName="w-full" error={error ? userData?.phone === "" : false} label={"PHONE"} placeholder={"0000000000"} value={userData?.phone} setChange={(e) => setUserData({ ...userData, phone: e?.target?.value })} />
                <InputField className="w-full mt-4" type="password" fieldClassName="w-full" error={error ? userData?.password === "" : false} label={"PASSWORD*"} placeholder={"*****"} value={userData?.password} setChange={(e) => setUserData({ ...userData, password: e?.target?.value })} />
                <div className='w-full flex justify-center items-center mt-4'>
                    <div onClick={handleSubmit} className='w-[250px] h-[50px] cursor-pointer flex justify-center items-center bg-black text-white'>Activate Account</div>
                </div>
            </div>
        </div>
    )
}

export default AcceptInvitation
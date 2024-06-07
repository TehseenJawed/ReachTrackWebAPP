import React, { useEffect, useState } from 'react'
import { SVGLoaderWhite, ImportBlueSVG, CreateBlueSVG } from 'assets/svg_icons';
import InputField from 'components/inputField';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../redux/reducers/authReducer';
import { updateUser, changePassword } from '../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import Gavatar from 'components/gavatar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ChangePasswordSchema } from 'apis/validationSchema';
import { Button } from '@mui/material'
import { screenTitles } from 'utils/helpers';

const Profile = () => {
    const [userData, setUserData] = useState<any>();
    const [hidePassword, setHidePassword] = useState('')
    const [error, setError] = useState<boolean>(false);
    const [currentScreen, setCurrentScreen] = useState<string>("ShowProfile");
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const userInfo: any = useSelector(USER);
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmitUpdateProfile = () => {
        const newObj = {
            ...(userData?.first_name !== userInfo?.first_name && { first_name: userData?.first_name }),
            ...(userData?.last_name !== userInfo?.last_name && { last_name: userData?.last_name }),
            ...(userData?.phone !== userInfo?.phone && { phone: userData?.phone }),
            ...(userData?.city !== userInfo?.city && { city: userData?.city }),
            ...(userData?.address !== userInfo?.address && { address: userData?.address }),
            ...(userData?.country !== userInfo?.country && { country: userData?.country }),
        };
        //@ts-ignore
        dispatch(updateUser(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant })));
        setCurrentScreen("ShowProfile")
    }

    const handleSubmitChangePassword = () => {
        const newObj = {
            ...(userData?.first_name !== userInfo?.first_name && { first_name: userData?.first_name }),
            ...(userData?.last_name !== userInfo?.last_name && { last_name: userData?.last_name }),
            ...(userData?.phone !== userInfo?.phone && { phone: userData?.phone }),
            ...(userData?.city !== userInfo?.city && { city: userData?.city }),
            ...(userData?.address !== userInfo?.address && { address: userData?.address }),
            ...(userData?.country !== userInfo?.country && { country: userData?.country }),
        };
        //@ts-ignore
        dispatch(updateUser(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant })));
        setCurrentScreen("ShowProfile")
    }

    useEffect(() => {
        document.title = screenTitles.profile
        setUserData(userInfo);
    }, []);
    return (
        <div className='w-[100%] px-2 flex flex-col items-center mb-4'>
            <div className='flex justify-between w-full m-4'>
                <div className='flex justify-center items-center'></div>

                <div className='flex justify-center items-center'>
                    <div onClick={() => setCurrentScreen("UpdateProfile")} className='flex justify-between items-center border-black border-2 rounded-xl py-2 px-6 bg-black mx-2 cursor-pointer'>
                        <ImportBlueSVG style={{ color: 'red' }} />
                        <div className='text-white ml-4 font-bold'>Update Profile</div>
                    </div>
                    <div onClick={() => setCurrentScreen("ChangePassword")} className='flex justify-between items-center border-black border-2 rounded-xl py-2 px-6 bg-black mx-2 cursor-pointer'>
                        <CreateBlueSVG style={{ color: 'red' }} />
                        <div className='text-white ml-4 font-bold'>Change Password</div>
                    </div>
                </div>
            </div>

            {
                currentScreen === "ShowProfile" ? (
                    <div className='w-full'>
                        <div className='w-3/6'>
                            <div className='w-full flex justify-start items-center mb-4'>
                                <Gavatar username="Tehseen Jawed" />
                                <div className='ml-4'>{userInfo?.first_name} {userInfo?.last_name}</div>
                            </div>
                            <div className='w-full flex justify-start items-center p-3 border-b border-b-black/20'>
                                <div className='font-bold'>First Name:</div>
                                <div className='ml-4'>{userInfo?.first_name || 'N/A'} </div>
                            </div>
                            <div className='w-full flex justify-start items-center p-3 border-b border-b-black/20'>
                                <div className='font-bold'>Last Name:</div>
                                <div className='ml-4'>{userInfo?.last_name || 'N/A'} </div>
                            </div>
                            <div className='w-full flex justify-start items-center p-3 border-b border-b-black/20'>
                                <div className='font-bold'>Email:</div>
                                <div className='ml-4'>{userInfo?.user_name || 'N/A'} </div>
                            </div>
                            <div className='w-full flex justify-start items-center p-3 border-b border-b-black/20'>
                                <div className='font-bold'>Phone:</div>
                                <div className='ml-4'>{userInfo?.phone || 'N/A'} </div>
                            </div>
                            <div className='w-full flex justify-start items-center p-3 border-b border-b-black/20'>
                                <div className='font-bold'>Role:</div>
                                <div className='ml-4'>{userInfo?.role?.name || 'N/A'} </div>
                            </div>
                            <div className='w-full flex justify-start items-center p-3 border-b border-b-black/20'>
                                <div className='font-bold'>Status:</div>
                                <div className='ml-4'>{userInfo?.status || 'N/A'} </div>
                            </div>
                            <div className='w-full flex justify-start items-center p-3 border-b border-b-black/20'>
                                <div className='font-bold'>Group:</div>
                                <div className='ml-4'>{userInfo?.group || 'Main'} </div>
                            </div>
                            <div className='w-full flex justify-start items-center p-3 border-b border-b-black/20'>
                                <div className='font-bold'>Designation:</div>
                                <div className='ml-4'>{userInfo?.designation || 'N/A'} </div>
                            </div>
                            <div className='w-full flex justify-start items-center p-3 border-b border-b-black/20'>
                                <div className='font-bold'>Organization:</div>
                                <div className='ml-4'>{userInfo?.organization?.name || 'N/A'} </div>
                            </div>
                            <div className='w-full flex justify-start items-center p-3 border-b border-b-black/20'>
                                <div className='font-bold'>Created Time:</div>
                                <div className='ml-4'>{userInfo?.created_at || 'N/A'} </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }

            {
                currentScreen === "ChangePassword" ? (
                    <div className='w-full'>
                        <div className='w-3/6'>
                            <Formik
                                initialValues={{}}
                                validationSchema={ChangePasswordSchema}
                                onSubmit={(values:any, { setSubmitting }) => {
                                    console.log('setSubmit.......',values);
                                    if(values.new_password === values.new_password2) {
                                        const newObj = {
                                            old_password: values.old_password,
                                            new_password: values.new_password,
                                        }
                                        // @ts-ignore
                                        dispatch(changePassword(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant }), () => navigate('/dashboard', { replace: false })))
                                        setCurrentScreen("ShowProfile");
                                    } else {
                                        enqueueSnackbar("Please new password's do not match.", { variant: 'error' })
                                    }
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form className='w-full flex flex-col'>
                                        <div className='w-full mt-3'>
                                            <div className='w-full bg-white flex justify-between items-center pr-2 mb-2'>
                                                <Field type={hidePassword !== 'old' ? "password" : "text"} name="old_password" placeholder={"Enter Old Password"} className="w-11/12 p-3 bg-white rounded-md" />
                                                <img onClick={() => setHidePassword('old')} className={`w-[20px] cursor-pointer opacity-50 ${hidePassword !== 'old' ? '' : 'hidden'}`} src="./assets/hide.png" alt="" />
                                                <img onClick={() => setHidePassword('')} className={`w-[20px] cursor-pointer opacity-50 ${hidePassword === 'old' ? '' : 'hidden'}`} src="./assets/show.png" alt="" />
                                            </div>
                                            <ErrorMessage name="old_password">
                                                {(msg) => <div style={{ color: "red", textAlign: "left", fontSize: 12, marginLeft: 10 }}>{msg}</div>}
                                            </ErrorMessage>
                                            <div className='w-full bg-white flex justify-between items-center pr-2 mb-2'>
                                                <Field type={hidePassword !== 'new' ? "password" : "text"} name="new_password" placeholder={"Enter New Password"} className="w-11/12 p-3 bg-white rounded-md" />
                                                <img onClick={() => setHidePassword('new')} className={`w-[20px] cursor-pointer opacity-50 ${hidePassword !== 'new' ? '' : 'hidden'}`} src="./assets/hide.png" alt="" />
                                                <img onClick={() => setHidePassword('')} className={`w-[20px] cursor-pointer opacity-50 ${hidePassword === 'new' ? '' : 'hidden'}`} src="./assets/show.png" alt="" />
                                            </div>
                                            <ErrorMessage name="new_password">
                                                {(msg) => <div style={{ color: "red", textAlign: "left", fontSize: 12, marginLeft: 10 }}>{msg}</div>}
                                            </ErrorMessage>
                                            <div className='w-full bg-white flex justify-between items-center pr-2 mb-2'>
                                                <Field type={hidePassword !== 're-enter new' ? "password" : "text"} name="new_password2" placeholder={"Re-enter New Password"} className="w-11/12 p-3 bg-white rounded-md" />
                                                <img onClick={() => setHidePassword('re-enter new')} className={`w-[20px] cursor-pointer opacity-50 ${hidePassword !== 're-enter new' ? '' : 'hidden'}`} src="./assets/hide.png" alt="" />
                                                <img onClick={() => setHidePassword('')} className={`w-[20px] cursor-pointer opacity-50 ${hidePassword === 're-enter new' ? '' : 'hidden'}`} src="./assets/show.png" alt="" />
                                            </div>
                                            <ErrorMessage name="new_password2">
                                                {(msg) => <div style={{ color: "red", textAlign: "left", fontSize: 12, marginLeft: 10 }}>{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        <div className='mt-4 w-full flex justify-center items-center'>
                                            {
                                                !loader ? (
                                                    <button type='submit' style={{ color: '#fff' }} className='mt-6 bg-black w-[200px] h-9 rounded-xl flex justify-center items-center text-center text-white text-md font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                                                        CHANGE PASSWORD
                                                    </button>
                                                ) : (
                                                    <div className='w-11/12 mt-2 h-12 bg-blue-extralight flex justify-center items-center'>
                                                        <div className='w-8'><SVGLoaderWhite /></div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                ) : null
            }

            {
                currentScreen === "UpdateProfile" ? (
                    <div className='w-full'>
                        <div className='w-3/6'>
                            <InputField className="w-full mt-4" fieldClassName="w-full" error={error ? userData?.first_name === "" : false} label={"FIRST NAME"} placeholder={"First Name"} value={userData?.first_name} setChange={(e) => setUserData({ ...userData, first_name: e?.target?.value })} />
                            <InputField className="w-full mt-4" fieldClassName="w-full" error={error ? userData?.last_name === "" : false} label={"LAST NAME"} placeholder={"Last Name"} value={userData?.last_name} setChange={(e) => setUserData({ ...userData, last_name: e?.target?.value })} />
                            <InputField className="w-full mt-4" fieldClassName="w-full" error={error ? userData?.phone === "" : false} label={"PHONE"} placeholder={"Phone"} value={userData?.phone} setChange={(e) => setUserData({ ...userData, phone: e?.target?.value })} />
                            <InputField className="w-full mt-4" fieldClassName="w-full" error={error ? userData?.city === "" : false} label={"CITY"} placeholder={"City"} value={userData?.city} setChange={(e) => setUserData({ ...userData, city: e?.target?.value })} />
                            <InputField className="w-full mt-4" fieldClassName="w-full" error={error ? userData?.address === "" : false} label={"ADDRESS"} placeholder={"Address"} value={userData?.address} setChange={(e) => setUserData({ ...userData, address: e?.target?.value })} />
                            <InputField className="w-full mt-4" fieldClassName="w-full" error={error ? userData?.country === "" : false} label={"COUNTRY"} placeholder={"Country"} value={userData?.country} setChange={(e) => setUserData({ ...userData, country: e?.target?.value })} />
                            <div className='w-full flex justify-center items-center'>
                                <div onClick={handleSubmitUpdateProfile} className='mt-6 bg-black w-[150px] h-9 rounded-xl flex justify-center items-center text-center text-white text-md font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                                    UPDATE USER
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }


        </div>
    )
}

export default Profile
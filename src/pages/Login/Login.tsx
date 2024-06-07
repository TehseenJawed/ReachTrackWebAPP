import React, { useState, useEffect } from 'react'
import { Button, InputAdornment } from '@mui/material'
import { useSnackbar } from 'notistack';
import { BrandBigSVGLogo, SVGLoaderWhite } from 'assets/svg_icons'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoginSchema } from 'apis/validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { LOADING, USER } from '../../redux/reducers/authReducer'
import { screenTitles } from 'utils/helpers';

const LoginScreen = () => {
    const [loader, setLoader] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading: any = useSelector(LOADING)
    const user: any = useSelector(USER)
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (user.user_id) {
            navigate('/dashboard', { replace: false })
        }
        document.title = screenTitles?.login
    }, [])
    return (
        <div style={{ backgroundImage: "url('/assets/images/mapImage.png')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className={`w-full h-screen bg-primary z-0 `}>
            <div className='w-full h-full backdrop-blur-md bg-white/30 flex justify-between items-center'>
                <div className='backdrop-blur-md bg-white/60 border-3 border-white pt-14 shadow-2xl pb-14 w-3/12 p-4 rounded-2xl flex flex-col justify-center items-center h-full'>
                    <div className='w-full flex flex-col items-center'>
                        <div className='mb-12 text-primary text-4xl font-bold'>
                            LOGIN
                            {/* <BrandSVGSmallIcon /> */}
                        </div>
                        <Formik
                            initialValues={{  }}
                            validationSchema={LoginSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                // @ts-ignore
                                dispatch(loginAction(values, setSubmitting, (message, variant) => enqueueSnackbar(message, { variant: variant }), () => navigate('/dashboard', { replace: false })))

                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className='w-full flex flex-col'>
                                    <div className='w-full'>
                                        {/* <label className='text-sm mb-2 text-darkGray'>Username:</label> */}
                                        <Field type="email" name="email" placeholder={"Enter email address"} className="w-full p-3 bg-white rounded-md" />
                                        <ErrorMessage name="email">
                                            {(msg) => <div style={{ color: "red", textAlign: "left", fontSize: 12, marginLeft: 10 }}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className='w-full mt-3'>
                                        {/* <label className='text-sm mb-2 text-darkGray'>Password:</label> */}
                                        <div className='w-full bg-white flex justify-between items-center pr-2'>
                                            <Field type={hidePassword ? "password" : "text"} name="password" placeholder={"Enter password"} className="w-11/12 p-3 bg-white rounded-md" />
                                            <img onClick={() => setHidePassword(false)} className={`w-[20px] cursor-pointer opacity-50 ${hidePassword ? '' : 'hidden'}`} src="./assets/hide.png" alt="" />
                                            <img onClick={() => setHidePassword(true)} className={`w-[20px] cursor-pointer opacity-50 ${!hidePassword ? '' : 'hidden'}`} src="./assets/show.png" alt="" />
                                        </div>
                                        <ErrorMessage name="password">
                                            {(msg) => <div style={{ color: "red", textAlign: "left", fontSize: 12, marginLeft: 10 }}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className='mt-4 w-full flex justify-center items-center'>
                                        {
                                            !loading ? (
                                                <Button type='submit' style={{ color: '#fff' }} size="large" className='w-full h-12 font-bold !bg-blue-extralight'>
                                                    Login
                                                </Button>
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
                        <div className='mt-2'>Forgot password?</div>
                    </div>
                </div>

                <div className='w-9/12 flex justify-center'>
                    <BrandBigSVGLogo />
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
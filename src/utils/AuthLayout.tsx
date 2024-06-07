import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACCESSTOKEN, LIVENOTIFICATION, USER } from '../redux/reducers/authReducer'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import AlertComponent from 'components/alert';
import { getNotificationAction, updateAllLiveVehicleData, updateAnalyticAction, updateLiveVehicleData } from '../redux/actions/trackActions';
//@ts-ignore
import Sound from 'assets/sound/notification.mp3';
import SocketController from 'config/socket.controller';
import { triggerNotificationData } from '../redux/actions/authActions';
import { SELECTED_GEOFENCE, SELECTEDGROUP } from '../redux/reducers/trackReducer';


const { REACT_APP_SOCKET_URL } = process.env
const AuthLayout = ({ children }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const userData: any = useSelector(USER);
    const selectedGroup = useSelector(SELECTEDGROUP)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()
    const liveNotification = useSelector(LIVENOTIFICATION)
    const audio = new Audio(Sound);
    const [refresh, setRefresh] = useState(false)
    const [socketInstance, setSocketInstance] = useState(null)

    const accessTokenRedux = useSelector(ACCESSTOKEN)
    const selectedGeofence = useSelector(SELECTED_GEOFENCE)
    const access_token = localStorage.getItem("access_token")
    const accessToken = access_token || accessTokenRedux
    console.log('selectedGroup ', selectedGroup);

    useEffect(() => {
        if(selectedGroup?.id) {
            console.log('EMITTING ....',selectedGroup?.id,socketInstance);
            const newObj = {
                group_id: selectedGroup?.id
            }
            socketInstance?.emit("dashboard_data", JSON.stringify(newObj))
        }
    },[selectedGroup])
    useEffect(() => {
        if (accessToken) {
            const socket = SocketController.connect(`${REACT_APP_SOCKET_URL}/?token=${accessToken}`, { transports: ['websocket'], autoConnect: true, query: "name=my_img_name" })
            setSocketInstance(socket)
            socket.on("dashboard_data", (data) => {
                const parsedData = JSON.parse(data)
                console.log('DAshboard Running again', parsedData);
                dispatch(updateAnalyticAction(parsedData?.summary))
                dispatch(updateLiveVehicleData(parsedData?.data))
                dispatch(updateAllLiveVehicleData(parsedData?.data))
            })
            // socket?.emit("dashboard_data", `group_id=${selectedGroup?.id}`) 
            socket.on("notification", (data) => {
                audio.play();
                const notificationData = {
                    ...JSON.parse(data),
                    id: new Date().getTime()
                };
                if (notificationData) {
                    //@ts-ignore
                    dispatch(getNotificationAction((message, variant) => enqueueSnackbar(message, { variant: variant })))
                    const newArray = [
                        ...liveNotification,
                        notificationData,
                    ]
                    dispatch(triggerNotificationData(newArray))
                    setTimeout(() => {
                        const fetchNotification = newArray.filter((v) => v.id !== notificationData?.id)
                        dispatch(triggerNotificationData(fetchNotification))
                    }, 10000)
                }
            })
            return () => {
                socket.disconnect()
                console.log('DISCONNECTED');
            }
        } else {
            setRefresh(!refresh)
        }
        return () => {
            socketInstance.disconnect()
            console.log('Socket is disconnected');
            
        }
    }, [refresh])

    useEffect(() => {
        if (userData?.user_id) {
            // @ts-ignore
            enqueueSnackbar("Already loggedin", { variant: "success" })
            navigate('/dashboard', { replace: true })
        } else {
            if (pathname !== '/login') {
                // @ts-ignore
                enqueueSnackbar("Session expired. Please login again.", { variant: "error" })
                navigate('/login', { replace: true })
            }
        }
    }, [])
    return (
        <div>
            <div style={{ zIndex: 10000 }} className='z-100 absolute right-[10px]'>
                {
                    liveNotification?.map((v, i) => <AlertComponent index={i} value={v} />)
                }
            </div>
            {children}
        </div>
    )
}

export default AuthLayout
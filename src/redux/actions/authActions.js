import * as actionTypes from "../types/actionTypes.js";
import axios from 'axios';
import { api } from '../../config/axiosIntance.jsx'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const changeLoader = (payload) => {
  return {
    type: actionTypes.UPDATELOADER,
    payload,
  };
};

export const expandMenu = (payload) => {
  return {
    type: actionTypes.UPDATEMENU,
    payload,
  };
};

export const expandSearchFunction = (payload) => {
  return {
    type: actionTypes.UPDATESEARCHBOX,
    payload,
  };
};

export const updateAccessToken = (payload) => {
  return {
    type: actionTypes.UPDATEACCESSTOKEN,
    payload,
  };
};

export const updateUserData = (payload) => {
  return {
    type: actionTypes.UPDATEUSERDATA,
    payload,
  };
};

export const updateOrganization = (payload) => {
  return {
    type: actionTypes.UPDATEORGANIZATION,
    payload,
  };
};

export const clearAuthRedux = (payload) => {
  console.log('Clearrrred');
  return {
    type: actionTypes.RESETAUTHREDUCER,
    payload,
  };
};

export const clearTrackRedux = (payload) => {
  return {
    type: actionTypes.RESETTRACKREDUCER,
    payload,
  };
};

export const triggerNotificationData = (payload) => {
  return {
    type: actionTypes.UPDATENOTIFICATIONDATA,
    payload,
  };
};

export const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export const formatDate = (dateProp) => {
  const date = new Date(dateProp);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Function to get the ordinal suffix for the day
  function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  const ordinalSuffix = getOrdinalSuffix(day);

  return `${day}${ordinalSuffix} ${month}, ${year}`;
}

export const exportExcel = (data, sheetName) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  // Buffer to store the generated Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(blob, sheetName);
};

export const loginAction = (data, setSubmitting, triggerStack, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(changeLoader(true))
      setSubmitting(true)
      const formData = new FormData()
      formData.append('username', data.email)
      formData.append('password', data.password)
      const loginResponse = await api.post(`https://fleet.rtss.com.pk/api/v1/login`, formData)
      localStorage.removeItem("access_token")
      const accessToken = loginResponse?.data?.access_token || "";
      if (accessToken) {
        const userResponse = await api.get(`user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        dispatch(updateAccessToken(accessToken))
        dispatch(updateUserData(userResponse?.data?.data?.user))
        dispatch(updateOrganization(userResponse?.data?.data?.organization))
        localStorage.setItem("access_token", accessToken)
        navigate()
        dispatch(changeLoader(false))
      }
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err.response.data.detail, "error")
      dispatch(changeLoader(false))
    }
  };
};

export const logoutAction = (triggerStack, navigate) => {
  return async (dispatch) => {
    try {
      await api.get(`/logout`)
      localStorage.removeItem("access_token")
      dispatch(clearAuthRedux({}))
      dispatch(clearTrackRedux({}))
      triggerStack('Logged Out.');
      navigate()
    } catch (err) {
      console.log('ERROR...', err);
      // triggerStack(err.response.data.detail, "error")
    }
  };
};

export const getUserData = () => {
  return async (dispatch, state) => {
    try {
      const userResponse = await api.get(`user`, {
        headers: {
          Authorization: `Bearer ${state().auth?.accessToken}`
        }
      })
      dispatch(updateUserData(userResponse?.data?.data?.user))
    } catch (err) {
      console.log('ERROR...', err);
    }
  }
};
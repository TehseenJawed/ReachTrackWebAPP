import * as actionTypes from "../types/actionTypes.js";
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { api } from '../../config/axiosIntance.jsx'
import { getUserData } from "./authActions.js";

export const updateLocationAction = (payload) => {
  return {
    type: actionTypes.UPDATELOCATION,
    payload,
  };
};

export const updateVehiclesData = (payload) => {
  return {
    type: actionTypes.UPDATEDVEHICLES,
    payload,
  };
};

export const updateGeofenceData = (payload) => {
  return {
    type: actionTypes.UPDATEDGEOFENCE,
    payload,
  };
};

export const updateGeofenceAreaData = (payload) => {
  return {
    type: actionTypes.UPDATEDGEOFENCEAREA,
    payload,
  };
};

export const updateLiveVehicleData = (payload) => {
  return {
    type: actionTypes.UPDATELIVEVEHICLE,
    payload,
  };
};

export const updateSelectedGroup = (payload) => {
  return {
    type: actionTypes.UPDATESELECTEDGROUP,
    payload,
  };
};

export const updateAllLiveVehicleData = (payload) => {
  return {
    type: actionTypes.UPDATELIVEVEHICLES,
    payload,
  };
};

export const updateFuelGroups = (payload) => {
  return {
    type: actionTypes.UPDATEFUELGROUPS,
    payload,
  };
};

export const updateGroupVehicles = (payload) => {
  return {
    type: actionTypes.UPDATEGROUPVEHICLES,
    payload,
  };
};

export const updateTrackerData = (payload) => {
  return {
    type: actionTypes.UPDATETRACKER,
    payload,
  };
};

export const updateDriverData = (payload) => {
  return {
    type: actionTypes.UPDATEDRIVER,
    payload,
  };
};

export const updateOilChange = (payload) => {
  return {
    type: actionTypes.UPDATEOILCHANGE,
    payload,
  };
};

export const updateTireChange = (payload) => {
  return {
    type: actionTypes.UPDATETIRECHANGE,
    payload,
  };
};

export const updateOtherChange = (payload) => {
  return {
    type: actionTypes.UPDATEOTHERCHANGE,
    payload,
  };
};

export const updateFuelRange = (payload) => {
  return {
    type: actionTypes.UPDATE_FUELRANGE,
    payload,
  };
};

export const updateAnalyticAction = (payload) => {
  return {
    type: actionTypes.UPDATEANALYTIC,
    payload,
  };
};

export const updateGeofenceRouteData = (payload) => {
  return {
    type: actionTypes.UPDATEDGEOFENCEROUTECREATE,
    payload,
  };
};

export const expandNotificationAction = (payload) => {
  return {
    type: actionTypes.EXPANDNOTIFICATION,
    payload,
  };
};

export const updateNotification = (payload) => {
  return {
    type: actionTypes.UPDATENOTIFICATIONS,
    payload,
  };
};

export const updatePermissionsData = (payload) => {
  return {
    type: actionTypes.UPDATEPERMISSIONS,
    payload,
  };
};

export const updateOrganizationUsers = (payload) => {
  return {
    type: actionTypes.UPDATEORGANIZATIONUSERS,
    payload,
  };
};

export const updateSelectedGroupVehicles = (payload) => {
  return {
    type: actionTypes.UPDATESELECTEDGEOFENCE,
    payload,
  };
};

export const updateRoles = (payload) => {
  return {
    type: actionTypes.UPDATEROLES,
    payload,
  };
};

export const updateSearchResults = (payload) => {
  return {
    type: actionTypes.UPDATESEARCHRESULT,
    payload,
  };
};

export const updateActiveTrackVehicle = (payload) => {
  return {
    type: actionTypes.UPDATEACTIVETRACKVEHICLE,
    payload,
  };
};

export const updateGlobalSearchQuery = (payload) => {
  return {
    type: actionTypes.UPDATEGLOBALSEARCHQUERY,
    payload,
  };
};

export const exportExcel = (data, sheetName) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  // Buffer to store the generated Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(blob, sheetName);
};

export const getVehicleAction = (triggerStack, accessToken, queryParams='') => {
  return async (dispatch, state) => {
    try {
      const getVehicleResponse = await api.get(`vehicles${queryParams}`, {
        headers: {
          Authorization: `Bearer ${accessToken || state().auth.accessToken}`
        }
      })
      dispatch(updateVehiclesData(getVehicleResponse?.data?.data))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const getAnalyticsAction = (triggerStack, accessToken) => {
  return async (dispatch, state) => {
    try {
      const getAnalyticResponse = await api.get(`vehicles/summary/`, {
        headers: {
          Authorization: `Bearer ${accessToken || state().auth.accessToken}`
        }
      })
      dispatch(updateAnalyticAction(getAnalyticResponse?.data?.data))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const getNotificationAction = (triggerStack, accessToken) => {
  return async (dispatch, state) => {
    try {
      const getNotifications = await api.get(`notifications?skip=0&limit=15`, {
        headers: {
          Authorization: `Bearer ${accessToken || state().auth.accessToken}`
        }
      })
      dispatch(updateNotification(getNotifications?.data?.data))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const updateNotificationAction = (data, triggerStack, id) => {
  return async (dispatch, state) => {
    try {
      await api.put(`notifications/${id}`, data)
      triggerStack("Notification marked as read.", "success")
      dispatch(getNotificationAction(triggerStack))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const deleteVehicle = (id, triggerStack) => {
  return async (dispatch, state) => {
    try {
      const deleteGroup = await api.delete(`vehicles/${id}`)
      triggerStack("Vehicle deleted successfully", "success")
      dispatch(getVehicleAction(triggerStack, state().auth.accessToken))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const getGeofenceAction = (triggerStack, accessToken = null) => {
  return async (dispatch, state) => {
    try {
      const getGeofenceResponse = await api.get(`group`, {
        headers: {
          Authorization: `Bearer ${accessToken || state().auth.accessToken}`
        }
      })
      dispatch(updateGeofenceData(getGeofenceResponse?.data?.data))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const getGeofenceAreaAction = (triggerStack, accessToken = null, params='') => {
  return async (dispatch, state) => {
    try {
      const getGeofenceResponse = await api.get(`geofence/area/list${params}`, {
        headers: {
          Authorization: `Bearer ${accessToken || state().auth.accessToken}`
        }
      })
      dispatch(updateGeofenceAreaData(getGeofenceResponse?.data?.data))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const getGeofenceRouteAction = (triggerStack, accessToken = null, params='') => {
  return async (dispatch, state) => {
    try {
      const getGeofenceResponse = await api.get(`geofence/route/list${params}`, {
        headers: {
          Authorization: `Bearer ${accessToken || state().auth.accessToken}`
        }
      })
      dispatch(updateGeofenceRouteData(getGeofenceResponse?.data?.data))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const getVehicleByGroups = (groupId) => {
  return async (dispatch, state) => {
    try {
      const getGroupVehicleResponse = await api.get(`vehicles/group/${groupId}`, {
        headers: {
          Authorization: `Bearer ${state().auth.accessToken}`
        }
      })
      console.log('RESPONSE DATA>.....', getGroupVehicleResponse?.data?.data);
      dispatch(updateGroupVehicles(getGroupVehicleResponse?.data?.data))
    } catch (err) {
      console.log(err?.response?.data?.detail)
      // triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const getInitialData = (triggerStack, accessToken) => {
  return async (dispatch) => {
    try {
      dispatch(getVehicleAction(triggerStack, accessToken))
      dispatch(getGeofenceAction(triggerStack, accessToken))
      dispatch(getFuelGroups(triggerStack, accessToken))
      dispatch(getTrackData(triggerStack, accessToken))
      dispatch(getDriverData(triggerStack, accessToken))
      // dispatch(getAnalyticsAction(triggerStack, accessToken))
      dispatch(getGeofenceAreaAction(triggerStack, accessToken))
      dispatch(getGeofenceRouteAction(triggerStack, accessToken))
      dispatch(getNotificationAction(triggerStack, accessToken))
      dispatch(getPermissions(triggerStack, accessToken))
      dispatch(getOrganizationUsers(triggerStack, accessToken))
      setTimeout(() => {
        dispatch(getRoles(triggerStack, accessToken))
      },[2000])
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const getFuelGroups = (triggerStack, accessToken) => {
  return async (dispatch, state) => {
    try {
      const fuelGroupResponse = await api.get(`fuelgroup`, {
        headers: {
          Authorization: `Bearer ${state().auth?.accessToken || accessToken}`
        }
      })
      dispatch(updateFuelGroups(fuelGroupResponse?.data?.data))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const getDriverData = (triggerStack, accessToken, queryparams='') => {
  return async (dispatch, state) => {
    try {
      const getTrackData = await api.get(`drivers${queryparams}`, {
        headers: {
          Authorization: `Bearer ${state().auth?.accessToken || accessToken}`
        }
      })
      dispatch(updateDriverData(getTrackData?.data?.data))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const getTrackData = (triggerStack, accessToken) => {
  return async (dispatch, state) => {
    try {
      const getTrackData = await api.get(`tracker`, {
        headers: {
          Authorization: `Bearer ${state().auth?.accessToken || accessToken}`
        }
      })
      dispatch(updateTrackerData(getTrackData?.data?.data))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const getOilMaintenance = (triggerStack, id) => {
  return async (dispatch, state) => {
    try {
      const getOilChange = await api.get(`maintenance/oil-change/vehicle/${id}`)
      dispatch(updateOilChange(getOilChange?.data?.data))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const getTireMaintenance = (triggerStack, id) => {
  return async (dispatch, state) => {
    try {
      const getTireChange = await api.get(`maintenance/tyre-change/vehicle/${id}`)
      dispatch(updateTireChange(getTireChange?.data?.data))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const getOtherMaintenance = (triggerStack, id) => {
  return async (dispatch, state) => {
    try {
      const getOtherChange = await api.get(`maintenance/other/vehicle/${id}`)
      dispatch(updateOtherChange(getOtherChange?.data?.data))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};


export const getMaintenanceData = (triggerStack, id) => {
  return async (dispatch, state) => {
    try {
      console.log('I am working....');
      dispatch(getOilMaintenance(triggerStack, id))
      dispatch(getTireMaintenance(triggerStack, id))
      dispatch(getOtherMaintenance(triggerStack, id))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const getFuelRangeData = (triggerStack, id) => {
  return async (dispatch, state) => {
    try {
      const fuelRange = await api.get(`fuelrange?fuel_group_id=${id}`)
      dispatch(updateFuelRange(fuelRange?.data?.data))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const createGroup = (data, triggerStack) => {
  return async (dispatch, state) => {
    try {
      console.log('INSIDE createGroup', data);
      const groupResponse = await api.post(`group`, data)
      triggerStack("Group created successfully", "success")
      dispatch(getGeofenceAction(triggerStack))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const createOilMaintenance = (data, triggerStack) => {
  return async (dispatch, state) => {
    try {
      await api.post(`maintenance/oil-change`, data)
      triggerStack("Change Oil record is created", "success")
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const createTyreMaintenance = (data, triggerStack) => {
  return async (dispatch, state) => {
    try {
      await api.post(`maintenance/tyre-change`, data)
      triggerStack("Change Tyre record is created", "success")
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const createOtherMaintenance = (data, triggerStack) => {
  return async (dispatch, state) => {
    try {
      await api.post(`maintenance/other`, data)
      triggerStack("Other Maintenance record is created", "success")
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const createVehicle = (data, triggerStack) => {
  return async (dispatch, state) => {
    try {
      await api.post(`vehicles/`, data)
      triggerStack("Vehicle created successfully", "success")
      dispatch(getVehicleAction(triggerStack))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const createGeoFenceAction = (data, triggerStack) => {
  return async (dispatch, state) => {
    try {
      console.log('INSIDE createGroup', data);
      await api.post(`geofence/area/create`, data)
      triggerStack("eofence by Area is created successfully", "success")
      dispatch(getGeofenceAreaAction(triggerStack))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const createRouteFenceAction = (data, triggerStack) => {
  return async (dispatch, state) => {
    try {
      console.log('INSIDE createGroup', data);
      await api.post(`geofence/route/create`, data)
      triggerStack("Geofence by Area is created successfully", "success")
      dispatch(getGeofenceRouteAction(triggerStack))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const updateGeoFenceAction = (data, triggerStack, id) => {
  return async (dispatch, state) => {
    try {
      await api.put(`geofence/area/update/${id}`, data)
      triggerStack("Group updated successfully", "success")
      dispatch(getGeofenceAreaAction(triggerStack))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const updateRouteFenceAction = (data, triggerStack, id) => {
  return async (dispatch, state) => {
    try {
      await api.put(`geofence/area/update/${id}`, data)
      triggerStack("Group updated successfully", "success")
      dispatch(getGeofenceAreaAction(triggerStack))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const updateGroup = (data, triggerStack, groupId) => {
  return async (dispatch, state) => {
    try {
      await api.put(`group/${groupId}`, data)
      triggerStack("Group updated successfully", "success")
      dispatch(getGeofenceAction(triggerStack))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const updateVehicle = (data, triggerStack, vehicleId) => {
  return async (dispatch, state) => {
    try {
      await api.put(`vehicles/${vehicleId}`, data)
      triggerStack("Vehicle updated successfully", "success")
      dispatch(getVehicleAction(triggerStack, state().auth?.accessToken))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const deleteGroupAction = (id, triggerStack) => {
  return async (dispatch) => {
    try {
      await api.delete(`group/${id}`)
      triggerStack("Group deleted successfully", "success")
      dispatch(getGeofenceAction(triggerStack))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const deleteGeofenceArea = (id, triggerStack) => {
  return async (dispatch) => {
    try {
      await api.delete(`geofence/area/delete/${id}`)
      triggerStack("Geofence Area deleted successfully", "success")
      dispatch(getGeofenceAreaAction(triggerStack))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const deleteGeofenceRoute = (id, triggerStack) => {
  return async (dispatch) => {
    try {
      await api.delete(`geofence/route/delete/${id}`)
      triggerStack("Geofence Route deleted successfully", "success")
      dispatch(getGeofenceRouteAction(triggerStack))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const deleteFuelGroupAction = (id, triggerStack) => {
  return async (dispatch, state) => {
    try {
      await api.delete(`fuelgroup/${id}`)
      triggerStack("Group deleted successfully", "success")
      dispatch(getFuelGroups(triggerStack, state().auth.accessToken))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const deleteOtherMaintenance = (id, triggerStack, vehicleId) => {
  return async (dispatch) => {
    try {
      await api.delete(`maintenance/other/${id}`)
      triggerStack("Other Maintenance deleted successfully", "success")
      dispatch(getOtherMaintenance(triggerStack, vehicleId))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const deleteTyreMaintenance = (id, triggerStack, vehicleId) => {
  return async (dispatch) => {
    try {
      await api.delete(`maintenance/tyre-change/${id}`)
      triggerStack("Tyre Maintenanace deleted successfully", "success")
      getTireMaintenance(triggerStack, vehicleId)
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const deleteOilMaintenance = (id, triggerStack, vehicleId) => {
  return async (dispatch) => {
    try {
      await api.delete(`maintenance/oil-change/${id}`)
      triggerStack("Oil Change deleted successfully", "success")
      console.log('id, triggerStack, vehicleId ---',id, vehicleId)
      dispatch(getOilMaintenance(triggerStack, vehicleId))
    } catch (err) {
      console.log('err',err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const createFuelGroupAction = (data, triggerStack) => {
  return async (dispatch, state) => {
    try {
      const fuelGroupResponse = await api.post(`fuelgroup`, data)
      triggerStack(fuelGroupResponse?.data?.detail, "success")
      dispatch(getFuelGroups(triggerStack, state().auth?.accessToken))
    } catch (err) {
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const editFuelGroupAction = (data, triggerStack) => {
  return async (dispatch, state) => {
    try {
      const fuelGroupResponse = await api.put(`fuelgroup/${data?.id}`, data)
      triggerStack(fuelGroupResponse?.data?.detail, "success")
      dispatch(getFuelGroups(triggerStack, state().auth?.accessToken))
    } catch (err) {
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const createDriverAction = (data, triggerStack, handleClose) => {
  return async (dispatch, state) => {
    try {
      console.log('state   ', state().auth.accessToken);
      const driverResponse = await api.post(`drivers`, data)
      dispatch(getDriverData(triggerStack, state().auth?.accessToken))
      triggerStack(driverResponse?.data?.detail, "success")
      handleClose()
    } catch (err) {
      triggerStack(err?.response?.data?.detail, "error")
      console.log('ERROR...', err);
    }
  };
};

export const createFuelRange = (data, triggerStack) => {
  return async (dispatch, state) => {
    try {
      await api.post(`fuelrange`, data)
      dispatch(getFuelRangeData(triggerStack, data?.fuel_group_id))
      dispatch(getFuelGroups(triggerStack, state().auth?.accessToken))
      // triggerStack(driverResponse?.data?.detail, "success")
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const deleteFuelRangeAction = (id, groupId, triggerStack) => {
  return async (dispatch, state) => {
    try {
      await api.delete(`fuelrange/${id}?fuel_group_id=${groupId}`)
      triggerStack("FuelRange successfully", "success")
      dispatch(getFuelRangeData(triggerStack, groupId))
      dispatch(getFuelGroups(triggerStack, state().auth?.accessToken))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const handleEditFuelRangeAction = (data, triggerStack, fuelRangeId) => {
  return async (dispatch, state) => {
    try {
      await api.put(`fuelrange/${fuelRangeId}`, data)
      triggerStack("FuelRange updated successfully", "success")
      dispatch(getFuelRangeData(triggerStack, data?.fuel_group_id))
      dispatch(getFuelGroups(triggerStack, state().auth?.accessToken))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const updateDriver = (data, triggerStack, driverId) => {
  return async (dispatch, state) => {
    try {
      const driverResponse = await api.put(`drivers/${driverId}`, data)
      dispatch(getDriverData(triggerStack, state().auth?.accessToken))
      triggerStack(driverResponse?.data?.detail, "success")
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err.response.data.message, "error")
    }
  };
};

export const deleteDriverAction = (id, triggerStack) => {
  return async (dispatch, state) => {
    try {
      await api.delete(`drivers/${id}`)
      triggerStack("Driver deleted successfully", "success")
      dispatch(getDriverData(triggerStack, state().auth?.accessToken))
    } catch (err) {
      triggerStack(err.response.data.detail, "error")
    }
  };
};

export const getPermissions = (triggerStack, accessToken) => {
  return async (dispatch, state) => {
    try {
      const getTrackData = await api.get(`roles/${state().auth?.user?.role?.id}/permissions`, {
        headers: {
          Authorization: `Bearer ${state().auth?.accessToken || accessToken}`
        }
      })
      dispatch(updatePermissionsData(getTrackData?.data?.data))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const getRoles = (triggerStack, accessToken) => {
  return async (dispatch, state) => {
    try {
      const getRolesData = await api.get(`roles`, {
        headers: {
          Authorization: `Bearer ${state().auth?.accessToken || accessToken}`
        }
      })
      dispatch(updateRoles(getRolesData?.data?.data))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const getOrganizationUsers = (triggerStack, accessToken, queryParams="") => {
  return async (dispatch, state) => {
    try {
      const getTrackData = await api.get(`org/user/all${queryParams}`, {
        headers: {
          Authorization: `Bearer ${state().auth?.accessToken || accessToken}`
        }
      })
      dispatch(updateOrganizationUsers(getTrackData?.data?.data))
    } catch (err) {
      console.log('ERROR...', err);
      triggerStack(err?.detail, "error")
    }
  };
};

export const changePassword = (data, triggerStack) => {
  return async (dispatch, state) => {
    try {
      const changePassowrd = await api.patch(`user/password`, data)
      triggerStack(changePassowrd?.data?.detail, "success")
    } catch (err) {
      console.log('ERROR...', err?.response?.data?.detail);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const actionInviteUser = (data, triggerStack, handleClose) => {
  return async (dispatch, state) => {
    try {
      const response = await api.post(`invite-user`, data)
      triggerStack(response?.data?.detail, "success")
      dispatch(getOrganizationUsers(triggerStack, state().auth?.accessToken))
      handleClose()
    } catch (err) {
      console.log('ERROR...', err?.response);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const directUserRegister = (data, triggerStack, setShowCreds) => {
  return async (dispatch, state) => {
    try {
      const response = await api.post(`user`, data)
      triggerStack(response?.data?.detail, "success")
      dispatch(getOrganizationUsers(triggerStack, state().auth?.accessToken))
      setShowCreds(true)
    } catch (err) {
      console.log('ERROR...', err?.response?.data?.detail);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const acceptInvitation = (data, queryParams,triggerStack, handleClose) => {
  return async (dispatch, state) => {
    try {
      const response = await api.post(`invite-signup?${queryParams}`, data)
      triggerStack(response?.data?.detail, "success")
      handleClose()
    } catch (err) {
      console.log('ERROR...', err?.response?.data?.detail);
      triggerStack(err?.response?.data?.detail, "error")
      if(err?.response?.data?.detail === 'User status is not in Pending state.') {
        handleClose()
      }
    }
  };
};

export const reInviteUser = (data,triggerStack) => {
  return async (dispatch, state) => {
    try {
      const response = await api.post(`reinvite-user`, data)
      triggerStack(response?.data?.detail, "success")
    } catch (err) {
      console.log('ERROR...', err?.response?.data?.detail);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const updateOrganizationUser = (userId, data,triggerStack) => {
  return async (dispatch, state) => {
    try {
      const response = await api.put(`org/user/${userId}`, data)
      dispatch(getOrganizationUsers(triggerStack, state().auth?.accessToken))
      triggerStack(response?.data?.detail, "success")
    } catch (err) {
      console.log('ERROR...', err?.response?.data?.detail);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const updateUser = (data,triggerStack) => {
  return async (dispatch, state) => {
    try {
      const response = await api.put(`user`, data)
      triggerStack(response?.data?.detail, "success")
      dispatch(getUserData())
    } catch (err) {
      console.log('ERROR...', err?.response?.data?.detail);
      triggerStack(err?.response?.data?.detail, "error")
    }
  };
};

export const getGlobalSearch = (queryParams='') => {
  return async (dispatch, state) => {
    try {
      const getVehicleResponse = await api.get(`search${queryParams}`)
      dispatch(updateSearchResults(getVehicleResponse?.data?.data))
    } catch (err) {
      console.log(err.response.data.detail, "error")
    }
  };
};
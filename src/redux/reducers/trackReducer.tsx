import * as actionTypes from "../types/actionTypes.js";
import { TrackStateProps, ActionProps, ReduxStateProps } from "@/typecasts/index.js";

const initialState: TrackStateProps = {
  selectedGeofence: {},
  selectedLocation: {},
  expandnotification: false,
  vehicles: [],
  group: [],
  liveVehicles: [],
  allLiveVehicles: [],
  fuelGroups: [],
  groupVehicles: [],
  tracker: [],
  driver: [],
  oilChange: [],
  tireChange: [],
  otherChange: [],
  fuelRange: [],
  analytics: [],
  geofenceArea: [],
  geofenceRoute: [],
  notifications: [],
  permissions: [],
  orgUsers: [],
  roles: [],
  globalSearch: [],
  activeTrackVehicle: {},
  selectedGroup: {},
  globalSearchQuery: "",
}

export const SELECTED_GEOFENCE = (state: ReduxStateProps) => state?.track?.selectedGeofence;
export const SELECTED_LOCATION = (state: ReduxStateProps) => state?.track?.selectedLocation;
export const VEHICLES_DATA = (state: ReduxStateProps) => state?.track?.vehicles;
export const LIVE_VEHICLES_DATA = (state: ReduxStateProps) => state?.track?.liveVehicles;
export const ALL_LIVE_VEHICLES_DATA = (state: ReduxStateProps) => state?.track?.allLiveVehicles;
export const GROUP_DATA = (state: ReduxStateProps) => state?.track?.group;
export const FUEL_GROUPS = (state: ReduxStateProps) => state?.track?.fuelGroups;
export const GROUP_VEHICLES = (state: ReduxStateProps) => state?.track?.groupVehicles;
export const SELECTEDGROUP = (state: ReduxStateProps) => state?.track?.selectedGroup;
export const TRACKER = (state: ReduxStateProps) => state?.track?.tracker;
export const DRIVER_DATA = (state: ReduxStateProps) => state?.track?.driver;
export const OIL_CHANGE = (state: ReduxStateProps) => state?.track?.oilChange;
export const TIRE_CHANGE = (state: ReduxStateProps) => state?.track?.tireChange;
export const OTHER_CHANGE = (state: ReduxStateProps) => state?.track?.otherChange;
export const FUEL_RANGE = (state: ReduxStateProps) => state?.track?.fuelRange;
export const ANALYTICS = (state: ReduxStateProps) => state?.track?.analytics;
export const GEOFENCEAREA = (state: ReduxStateProps) => state?.track?.geofenceArea;
export const GEOFENCEROUTE = (state: ReduxStateProps) => state?.track?.geofenceRoute;
export const EXPANDNOTIFICATION = (state: ReduxStateProps) => state?.track?.expandnotification;
export const NOTIFICATIONS = (state: ReduxStateProps) => state?.track?.notifications;
export const PERMISSIONS = (state: ReduxStateProps) => state?.track?.permissions;
export const ORGANIZATIONUSERS = (state: ReduxStateProps) => state?.track?.orgUsers;
export const ROLES = (state: ReduxStateProps) => state?.track?.roles;
export const GLOBALSERCHRESULTS = (state: ReduxStateProps) => state?.track?.globalSearch;
export const ACTIVETRACKERVEHICLE = (state: ReduxStateProps) => state?.track?.activeTrackVehicle;
export const GLOBALSEARCHQUERY = (state: ReduxStateProps) => state?.track?.globalSearchQuery;

export default function TrackReducer(state: TrackStateProps = initialState, action: ActionProps) {
  switch (action.type) {
    case actionTypes.UPDATEGLOBALSEARCHQUERY:
      return {
        ...state,
        globalSearchQuery: action.payload,
      };
    case actionTypes.UPDATESELECTEDGROUP:
      return {
        ...state,
        selectedGroup: action.payload,
      };
    case actionTypes.UPDATEACTIVETRACKVEHICLE:
      return {
        ...state,
        activeTrackVehicle: action.payload,
      };
    case actionTypes.UPDATESEARCHRESULT:
      return {
        ...state,
        globalSearch: action.payload,
      };
    case actionTypes.UPDATEROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case actionTypes.UPDATEORGANIZATIONUSERS:
      return {
        ...state,
        orgUsers: action.payload,
      };
    case actionTypes.UPDATESELECTEDGEOFENCE:
      return {
        ...state,
        selectedGeofence: action.payload,
      };
    case actionTypes.UPDATEPERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
      };
    case actionTypes.EXPANDNOTIFICATION:
      return {
        ...state,
        expandnotification: action.payload,
      };
    case actionTypes.UPDATENOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case actionTypes.UPDATEDGEOFENCEROUTECREATE:
      return {
        ...state,
        geofenceRoute: action.payload,
      };
    case actionTypes.UPDATEANALYTIC:
      return {
        ...state,
        analytics: action.payload,
      };
    case actionTypes.UPDATE_FUELRANGE:
      return {
        ...state,
        fuelRange: action.payload,
      };
    case actionTypes.UPDATEOTHERCHANGE:
      return {
        ...state,
        otherChange: action.payload,
      };
    case actionTypes.UPDATEOILCHANGE:
      return {
        ...state,
        oilChange: action.payload,
      };
    case actionTypes.UPDATETIRECHANGE:
      return {
        ...state,
        tireChange: action.payload,
      };
    case actionTypes.UPDATELOCATION:
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case actionTypes.UPDATEDRIVER:
      return {
        ...state,
        driver: action.payload,
      };
    case actionTypes.UPDATEDVEHICLES:
      return {
        ...state,
        vehicles: action.payload,
      };
    case actionTypes.UPDATETRACKER:
      return {
        ...state,
        tracker: action.payload,
      };
    case actionTypes.UPDATEDGEOFENCE:
      return {
        ...state,
        group: action.payload,
      };
    case actionTypes.UPDATEDGEOFENCEAREA:
      return {
        ...state,
        geofenceArea: action.payload,
      };
    case actionTypes.UPDATEGROUPVEHICLES:
      return {
        ...state,
        groupVehicles: action.payload,
      };
    case actionTypes.UPDATELIVEVEHICLE:
      return {
        ...state,
        liveVehicles: action.payload,
      };
    case actionTypes.UPDATELIVEVEHICLES:
      return {
        ...state,
        allLiveVehicles: action.payload,
      };
    case actionTypes.UPDATEFUELGROUPS:
      return {
        ...state,
        fuelGroups: action.payload,
      };
    case actionTypes.RESETTRACKREDUCER:
      return {
        selectedGeofence: {},
        selectedLocation: {},
        expandnotification: false,
        vehicles: [],
        group: [],
        liveVehicles: [],
        fuelGroups: [],
        groupVehicles: [],
        tracker: [],
        driver: [],
        oilChange: [],
        tireChange: [],
        otherChange: [],
        fuelRange: [],
        analytics: [],
        geofenceArea: [],
        geofenceRoute: [],
        notifications: [],
        permissions: [],
        orgUsers: [],
      };
    default:
      return {
        ...state,
      };
  }
}

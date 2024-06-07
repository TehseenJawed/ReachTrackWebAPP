import * as actionTypes from "../types/actionTypes.js";
import { AuthStateProps, ActionProps, ReduxStateProps } from "@/typecasts/index.js";

const initialState: AuthStateProps = {
  loading: false,
  expandMenu: true,
  expandSearch: false,
  accessToken: null,
  user: {},
  organization: {},
  liveNotification: [],
};

export const LOADING = (state: ReduxStateProps) => state?.auth?.loading;
export const ACCESSTOKEN = (state: ReduxStateProps) => state?.auth?.accessToken;
export const EXPAND = (state: ReduxStateProps) => state?.auth?.expandMenu;
export const EXPANDSEARCH = (state: ReduxStateProps) => state?.auth?.expandSearch;
export const USER = (state: ReduxStateProps) => state?.auth?.user;
export const ORGANIZATION = (state: ReduxStateProps) => state?.auth?.organization;
export const LIVENOTIFICATION = (state: ReduxStateProps) => state?.auth?.liveNotification;

export default function AuthReducer(state: AuthStateProps = initialState, action: ActionProps) {
  switch (action.type) {
    case actionTypes.UPDATENOTIFICATIONDATA:
      console.log('NEW WORKI...', action.payload);

      return {
        ...state,
        liveNotification: action.payload,
      };
    case actionTypes.UPDATELOADER:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.UPDATEACCESSTOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case actionTypes.UPDATEUSERDATA:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.UPDATEUSERDATA:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.UPDATEORGANIZATION:
      return {
        ...state,
        organization: action.payload,
      };
    case actionTypes.RESETAUTHREDUCER:
      return {
        loading: false,
        expandMenu: true,
        expandSearch: false,
        accessToken: null,
        user: {},
        organization: {},
      };
    case 'EXPAND_MENU':
      return {
        ...state,
        expandMenu: action.payload,
      };
    case 'EXPAND_SEARCH':
      return {
        ...state,
        expandSearch: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

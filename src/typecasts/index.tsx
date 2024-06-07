export interface ChildProps {
    children: React.ReactNode
}

export interface LoginProps {
    username: string;
    password: string;
}

export interface SpeedDataProps {
    speed: string;
}

export interface PlaybackVehicleDataProps {
    id: string,
    dateTime: string,
    location: number[],
    speed: string,
    angle: number,
    status: string,
    event: string,
}

export interface DriverDataProps {
    serial_number: string,
    driver_name: string,
    date_of_joining: string,
    vehicle_number_plate: string,
    // group: any,
    ibutton_value: string,
}

export interface OilHistoryProps {
    serialNumber: string,
    date: string,
    mileage: string,
    remarks: string,
}

export interface FuelGroupProps {
    name: string,
    fuel_group_count: string,
}

export interface LatLong {
    lat: number, 
    lng:number
}

export interface AuthStateProps {
    loading: boolean,
    accessToken: string,
    expandMenu: boolean,
    expandSearch: boolean,
    user: {},
    organization: {},
    liveNotification: any,
}

export interface TrackStateProps {
    selectedGeofence: any,
    selectedLocation: any,
    vehicles: any[],
    groupVehicles: any[],
    selectedGroup: any,
    liveVehicles: any[],
    fuelGroups: any[],
    group: any[],
    tracker: any[],
    driver: any[],
    oilChange: any,
    tireChange: any,
    otherChange: any,
    allLiveVehicles: any,
    fuelRange: any,
    analytics: any,
    geofenceArea: any,
    geofenceRoute: any,
    expandnotification: boolean,
    notifications: any,
    permissions: any,
    orgUsers: any,
    roles: any,
    globalSearch: any,
    activeTrackVehicle: any,
    globalSearchQuery: any,
}

export interface durationHourProps {
    id: string,
    duration: string,
}

export interface reasonsArrayProps {
    id: string,
    reason: string,
}

export interface geoFenceDataProps {
    id: string,
    location: string,
    coordinates: LatLong[],
}

export interface statusDataProps {
    id: string,
    status: string
}

export interface groupDataProps {
    id: string,
    group: string,
};

export interface ActionProps {
    type: string,
    payload: any
}

export interface ReduxStateProps {
    auth: AuthStateProps
    track: TrackStateProps

}

// Table Props
export interface TableHeaderProps {
    title: string;
    align: string;
    minWidth: number;
    filter: boolean
}
export interface VehicleDataProps {
    id: string,
    imei: string,
    msisdn: string,
    vehicle_reg_no: string,
    category: string,
    cluster: string,
    region: string,
    ibc_vbc_dep: string,
    shift_hrs: string,
    benchmark: string,
    plate_number: string,
    make_n_model: string,
    meter_reading_km: string,
    fuel_group: string,
    type: string,
    group: string
}


export interface ObservationDataProps {
    id: string,
    device_time: string,
    plate: string,
    location: string[],
    address: string,
    ignition: string,
    movement: string,
    gsm_signal: string,
    sat: string,
    external_voltage: string,
    speed: string,
    trip: string,
    idling: string,
    behaviour_value: string,
    battery_voltage: string,
    unplug: string,
    barcode_value: string,
    analog_input: string,
    digital_input: string,
    jamming: string,
    towing: string,
    data_mode: string,
    sleep_mode: string,
    gnss_status: string,
}

export interface ComplaintFormProps {
    reason: string;
    complaintDesc: string;
    pocName: string;
    vehicleLocation: string;
    pocContactNumber: string;
}

export interface GeofenceAreaProps {
    geofence: string,
    applied_on: string,
    alerts_on: string,
    location: string[],
}


export interface LocationCordProps {
    latitude: string,
    longitude: string
}
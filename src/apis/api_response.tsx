import { DriverDataProps, FuelGroupProps, GeofenceAreaProps, ObservationDataProps, OilHistoryProps, PlaybackVehicleDataProps, SpeedDataProps, VehicleDataProps, durationHourProps, geoFenceDataProps, groupDataProps, reasonsArrayProps, statusDataProps } from "typecasts";

export const vehicleData: VehicleDataProps[] = [
    {
        id: '350424066687557', 
        imei: '350424066687557', 
        msisdn: '3484053158', 
        vehicle_reg_no: 'N/A', 
        category: 'MTL', 
        cluster: 'Johar Cluster',
        region: 'Central Region', 
        ibc_vbc_dep: 'Corrective Maintenance (CM)', 
        shift_hrs: '24', 
        benchmark: '8', 
        plate_number: 'JZ-8310', 
        make_n_model: 'KE FOTON 2022', 
        meter_reading_km: '25653', 
        fuel_group: 'N/A', 
        type: 'car',
        group: 'K-Electric'
    },
];

export const speedData: SpeedDataProps[] = [
    {
        speed: '1x', 
    },
    {
        speed: '2x', 
    },
    {
        speed: '4x', 
    },
    {
        speed: '6x', 
    },
];

export const playbackVehicleData:PlaybackVehicleDataProps[] = [
    {
        id: '001',
        dateTime: '24-10-2023 20:16:35',
        location: [24.848272, 67.166655],
        speed: '0',
        angle: 336,
        status: 'Parked',
        event: ''
    },
    {
        id: '002',
        dateTime: '24-10-2023 20:16:35',
        location: [24.848272, 67.166655],
        speed: '0',
        angle: 336,
        status: 'Parked',
        event: ''
    },
    {
        id: '003',
        dateTime: '24-10-2023 20:16:35',
        location: [24.848272, 67.166655],
        speed: '0',
        angle: 336,
        status: 'Parked',
        event: ''
    },
    {
        id: '004',
        dateTime: '24-10-2023 20:16:35',
        location: [24.848272, 67.166655],
        speed: '0',
        angle: 336,
        status: 'Parked',
        event: ''
    },
    {
        id: '005',
        dateTime: '24-10-2023 20:16:35',
        location: [24.848272, 67.166655],
        speed: '0',
        angle: 336,
        status: 'Parked',
        event: ''
    },
    {
        id: '006',
        dateTime: '24-10-2023 20:16:35',
        location: [24.848272, 67.166655],
        speed: '0',
        angle: 336,
        status: 'Parked',
        event: ''
    },
    {
        id: '007',
        dateTime: '24-10-2023 20:16:35',
        location: [24.848272, 67.166655],
        speed: '0',
        angle: 336,
        status: 'Parked',
        event: ''
    },
    {
        id: '008',
        dateTime: '24-10-2023 20:16:35',
        location: [24.848272, 67.166655],
        speed: '0',
        angle: 336,
        status: 'Parked',
        event: ''
    },
    {
        id: '009',
        dateTime: '24-10-2023 20:16:35',
        location: [24.848272, 67.166655],
        speed: '0',
        angle: 336,
        status: 'Parked',
        event: ''
    },
    {
        id: '010',
        dateTime: '24-10-2023 20:16:35',
        location: [24.848272, 67.166655],
        speed: '0',
        angle: 336,
        status: 'Parked',
        event: ''
    },
    {
        id: '011',
        dateTime: '24-10-2023 20:16:35',
        location: [24.848272, 67.166655],
        speed: '0',
        angle: 336,
        status: 'Parked',
        event: ''
    },
    {
        id: '012',
        dateTime: '24-10-2023 20:16:35',
        location: [24.848272, 67.166655],
        speed: '0',
        angle: 336,
        status: 'Parked',
        event: ''
    },
    {
        id: '013',
        dateTime: '24-10-2023 20:16:35',
        location: [24.848272, 67.166655],
        speed: '0',
        angle: 336,
        status: 'Parked',
        event: ''
    },
]

export const driversData:DriverDataProps[] = [
    
]

export const fuelGroup:FuelGroupProps[] = [
    {
        name: '1',
        fuel_group_count: '02-03-2024',
    },
]

export const oilHistory:OilHistoryProps[] = [
    {
        serialNumber: '1',
        date: '02-03-2024',
        mileage: '13232',
        remarks: 'NA',
    },
]

export const observationData = [
    {
        device_time: '11/10/2023 05:13:45 PM', 
        plate: 'LC-2128', 
        location: [24.877115,67.149418], 
        address: 'N/A', 
        ignition: 'Yes',
        movement: 'Yes', 
        gsm_signal: '4', 
        sat: '10', 
        external_voltage: '12.1', 
        speed: '0', 
        trip: 'Yes', 
        idling: 'N/A', 
        behaviour_value: 'N/A',
        battery_voltage: '4.079',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '1',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        device_time: '11/10/2023 05:13:45 PM', 
        plate: 'LC-2128', 
        location: [24.877115,67.149418], 
        address: 'N/A', 
        ignition: 'Yes',
        movement: 'Yes', 
        gsm_signal: '4', 
        sat: '10', 
        external_voltage: '12.1', 
        speed: '0', 
        trip: 'Yes', 
        idling: 'N/A', 
        behaviour_value: 'N/A',
        battery_voltage: '4.079',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '1',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        device_time: '11/10/2023 05:13:45 PM', 
        plate: 'LC-2128', 
        location: [24.877115,67.149418], 
        address: 'N/A', 
        ignition: 'Yes',
        movement: 'Yes', 
        gsm_signal: '4', 
        sat: '10', 
        external_voltage: '12.1', 
        speed: '0', 
        trip: 'Yes', 
        idling: 'N/A', 
        behaviour_value: 'N/A',
        battery_voltage: '4.079',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '1',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        device_time: '11/10/2023 05:13:45 PM', 
        plate: 'LC-2128', 
        location: [24.877115,67.149418], 
        address: 'N/A', 
        ignition: 'Yes',
        movement: 'Yes', 
        gsm_signal: '4', 
        sat: '10', 
        external_voltage: '12.1', 
        speed: '0', 
        trip: 'Yes', 
        idling: 'N/A', 
        behaviour_value: 'N/A',
        battery_voltage: '4.079',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '1',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        device_time: '11/10/2023 05:13:45 PM', 
        plate: 'LC-2128', 
        location: [24.877115,67.149418], 
        address: 'N/A', 
        ignition: 'Yes',
        movement: 'Yes', 
        gsm_signal: '4', 
        sat: '10', 
        external_voltage: '12.1', 
        speed: '0', 
        trip: 'Yes', 
        idling: 'N/A', 
        behaviour_value: 'N/A',
        battery_voltage: '4.079',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '1',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        device_time: '11/10/2023 05:13:45 PM', 
        plate: 'LC-2128', 
        location: [24.877115,67.149418], 
        address: 'N/A', 
        ignition: 'Yes',
        movement: 'Yes', 
        gsm_signal: '4', 
        sat: '10', 
        external_voltage: '12.1', 
        speed: '0', 
        trip: 'Yes', 
        idling: 'N/A', 
        behaviour_value: 'N/A',
        battery_voltage: '4.079',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '1',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        device_time: '11/10/2023 05:13:45 PM', 
        plate: 'LC-2128', 
        location: [24.877115,67.149418], 
        address: 'N/A', 
        ignition: 'Yes',
        movement: 'Yes', 
        gsm_signal: '4', 
        sat: '10', 
        external_voltage: '12.1', 
        speed: '0', 
        trip: 'Yes', 
        idling: 'N/A', 
        behaviour_value: 'N/A',
        battery_voltage: '4.079',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '1',
        sleep_mode: '0',
        gnss_status: '1',
    },
];
export const geoFenceData: geoFenceDataProps[] = [
    {
        id: '00',
        location: 'ALL',
        coordinates: [
            {
              lat: 24.901193507610866, lng:67.11123801751496
            },
            {
              lat: 24.903901, lng: 67.112066
            },
            {
              lat: 24.902874, lng: 67.113575
            },
            {
              lat: 24.903498, lng: 67.114441
            },
            {
              lat: 24.906558, lng: 67.111600
            },
            {
              lat: 24.909516, lng: 67.114685
            },
            {
              lat: 24.913783, lng: 67.111645
            },
            {
              lat: 24.915796, lng: 67.118524
            },
            {
              lat: 24.927923, lng: 67.112176
            },
            {
              lat: 24.936687, lng: 67.141337
            },
            {
              lat: 24.938366, lng: 67.162470
            },
            {
              lat: 24.926919, lng: 67.155764
            },
            {
              lat: 24.926246, lng: 67.150386
            },
            {
              lat: 24.914720, lng: 67.141738
            },
            {
              lat: 24.904518, lng: 67.136734
            },
            {
              lat: 24.900970, lng: 67.116310
            },
          ],
    },
    {
        id: '001',
        location: 'IBC JOHAR 1',
        coordinates: [
            {
              lat: 24.910802, lng: 67.116679
            },
            {
              lat: 24.906155, lng: 67.111660
            },
            {
              lat: 24.902919, lng: 67.110888
            },
            {
              lat: 24.902919, lng: 67.110888
            },
            {
              lat: 24.905722, lng: 67.125075
            },
          ]
    },
    {
        id: '002',
        location: 'IBC JOHAR 2',
        coordinates: [
            {
              lat: 24.901193507610866, lng:67.11123801751496
            },
            {
              lat: 24.903901, lng: 67.112066
            },
            {
              lat: 24.902874, lng: 67.113575
            },
            {
              lat: 24.903498, lng: 67.114441
            },
            {
              lat: 24.906558, lng: 67.111600
            },
            {
              lat: 24.909516, lng: 67.114685
            },
            {
              lat: 24.913783, lng: 67.111645
            },
            {
              lat: 24.915796, lng: 67.118524
            },
            {
              lat: 24.927923, lng: 67.112176
            },
            {
              lat: 24.936687, lng: 67.141337
            },
            {
              lat: 24.938366, lng: 67.162470
            },
            {
              lat: 24.926919, lng: 67.155764
            },
            {
              lat: 24.926246, lng: 67.150386
            },
            {
              lat: 24.914720, lng: 67.141738
            },
            {
              lat: 24.904518, lng: 67.136734
            },
            {
              lat: 24.900970, lng: 67.116310
            },
          ]
    },
    {
        id: '003',
        location: 'IBC GULSHAN 1',
        coordinates: [
            {
              lat: 24.901193507610866, lng:67.11123801751496
            },
            {
              lat: 24.903901, lng: 67.112066
            },
            {
              lat: 24.902874, lng: 67.113575
            },
            {
              lat: 24.903498, lng: 67.114441
            },
            {
              lat: 24.906558, lng: 67.111600
            },
            {
              lat: 24.909516, lng: 67.114685
            },
            {
              lat: 24.913783, lng: 67.111645
            },
            {
              lat: 24.915796, lng: 67.118524
            },
            {
              lat: 24.927923, lng: 67.112176
            },
            {
              lat: 24.936687, lng: 67.141337
            },
            {
              lat: 24.938366, lng: 67.162470
            },
            {
              lat: 24.926919, lng: 67.155764
            },
            {
              lat: 24.926246, lng: 67.150386
            },
            {
              lat: 24.914720, lng: 67.141738
            },
            {
              lat: 24.904518, lng: 67.136734
            },
            {
              lat: 24.900970, lng: 67.116310
            },
          ]
    },
    {
        id: '004',
        location: 'IBC GULSHAN 2',
        coordinates: [
            {
              lat: 24.901193507610866, lng:67.11123801751496
            },
            {
              lat: 24.903901, lng: 67.112066
            },
            {
              lat: 24.902874, lng: 67.113575
            },
            {
              lat: 24.903498, lng: 67.114441
            },
            {
              lat: 24.906558, lng: 67.111600
            },
            {
              lat: 24.909516, lng: 67.114685
            },
            {
              lat: 24.913783, lng: 67.111645
            },
            {
              lat: 24.915796, lng: 67.118524
            },
            {
              lat: 24.927923, lng: 67.112176
            },
            {
              lat: 24.936687, lng: 67.141337
            },
            {
              lat: 24.938366, lng: 67.162470
            },
            {
              lat: 24.926919, lng: 67.155764
            },
            {
              lat: 24.926246, lng: 67.150386
            },
            {
              lat: 24.914720, lng: 67.141738
            },
            {
              lat: 24.904518, lng: 67.136734
            },
            {
              lat: 24.900970, lng: 67.116310
            },
          ]
    }
]

export const statusData: statusDataProps[] = [
    {
        id: '001',
        status: 'UNPLUG',
    },
    {
        id: '002',
        status: 'IGNITION',
    },
    {
        id: '003',
        status: 'MOVING',
    },
    {
        id: '004',
        status: 'PARKED',
    },
    {
        id: '005',
        status: 'WEAK SIGNAL',
    },
    {
        id: '006',
        status: 'INACTIVE',
    },
    {
        id: '007',
        status: 'OFFLINE',
    },
    {
        id: '008',
        status: 'IDLE',
    },
]

export const groupData: groupDataProps[] = [
    {
        id: '001',
        group: 'K-ELECTRIC',
    },
    {
        id: '002',
        group: 'VAPDA-ELECTRIC',
    },
    {
        id: '003',
        group: 'NEWYORK-ELECTRIC',
    },
]

export const reasonsArray: reasonsArrayProps[] = [
    {
        id: '001',
        reason: 'Not Responding',
    },
    {
        id: '002',
        reason: 'Inactive Status',
    },
    {
        id: '003',
        reason: 'Removal',
    },
    {
        id: '004',
        reason: 'Missing Data',
    },
    {
        id: '005',
        reason: 'Delayed Reporting',
    },
    {
        id: '006',
        reason: 'Misc.',
    },
  ]

export const durationHours: durationHourProps[] = [
    {
        id:'001',
        duration: '1',
    },
    {
        id:'002',
        duration: '2',
    },
    {
        id:'003',
        duration: '3',
    },
    {
        id:'004',
        duration: '4',
    },
    {
        id:'005',
        duration: '5',
    },
    {
        id:'006',
        duration: '6',
    },
    {
        id:'007',
        duration: '7',
    },
    {
        id:'008',
        duration: '8',
    },
    {
        id:'009',
        duration: '9',
    },
    {
        id:'010',
        duration: '10',
    },
    {
        id:'011',
        duration: '11',
    },
    {
        id:'012',
        duration: '12',
    },
    {
        id:'013',
        duration: '13',
    },
    {
        id:'014',
        duration: '14',
    },
    {
        id:'015',
        duration: '15',
    },
    {
        id:'016',
        duration: '16',
    },
    {
        id:'017',
        duration: '17',
    },
    {
        id:'018',
        duration: '18',
    },
    {
        id:'019',
        duration: '19',
    },
    {
        id:'020',
        duration: '20',
    },
    {
        id:'021',
        duration: '21',
    },
    {
        id:'022',
        duration: '22',
    },
    {
        id:'023',
        duration: '23',
    },
    {
        id:'024',
        duration: '24',
    },
]

export const GeofenceAreaData: GeofenceAreaProps[] = [
    {
        geofence: "IBC GULSHAN CC 1",
        applied_on: "1 Vehicles",
        alerts_on: "Entry Only",
        location: ['Hashmi Medical & General Store Teyrhii Road Block 17 Gulistan e Jauhar Karachi Sindh'],
    },
]

export const ObservationData: ObservationDataProps[] = [
    {
        id: "001",
        device_time: "11/10/2023 12:34:00 PM",
        plate: "LC-2128",
        location: ['24.878018','67.148488'],
        address: 'N/A',
        ignition: 'Yes',
        movement: 'No',
        gsm_signal: '3',
        sat: '14',
        external_voltage: '12.249',
        speed: '0',
        trip: 'Yes',
        idling: 'Yes',
        behaviour_value: 'N/A',
        battery_voltage: '4.075',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '0',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        id: "001",
        device_time: "11/10/2023 12:34:00 PM",
        plate: "LC-2128",
        location: ['24.878018','67.148488'],
        address: 'N/A',
        ignition: 'Yes',
        movement: 'No',
        gsm_signal: '3',
        sat: '14',
        external_voltage: '12.249',
        speed: '0',
        trip: 'Yes',
        idling: 'Yes',
        behaviour_value: 'N/A',
        battery_voltage: '4.075',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '0',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        id: "001",
        device_time: "11/10/2023 12:34:00 PM",
        plate: "LC-2128",
        location: ['24.878018','67.148488'],
        address: 'N/A',
        ignition: 'Yes',
        movement: 'No',
        gsm_signal: '3',
        sat: '14',
        external_voltage: '12.249',
        speed: '0',
        trip: 'Yes',
        idling: 'Yes',
        behaviour_value: 'N/A',
        battery_voltage: '4.075',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '0',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        id: "001",
        device_time: "11/10/2023 12:34:00 PM",
        plate: "LC-2128",
        location: ['24.878018','67.148488'],
        address: 'N/A',
        ignition: 'Yes',
        movement: 'No',
        gsm_signal: '3',
        sat: '14',
        external_voltage: '12.249',
        speed: '0',
        trip: 'Yes',
        idling: 'Yes',
        behaviour_value: 'N/A',
        battery_voltage: '4.075',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '0',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        id: "001",
        device_time: "11/10/2023 12:34:00 PM",
        plate: "LC-2128",
        location: ['24.878018','67.148488'],
        address: 'N/A',
        ignition: 'Yes',
        movement: 'No',
        gsm_signal: '3',
        sat: '14',
        external_voltage: '12.249',
        speed: '0',
        trip: 'Yes',
        idling: 'Yes',
        behaviour_value: 'N/A',
        battery_voltage: '4.075',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '0',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        id: "001",
        device_time: "11/10/2023 12:34:00 PM",
        plate: "LC-2128",
        location: ['24.878018','67.148488'],
        address: 'N/A',
        ignition: 'Yes',
        movement: 'No',
        gsm_signal: '3',
        sat: '14',
        external_voltage: '12.249',
        speed: '0',
        trip: 'Yes',
        idling: 'Yes',
        behaviour_value: 'N/A',
        battery_voltage: '4.075',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '0',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        id: "001",
        device_time: "11/10/2023 12:34:00 PM",
        plate: "LC-2128",
        location: ['24.878018','67.148488'],
        address: 'N/A',
        ignition: 'Yes',
        movement: 'No',
        gsm_signal: '3',
        sat: '14',
        external_voltage: '12.249',
        speed: '0',
        trip: 'Yes',
        idling: 'Yes',
        behaviour_value: 'N/A',
        battery_voltage: '4.075',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '0',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        id: "001",
        device_time: "11/10/2023 12:34:00 PM",
        plate: "LC-2128",
        location: ['24.878018','67.148488'],
        address: 'N/A',
        ignition: 'Yes',
        movement: 'No',
        gsm_signal: '3',
        sat: '14',
        external_voltage: '12.249',
        speed: '0',
        trip: 'Yes',
        idling: 'Yes',
        behaviour_value: 'N/A',
        battery_voltage: '4.075',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '0',
        sleep_mode: '0',
        gnss_status: '1',
    },
    {
        id: "001",
        device_time: "11/10/2023 12:34:00 PM",
        plate: "LC-2128",
        location: ['24.878018','67.148488'],
        address: 'N/A',
        ignition: 'Yes',
        movement: 'No',
        gsm_signal: '3',
        sat: '14',
        external_voltage: '12.249',
        speed: '0',
        trip: 'Yes',
        idling: 'Yes',
        behaviour_value: 'N/A',
        battery_voltage: '4.075',
        unplug: 'No',
        barcode_value: 'N/A',
        analog_input: '217',
        digital_input: '1',
        jamming: '0',
        towing: 'N/A',
        data_mode: '0',
        sleep_mode: '0',
        gnss_status: '1',
    },
]

export const reportDataContent = [
  {
      name: "Alarm Report",
      desc: "Summary of the alarm notifications received by the user, including the alarm name, unit name, alarm type and alarm contents, etc.",
  },
  {
      name: "Trip Detail Report",
      desc: "Trip details of units in a interval, such as Duration, Trip Mileage, Location Start, Cumulative Mileage and Location End etc.",
  },
  {
      name: "Geofence Track Report",
      desc: "Trip report between a start and end geofenced location including driver details, voilations and total idle time in trip.",
  },
  {
      name: "Fuel Consumption Report",
      desc: "Fuel consumption along with average fuel with respect to every trip in the selected period.",
  },
  {
      name: "Distance Traveled Report",
      desc: "Total distance traveled in a time duration.",
  },
  {
      name: "Violation Report",
      desc: "The report is about the violation records of units in a interval, such as violation Time, violation Text, Location etc.",
  },
  {
      name: "Geofence Report",
      desc: "Geofences report in an interval, such as Geofence properties, Time in, Time out.",
  },
  {
      name: "Routefence Report",
      desc: "Routefences report in a interval, such as Routefence properties, Time in, Time out, Duration in, Mileage and Max Speed etc.",
  },
  {
      name: "Not Responding Report",
      desc: "Summary of the devices which are not responding.",
  },
  {
      name: "Performance Report",
      desc: "Performance Report",
  },
  {
      name: "Vehicles Status Report",
      desc: "Summary of the vehicle last observed status.",
  },
  {
      name: "OverSpeeding Vehicles Report",
      desc: "Report is about the overspeed violation in an interval and with set speed limit, such as speed, location time etc.",
  },
  {
      name: "Driving Score Report",
      desc: "The report is about driving score based on each violation count in an interval.",
  },
  {
      name: "Stoppage Report",
      desc: "Trip stoppage report gives information about vehicles stop and drivers duration in an interval, such as trip stop locations, duration, time etc.",
  },
  {
      name: "Vehicle Tracking DLI Report",
      desc: "This report covers over all activity of vehicle, such as trip stop locations, duration, time etc.",
  },
  {
      name: "Oil Change Report",
      desc: "Oil change report provide insight about vehicle last oil change date, mileage, oil change due date, mileage, and reminder details about a single or all fleet vehicles.",
  },
  {
      name: "Tyre Change Report",
      desc: "Tyre change report provide insight about vehicle last tyre change date, mileage, tyre change due date, mileage, and reminder details about a single or all fleet vehicles.",
  },
  {
      name: "Other Maintainance Report",
      desc: "Other Maintainance.",
  },
  {
      name: "Vehicles Geofence Report",
      desc: "Vehicles geofences.",
  },
  {
      name: "Vehicles Routefence Report",
      desc: "Vehicles routefences.",
  },
]

export const groupVehicleData = [
  {
      name: "Tehseen Group",
      description: "Summary of the alarm notifications received by the user, including the alarm name, unit name, alarm type and alarm contents, etc.",
      parent_id: "837392",
      over_speeding_threshold: 96,
      vehicles: "",
      children: [
        {
            name: "Tehseen Group",
            description: "Summary of the alarm notifications received by the user, including the alarm name, unit name, alarm type and alarm contents, etc.",
            parent_id: "837392",
            over_speeding_threshold: 96,
            vehicles: "",
            children: [
              
            ]
        },
      ]
  },
]
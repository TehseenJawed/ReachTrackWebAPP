import React, { useEffect, useState } from 'react';
import AppTable from 'components/appTable';
import SelectField from 'components/selectField'
import { TableHeaderProps, VehicleDataProps } from '@/typecasts/index.tsx';
import { durationHours, observationData, vehicleData } from 'apis/api_response.tsx';
import AlertBox from 'components/alertBox.tsx';
import ComplaintBox from './components/complaintBox.tsx';
import TableCell from '@mui/material/TableCell';
import { IoIosWarning } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { TiSocialAtCircular } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import { BsFillSaveFill } from "react-icons/bs";
import { Button } from '@mui/material'
import dayjs from 'dayjs';
import DateField from 'components/dateField.tsx';
import { ImLocation } from "react-icons/im";
import { screenTitles } from 'utils/helpers.tsx';

const Observations = () => {
    const [duration, setGeofence] = useState()
    const [editId, setEditId] = useState<string>("")
    const [editData, setEditData] = useState<VehicleDataProps>()
    const [activeFilter, setActiveFilter] = useState("")
    const [loading, setLoading] = useState(false)
    const [row, setRow] = useState(observationData)
    const [vehicle, setGroup] = useState()
    const [openAlert, setOpenAlert] = useState(false);
    const [openComplaint, setOpenComplaint] = useState(false);
    const yesterday = dayjs().subtract(1, 'day');

    function createData(name: string, calories: number, fat: number) {
        return { name, calories, fat };
    }

    const header: TableHeaderProps[] = [
        {
            title: 'Device Time',
            minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Plate',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Location',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Address',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Ignition',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Movement',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'GSM Signal',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Sat',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Externam Voltage (V)',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Speed (KM/H)',
             minWidth: 125,
            align: 'right',
            filter: true,
        },
        {
            title: 'Trip',
             minWidth: 125,
            align: 'right',
            filter: true,
        },
        {
            title: 'Idling',
             minWidth: 125,
            align: 'right',
            filter: true,
        },
        {
            title: 'Behaviour Value',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Battery Voltage (V)',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Unplug',
             minWidth: 125,
            align: 'right',
            filter: true,
        },
        {
            title: 'BarCode Value',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Analog Input',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Digital Input',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Jamming',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Towing',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Data Mode',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Sleep Mode',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'GNSS Status',
             minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Fetch Location',
             minWidth: 125,
            align: 'left',
            filter: false,
        },
    ]

    const handleChangeDuration = (e) => {
        console.log('NEW...', e);
    }
    const handleChangeVehicle = (e) => {
        console.log('NEW...', e);
    }

    const filterByPlate = () => {
        const sortedData: any = observationData?.sort((a, b) => (a?.plate > b?.plate) ? activeFilter === "" ? 0 : activeFilter === "Plate" && -1 : activeFilter === "" ? -1 : activeFilter === "Plate" && 0)
        setRow(sortedData)
        if (activeFilter === "") {
            setActiveFilter("Plate")
        } else {
            setActiveFilter("")
        }
        setTimeout(() => setLoading(false), 0)
    }
    const filterByModel = () => {
        const sortedData: any = vehicleData?.sort((a, b) => (a?.make_n_model > b?.make_n_model) ? activeFilter === "" ? 0 : activeFilter === "Model" && -1 : activeFilter === "" ? -1 : activeFilter === "Model" && 0)
        setRow(sortedData)
        if (activeFilter === "") {
            setActiveFilter("Model")
        } else {
            setActiveFilter("")
        }
        setTimeout(() => setLoading(false), 0)
    }
    const filterByMeter = () => {
        const sortedData: any = vehicleData?.sort((a, b) => (a?.meter_reading_km > b?.meter_reading_km) ? activeFilter === "" ? 0 : activeFilter === "Meter" && -1 : activeFilter === "" ? -1 : activeFilter === "Meter" && 0)
        setRow(sortedData)
        if (activeFilter === "") {
            setActiveFilter("Meter")
        } else {
            setActiveFilter("")
        }
        setTimeout(() => setLoading(false), 0)
    }
    const filterByGroup = () => {
        const sortedData: any = vehicleData?.sort((a, b) => (a?.group > b?.group) ? activeFilter === "" ? 0 : activeFilter === "Group" && -1 : activeFilter === "" ? -1 : activeFilter === "Group" && 0)
        setRow(sortedData)
        if (activeFilter === "") {
            setActiveFilter("Group")
        } else {
            setActiveFilter("")
        }
        setTimeout(() => setLoading(false), 0)
    }
    const editDataFunction = (data: VehicleDataProps) => {
        setEditId(data?.imei)
        setEditData(data)
    }

    const actionJSX = (data: VehicleDataProps) => {
        return (
            <TableCell component="th" scope="row">
                <div>
                    <ImLocation size={22} color={'#5C86F3'} onClick={() => setOpenAlert(true)} className='hover:bg-gray-extralight rounded cursor-pointer' />
                </div>
            </TableCell>
        )
    }
    
    useEffect(() => {
        document.title = screenTitles?.historyObservation
    }, [])
    return (
        <div className='w-[100%] px-2 flex flex-col justify-center items-center mb-4'>
            <div className='flex w-full mb-4'>
                <div className='flex justify-between mt-8'>
                    <SelectField className="flex justify-between items-end w-[360px]" fieldClassName="w-[220px]" label={"Select Vehicle"} handleChange={handleChangeVehicle} value={vehicle} options={vehicleData} objKey="plate_number" />
                    <DateField classNamePicker={'w-full ml-2'} />
                    <SelectField className="flex justify-between items-end w-[360px] ml-4" fieldClassName="w-[220px]" label={"Duration (Hours)"} handleChange={handleChangeDuration} value={duration} options={durationHours} objKey="duration" />
                </div>
                <div className='w-full flex justify-end items-end'>
                    <Button onClick={() => console.log('success')} style={{ color: '#fff' }} size="large" className='w-[10rem] h-10 duration-200 hover:bg-blue-extralight-hover !bg-blue-extralight'>
                        <span className='text-xs font-bold'>Search</span>
                    </Button>
                </div>
            </div>
            <div className='w-full flex justify-between my-4'>
                <div className='text-2xl'>Observation List</div>
                <Button onClick={() => console.log('success')} style={{ color: '#fff' }} size="large" className='w-[10rem] h-10 duration-200 hover:bg-blue-extralight-hover !bg-blue-extralight'>
                    <span className='text-xs font-bold'>Download</span>
                </Button>
            </div>
            <AlertBox states={{ openAlert, setOpenAlert }} />
            <ComplaintBox states={{ openComplaint, setOpenComplaint }} />
            <AppTable setLoading={setLoading} editId={editId} editStates={{ editData, setEditData }} filterByGroup={filterByGroup} filterByPlate={filterByPlate} filterByModel={filterByModel} filterByMeter={filterByMeter} actionJSX={actionJSX} rows={row} header={header} />
        </div>
    )
}

export default Observations

import React, { useEffect, useState } from 'react';
import { TableHeaderProps } from '@/typecasts/index.tsx';
import { AddIconSVG, DeleteSVG, DownloadSVG, ImportSVG, SearchBlackSVG, EdotSVG } from 'assets/svg_icons';
import CreateGeofence from './components/createGeofence.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { GEOFENCEAREA, PERMISSIONS } from '../../redux/reducers/trackReducer.tsx';
import ShowGeofenceArea from './components/showGeofenceArea.tsx';
import { deleteGeofenceArea, getGeofenceAreaAction } from '../../redux/actions/trackActions.js';
import { useSnackbar } from 'notistack';
import UpdateGeofenceArea from './components/updateGeofenceArea.tsx';
import { screenTitles } from 'utils/helpers.tsx';

const GeofenceArea = () => {
    const [openCreateForm, setOpenCreateForm] = useState(false)
    const [openUpdateForm, setOpenUpdateForm] = useState(false)
    const [selectedGeofence, setSelectedGeofence] = useState()
    const [searchGeofence, setSearchGeofence] = useState("")
    const [editId, setEditId] = useState<string>("")
    const geofenceData = useSelector(GEOFENCEAREA)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const permissions = useSelector(PERMISSIONS)
    const authorizeFeatures = permissions?.filter(value => value.module === 'GEOFENCE_AREA')
    const isCreateGeofenceArea = authorizeFeatures.filter(value => value.name === 'CREATE')
    const isUpdateGeofenceArea = authorizeFeatures.filter(value => value.name === 'UPDATE')
    const isDeleteGeofenceArea = authorizeFeatures.filter(value => value.name === 'DELETE')

    const header: TableHeaderProps[] = [
        {
            title: 'Geofence',
            minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Applied On',
            minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Alerts On',
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
            title: 'Action(s)',
            minWidth: 125,
            align: 'right',
            filter: false,
        },
    ]

    const handleDeleteGeofence = (id) => {
        if (isDeleteGeofenceArea[0]) {
            //@ts-ignore
            dispatch(deleteGeofenceArea(id, (message, variant) => enqueueSnackbar(message, { variant: variant })))
        } else {
            enqueueSnackbar("You do not have rights to delete geofence area.", { variant: "error" })
        }
    }

    const handleEditGeofence = (data) => {
        if (isUpdateGeofenceArea[0]) {
            setOpenUpdateForm(true);
            setSelectedGeofence(data)
        } else {
            enqueueSnackbar("You do not have rights to update geofence area.", { variant: "error" })
        }
    }

    const actionJSX = (data: any) => {
        return (
            <div className='flex justify-center items-center w-3/12'>
                <EdotSVG style={!isUpdateGeofenceArea[0] ? { display: 'none' } : {}} onClick={() => handleEditGeofence(data)} color={'#5C86F3'} className='mx-2 hover:bg-gray-extralight rounded cursor-pointer' />
                <DeleteSVG style={!isUpdateGeofenceArea[0] ? { display: 'none' } : {}} onClick={() => handleDeleteGeofence(data?.id)} color={'#5C86F3'} className='mx-2 hover:bg-gray-extralight rounded cursor-pointer' />
            </div>
        )
    }

    const onDownload = () => {
        const link = document.createElement("a");
        link.download = `geofenceAreaTemplate.csv`;
        link.href = "../../assets/download_files/drivers.csv";
        link.click();
    };

    const handleCreate = () => {
        if (isCreateGeofenceArea[0]) {
            setOpenCreateForm(true)
        } else {
            enqueueSnackbar("You do not have rights to create a new geofence area.", { variant: "error" })
        }
    }

    useEffect(() => {
        const searchGeofenceCondtion = searchGeofence?.length >= 2
        if (searchGeofenceCondtion) {
            const params = `?${searchGeofenceCondtion ? `q=${searchGeofence}` : ''}`
            console.log('params....', params);
            //@ts-ignore
            dispatch(getGeofenceAreaAction((message, variant) => enqueueSnackbar(message, { variant: variant }), null, params))
        } else if (searchGeofence.length === 0) {
            //@ts-ignore
            dispatch(getGeofenceAreaAction((message, variant) => enqueueSnackbar(message, { variant: variant }), null))
        }
    }, [searchGeofence])

    useEffect(() => {
        document.title = screenTitles?.geofenceArea
    }, [])
    return (
        <div className='w-[100%] px-2 flex flex-col items-center mb-4'>
            {
                openCreateForm && <CreateGeofence setOpen={setOpenCreateForm} />
            }
            {
                openUpdateForm && <UpdateGeofenceArea data={selectedGeofence} setOpen={setOpenUpdateForm} />
            }
            {
                (!openUpdateForm && !openCreateForm) && (
                    <div className='w-full'>
                        <div className='flex md:flex-col xl:flex-row md:items-start justify-between items-center w-full m-4'>
                            <div className='relative flex items-center'>
                                <input
                                    type="text"
                                    placeholder="Search Geofence"
                                    value={searchGeofence}
                                    onChange={(e) => setSearchGeofence(e.target.value)}
                                    className='ad-driver-btn backdrop-blur-md bg-white/10 border border-black/80'
                                    id="outlined-start-adornment"
                                />
                                <SearchBlackSVG className="absolute md:left-[55%] top-[30%]" />
                                <div className='text-xs ml-4 font-bold'>Total Geofence {geofenceData?.length}</div>
                            </div>
                            <div className='flex md:mt-4 xl:mt-0'>
                                {/* <div onClick={onDownload} className='bg-primary w-[180px] lg:mt-0 h-11 rounded-xl flex justify-center px-4 items-center text-center text-white text-sm font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                        <DownloadSVG />
                        <div className='ml-4'>Download</div>
                    </div>
                    <div className='bg-primary w-[180px] lg:mt-0 h-11 ml-2 rounded-xl flex justify-center px-4 items-center text-center text-white text-sm font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                        <ImportSVG />
                        <div className='ml-4'>Import Geofence</div>
                    </div> */}
                                <div style={!isCreateGeofenceArea[0] ? { display: 'none' } : {}} onClick={handleCreate} className='bg-black w-[180px] lg:mt-0 h-11 ml-2 rounded-xl flex justify-center px-4 items-center text-center text-white text-sm font-bold cursor-pointer shadow-lg shadow-black-500/50'>
                                    <AddIconSVG />
                                    <div className='ml-4'>Create Geofence</div>
                                </div>
                            </div>
                        </div>
                        <ShowGeofenceArea tablePaper={'w-full rounded-xl'} setLoading={false} editId={editId} tableClass={''} actionJSX={actionJSX} rows={geofenceData} header={header} />
                    </div>
                )
            }
        </div>
    )
}

export default GeofenceArea

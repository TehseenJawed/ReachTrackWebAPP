import React, { useEffect, useState } from 'react';
import { TableHeaderProps } from '@/typecasts/index.tsx';
import AddGroup from './components/addFuelGroup.tsx';
import { AddIconGreenSVG, AddIconSVG, DeleteSVG, EdotSVG } from 'assets/svg_icons';
import ShowFuelGroups from './components/showFuelGroups';
import { useSelector, useDispatch } from 'react-redux';
import { FUEL_GROUPS, GROUP_DATA, PERMISSIONS } from '../../redux/reducers/trackReducer';
import { deleteFuelGroupAction } from '../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import EditFuelGroup from './components/editFuelGroup.tsx';
import AddFuelRange from './components/addFuelRange.tsx';
import { screenTitles } from 'utils/helpers.tsx';
// import EditGroup from './components/EditGroup.tsx';

const FuelGroupScreen = () => {
    const [openAddGroup, setOpenAddGroup] = useState(false)
    const [editId, setEditId] = useState<string>("")
    const [editGroupData, setEditGroupData] = useState()
    const [loading, setLoading] = useState(false)
    const [openEditGroup, setOpenEditGroup] = useState(false)
    const [openFuelRange, setOpenFuelRange] = useState(false)
    const fuelGroupData = useSelector(FUEL_GROUPS)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const permissions = useSelector(PERMISSIONS)
    const authorizeFeatures = permissions?.filter(value => value.module === 'GROUP')
    const isListGroup = authorizeFeatures.filter(value => value.name === 'LIST')
    // const isViewDrivers = authorizeFeatures.filter(value => value.name === 'VIEW')
    const isCreateFuelGroup = authorizeFeatures.filter(value => value.name === 'CREATE')
    const isUpdateFuelGroup = authorizeFeatures.filter(value => value.name === 'UPDATE')
    const isDeleteFuelGroup = authorizeFeatures.filter(value => value.name === 'DELETE')

    const header: TableHeaderProps[] = [
        {
            title: 'Name',
            minWidth: 150,
            align: 'right',
            filter: false,
        },
        {
            title: 'Fuel Range Count',
            minWidth: 200,
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

    const deleteFuelGroup = (id) => {
        if (isDeleteFuelGroup[0]) {
            // @ts-ignore
            dispatch(deleteFuelGroupAction(id, (message, variant) => enqueueSnackbar(message, { variant: variant })))
        } else {
            enqueueSnackbar("You do not have rights to delete fule group.", { variant: "error" })
        }
    }

    const handleEditGroup = (data) => {
        if (isUpdateFuelGroup[0]) {
            setOpenEditGroup(true)
            setEditGroupData(data)
        } else {
            enqueueSnackbar("You do not have rights to open fule range.", { variant: "error" })
        }
    }

    const handleOpenFuelRange = (data: any) => {
        if (isUpdateFuelGroup[0]) {
            setOpenFuelRange(true)
            setEditGroupData(data)
        } else {
            enqueueSnackbar("You do not have rights to open fule range.", { variant: "error" })
        }
    }

    const handleCreate = () => {
        if(isCreateFuelGroup[0]) {
            setOpenAddGroup(true)
        } else {
            enqueueSnackbar("You do not have rights to create a new fuel group.", { variant: "error" })
        }
    }

    const actionJSX = (data: any) => {
        return (
            <div className='flex justify-center items-center w-3/12'>
                <AddIconGreenSVG style={!isUpdateFuelGroup[0] ? {display: 'none'} : {}}  onClick={() => handleOpenFuelRange(data)} color={'#5C86F3'} className='mx-2 hover:bg-gray-extralight rounded cursor-pointer' />
                <EdotSVG style={!isUpdateFuelGroup[0] ? {display: 'none'} : {}}  onClick={() => handleEditGroup(data)} color={'#5C86F3'} className='mx-2 hover:bg-gray-extralight rounded cursor-pointer' />
                <DeleteSVG style={!isDeleteFuelGroup[0] ? {display: 'none'} : {}}  onClick={() => deleteFuelGroup(data?.id)} color={'#5C86F3'} className='mx-2 hover:bg-gray-extralight rounded cursor-pointer' />
            </div>
        )
    }
    useEffect(() => {
        document.title = screenTitles?.fuelGroups
    }, [])
    return (
        <div className='w-[100%] px-2 flex flex-col items-center mb-4'>
            <AddGroup open={openAddGroup} setOpen={setOpenAddGroup} />
            <EditFuelGroup open={openEditGroup} setOpen={setOpenEditGroup} data={editGroupData} />
            <AddFuelRange open={openFuelRange} setOpen={setOpenFuelRange} data={editGroupData} />
            {/* <EditGroup open={openEditGroup} setOpen={setOpenEditGroup} editGroupData={editGroupData} setEditGroupData={setEditGroupData}/> */}
            <div className='w-full backdrop-blur-lg bg-white/40 mt-4 p-3 rounded-xl'>
                <div className='flex justify-between items-center w-full'>
                    <div className='text-2xl text-black font-bold'>Fuel Group</div>
                    <div style={!isCreateFuelGroup[0] ? {display: 'none'} : {}}  className='bg-black w-[200px] mb-3 h-11 rounded-xl flex justify-between px-4 items-center text-center text-white text-md font-bold cursor-pointer shadow-lg shadow-black-500/50' onClick={handleCreate}>
                        <AddIconSVG />
                        <div>Add Fuel Group</div>
                    </div>
                </div>
                <ShowFuelGroups tablePaper={'w-full rounded-xl'} setLoading={setLoading} editId={editId} tableClass={''} actionJSX={actionJSX} rows={fuelGroupData} header={header} />
            </div>
        </div>
    )
}

export default FuelGroupScreen

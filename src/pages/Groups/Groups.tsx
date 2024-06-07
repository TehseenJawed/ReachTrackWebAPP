import React, { useState, useEffect } from 'react';
import { TableHeaderProps } from '@/typecasts/index.tsx';
import AddGroup from './components/AddGroup.tsx';
import { AddIconSVG, AnalyticsSVG, DeleteSVG, EdotSVG } from 'assets/svg_icons';
import ShowGroups from './components/showGroups';
import { useSelector, useDispatch } from 'react-redux';
import { GROUP_DATA, PERMISSIONS } from '../../redux/reducers/trackReducer';
import { deleteGroupAction } from '../../redux/actions/trackActions';
import { useSnackbar } from 'notistack';
import EditGroup from './components/EditGroup.tsx';
import { screenTitles } from 'utils/helpers.tsx';

const GroupScreen = () => {
    const [openAddGroup, setOpenAddGroup] = useState(false)
    const [editId, setEditId] = useState<string>("")
    const [editGroupData, setEditGroupData] = useState({
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
    })
    const [loading, setLoading] = useState(false)
    const [openEditGroup, setOpenEditGroup] = useState(false)
    const groupData = useSelector(GROUP_DATA)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const permissions = useSelector(PERMISSIONS)
    const authorizeFeatures = permissions?.filter(value => value.module === 'GROUP')
    const isListGroup = authorizeFeatures.filter(value => value.name === 'LIST')
    // const isViewDrivers = authorizeFeatures.filter(value => value.name === 'VIEW')
    const isCreateGroup = authorizeFeatures.filter(value => value.name === 'CREATE')
    const isUpdateGroup = authorizeFeatures.filter(value => value.name === 'UPDATE')
    const isDeleteGroup = authorizeFeatures.filter(value => value.name === 'DELETE')

    const header: TableHeaderProps[] = [
        {
            title: 'Name',
            minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Description',
            minWidth: 125,
            align: 'right',
            filter: false,
        },
        {
            title: 'Over Speeding Threshold',
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

    const deleteGroup = (id) => {
        if(isDeleteGroup[0]) {
            // @ts-ignore
            dispatch(deleteGroupAction(id, (message, variant) => enqueueSnackbar(message, { variant: variant })))
        } else {
            enqueueSnackbar("You do not have rights to delete group.", { variant: "error" })
        }
    }

    const handleEditGroup = (data) => {
        if(isUpdateGroup[0]) {
            setOpenEditGroup(true)
            setEditGroupData(data)
        } else {
            enqueueSnackbar("You do not have rights to update group.", { variant: "error" })
        }
    }

    const handleCreate = () => {
        if(isCreateGroup[0]) {
            setOpenAddGroup(true)
        } else {
            enqueueSnackbar("You do not have rights to create a new geofence route.", { variant: "error" })
        }
    }

    const actionJSX = (data: any) => {
        return (
            <div className='flex justify-center items-center w-3/12'>
            <AnalyticsSVG style={true ? {display: 'none'} : {}} color={'#5C86F3'} className='mx-2 hover:bg-gray-extralight rounded cursor-pointer' />
            <EdotSVG style={!isUpdateGroup[0] ? {display: 'none'} : {}} onClick={() => handleEditGroup(data)} color={'#5C86F3'} className='mx-2 hover:bg-gray-extralight rounded cursor-pointer' />
            <DeleteSVG style={!isDeleteGroup[0] ? {display: 'none'} : {}} onClick={() => deleteGroup(data?.id)} color={'#5C86F3'} className='mx-2 hover:bg-gray-extralight rounded cursor-pointer' />
        </div>
        )
    }

    useEffect(() => {
        document.title = screenTitles?.groups;
    }, [])
    return (
        <div className='w-[100%] px-2 flex flex-col items-center mb-4'>
            <AddGroup open={openAddGroup} setOpen={setOpenAddGroup} />
            <EditGroup open={openEditGroup} setOpen={setOpenEditGroup} editGroupData={editGroupData} setEditGroupData={setEditGroupData}/>
            <div className='flex justify-end w-full m-4'>
                <div 
                style={!isCreateGroup[0] ? {display: 'none'} : {}} 
                className='bg-black w-[150px] lg:mt-0 h-11 rounded-xl flex justify-between px-4 items-center text-center text-white text-md font-bold cursor-pointer shadow-lg shadow-black-500/50' 
                onClick={handleCreate}>
                    <AddIconSVG />
                    <div>Add Group</div>
                </div>
            </div>
            <ShowGroups tablePaper={'w-full rounded-xl'} setLoading={setLoading} editId={editId} tableClass={''} actionJSX={actionJSX} rows={groupData} header={header} />
        </div>
    )
}

export default GroupScreen

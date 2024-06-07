import React, { useEffect, useState } from 'react';
import InviteUser from './components/inviteUser.tsx';
import { AddIconSVG, ExportSVG, GridViewSVG, ListViewSVG, SearchBlackSVG } from 'assets/svg_icons';
import { OptionIconSVG } from 'assets/svg_icons'
import { useSelector, useDispatch } from 'react-redux';
import { DRIVER_DATA, ORGANIZATIONUSERS, PERMISSIONS, ROLES } from '../../redux/reducers/trackReducer.tsx';
import UserCard from './components/userCard.tsx';
import { deleteDriverAction, getOrganizationUsers, reInviteUser } from '../../redux/actions/trackActions.js';
import { useSnackbar } from 'notistack';
import EditDriver from './components/editUser.tsx';
import { Button } from '@mui/material'
import CustomizedSwitches from 'components/customizeSwitch.tsx';
import { exportExcel, formatDate } from '../../redux/actions/authActions.js';
import { screenTitles } from 'utils/helpers.tsx';
import DashboardGroupSelection from 'components/DashboardGroupSelection.tsx';
import SelectionField from 'components/SelectionField.tsx';
import Gavatar from 'components/gavatar.tsx';

const Users = () => {
    const [openInviteUser, setOpenInviteUser] = useState(false)
    const [searchUser, setSearchUser] = useState("")
    const [allUsers, setAllUsers] = useState("")
    const [selectRole, setSelectRole] = useState<any>("")
    const [globalDeselect, setGlobalDeselect] = useState("")
    const [openEditUser, setOpenEditUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [options, setOptions] = useState(null)
    const [group, setGroup] = useState<any>()
    const [isFocus, setIsFocus] = useState(false)
    const [editSelectedUser, setEditSelectedUser] = useState(null)
    const [viewStyle, setViewStyle] = useState("grid")
    const User = useSelector(DRIVER_DATA)
    const orgUsers = useSelector(ORGANIZATIONUSERS)
    const rolesData = useSelector(ROLES)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const permissions = useSelector(PERMISSIONS);
    const authorizeFeatures = permissions?.filter(value => value.module === 'USER')
    const isListUsers = authorizeFeatures.filter(value => value.name === 'LIST')
    const isViewUsers = authorizeFeatures.filter(value => value.name === 'VIEW')
    const isCreateUsers = authorizeFeatures.filter(value => value.name === 'CREATE')
    const isUpdateUsers = authorizeFeatures.filter(value => value.name === 'UPDATE')
    // const isDeleteUsers = authorizeFeatures.filter(value => value.name === 'DELETE')
    
    const handleDeleteUser = (id) => {
        // @ts-ignore
        // dispatch(deleteUserAction(id, (message, variant) => enqueueSnackbar(message, { variant: variant })))
        setSelectedUser(null)
        setOptions(null)
    }

    const handleShowOptions = (id) => {
        if (options === id) {
            setOptions(null)
        } else {
            setOptions(id)
        }
    }

    const handleReInvite = (userInfo) => {
        const newObj = {
           ...(userInfo?.user_name ? { username: userInfo?.user_name} : {})
        }
        //@ts-ignore
        dispatch(reInviteUser(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant })))
    }

    const paramSeperator = (value1, value2) => {
        if(value1 && value2) {
            return '&'
        }
        return ''
    }

    const handleOpenOptions = () => {
        console.log('options',globalDeselect);
        if(globalDeselect) {
            setGlobalDeselect("")
        }
        if(options) {
            setOptions(false)
        }
    }

    useEffect(() => {
        const searchUserCondtion = searchUser?.length >= 2
        if (searchUserCondtion || group?.id || selectRole?.id) {
            const params = `?${searchUserCondtion ? `q=${searchUser}` : ''}${paramSeperator(searchUserCondtion, group)}${group ? `group_id=${group.id}` : ''}${paramSeperator(group, selectRole?.id)}${paramSeperator(searchUserCondtion, selectRole?.id)}${selectRole?.id ? `role_id=${selectRole?.id}` : ''}`
            console.log('params....',params);
            //@ts-ignore
            dispatch(getOrganizationUsers((message, variant) => enqueueSnackbar(message, { variant: variant }), null, params))
            setSelectedUser(null)
        } else if (searchUser.length === 0) {
            //@ts-ignore
            dispatch(getOrganizationUsers((message, variant) => enqueueSnackbar(message, { variant: variant }), null))
        }
    }, [searchUser, group, selectRole])
    
    useEffect(() => {
        document.title = screenTitles?.users
        setAllUsers(orgUsers)
    }, [])
    
    useEffect(() => {
        if(selectedUser?.user_id) {
            const filteredData = orgUsers?.filter(v => v?.user_id == selectedUser?.user_id)
            if(filteredData[0]) {
                setSelectedUser(filteredData[0])
            }
        }
    }, [orgUsers])
    return (
        <div className='w-[100%] px-2 flex flex-col mb-4'>
            <EditDriver permission={isUpdateUsers} setOptions={setOptions} open={openEditUser} setOpen={setOpenEditUser} setSelectedDriver={setSelectedUser} data={editSelectedUser} />
            <InviteUser setOptions={setOptions} open={openInviteUser} setOpen={setOpenInviteUser} />
            {globalDeselect !== "" || options ? <div onClick={handleOpenOptions} style={{zIndex: 1}} className='absolute left-[0vh] top-0 h-[100vh] w-screen'/> : null}
            <div className='w-full flex justify-between mt-2'>
                <div style={!isCreateUsers[0] ? { display: 'none' } : {}} className='flex items-center w-[650px]'>
                    <div className='flex md:mt-4 xl:mt-0' >
                        <div className='bg-black w-[150px] lg:mt-0 h-9 rounded-xl flex justify-between px-4 items-center text-center text-white text-md font-bold cursor-pointer shadow-lg shadow-black-500/50' onClick={() => setOpenInviteUser(true)}>
                            <AddIconSVG />
                            <div>Invite User</div>
                        </div>
                    </div>
                    <div className='flex items-center relative ml-3' style={{zIndex: 0}}>
                        {
                            !isFocus && <SearchBlackSVG className="absolute left-[10px] top-[7px]" />
                        }
                        <input
                            type="text"
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => searchUser === "" && setIsFocus(false)}
                            placeholder="Search Users"
                            value={searchUser}
                            onChange={(e) => setSearchUser(e?.target?.value)}
                            className='backdrop-blur-md bg-white/50 border-b border-x rounded-lg border-white/80 w-[200px] h-9 vehicle-search-field'
                            id="outlined-start-adornment"
                        />
                        {/* <BottomBlackIcon className="absolute right-[10px] top-[7px]" /> */}
                    </div>
                    <div className='flex justify-center items-center' style={{zIndex: 100000}}>
                        <div className='backdrop-blur-md bg-white/50 border-b border-x rounded-lg border-white/80 h-9 flex justify-center items-center ml-3'>
                           <DashboardGroupSelection options={options} setOptions={setOptions} dashboard={false} globalDeselect={globalDeselect} setGlobalDeselect={setGlobalDeselect} group={group} setGroup={setGroup} placeholder={"Group"} border={false} />
                        </div>
                        <div className='backdrop-blur-md bg-white/50 border-b border-x rounded-lg border-white/80 h-9 flex justify-center items-center ml-3'>
                            <SelectionField expand={true} options={options} setOptions={setOptions} globalDeselect={globalDeselect} setGlobalDeselect={setGlobalDeselect} value={selectRole} setValue={setSelectRole} data={rolesData} placeholder={"Roles"} border={false} viewKey={'name'} />
                        </div>
                    </div>
                </div>

                <div  style={!isCreateUsers[0] ? { display: 'none' } : {}} className='flex justify-between items-center w-[220px]'>
                    <div className='flex justify-center items-center'>
                        <div onClick={() => setViewStyle('grid')} className={`${viewStyle === 'grid' && 'bg-black/20 rounded-md'} p-1 m-1 cursor-pointer`}>
                            <GridViewSVG />
                        </div>
                        <div onClick={() => setViewStyle('list')} className={`${viewStyle === 'list' && 'bg-black/20 rounded-md'} p-1 m-1 cursor-pointer`}>
                            <ListViewSVG />
                        </div>
                    </div>
                </div>

                <div style={!isCreateUsers[0] ? { display: 'none' } : {}} className='w-[300px] flex justify-end items-end'>
                    <Button onClick={() => exportExcel(User, "vehicles.xlsx")} style={{ color: '#fff' }}>
                        <div className='px-4 border-b border-l border-r border-black flex justify-between items-center w-[115px] h-9 bg-black rounded-xl'>
                            <ExportSVG />
                            <span className='text-white font-bold text-base capitalize'>Export</span>
                        </div>
                    </Button>
                    <Button onClick={() => exportExcel(User, "vehicles.xlsx")} style={{ color: '#fff' }}>
                        <div className='px-4 border-b border-l border-r border-black flex justify-between items-center w-[115px] h-9 backdrop-blur-md bg-black rounded-xl'>
                            <ExportSVG />
                            <span className='text-white font-bold text-base capitalize'>Update</span>
                        </div>
                    </Button>
                </div>
            </div>

            {
                viewStyle === 'list' && (
                    <div className='flex w-full h-[85vh] mt-4' style={{zIndex: 0}}>
                        <div className='w-3/12 text-[14px] flex flex-col justify-start items-start font-semibold' >
                            {
                                isViewUsers[0] && orgUsers.map((v, i) => <div onClick={() => setSelectedUser(v)} className={`px-4 py-1 m-0.5 cursor-pointer flex ${selectedUser?.user_name === v?.user_name && 'bg-black/10'} rounded-lg`}>{v?.user_name}</div>)
                            }
                        </div>
                        <div className='w-9/12 border-l border-black/20'>
                            {
                                selectedUser ? (
                                    <div className='w-[450px] flex flex-col ml-[12vw] relative' >
                                        <div className='flex w-full justify-end mt-4'>
                                            <div onClick={() => handleShowOptions(selectedUser?.user_id)} className='w-6 h-6  flex justify-center items-center cursor-pointer'>
                                                <OptionIconSVG />
                                            </div>
                                            {
                                                options === selectedUser?.user_id && (
                                                    <div style={!isUpdateUsers[0] ? { display: 'none' } : {}} className=' backdrop-blur-lg bg-white/40 w-24 absolute top-8 right-4 text-sm z-10 p-2 rounded-md cursor-pointer'>
                                                        {
                                                            selectedUser?.status === 'Pending' ? <div onClick={() => {handleReInvite(selectedUser); handleOpenOptions();}} className='py-2'>Re-Invite</div> : null
                                                        }
                                                        <div onClick={() => { setOpenEditUser(true); setEditSelectedUser(selectedUser) }} className='py-2'>Edit</div>
                                                        {/* <div onClick={() => handleDeleteUser(selectedUser?.id)} className='py-2 text-danger'>Deactivate</div> */}
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className='flex justify-center w-full'>
                                          <Gavatar size={80} fontSize={30} username={`${selectedUser?.first_name} ${selectedUser?.last_name}`}/>
                                        </div>
                                        <div className='text-md mt-4 font-black'>
                                            {selectedUser?.first_name || "N/A"}
                                        </div>
                                        <div className='text-sm mt-1 font-bold'>
                                            {selectedUser?.user_name || "N/A"}
                                        </div>
                                        <div className='text-sm mt-1 font-bold'>
                                            {selectedUser?.role?.name || "N/A"}
                                        </div>
                                        <div className='w-full mt-10 mb-4 text-[12px] text-black/80'>
                                            <div className='w-full flex justify-between items-center text-center pb-1 border-b border-black/10 mt-2'>
                                                <div className=''>Date Of Joining</div>
                                                <div className='font-bold'>{formatDate(selectedUser?.created_at) || "N/A"}</div>
                                            </div>
                                            <div className='w-full flex justify-between items-center text-center pb-1 border-b border-black/10 mt-2'>
                                                <div className=''>Organization</div>
                                                <div className='font-bold'>{selectedUser?.group?.name || "N/A"}</div>
                                            </div>
                                            <div className='w-full flex justify-between items-center text-center pb-1 border-b border-black/10 mt-2'>
                                                <div className=''>Account Status</div>
                                                <div className='font-bold'>{selectedUser?.status || "N/A"}</div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='w-[450px] flex flex-col ml-[9vw]'>
                                        <div className='flex w-full justify-center items-center mt-4 text-4xl text-black/20 font-semi-bold'>
                                            <div>
                                                No Active User
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
            {
                (viewStyle === 'grid' && isViewUsers[0]) && <UserCard updatePermission={isUpdateUsers} globalDeselect={globalDeselect} setGlobalDeselect={setGlobalDeselect} handleOpenOptions={handleOpenOptions} handleReInvite={handleReInvite} data={orgUsers} setSelectedUser={setSelectedUser} setViewStyle={setViewStyle} handleDeleteUser={handleDeleteUser} setOpenEditUser={setOpenEditUser} setEditSelectedUser={setEditSelectedUser} selectedUser={selectedUser} options={options} setOptions={setOptions} />
            }
        </div>
    )
}

export default Users

import { OptionIconSVG } from 'assets/svg_icons'
import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { formatDate } from '../../../redux/actions/authActions';
import Gavatar from 'components/gavatar';
import { shorternText } from 'utils/utilities';

const UserCard = ({ updatePermission, globalDeselect, setGlobalDeselect, data, handleOpenOptions, setViewStyle, handleReInvite, handleDeleteUser, setSelectedUser, options, setOptions, setOpenEditUser, setEditSelectedUser, selectedUser }) => {
    function makePairs(array, chunkSize) {
        const pairs = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            pairs.push(array.slice(i, i + chunkSize));
        }
        return pairs;
    }
    const sortedData = makePairs(data, 8)
    const handleOpenMenu = (v) => {
        if (options !== v) {
            setOptions(v)
        } else {
            setOptions(null)
        }
        if (globalDeselect !== "") {
            setGlobalDeselect("")
        }
    }
    const handleOpenCard = (v) => {
        setViewStyle('list');
        setSelectedUser(v);
        handleOpenOptions()
    }
    return (
        <div className='relative' style={{ zIndex: 1 }}>
            <div onClick={handleOpenOptions} className='w-full absolute h-full' />
            {
                sortedData?.map((sortedArray, index) => (
                    <div key={index} className={`overflow-auto`}>
                        <div style={{ width: 300 * sortedArray?.length }} className={`flex relative`}>
                            {
                                sortedArray?.map((v, i) => (
                                    <div key={i} className='flex relative flex-col justify-center items-center w-[300px] backdrop-blur-lg bg-white/60 border border-white rounded-2xl p-2 m-2 cursor-pointer hover:shadow-lg'>
                                        <div className='flex w-full justify-end relative'>
                                            <div style={!updatePermission[0] ? { display: 'none' } : {}} className='w-full flex'>
                                                <div style={{ zIndex: 1 }} onClick={() => handleOpenMenu("")} className='w-full h-full' />
                                                <div onClick={() => handleOpenMenu(v?.user_id)} className='w-6 h-6 flex justify-center items-center cursor-pointer'>
                                                    <OptionIconSVG />
                                                </div>
                                            </div>
                                            {
                                                options === v?.user_id && (
                                                    <div style={{ zIndex: 10 }}>
                                                        <div className=' backdrop-blur-lg bg-white/40 w-24 border-white border-b-2 absolute top-8 right-4 text-sm z-10 p-2 rounded-md shadow-2xl'>
                                                            {
                                                                v?.status === 'Pending' ? <div onClick={() => handleReInvite(v) || setOptions(null)} className='py-2 font-bold text-[15px]'>Re-Invite</div> : null
                                                            }
                                                            <div onClick={() => { setOpenEditUser(true); setEditSelectedUser(v); setOptions(null) }} className='py-2 font-bold text-[15px] select-none'>Edit</div>
                                                            {/* <div onClick={() => handleDeleteUser(v?.id) || setOptions(null)} className='py-2 text-danger'>Deactivate</div> */}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className='w-full flex flex-col justify-center items-center' onClick={() => handleOpenCard(v)}>
                                            <Gavatar size={80} fontSize={30} username={`${v?.first_name} ${v?.last_name}`} />
                                            <div className='text-md mt-2'>
                                                {v?.first_name || "N/A"} {v?.last_name}
                                            </div>
                                            <div className='text-md font-black'>
                                                {v?.designation || "N/A"}
                                            </div>

                                            <div className='flex w-full mt-5 mb-4 text-[12px]'>
                                                <div className='w-4/12 text-center'>
                                                    <div className='font-bold'>Role</div>
                                                    <div className=''>{shorternText(v?.role?.name || "") || "N/A"}</div>
                                                </div>
                                                <div className='w-4/12 text-center'>
                                                    <div className='font-bold'>Organization</div>
                                                    <div className=''>{shorternText(v?.group?.name || "") || "Main"}</div>
                                                </div>
                                                <div className='w-4/12 text-center'>
                                                    <div className='font-bold'>Status</div>
                                                    <div className=''>{v?.status || "N/A"}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default UserCard
import { OptionIconSVG } from 'assets/svg_icons'
import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Gavatar from 'components/gavatar';

const DriverCard = ({ data, setViewStyle, globalDeselect, setGlobalDeselect, handleOpenOptions, handleDeleteDriver, setSelectedDriver, options, setOptions, setOpenEditDriver, setEditSelectedDriver, selectedDriver, handleEditDriver, handleViewDriver, isUpdateDrivers }) => {
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
            handleOpenOptions()
        }
        if (globalDeselect !== "") {
            setGlobalDeselect("")
        }
    }

    return (
        <div className='w-full'>
            {
                sortedData?.map((sortedArray, index) => (
                    <div key={index} className={`w-full overflow-auto`}>
                        <div style={{ width: 300 * sortedArray?.length }} className={`flex`}>
                            {(globalDeselect || options) ? <div onClick={handleOpenOptions} className='w-full absolute top-0 h-full z-10' /> : null}
                            {
                                sortedArray?.map((v, i) => (
                                    <div key={i} style={{ zIndex: 10 }} className='flex flex-col justify-center items-center relative w-[300px] backdrop-blur-lg bg-white/60 border border-white rounded-2xl p-2 m-2 cursor-pointer hover:shadow-lg'>
                                        <div className='flex w-full justify-end'>
                                            <div className='w-full flex '>
                                                <div style={{ zIndex: 1 }} onClick={() => handleOpenMenu("")} className='w-full h-full' />
                                                <div onClick={() => handleOpenMenu(v?.name)} style={!isUpdateDrivers[0] ? { display: 'none' } : {}} className='w-6 h-6  flex justify-center items-center cursor-pointer'>
                                                    <OptionIconSVG />
                                                </div>
                                            </div>
                                            {
                                                options === v?.name && (
                                                    <div style={{ zIndex: 1000 }} className=' backdrop-blur-lg bg-white/40 w-24 absolute top-8 right-4 text-sm z-10 p-2 rounded-md'>
                                                        <div onClick={() => handleEditDriver(v)} className='py-2'>Edit</div>
                                                        <div onClick={() => handleDeleteDriver(v?.id)} className='py-2 text-danger'>Delete</div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className='w-full flex flex-col justify-center items-center' onClick={() => handleViewDriver(v)} >
                                            <Gavatar size={80} fontSize={30} username={v?.name} />
                                            <div className='text-md mt-2 select-text'>
                                                {v?.name || "N/A"}
                                            </div>
                                            <div className='text-md font-black select-text'>
                                                {v?.vehicle?.number_plate || "N/A"}
                                            </div>

                                            <div className='flex w-full mt-5 mb-4 text-[12px]'>
                                                <div className='w-4/12 text-center'>
                                                    <div className='font-bold'>Joining</div>
                                                    <div className='select-text'>{v?.date_of_joining || "N/A"}</div>
                                                </div>
                                                <div className='w-4/12 text-center'>
                                                    <div className='font-bold'>Serial No.</div>
                                                    <div className='select-text'>{v?.serial_number || "N/A"}</div>
                                                </div>
                                                <div className='w-4/12 text-center'>
                                                    <div className='font-bold'>License Valid</div>
                                                    <div className='select-text'>{"-"}</div>
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

export default DriverCard
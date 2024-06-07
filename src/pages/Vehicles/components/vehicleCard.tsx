import { InformationSVGIcon, OptionIconSVG } from 'assets/svg_icons'
import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';

const VehicleCard = ({ data, handleOpenOptions, globalDeselect, setGlobalDeselect, handleDeleteVehicle, options, setOptions, setOpenEditVehicle, setEditSelectedVehicle, carImage, viewStyle, setViewStyle, handleOpenListView, handleEdit, isUpdateVehicles }) => {
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

    return (
        <div className='w-full flex flex-wrap justify-start items-center'>
            {
                data?.map((v, i) => (
                    <div key={i} className='relative w-[325px] min-h-[350px] backdrop-blur-lg bg-white/70 border border-white rounded-2xl p-2 m-2 hover:shadow-lg'>
                        <div className='flex w-full justify-end'>
                            <div className='w-full flex justify-center items-center'>
                                <div onClick={() => handleOpenOptions() } className='w-full h-full z-10'/>
                                <div style={!isUpdateVehicles[0] ? { display: 'none' } : {}} onClick={() => handleOpenMenu(v?.id)} className='w-6 h-6 flex justify-center items-center cursor-pointer'>
                                    <OptionIconSVG />
                                </div>
                            </div>
                            {
                                options === v?.id && (
                                    <div className='backdrop-blur-lg bg-white/40 w-24 absolute top-8 right-4 text-sm z-10 p-2 rounded-md'>
                                        <div onClick={() => { handleEdit(v); handleOpenOptions() }} className='py-2 cursor-pointer'>Edit</div>
                                        <div onClick={() => { handleDeleteVehicle(v?.id); handleOpenOptions() }} className='py-2 cursor-pointer text-danger'>Delete</div>
                                    </div>
                                )
                            }
                        </div>
                        <div className='cursor-pointer' onClick={() => {handleOpenListView(v); handleOpenMenu("");}}>
                            <div className='font-bold flex justify-between'>
                                {v?.name || 'N/A'}
                                <InformationSVGIcon />
                            </div>
                            <div className='text-darkGray text-xs font-semibold'>
                                <div className='my-1 select-text'>{v?.number_plate || 'N/A'}</div>
                                <div className='my-1 select-text'>{v?.odo_meter_reading || 'N/A'} KMS ODOMETER</div>
                                <div className='my-1 select-text'>{v?.sim_number || 'N/A'}</div>
                            </div>

                            <div className='w-full flex justify-center'>
                                <img className='w-9/12' src={carImage} alt={"Car"} />
                            </div>

                            <div className='flex w-full mt-5 mb-4 text-[12px]'>
                                <div className='w-4/12 text-center'>
                                    <div className='text-[14px] font-bold select-text'>{`${v?.shift_hours} Hrs` || "N/A"}</div>
                                    <div className='font-bold text-darkGray'>SHIFT</div>
                                </div>
                                <div className='w-4/12 text-center'>
                                    <div className='text-[14px] font-bold select-text'>{v?.category?.slice(0, 10) || "N/A"}</div>
                                    <div className='font-bold text-darkGray'>CATEGORY</div>
                                </div>
                                <div className='w-4/12 text-center'>
                                    <div className='text-[14px] font-bold select-text'>{v?.type?.slice(0, 10) || "N/A"}</div>
                                    <div className='font-bold text-darkGray'>TYPE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default VehicleCard
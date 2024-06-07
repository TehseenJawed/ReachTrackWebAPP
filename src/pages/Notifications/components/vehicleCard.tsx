import { InformationSVGIcon, OptionIconSVG } from 'assets/svg_icons'
import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';

const VehicleCard = ({ data, handleDeleteVehicle, options, setOptions, setOpenEditVehicle, setEditSelectedVehicle, carImage, viewStyle, setViewStyle, handleOpenListView, handleEdit, isUpdateVehicles}) => {
    function makePairs(array, chunkSize) {
        const pairs = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            pairs.push(array.slice(i, i + chunkSize));
        }
        return pairs;
    }
    const sortedData = makePairs(data, 8)

    return (
        <div className='w-full'>
            {
                sortedData?.map((sortedArray, index) => (
                    <div key={index} className={`w-full overflow-auto`}>
                        <div style={{ width: 300 * sortedArray?.length }} className={`flex`}>
                            {
                                sortedArray?.map((v, i) => (
                                    <div key={i} onClick={() => handleOpenListView(v)} className='relative w-[300px] backdrop-blur-lg bg-white/70 border border-white rounded-2xl p-2 m-2 cursor-pointer hover:shadow-lg'>
                                        <div className='flex w-full justify-end'>
                                            <div style={!isUpdateVehicles[0] ? {display: 'none'} : {}} onMouseOver={() => setOptions(v?.name)} className='w-6 h-6  flex justify-center items-center cursor-pointer'>
                                                <OptionIconSVG />
                                            </div>
                                            {
                                                options === v?.name && (
                                                    <div className='backdrop-blur-lg bg-white/40 w-24 absolute top-8 right-4 text-sm z-10 p-2 rounded-md'>
                                                        <div onClick={() => handleEdit(v)} className='py-2'>Edit</div>
                                                        <div onClick={() => handleDeleteVehicle(v?.id)} className='py-2 text-danger'>Delete</div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className='font-bold flex justify-between'>
                                            {v?.name || 'N/A'}
                                            <InformationSVGIcon />
                                        </div>
                                        <div className='text-darkGray text-xs font-semibold'>
                                            <div className='my-1'>{v?.number_plate || 'N/A'}</div>
                                            <div className='my-1'>{v?.odo_meter_reading || 'N/A'} KMS ODOMETER</div>
                                            <div className='my-1'>{v?.cluster || 'N/A'}</div>
                                        </div>

                                        <div className='w-full flex justify-center'>
                                            <img className='w-9/12' src={carImage} alt={"Car"}/>
                                        </div>

                                        <div className='flex w-full mt-5 mb-4 text-[12px]'>
                                            <div className='w-4/12 text-center'>
                                                <div className='text-base font-bold'>{`${v?.shift_hours} Hrs` || "N/A"}</div>
                                                <div className='font-bold text-darkGray'>SHIFT</div>
                                            </div>
                                            <div className='w-4/12 text-center'>
                                                <div className='text-base font-bold'>{v?.ibc_vbc_department?.slice(0,10) || "N/A"}</div>
                                                <div className='font-bold text-darkGray'>DEPARTMENT</div>
                                            </div>
                                            <div className='w-4/12 text-center'>
                                                <div className='text-base font-bold'>{v?.benchmark?.slice(0,10) || "N/A"}</div>
                                                <div className='font-bold text-darkGray'>BENCHMARK</div>
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

export default VehicleCard
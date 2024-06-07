import { ExportSVG, DeleteSVG } from 'assets/svg_icons';
import React, { useState } from 'react';
import { Button } from '@mui/material'
import { deleteOilMaintenance, deleteTyreMaintenance, exportExcel } from '../../../redux/actions/trackActions';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

const HistoryTable = ({ data, option, selectedVehicle, isDeleteMaintenance }) => {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const handleDelete = (id, v) => {
        if(option === 'Tire') {
            if (isDeleteMaintenance[0]) {
               //@ts-ignore
               dispatch(deleteTyreMaintenance(id,(message, variant) => enqueueSnackbar(message, { variant: variant }), selectedVehicle?.id))
           } else {
               enqueueSnackbar("You do not have rights to delete maintenance.", { variant: "error" })
           }
        } else {
            if (isDeleteMaintenance[0]) {
                //@ts-ignore
                dispatch(deleteOilMaintenance(id,(message, variant) => enqueueSnackbar(message, { variant: variant }), selectedVehicle?.id))
            } else {
                enqueueSnackbar("You do not have rights to delete maintenance.", { variant: "error" })
            }
        }
    }
    return (
        <div className='w-[98%]'>
            <div style={{zIndex: 1000}} className='w-full flex justify-between items-center'>
                <div className='text-primary font-bold text-[25px] ml-4'>{option} History</div>
                <Button onClick={() => exportExcel(data, "maintenance.xlsx")} style={{ color: '#fff' }} size="large" className='cursor-pointer'>
                    <div className='px-4 border-b-2 border-l border-r border-primary flex justify-between items-center w-28 h-10 backdrop-blur-md bg-white/60 rounded-xl'>
                        <ExportSVG />
                        <span className='text-sm text-primary font-bold'>Export</span>
                    </div>
                </Button>
            </div>
            <div className="w-full mt-4 mb-12 p-4 rounded-xl bg-white/40 border-white border-2 border-t-0 backdrop-blur-md">
                <div className='flex items-center justify-between'>
                    <div className='text-center w-[14%] py-6 border-b border-black/20 font-semibold text-[20px]'>Serial No</div>
                    <div className='text-center w-[14%] py-6 border-b border-black/20 font-semibold text-[20px]'>Date</div>
                    <div className='text-center w-[14%] py-6 border-b border-black/20 font-semibold text-[20px]'>Mileage</div>
                    <div className='text-center w-[14%] py-6 border-b border-black/20 font-semibold text-[20px]'>Remarks</div>
                    <div className='text-center py-6 w-[25%] border-b border-black/20 font-semibold text-[20px]'>Action(s)</div>
                </div>
                {
                    data?.map((v,i) => {
                        const newDate = new Date(v?.lastChangeDate).toDateString()
                        return(
                            <div className='flex items-center justify-between'>
                                <div className='text-center w-[14%] text-[14px] flex justify-center'>
                                    <div className='py-6 border-b border-black/20'>{i+1}</div>
                                </div>
                                <div className='text-center w-[14%] text-[14px] flex justify-center'>
                                    <div className='py-6 border-b border-black/20'>{newDate}</div>
                                </div>
                                <div className='text-center w-[14%] text-[14px] flex justify-center'>
                                    <div className='p-6 border-b border-black/20'>{v?.expiryMilage}</div>
                                </div>
                                <div className='text-center w-[14%] text-[14px] flex justify-center'>
                                    <div className='p-6 border-b border-black/20'>{v?.remarks}</div>
                                </div>
                                <div className='text-center w-[25%] text-[14px] flex justify-center'>
                                    <div style={!isDeleteMaintenance[0] ? {display: 'none'} : {}} onClick={() => handleDelete(v?._id, v)} className='p-6 border-b border-black/20'><DeleteSVG /></div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
}

export default HistoryTable;
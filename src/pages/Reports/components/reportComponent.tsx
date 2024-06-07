import React from 'react'
import { Button } from '@mui/material'

interface ReportComponent {
    reportInfo: any,
    handleSelectReport: any
    handleChangePage: any 
}

const ReportComponent = (props: ReportComponent) => {
    const {name, desc} = props.reportInfo
    const handleSelect = () => {
        props.handleSelectReport(props.reportInfo);
        props.handleChangePage(1)
    }
  return (
    <div className='w-full flex items-center justify-between mt-4'>
        <div className='w-11/12'>
            <div className='font-bold '>{name}</div>
            <div className=''>{desc}</div>
        </div>
        <Button onClick={handleSelect} className='w-1/12 text-md font-black text-primary flex justify-center'>
            Select
        </Button>
    </div>
  )
}

export default ReportComponent
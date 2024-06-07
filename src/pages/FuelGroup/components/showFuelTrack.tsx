import React, {useEffect} from 'react';
import { TableHeaderProps } from '@/typecasts';

interface TableProps {
    rows: any;
    header: TableHeaderProps[],
    actionJSX: any
    filterByGroup: any,
    filterByPlate: any,
    filterByModel: any,
    filterByMeter: any,
    filterByDriverName: any,
    filterByDateOfJoining: any,
    setLoading: any,
    editId: string
    editStates: any,
    tableClass: string
    tablePaper: string
    editField: string
    newFuelRange: any
    setNewFuelRange: any
}

const defaultProps: TableProps = {
    rows: [],
    header: [],
    actionJSX: () => <div />,
    filterByGroup: () => console.log(''),
    filterByPlate: () => console.log(''),
    filterByModel: () => console.log(''),
    filterByMeter: () => console.log(''),
    filterByDriverName: () => console.log(''),
    filterByDateOfJoining: () => console.log(''),
    setLoading: () => console.log(''),
    editId: '',
    editStates: () => console.log(''),
    tableClass: '',
    tablePaper: '',
    editField: '',
    newFuelRange: {},
    setNewFuelRange: () => console.log('')
}

function ShowFuelTrack({ rows, header, newFuelRange, setNewFuelRange, editField, tablePaper, actionJSX, filterByGroup, filterByPlate, filterByModel, filterByMeter, filterByDriverName, filterByDateOfJoining, setLoading, editId, editStates }: TableProps) {
    
    // Avoid a layout jump when reaching the last page with empty rows.

    const handleFilter = (field: string) => {
        setLoading(true)
        switch (true) {
            case field === "PLATE NUMBER":
                filterByPlate()
                break;
            case field === "MAKE & MODEL":
                filterByModel()
                break;
            case field === "METER READING(KM)":
                filterByMeter()
                break;
            case field === "GROUP":
                filterByGroup()
                break;
            case field === "Driver Name":
                filterByDriverName()
                break;
            case field === "Date of Joining":
                filterByDateOfJoining()
                break;
            default:
                console.log('Could not filter');
        }
    }

    const showGroupsJSX = (value, key) => {
        if(value?.id !== editField) {
            return (
                <div>
                    <div key={key} className='flex justify-between items-center py-4'>
                        <div className='flex justify-center items-center w-3/12'>{value?.min_speed}</div>
                        <div className='flex justify-center items-center w-3/12'>{value?.max_speed}</div>
                        <div className='flex justify-center items-center w-3/12'>{value?.fuel_avg}</div>
                        {actionJSX(value)}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div key={key} className='flex justify-between items-center py-4'>
                        <div className='flex justify-center items-center w-3/12'>
                            <input type="number" onChange={(e) => setNewFuelRange({...newFuelRange, min_speed: e.target.value})} className='p-2 field-style m-1' placeholder="min-speed" alt=""/>
                        </div>
                        <div className='flex justify-center items-center w-3/12'>
                            <input type="number" onChange={(e) => setNewFuelRange({...newFuelRange, max_speed: e.target.value})} className='p-2 field-style m-1' placeholder='max-speed' alt=""/>
                        </div>
                        <div className='flex justify-center items-center w-3/12'>
                            <input type="number" onChange={(e) => setNewFuelRange({...newFuelRange, fuel_avg: e.target.value})} className='p-2 field-style m-1' placeholder='fuel average' alt=""/>
                        </div>
                        {actionJSX(value,newFuelRange)}
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
        console.log('====>',editField);
        setNewFuelRange({}) 
    },[editField])
    
    return (
        <div className={`${tablePaper} backdrop-blur-md bg-white/50 border-white border-2 rounded-xl`}>
            <div className='flex justify-between items-center'>
                {header?.map((column: TableHeaderProps, id) => (
                    <div
                        key={id}
                        className='font-bold text-sm justify-center items-center w-3/12 p-4'
                    >
                        <span className='flex justify-center items-center cursor-pointer text-black text-[15px] !border-b border-[#00000010] pb-2'>
                            {column.title}
                        </span>
                    </div>
                ))}
            </div>
            {
                rows.map((v, i) => showGroupsJSX(v, i))
            }
        </div>
    )
}

ShowFuelTrack.defaultProps = defaultProps;

export default ShowFuelTrack;
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import { LuArrowRightToLine, LuArrowLeftToLine } from "react-icons/lu";
import TableHead from '@mui/material/TableHead';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import { TableHeaderProps } from '@/typecasts';
import { IoIosArrowUp } from "react-icons/io";
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";

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
}

function ShowFuelGroups({ rows, header, tablePaper, actionJSX, filterByGroup, filterByPlate, filterByModel, filterByMeter, filterByDriverName, filterByDateOfJoining, setLoading, editId, editStates }: TableProps) {
    const [selected, setSelected] = React.useState<any>([]);
    // Avoid a layout jump when reaching the last page with empty rows.

    const showGroupsJSX = (value, key) => (
        <div>
            <div key={key} className='flex justify-between items-center py-4'>
                <div className='flex justify-center items-center w-3/12'>{value?.name}</div>
                <div className='flex justify-center items-center w-3/12'>{value?.fuel_ranges_count}</div>
                {actionJSX(value)}
            </div>
        </div>
    )
    
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

ShowFuelGroups.defaultProps = defaultProps;

export default ShowFuelGroups;
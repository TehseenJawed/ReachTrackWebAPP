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

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

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

function ShowGroups({ rows, header, tableClass, tablePaper, actionJSX, filterByGroup, filterByPlate, filterByModel, filterByMeter, filterByDriverName, filterByDateOfJoining, setLoading, editId, editStates }: TableProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [selected, setSelected] = React.useState<any>([]);
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

    const showGroupsJSX = (value, key) => (
        <div>
            <div key={key} className='flex justify-between items-center py-4'>
                <div onClick={() => setSelected([value?.id])} className='flex justify-center items-center w-1/12 cursor-pointer'>
                    {
                        value?.children[0] && (selected?.includes(value?.id) ? <MdOutlineKeyboardArrowDown /> : <MdKeyboardArrowRight />)
                    }
                </div>
                <div className='flex justify-center items-center w-3/12 select-text'>{value?.name}</div>
                <div className='flex justify-center items-center w-3/12 select-text'>{value?.description || "N/A"}</div>
                <div className='flex justify-center items-center w-3/12 select-text'>{value?.over_speeding_threshold || "N/A"}</div>
                {actionJSX(value)}
            </div>

            {
                // @ts-ignore
                (value?.children.length > 0 && selected?.includes(value?.id)) && (
                    <div>
                        <div className='ml-24 border border-black/10'>
                            <div className='flex justify-between items-center'>
                                <div className='flex justify-center items-center w-1/12'></div>
                                {header?.map((column: TableHeaderProps, id) => (
                                    <div
                                        key={id}
                                        className='font-bold text-sm justify-center items-center w-3/12 p-4'
                                    >
                                        <span className='flex justify-center items-center cursor-pointer text-black text-[15px] !border-b border-[#00000010] pb-2' onClick={column.filter ? () => handleFilter(column.title) : () => console.log('Not available')}>
                                            {column.title}
                                            {column.filter && <IoIosArrowUp className='ml-2' />}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {
                                value?.children?.map((v, i) => (
                                    <div>
                                        <div key={key} className='flex justify-between items-center py-4'>
                                            <div onClick={() => setSelected([...selected, v?.id])} className='flex justify-center items-center w-1/12 cursor-pointer'>
                                                {
                                                    v?.children[0] && (selected?.includes(v?.id) ? <MdOutlineKeyboardArrowDown /> : <MdKeyboardArrowRight />)
                                                }
                                            </div>
                                            <div className='flex justify-center items-center w-3/12 select-text'>{v?.name}</div>
                                            <div className='flex justify-center items-center w-3/12 select-text'>{v?.description || "N/A"}</div>
                                            <div className='flex justify-center items-center w-3/12 select-text'>{v?.over_speeding_threshold || "N/A"}</div>
                                            {actionJSX(v)}
                                        </div>

                                        {
                                            (v?.children.length > 0 && selected?.includes(v?.id)) && (
                                                <div className='ml-24 border border-black/10'>
                                                    <div className='flex justify-between items-center'>
                                                        <div className='flex justify-center items-center w-1/12'></div>
                                                        {header?.map((column: TableHeaderProps, id) => (
                                                            <div
                                                                key={id}
                                                                className='font-bold text-sm justify-center items-center w-3/12 p-4'
                                                            >
                                                                <span className='flex justify-center items-center cursor-pointer text-black text-[15px] !border-b border-[#00000010] pb-2' onClick={column.filter ? () => handleFilter(column.title) : () => console.log('Not available')}>
                                                                    {column.title}
                                                                    {column.filter && <IoIosArrowUp className='ml-2' />}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {
                                                        v?.children?.map((innerValue, innerIndex) => (
                                                            <div>
                                                                <div key={key} className='flex justify-between items-center py-4'>
                                                                    <div onClick={() => setSelected([...selected, innerValue?.id])} className='flex justify-center items-center w-1/12 cursor-pointer'>
                                                                        {
                                                                            innerValue?.children[0] && (selected?.includes(innerValue?.id) ? <MdOutlineKeyboardArrowDown /> : <MdKeyboardArrowRight />)
                                                                        }
                                                                    </div>
                                                                    <div className='flex justify-center items-center w-3/12 select-text'>{innerValue?.name}</div>
                                                                    <div className='flex justify-center items-center w-3/12 select-text'>{innerValue?.description || "N/A"}</div>
                                                                    <div className='flex justify-center items-center w-3/12 select-text'>{innerValue?.over_speeding_threshold || "N/A"}</div>
                                                                    {actionJSX(innerValue)}
                                                                </div>


                                                                {
                                                                    (innerValue?.children.length > 0 && selected?.includes(innerValue?.id)) && (
                                                                        <div className='ml-24 border border-black/10'>
                                                                            <div className='flex justify-between items-center'>
                                                                                <div className='flex justify-center items-center w-1/12'></div>
                                                                                {header?.map((column: TableHeaderProps, id) => (
                                                                                    <div
                                                                                        key={id}
                                                                                        className='font-bold text-sm justify-center items-center w-3/12 p-4'
                                                                                    >
                                                                                        <span className='flex justify-center items-center cursor-pointer text-black text-[15px] !border-b border-[#00000010] pb-2' onClick={column.filter ? () => handleFilter(column.title) : () => console.log('Not available')}>
                                                                                            {column.title}
                                                                                            {column.filter && <IoIosArrowUp className='ml-2' />}
                                                                                        </span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                            {
                                                                                innerValue?.children?.map((insideValue, innerIndex) => (
                                                                                    <div>
                                                                                        <div key={key} className='flex justify-between items-center py-4'>
                                                                                            <div onClick={() => setSelected([...selected, v?.id])} className='flex justify-center items-center w-1/12 cursor-pointer'>
                                                                                                {
                                                                                                    insideValue?.children[0] && (selected?.includes(insideValue?.id) ? <MdOutlineKeyboardArrowDown /> : <MdKeyboardArrowRight />)
                                                                                                }
                                                                                            </div>
                                                                                            <div className='flex justify-center items-center w-3/12 select-text'>{insideValue?.name}</div>
                                                                                            <div className='flex justify-center items-center w-3/12 select-text'>{insideValue?.description || "N/A"}</div>
                                                                                            <div className='flex justify-center items-center w-3/12 select-text'>{insideValue?.over_speeding_threshold || "N/A"}</div>
                                                                                            {actionJSX(insideValue)}
                                                                                        </div>
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
    return (
        <div className={`${tablePaper} backdrop-blur-md bg-white/60 border-white border-2 rounded-xl`}>
            <div className='flex justify-between items-center'>
                <div className='flex justify-center items-center w-1/12'></div>
                {header?.map((column: TableHeaderProps, id) => (
                    <div
                        key={id}
                        className='font-bold text-sm justify-center items-center w-3/12 p-4'
                    >
                        <span className='flex justify-center items-center cursor-pointer text-black text-[15px] !border-b border-[#00000010] pb-2' onClick={column.filter ? () => handleFilter(column.title) : () => console.log('Not available')}>
                            {column.title}
                            {column.filter && <IoIosArrowUp className='ml-2' />}
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

ShowGroups.defaultProps = defaultProps;

export default ShowGroups;
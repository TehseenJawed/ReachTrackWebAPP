import React, { useState } from 'react';
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
import { TextField } from '@mui/material'
import SelectBox from 'components/select';
import { useSelector } from 'react-redux';
import { FUEL_GROUPS, TRACKER } from '../../../redux/reducers/trackReducer';
import GroupSelection from 'components/GroupSelection';
import TrackerSelection from 'components/trackerSelection';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <div>One</div> : <LuArrowLeftToLine size={20} />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <div>Arrow Right</div> : <MdOutlineArrowBackIos size={20} />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <div>Arrow Left</div> : <MdOutlineArrowForwardIos size={20} />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <div>First Icon</div> : <LuArrowRightToLine size={20} />}
            </IconButton>
        </Box>
    );
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

function VehicleTable({ rows, header, tableClass, tablePaper, actionJSX, filterByGroup, filterByPlate, filterByModel, filterByMeter, filterByDriverName, filterByDateOfJoining, setLoading, editId, editStates }: TableProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [group, setGroup] = useState<any>(null)
    const [tracker, setTracker] = useState<any>(null)
    const fuelGroup = useSelector(FUEL_GROUPS)
    const trackerData = useSelector(TRACKER)
    const { editData, setEditData } = editStates

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event?.target?.value, 10));
        setPage(0);
    };

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

    const handleChangeTracker = (e) => {
        console.log('E --->>> ',e.target.value)
        const newObj = {
            ...editData,
            imei: e.target.value?.imei,
            sim_number: e.target.value?.sim_number
        }
    }
    return (
        <TableContainer className={`${tablePaper} backdrop-blur-md bg-white/60 border-white border-2 rounded-xl`}>
            <Table sx={{
                minWidth: 500, [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none",
                }
            }} aria-label="custom pagination table" className={`${tableClass} bg-[#1E1E1E0D] rounded-lg`}>
                <TableHead>
                    <TableRow>
                        {header?.map((column: TableHeaderProps, id) => (
                            <TableCell
                                key={id}
                                style={{ minWidth: column?.minWidth }}
                            >
                                <span className='flex justify-center items-center cursor-pointer text-black text-sm !border-b border-[#00000010] pb-2' onClick={column.filter ? () => handleFilter(column.title) : () => console.log('Not available')}>
                                    {column.title}
                                    {column.filter && <IoIosArrowUp className='ml-2' />}
                                </span>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows?.map((v, i) => {
                            return (
                                <TableRow>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs  text-center'>
                                        {
                                            editId === v?.id ? (
                                                <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                                                    <InputLabel id="demo-select-small-label">{editData?.imei}</InputLabel>
                                                    <Select
                                                        labelId="demo-select-small-label"
                                                        id="demo-select-small"
                                                        label={'IMEI'}
                                                        onChange={handleChangeTracker}
                                                    >
                                                        {
                                                            trackerData.map((v, i) => <MenuItem key={i} value={v}>{v?.imei}</MenuItem>)
                                                        }
                                                    </Select>
                                                </FormControl>
                                            ) : v?.imei
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            v?.sim_number || "N/A"
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            editId === v?.id ? <TextField required type={"text"} value={editData?.region} placeholder={"Registr.No."} onChange={(e) => setEditData({ ...editData, region: e.target.value })} /> : v?.region || "N/A"
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            editId === v?.id ? <TextField required type={"text"} value={editData?.category} placeholder={"Category"} onChange={(e) => setEditData({ ...editData, category: e.target.value })} /> : v?.category || "N/A"
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            editId === v?.id ? <TextField required type={"text"} value={editData?.cluster} placeholder={"Cluster"} onChange={(e) => setEditData({ ...editData, cluster: e.target.value })} /> : v?.cluster || "N/A"
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            editId === v?.id ? <TextField required type={"text"} value={editData?.region} placeholder={"Region"} onChange={(e) => setEditData({ ...editData, region: e.target.value })} /> : v?.region || "N/A"
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            editId === v?.id ? <TextField required type={"text"} value={editData?.ibc_vbc_department} placeholder={'IBC/VBC/Department'} onChange={(e) => setEditData({ ...editData, ibc_vbc_department: e.target.value })} /> : v?.ibc_vbc_department || "N/A"
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            editId === v?.id ? <TextField required type={"text"} value={editData?.shift_hours} placeholder={"Shift (Hrs)"} onChange={(e) => setEditData({ ...editData, shift_hours: e.target.value })} /> : v?.shift_hours || "N/A"
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            editId === v?.id ? <TextField required type={"text"} value={editData?.benchmark} placeholder={"Benchmark"} onChange={(e) => setEditData({ ...editData, benchmark: e.target.value })} /> : v?.benchmark || "N/A"
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            editId === v?.id ? <TextField required type={"text"} value={editData?.number_plate} placeholder={"Plate No."} onChange={(e) => setEditData({ ...editData, number_plate: e.target.value })} /> : v?.number_plate || "N/A"
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            editId === v?.id ? <div>
                                                <TextField required type={"text"} value={editData?.make} placeholder={"Make"} onChange={(e) => setEditData({ ...editData, make: e.target.value })} />
                                                <TextField required type={"text"} value={editData?.model} placeholder={"Model"} onChange={(e) => setEditData({ ...editData, model: e.target.value })} />
                                            </div> : `${v?.make || "N/A"} ${v?.model || "N/A"}`
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            editId === v?.id ? <TextField required type={"text"} value={editData?.odo_meter_reading} placeholder={"Meter Reading (Km)"} onChange={(e) => setEditData({ ...editData, odo_meter_reading: e.target.value })} /> : v?.odo_meter_reading || "N/A"
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            editId === v?.id ? <SelectBox options={fuelGroup} handleChange={(e) => setEditData({ ...editData, fuel_group_id: e.target.value })} value={editData?.fuel_group_id} label={"Fuel Group"} /> : v?.fuel_group_name || "N/A"
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            editId === v?.id ? <TextField required type={"text"} value={editData?.type} placeholder={"Type"} onChange={(e) => setEditData({ ...editData, type: e.target.value })} /> : v?.type || "N/A"
                                        }
                                    </TableCell>
                                    <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {
                                            editId === v?.id ? <GroupSelection primaryStyle={false} group={group} setGroup={(value) => { setEditData({ ...editData, group_id: value?.id }); setGroup(value) }} placeholder={"Select Group"} /> : v?.group_name || "N/A"
                                        }
                                    </TableCell>
                                    {/* <TableCell key={i} align={'center'} component="th" scope="row" className='!text-xs '>
                                        {v?.fuel_group_id || "N/A"}
                                    </TableCell> */}
                                    {actionJSX(v)}
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={4}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

VehicleTable.defaultProps = defaultProps;

export default VehicleTable;
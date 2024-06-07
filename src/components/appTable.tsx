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
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { LuArrowRightToLine, LuArrowLeftToLine } from "react-icons/lu";
import TableHead from '@mui/material/TableHead';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import { TableHeaderProps } from '@/typecasts';
import AccordionSummary from '@mui/material/AccordionSummary';
import { IoIosArrowUp } from "react-icons/io";
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import InputField from './inputField.tsx'

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

function AppTable({ rows, header, tableClass, tablePaper, actionJSX, filterByGroup, filterByPlate, filterByModel, filterByMeter, filterByDriverName, filterByDateOfJoining, setLoading, editId, editStates }: TableProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const rowKeys = Object.keys(rows[0])
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
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
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeEditField = (key: string, value: string) => {
        let newObj = {
            ...editData
        }
        newObj[key] = value
        setEditData(newObj)
    }

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
                        rowsPerPage > 0 && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <TableRow key={row?.name}>
                                    {
                                        rowKeys?.map((v, i) => (
                                            <TableCell key={i} component="th" scope="row" className='!text-xs '>
                                                <div className='pb-2 !border-b border-[#00000010] flex justify-center'>
                                                    {
                                                        editId !== row?.imei ?
                                                            typeof (row[rowKeys[i]]) === 'object' ? row[rowKeys[i]].join(', ') : row[rowKeys[i]] :
                                                            <InputField className="w-full"  type={"text"} fieldClassName="" label={row[rowKeys[i]]} placeholder={row[rowKeys[i]]} value={editData[rowKeys[i]]} setChange={(value: string) => handleChangeEditField(rowKeys[i], value)} />
                                                    }
                                                </div>
                                            </TableCell>
                                        ))
                                    }
                                    {actionJSX(row)}
                                </TableRow>
                            )

                        })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
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

AppTable.defaultProps = defaultProps;

export default AppTable;
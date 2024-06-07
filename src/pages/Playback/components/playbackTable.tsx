import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { playbackVehicleData } from 'apis/api_response';

interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'name', label: 'Date Time', minWidth: 170 },
    { id: 'code', label: 'Location', minWidth: 100 },
    { id: 'code', label: 'Speed', minWidth: 100 },
    { id: 'code', label: 'Angle', minWidth: 100 },
    { id: 'code', label: 'Status', minWidth: 100 },
    { id: 'code', label: 'Event', minWidth: 100 },
];

interface PlaybackTableProps {
    selectedPlayback: PlaybackTableProps | any;
    setSelectedPlayback: any
} 

export default function PlaybackTable({selectedPlayback, setSelectedPlayback}: PlaybackTableProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const labels = Object.keys(playbackVehicleData[0])
    return (
        <Paper className='backdrop-blur-md bg-white/10 !bg-none' >
            <TableContainer style={{background: 'none'}} className='h-[50vh]'>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                key={''}
                                align={'left'}
                                style={{ minWidth: 100 }}
                            >
                                #
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {playbackVehicleData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow selected={selectedPlayback?.id === row?.id} onClick={() => setSelectedPlayback(row)} hover role="checkbox" tabIndex={1} key={index}>
                                        
                                        {labels.map((data, ind) => {
                                            const value = row[labels[ind]];
                                            return (
                                                <TableCell key={ind} align={'left'}>
                                                    {
                                                        typeof(value) === 'object' ? value.join(', ') : value
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={playbackVehicleData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
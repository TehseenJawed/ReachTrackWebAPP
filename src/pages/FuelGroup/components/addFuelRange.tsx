import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputField from 'components/inputField';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { createFuelRange, deleteFuelRangeAction, getFuelRangeData, handleEditFuelRangeAction, updateFuelRange } from '../../../redux/actions/trackActions';
import { AddIconGreenSVG, AddIconSVG, AnalyticsSVG, DeleteSVG, EdotSVG } from 'assets/svg_icons';
import ShowFuelTrack from './showFuelTrack';
import { FUEL_RANGE } from '../../../redux/reducers/trackReducer';

export default function AddFuelRange({ open, setOpen, data }) {
    const [groupData, setGroupData] = useState<any>(data)
    const [editField, setEditField] = useState<any>(null)
    const [editFlag, setEditFlag] = useState<any>(false)
    const [newFuelRange, setNewFuelRange] = React.useState<any>({});
    const dispatch = useDispatch()
    const fuelRange = useSelector(FUEL_RANGE)
    const [fuelRangeData, setFuelRangeData] = useState<any>(fuelRange)
    const { enqueueSnackbar } = useSnackbar();

    console.log('Now...', fuelRangeData);

    const header = [
        {
            title: 'MIN SPEED (KM/H)',
            minWidth: 150,
            align: 'right',
            filter: false,
        },
        {
            title: 'MAX SPEED (KM/H)',
            minWidth: 200,
            align: 'right',
            filter: false,
        },
        {
            title: 'FUEL AVG (KM/LTR)',
            minWidth: 200,
            align: 'right',
            filter: false,
        },
        {
            title: 'Action(s)',
            minWidth: 125,
            align: 'right',
            filter: false,
        },
    ]

    const handleClose = () => {
        setOpen(false);
        dispatch(updateFuelRange([]))
        setEditField(null);
        setGroupData([])
        setFuelRangeData([])
        setNewFuelRange({})
    };

    const handleAddFuelRange = () => {
        const newObj = [
            ...fuelRangeData,
            {
                min_speed: '',
                max_speed: '',
                fuel_avg: '',
                id: '1'
            }
        ]
        setFuelRangeData(newObj)
        setEditField('1')
        setEditFlag(false)
        setNewFuelRange({})
    }

    const deleteFuelRange = (id) => {
        //@ts-ignore
        dispatch(deleteFuelRangeAction(id, data?.id, (message, variant) => enqueueSnackbar(message, { variant: variant })))
    }
    const handleEditFuelRange = (editData, value) => {
        if (editData?.min_speed && editData?.max_speed && editData?.fuel_avg) {
            const newObj = {
                ...editData,
                fuel_group_id: data?.id
            }
            //@ts-ignore
            dispatch(handleEditFuelRangeAction(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant }), value?.id))
            setEditField(null)
            setEditFlag(false)
            setNewFuelRange({})
        } else {
            enqueueSnackbar("Please fill all fields.", { variant: 'error' })
        }
    }

    const handleCreateFuelRange = (obj) => {
        if (obj?.min_speed && obj?.max_speed && obj?.fuel_avg) {
            const newObj = {
                ...obj,
                fuel_group_id: data?.id
            }
            //@ts-ignore
            dispatch(createFuelRange(newObj, (message, variant) => enqueueSnackbar(message, { variant: variant })))
        } else {
            enqueueSnackbar("Please fill all fields.", { variant: 'error' })
        }
    }

    const actionJSX = (value, data: any) => {
        console.log('editField !== data?.id ', editField, data?.id);
        if (editField === value?.id) {
            return (
                <div className='flex justify-center items-center w-3/12'>
                    <div onClick={() => editFlag ? handleEditFuelRange(data, value) : handleCreateFuelRange(data)} className='text-primary cursor-pointer'>save</div>
                </div>
            )
        } else {
            return (
                <div className='flex justify-center items-center w-3/12'>
                    <EdotSVG onClick={() => { setEditField(value?.id); setEditFlag(true); setNewFuelRange({}) }} color={'#5C86F3'} className='mx-2 hover:bg-gray-extralight rounded cursor-pointer' />
                    <DeleteSVG onClick={() => deleteFuelRange(value?.id)} color={'#5C86F3'} className='mx-2 hover:bg-gray-extralight rounded cursor-pointer' />
                </div>
            )
        }
    }

    const contentJSX = () => {
        return (
            <div className='flex flex-wrap w-full'>
                <ShowFuelTrack newFuelRange={newFuelRange} setNewFuelRange={setNewFuelRange} tablePaper={'w-full rounded-xl'} tableClass={''} editField={editField} actionJSX={actionJSX} rows={fuelRangeData} header={header} />
            </div>
        )
    }

    useEffect(() => {
        if (fuelRange[0]) {
            setFuelRangeData(fuelRange)
        }
    }, [fuelRange])
    useEffect(() => {
        if (open && data?.name) {
            setGroupData(data)
            console.log('Calling again....');

            // @ts-ignore
            dispatch(getFuelRangeData(() => (message, variant) => enqueueSnackbar(message, { variant: variant }), data?.id))
        }
    }, [open === true])
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>
                    <div className='flex w-full justify-between items-center'>
                        Fuel Group Details: {groupData?.name}
                        <div onClick={handleAddFuelRange} className='w-[150px] h-12 bg-primary text-white flex justify-center items-center text-base cursor-pointer'>
                            Add FuelRange
                        </div>
                    </div>
                </DialogTitle>

                <DialogContent>
                    {contentJSX()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CLOSE</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
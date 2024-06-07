import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SelectField from 'components/selectField';
import { useDispatch, useSelector } from 'react-redux';
import InputField from 'components/inputField';
import { ROLES, VEHICLES_DATA } from '../../../redux/reducers/trackReducer'
import { useSnackbar } from 'notistack';
import GroupSelection from 'components/GroupSelection';
import { updateOrganizationUser } from '../../../redux/actions/trackActions';

export default function EditUser({ permission, open, setOpen, data, setSelectedDriver, setOptions }) {
    const [userData, setUserData] = useState<any>()
    const [error, setError] = useState<boolean>(false)
    const [group, setGroup] = useState<any>(null)
    const vehicleData = useSelector(VEHICLES_DATA)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()
    const userRoles = useSelector(ROLES)

    const handleClose = () => {
        setUserData(null)
        setOpen(false);
        setOptions(null)
    };

    const handleUpdate = () => {
        if(permission[0]) {
            const newObj = {
                ...(userData?.designation !== data?.designation && { designation: userData?.designation }),
                ...(group?.id !== undefined && group?.id !== data?.group_id && { group_id: group?.id }),
                ...(userData?.role_id !== data?.role?.id && { role_id: userData?.role_id }),
            }
            if (data?.user_id) {
                // @ts-ignore
                dispatch(updateOrganizationUser(data?.user_id, newObj, (message, variant) => enqueueSnackbar(message, { variant: variant })))
                // setSelectedDriver(null)
                handleClose()
            } else {
                enqueueSnackbar('User ID not exist', { variant: 'error' })
            }
        } else {
            enqueueSnackbar('You do not have rights to update existing user.', { variant: 'error' })
        }
    }

    const contentJSX = () => {
        return (
            <div className='flex flex-wrap w-full'>
                <div className='w-3/6 mt-4'>
                    <SelectField className="" fieldClassName="w-[220px]" label={"USER ROLE"} handleChange={(e) => setUserData({ ...userData, role_id: e?.target?.value })} value={userData?.role_id} options={userRoles} objKey="name" receive="id" />
                    {
                        error && userData?.role_id === "" && <div className='text-danger text-[8px]'>*Field is required.</div>
                    }
                </div>
                <div className='w-3/6 mt-4'>
                    <GroupSelection group={group} setGroup={setGroup} placeholder={"SELECT GROUP"} />
                    {
                        error && group === null && <div className='text-danger text-[8px]'>*Field is required.</div>
                    }
                </div>
                <InputField className="w-3/6 mt-4" fieldClassName="w-[220px]" error={error ? userData?.designation === "" : false} label={"DESIGNATION"} placeholder={"Designation"} value={userData?.designation} setChange={(e) => setUserData({ ...userData, designation: e.target.value })} />
            </div>
        )
    }

    useEffect(() => {
        const newObj = {
            designation: data?.designation,
            role_id: data?.role?.id,
            group: data?.group,
        }
        setUserData(newObj)
        setGroup(data?.group)
    }, [open])
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
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Update User</DialogTitle>
                <DialogContent>
                    {contentJSX()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdate}>UPDATE</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
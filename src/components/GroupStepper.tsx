
import React, { useState } from 'react'
import { DropIcon } from 'assets/svg_icons'
import { useSelector, useDispatch } from 'react-redux'
import { GROUP_DATA } from '../redux/reducers/trackReducer'
import { getVehicleByGroups } from '../redux/actions/trackActions'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

const GroupStepper = ({ group, setGroup, placeholder }) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const groupData = useSelector(GROUP_DATA)
    const [activeGroup, setActiveGroup] = useState(groupData)
    const [stepper, setStepper] = useState([])

    const handleChange = (e) => {
        setStepper([...stepper, e?.target?.value?.name])
        setActiveGroup(e?.target?.value?.children)
        // @ts-ignore
        dispatch(getVehicleByGroups(e?.target?.value?.id))
        setGroup(e?.target?.value)

    }
    const selectField = (value) => {
        setGroup(value)
        setOpen(!open)
    }
    
    return (
        <div className='w-full relative flex items-center flex-wrap'>

            <Breadcrumbs aria-label="breadcrumb" className="mr-1">
                {
                    stepper?.map((v, i) => (
                        <div>
                            {
                                stepper?.length === i + 1 ? <Typography color="text.primary">{v}</Typography> : <div>{v}</div>
                            }
                        </div>
                    ))
                }
            </Breadcrumbs>

            {
                activeGroup?.length !== 0 && (
                    <FormControl sx={{ mt: 1, minWidth: 200 }} size="small">
                        <InputLabel id="demo-simple-select-label">Parent Group</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChange}
                        >
                            {
                                activeGroup?.map((v: any, i) => {
                                    return (<MenuItem value={v}>{v?.name}</MenuItem>)
                                })
                            }
                        </Select>
                    </FormControl>
                )
            }
        </div>
    )
}

export default GroupStepper

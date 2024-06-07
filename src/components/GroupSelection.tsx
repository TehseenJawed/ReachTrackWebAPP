import React, { useState } from 'react'
import { DropIcon } from 'assets/svg_icons'
import { useSelector, useDispatch } from 'react-redux'
import { GROUP_DATA } from '../redux/reducers/trackReducer'
import { getVehicleByGroups } from '../redux/actions/trackActions'
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const defaultProps: any = {
    border: true,
    primaryStyle: true,
    placeholder: 'Select',
    group: {},
    setGroup: () => console.log('New'),
    zIndex: 0,
}

const GroupSelection = ({ group, setGroup, placeholder, border, primaryStyle, zIndex }) => {
    const [open, setOpen] = useState(false)
    const groupData = useSelector(GROUP_DATA)
    const selectField = (value) => {
        setGroup(value)
        setOpen(!open)
        // @ts-ignore
        dispatch(getVehicleByGroups(value?.id))
    }
    return (
        <div className='w-full' style={{ zIndex: zIndex }}>
            {
                open && <div onClick={() => setOpen(false)} className='w-screen h-full absolute left-0 top-0 z-10'/>
            }
            {
                // open && <div onClick={() => setOpen(!open)} className='cursor-pointer w-[130%] h-[90vh] absolute left-0 -top-28' />
            }
            <div className='relative font-normal'>
                <div onClick={() => setOpen(!open)} className={`${primaryStyle ? "" : ""} rounded-md cursor-pointer`}>
                    <div className='text-xs'>
                        {placeholder}
                    </div>
                    <div className='flex justify-between border-b h-[38px] pt-2'>
                        {
                            group?.name ? `${group?.name}` : 'Select'
                        }
                        {
                            open ? <MdArrowDropUp color='#606060' size={20}/> : <MdArrowDropDown color='#606060' size={20}/>
                        }
                    </div>
                </div>
                {
                    open && (
                        <div style={{zIndex: 100000}} className={` h-[150px] absolute shadow-xl mt-0 bg-white overflow-auto backdrop-blur-lg w-full text-sm`}>
                            {
                                groupData.length ? (
                                    groupData.map((v: any, i) => {
                                        return (
                                            <div className='ml-2 mt-2'>
                                                <div onClick={() => selectField(v)} className='hover:bg-primary/30 cursor-pointer py-1 text-left'>
                                                    {v?.name}
                                                </div>
                                                {
                                                    v.children.length !== 0 && (
                                                        <div>
                                                            {
                                                                v.children.map((v, i) => (
                                                                    <div>
                                                                        <div onClick={() => selectField(v)} className='flex items-center cursor-pointer hover:bg-primary/30 px-2 py-1'>
                                                                            <div className='w-6 border border-black/20 h-0' />
                                                                            <div className='ml-2'>{v?.name}</div>
                                                                        </div>
                                                                        {
                                                                            v.children.map((v, i) => {
                                                                                return (
                                                                                    <div>
                                                                                        <div className='hover:bg-primary/30 px-2 py-1'>
                                                                                            <div onClick={() => selectField(v)} className='flex items-center cursor-pointer'>
                                                                                                <div className='w-12 border border-black/20 h-0' />
                                                                                                <div className='ml-2'>{v?.name}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                        {
                                                                                            v?.children.map((v, i) => {
                                                                                                return (
                                                                                                    <div>
                                                                                                        <div className='hover:bg-primary/30 px-2 py-1'>
                                                                                                            <div onClick={() => selectField(v)} className='flex items-center cursor-pointer'>
                                                                                                                <div className='w-24 border border-black/20 h-0' />
                                                                                                                <div className='ml-2'>{v?.name}</div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className='w-full text-center'>No Results</div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

GroupSelection.defaultProps = defaultProps

export default GroupSelection

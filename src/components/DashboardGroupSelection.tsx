import React, { useState, useEffect } from 'react'
import { DropIcon } from 'assets/svg_icons'
import { useSelector, useDispatch } from 'react-redux'
import { GROUP_DATA } from '../redux/reducers/trackReducer'
import { updateActiveTrackVehicle } from '../redux/actions/trackActions'

const defaultProps: any = {
    border: true,
    primaryStyle: true,
    placeholder: 'Select',
    group: {},
    setGroup: () => console.log('New'),
    zIndex: 0,
}

const DashboardGroupSelection = ({ options,setOptions , group, setGroup, placeholder, border, primaryStyle, zIndex, dashboard=true, blur=false, globalDeselect, setGlobalDeselect }) => {
    const groupData = useSelector(GROUP_DATA)
    const dispatch = useDispatch();
    const selectField = (value) => {
        console.log('SELECT ...',value);
        setGroup(value)
        setGlobalDeselect("")
        
        // @ts-ignore
        // dispatch(updateActiveTrackVehicle(value))
    }
    const open = globalDeselect === placeholder
    const handleChangeValue = () => {
        if(globalDeselect !== placeholder) {
            setGlobalDeselect(placeholder)
        } else {
            setGlobalDeselect("")
        }
        if(options) {
            setOptions(false)
        }
    }
    useEffect(() => {
        if(globalDeselect === placeholder) {

        }
    },[globalDeselect])
    return (
        <div className={`ml-2 ${(globalDeselect === placeholder && !dashboard) ? '' : ''}`} style={{ zIndex: 1000 }}>
            {
                open && <div onClick={handleChangeValue} className='cursor-pointer w-[130%] h-auto absolute left-0 -top-28' />
            }
            <div className='font-normal'>
                <div onClick={handleChangeValue} className={`${primaryStyle ? "" : ""} ${border && "border border-black/20"} rounded-md cursor-pointer`}>
                    <div className={`mr-1 text-black font-bold text-lg select-none`}>
                        {
                            group?.name ? `${group?.name.slice(0, 12)}${(group?.name?.length > 12) ? '.' : ''}` : placeholder
                        }
                    </div>
                </div>
                {
                    (open  && dashboard && blur) && <div className=' h-[250px]' />
                }
                {
                    open && (
                        <div className={`max-h-[250px] ${!blur ? 'backdrop-blur-md bg-white/100' : null}  absolute -left-[0px] top-[33px] rounded-lg mt-0 overflow-auto min-w-full text-sm pb-4 set-drop dropdown`}>
                            <div onClick={() => selectField('')} className='pl-4 mt-[10px] hover:bg-primary/30 cursor-pointer py-1 text-left'>
                                All
                            </div>
                            {
                                groupData.length ? (
                                    groupData.map((v: any, i) => {
                                        return (
                                            <div className='mt-2'>
                                                <div onClick={() => selectField(v)} className='pl-4 hover:bg-primary/30 cursor-pointer py-1 text-left'>
                                                    {v?.name}
                                                </div>
                                                {/* {
                                                    v.children.length !== 0 && (
                                                        <div>
                                                            {
                                                                v.children.map((v, i) => (
                                                                    <div className=' border-l border-black/20'>
                                                                        <div onClick={() => selectField(v)} className='pl-6 flex items-center cursor-pointer hover:bg-primary/30 px-2 py-1'>
                                                                            <div className=''>{v?.name}</div>
                                                                        </div>
                                                                        {
                                                                            v.children.map((v, i) => {
                                                                                return (
                                                                                    <div className='border-l border-black/20'>
                                                                                        <div className='hover:bg-primary/30 py-1'>
                                                                                            <div onClick={() => selectField(v)} className='flex items-center cursor-pointer'>
                                                                                                <div className='ml-2'>{v?.name}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                        {
                                                                                            v?.children.map((v, i) => {
                                                                                                return (
                                                                                                    <div className='ml-4 border-l border-black/20'>
                                                                                                        <div className='hover:bg-primary/30 py-1'>
                                                                                                            <div onClick={() => selectField(v)} className='flex items-center cursor-pointer'>
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
                                                } */}
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

DashboardGroupSelection.defaultProps = defaultProps

export default DashboardGroupSelection

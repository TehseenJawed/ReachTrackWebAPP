import React, { useState } from 'react'
import { DropIcon } from 'assets/svg_icons'
import { useSelector, useDispatch } from 'react-redux'
import { GEOFENCEAREA, GROUP_DATA, SELECTED_GEOFENCE } from '../redux/reducers/trackReducer'
import { updateSelectedGroupVehicles } from '../redux/actions/trackActions'

const defaultProps: any = {
    border: true,
    primaryStyle: true,
    placeholder: 'Select',
    group: {},
    setGroup: () => console.log('New'),
    zIndex: 0,
}

const SelectionField = ({ options, setOptions, value, setValue, data, placeholder, border, primaryStyle, zIndex, viewKey, expand, blur=false, globalDeselect, setGlobalDeselect }) => {
    const open = globalDeselect === placeholder
    const handleChangeValue = () => {
        if(globalDeselect !== placeholder) {
            setGlobalDeselect(placeholder)
        } else {
            setGlobalDeselect("")
        }
        if(options){
            setOptions(false)
        }
    }
    const selectField = (value) => {
        setGlobalDeselect("")
        setValue(value)
    }
    return (
        <div className={`ml-2 ${open ? '' : ''}`} style={{ zIndex: zIndex }}>
            {
                open && <div onClick={handleChangeValue} className='cursor-pointer w-[130%] h-auto absolute left-0 -top-28' />
            }
            <div className='font-normal'>
                <div onClick={handleChangeValue} className={`${primaryStyle ? "" : ""} ${border && "border border-black/20"} rounded-md cursor-pointer`}>
                    <div className={`mr-1 text-black font-bold text-lg select-none`}>
                        {
                            value?.id ? value[viewKey] : placeholder
                        }
                    </div>
                </div>
                {
                    (open && expand && blur) && <div className=' h-[250px]' />
                }
                {
                    open && (
                        <div className={`${!blur ? 'backdrop-blur-md bg-white/100' : ''} border-b max-h-[250px] absolute -left-[0px] top-[33px] rounded-lg mt-0 overflow-auto min-w-[12rem] text-sm pb-4`}>
                            <div className='mt-2'>
                                <div onClick={() => selectField({})} className='pl-4 hover:bg-primary/30 cursor-pointer py-1 text-left'>
                                    All
                                </div>
                            </div>
                            {
                                data.length ? (
                                    data.map((v: any, i) => {
                                        return (
                                            <div className='ml-2 mt-2'>
                                                <div onClick={() => selectField(v)} className='pl-4 hover:bg-primary/30 cursor-pointer py-1 text-left'>
                                                    {v?.name}
                                                </div>
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

SelectionField.defaultProps = defaultProps

export default SelectionField

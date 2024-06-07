import { TextField } from '@mui/material'
import React from 'react'

interface FieldPropType {
    label: string,
    value: string,
    setChange: any,
    placeholder: string,
    className: string,
    fieldClassName: string,
    type: string
    rows: string
    variant: string,
    error: boolean,
    errorMessage: string,
    multiline: boolean,
}

const defaultProps: FieldPropType = {
    label: "",
    value: "",
    setChange: () => console.log(),
    placeholder: '',
    className: '',
    fieldClassName: '',
    type: 'text',
    rows: '1',
    variant: "standard",
    error: false,
    errorMessage:"Field is required.",
    multiline: false
}

const InputField = ({ label, value, setChange, placeholder, variant, className, fieldClassName, type, rows, error, errorMessage, multiline }: FieldPropType) => {
    return (
        <div className={`${className}`}>
            <label className='block text-xs mr-1 mb-1'>{label}</label>
            {
               
             type === 'number' ? (
                    <input
                        required
                        className={`text-md ${fieldClassName} border-b pt-2`}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        // @ts-ignore
                        variant={variant}
                        onChange={setChange}
                    />
                ) : (
                    (
                        <TextField
                            required
                            className={`text-md ${fieldClassName}`}
                            type={type}
                            value={value}
                            maxRows={7}
                            multiline={multiline}
                            rows={rows}
                            placeholder={placeholder}
                            // inputProps={{
                            //     sx: { paddingLeft: "4px" },
                            //   }}
                            // @ts-ignore
                            variant={variant}
                            onChange={setChange}
                        />
                    )
                )
            }
            {
                error && <div className='text-danger text-[8px]'>*{errorMessage}</div>
            }
            {/* <input className='w-full border-2 border-gray p-2 mt-1 rounded-md text-md' type="text" alt={label} value={value} placeholder={placeholder} onChange={(e) => setChange(e.target.value)} /> */}
        </div>
    )
}

InputField.defaultProps = defaultProps;

export default InputField
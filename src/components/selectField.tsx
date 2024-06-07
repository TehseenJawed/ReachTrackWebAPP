import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const defaultProps = {
  value: "",
  receive: false
}

 function SelectField({ value, className, fieldClassName, handleChange, label, options, objKey, receive }) {
  console.log('options....',options?.length === 0);
  
  return (
    <Box className={`${className}`}>
      <label className={`block text-xs mb-2 `}>{label}</label>
      <TextField
        id="filled-select-currency"
        className={` border-none ${fieldClassName}`}
        onChange={handleChange}
        select
        value={value}
        variant="standard"
      >
        {
          options?.length === 0 ?
          <MenuItem disabled>No data is available</MenuItem>
          :
          options.map((v) => (
            <MenuItem value={receive ? v[receive] : v[objKey]}>{v[objKey]}</MenuItem>
          ))
        }
      </TextField>
    </Box>
  );
}

SelectField.defaultProps = defaultProps;

export default SelectField
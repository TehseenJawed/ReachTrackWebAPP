import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBox({options, handleChange, value, label}) {
  return (
    <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label={label}
        onChange={handleChange}
      >
        {
          options.map((v,i) => <MenuItem key={i} value={v?.id}>{v?.name}</MenuItem>)
        }
      </Select>
    </FormControl>
  );
}
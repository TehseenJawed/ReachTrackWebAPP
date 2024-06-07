import * as React from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DatePickerJSX() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem>
          <DatePicker defaultValue={dayjs(new Date)}/>
        </DemoItem>
    </LocalizationProvider>
  );
}
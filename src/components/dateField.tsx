import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');
const todayStartOfTheDay = today.startOf('day');

export default function DateField({classNamePicker}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                    'DatePicker',
                ]}
            >
                <DatePicker
                    className={classNamePicker}
                    defaultValue={yesterday}
                    // variant={"standard"}
                    // disablePast
                    views={['year', 'month', 'day']}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
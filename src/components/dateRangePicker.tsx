// import * as React from 'react';
// import dayjs, { Dayjs } from 'dayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
// import { PickersShortcutsItem } from '@mui/x-date-pickers/PickersShortcuts';
// import { DateRange } from '@mui/x-date-pickers-pro';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';

// const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
//   {
//     label: 'This Week',
//     getValue: () => {
//       const today = dayjs();
//       return [today.startOf('week'), today.endOf('week')];
//     },
//   },
//   {
//     label: 'Last Week',
//     getValue: () => {
//       const today = dayjs();
//       const prevWeek = today.subtract(7, 'day');
//       return [prevWeek.startOf('week'), prevWeek.endOf('week')];
//     },
//   },
//   {
//     label: 'Last 7 Days',
//     getValue: () => {
//       const today = dayjs();
//       return [today.subtract(7, 'day'), today];
//     },
//   },
//   {
//     label: 'Current Month',
//     getValue: () => {
//       const today = dayjs();
//       return [today.startOf('month'), today.endOf('month')];
//     },
//   },
//   {
//     label: 'Next Month',
//     getValue: () => {
//       const today = dayjs();
//       const startOfNextMonth = today.endOf('month').add(1, 'day');
//       return [startOfNextMonth, startOfNextMonth.endOf('month')];
//     },
//   },
//   { label: 'Reset', getValue: () => [null, null] },
// ];

// interface dateRangePickerProps {
//     onChangeDateRange: any
// }
// export default function DateRangePickerJSX({onChangeDateRange}:dateRangePickerProps) {
//     const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
//   return (
//     <React.Fragment>
//         <div id='date-picker-calendar'>
//       <Dialog
//         fullScreen={fullScreen}
//         open={true}
//         onClose={() => console.log('Working....')}
//         aria-labelledby="responsive-dialog-title"
//       >
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <StaticDateRangePicker
//         slotProps={{
//           shortcuts: {
//             items: shortcutsItems,
//           },
//           actionBar: { actions: [] },
//         }}
//         calendars={2}
//       />
//     </LocalizationProvider>
//     </Dialog>
//       </div>
//     </React.Fragment>
//   );
// }






import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const ProSpan = styled('span')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: 'middle',
  marginLeft: '0.3em',
  marginBottom: '0.08em',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({
  componentName,
  valueType,
  isProOnly,
}: {
  componentName: string;
  valueType: string;
  isProOnly?: boolean;
}) {
  const content = (
    <span>
      <strong>Select</strong> date range to search.
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a href="https://mui.com/x/introduction/licensing/#pro-plan">
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

interface DateRangePickerProps {
    onChangeDateRange: any
}

export default function DateRangePickerJSX({onChangeDateRange}:DateRangePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DateRangePicker',
        ]}
      >
        <DemoItem
          label={
            <Label
              componentName="DateRangePicker"
              valueType="date range"
              isProOnly
            />
          }
          component="DateRangePicker"
        >
          <DateRangePicker
            onChange={onChangeDateRange}
            localeText={{
              start: '',
              end: '',
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
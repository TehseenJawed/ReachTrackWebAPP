import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function DelayTooltips({enter, leave, message, children, placement}) {
  return (
    <Tooltip key={message} title={message}  enterNextDelay={enter} leaveDelay={leave} placement={placement}>
      {children}
    </Tooltip>
  );
}
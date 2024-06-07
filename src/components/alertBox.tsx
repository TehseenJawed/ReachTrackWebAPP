import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function AlertBox({states}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {openAlert, setOpenAlert} = states

  const handleClose = () => {
    setOpenAlert(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <div className='!w-96'>{"Status: RELEASED"}</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            IMEI:350424066687557 <br />
            Plat Number:JZ-8301
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleClose} autoFocus>
            Kill Engine
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
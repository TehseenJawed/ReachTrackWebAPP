import React, {useState, useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SelectField from 'components/selectField';
import InputField from 'components/inputField';
import { ComplaintFormProps } from '@/typecasts';
import DatePicker from 'components/datePicker';
import { reasonsArray } from 'apis/api_response';

export default function ComplaintBox({states}) {
  const theme = useTheme();
  const [formData, setFormData] = useState<ComplaintFormProps>({
    reason: "",
    complaintDesc: "",
    pocName: "",
    pocContactNumber: "",
    vehicleLocation: "",
  })
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {openComplaint, setOpenComplaint} = states
  const handleClose = () => {
    setOpenComplaint(false);
  };
  
  const handleSelectReason = (value: string) => {
    const newObj = {
        ...formData,
        reason: value
    }
    setFormData(newObj)
  }
  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={openComplaint}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle 
         id="responsive-dialog-title">
          <div className='!w-96 text-xl'>{"New Complaint"}</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='w-full'>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Device Imei</span>
                <span className='!w-3/6'>350424068634185</span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Device Msisdn</span>
                <span className='!w-3/6'>3487211382</span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Vehicle Registration No.</span>
                <span className='!w-3/6'></span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Category</span>
                <span className='!w-3/6'>TRUCK</span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Region</span>
                <span className='!w-3/6'>Pool Vehicle</span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Cluster</span>
                <span className='!w-3/6'>Pool Vehicle</span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>IBC/VBC/Department</span>
                <span className='!w-3/6'></span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Shift (Hrs)</span>
                <span className='!w-3/6'></span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Benchmark</span>
                <span className='!w-3/6'>3.75</span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Device No Status</span>
                <span className='!w-3/6'>Offline</span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Device Plate No</span>
                <span className='!w-3/6'>JV-0114</span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Device Make Model</span>
                <span className='!w-3/6'>Master grand-truck</span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Reason</span>
                <span className='!w-3/6'><SelectField className="w-full" fieldClassName="" label={"Select Geofence"} handleChange={handleSelectReason} value={formData?.reason} options={reasonsArray} objKey="reason"/></span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Complaint Description</span>
                <span className='!w-3/6'>
                  <InputField className="w-full" fieldClassName="" label={"Complaint Description"} placeholder={"Complaint Description"} value={formData?.complaintDesc} setChange={(value:string) => setFormData({ ...formData, complaintDesc: value })} />
                </span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>POC NAME</span>
                <span className='!w-3/6'>
                  <InputField className="w-full" fieldClassName="" label={"Enter POC Name"} placeholder={"Enter POC Name"} value={formData?.pocName} setChange={(value:string) => setFormData({ ...formData, pocName: value })} />
                </span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>POC Contact Number</span>
                <span className='!w-3/6'>
                  <InputField className="w-full" fieldClassName="" label={"Enter POC Contact Number"} placeholder={"Enter POC Contact Number"} value={formData?.pocContactNumber} setChange={(value:string) => setFormData({ ...formData, pocContactNumber: value })} />
                </span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Vehicle Location</span>
                <span className='!w-3/6'>
                  <InputField className="w-full" fieldClassName="" label={"Enter Vehicle Location"} placeholder={"Enter Vehicle Location"} value={formData?.vehicleLocation} setChange={(value:string) => setFormData({ ...formData, vehicleLocation: value })} />
                </span>
            </div>
            <div className='w-full flex text-md mb-3'>
                <span className='!w-3/6'>Recommended Date</span>
                <span className='!w-3/6'>
                  <DatePicker />
                </span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
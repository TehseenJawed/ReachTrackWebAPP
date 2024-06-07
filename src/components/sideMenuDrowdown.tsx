import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import SidemenuButton from './sideMenuItem';
import { FaCaretUp } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function SideMenuDropdown({children, InnerSectionJSX}) {
    let ref = React.useRef(null)

    // console.log('NEW...',ref);

    // ref?.current?.lastChild?.style = 'absolute'
    
  return (
    <Accordion className='!bg-transparent overflow-hidden'>
        <AccordionSummary
          ref={ref}
          className='relative'
          expandIcon={<IoIosArrowUp color={"#000"} size={20} />}
          aria-controls="panel1-content"
          id="sidemenu-dropdown"
        >
          {children}
        </AccordionSummary>
        <AccordionDetails>
          {InnerSectionJSX()}
        </AccordionDetails>
      </Accordion>
  );
}
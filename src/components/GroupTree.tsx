import * as React from 'react';
import Box from '@mui/material/Box';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// @ts-ignore
import { TreeView } from '@mui/x-tree-view/TreeView';
// @ts-ignore
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { GROUP_DATA } from '../redux/reducers/trackReducer';
import { useSelector, useDispatch } from 'react-redux';
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function GroupTree({group, setGroup, placeholder}) {
    const groupData = useSelector(GROUP_DATA)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<MdOutlineKeyboardArrowDown />}
        defaultExpandIcon={<MdKeyboardArrowRight />}
        multiSelect
      >
        {
            groupData?.map((v1:any,i1) => (
                <TreeItem nodeId={String(i1)} onClick={() => setGroup(v1)} label={v1?.name}>
                    {
                        v1?.children?.map((v2,i2) => (
                            <TreeItem nodeId={String(i2+10)} onClick={() => setGroup(v2)} label={v2?.name}>
                                {
                                    v2?.children?.map((v3,i3) => (
                                        <TreeItem nodeId={String(i3+20)} onClick={() => setGroup(v3)} label={v3?.name}>
                                            {
                                                v3?.children?.map((v4,i4) => (
                                                    <TreeItem nodeId={String(i4+30)} onClick={() => setGroup(v4)} label={v4?.name} />
                                                ))
                                            }
                                        </TreeItem>
                                    ))
                                }
                            </TreeItem>
                        ))
                    }
                </TreeItem>
            ))
        }
        {/* <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
          <TreeItem nodeId="3" label="Chrome" />
          <TreeItem nodeId="4" label="Webstorm" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="6" label="MUI">
            <TreeItem nodeId="7" label="src">
              <TreeItem nodeId="8" label="index.js" />
              <TreeItem nodeId="9" label="tree-view.js" />
            </TreeItem>
          </TreeItem>
        </TreeItem> */}
      </TreeView>
    </Box>
  );
}
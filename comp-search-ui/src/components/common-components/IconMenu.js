
import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton, Menu } from '@mui/material';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';


export const IconMenu = ({handleManage, handleDelete, id}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const ITEM_HEIGHT = 48;

    
  return (
    <>
        <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreHoriz />
        </IconButton>

        <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <Menu
            id="long-menu"
            MenuListProps={{
            'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '15ch'
                },
            }}
        >
            <MenuItem onClick={(e) => handleManage(id)}>
            <ListItemIcon>
                <ManageAccountsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Manage</ListItemText>
            </MenuItem>
            <MenuItem onClick={(e) => handleDelete(id)}>
            <ListItemIcon>
                <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
            </MenuItem>
        </Menu>
        </Paper>
    
    </>
    );
}
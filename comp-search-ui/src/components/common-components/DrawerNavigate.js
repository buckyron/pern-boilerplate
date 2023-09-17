import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

const DrawerNavigate = ({ variant, ...props }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(props.id);


  return (
    <Grid container justifyContent="flex-start" alignItems="center">
      <Grid item>
        <Drawer
          variant={variant}
          {...props}
          open={open}
          onClose={() => setOpen(false)}
          position="fixed"
        >
          <List>
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemText>
                <Link style={{ textDecoration: "none" }} to="/company/dashboard" state={{id: id}}>
                  <h5 style={{color:"black"}}>Dashboard</h5>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemText>
                <Link style={{ textDecoration: "none" }} to="/company/users" state={{ id: id }}>
                <h5 style={{color:"black"}}>Users</h5>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem style={{
                  position: "fixed",
                  bottom: 0,
                  paddingBottom: 10,
                  width: "111px"
              }} button onClick={() => setOpen(false)}>
              <ListItemText>
                <Link style={{ textDecoration: "none" }} to="/" >
                <h5 style={{color:"black"}}>Home</h5>
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </Grid>

      <Grid item>
        <Button onClick={() => setOpen(!open)}>
         <MenuIcon style={{color:"black"}} />
        </Button>
      </Grid>
    </Grid>
  );
};

export default DrawerNavigate;
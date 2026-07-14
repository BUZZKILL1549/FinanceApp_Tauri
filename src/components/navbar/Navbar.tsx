import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <nav className="nav">
      <div className="leftSection">
        <IconButton onClick={() => toggleDrawer(true)}>
          <MenuIcon style={{ color: '#fff' }} />
        </IconButton>
        <h1 className="heading">Finance App</h1>
      </div>

      <ul className="navLinks">
        <li><Link to="/" className="link">Dashboard</Link></li>
        <li><Link to="/insurance" className="link">Insurance</Link></li>
        <li><Link to="/investments" className="link">Investments</Link></li>
      </ul>

      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <div className="drawerContainer">
          <List className="mainList">
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleDrawer(false)}>
                <Link to="/" className="drawerLink">
                  <ListItemText primary="Dashboard" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleDrawer(false)}>
                <Link to="/insurance" className="drawerLink">
                  <ListItemText primary="Insurance" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleDrawer(false)}>
                <Link to="/investments" className="drawerLink">
                  <ListItemText primary="Investments" />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
          <List className="bottomList">
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleDrawer(false)}>
                <Link to="/settings" className="drawerLink">
                  <ListItemText primary="Settings" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleDrawer(false)}>
                <Link to="/logout" className="drawerLink">
                  <ListItemText primary="Logout" />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  );
}

export default Navbar;
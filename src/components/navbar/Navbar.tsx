import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };
  
  return (
    <nav style={styles.nav}>
      <div style={styles.leftSection}>
        <IconButton onClick={() => toggleDrawer(true)}>
          <MenuIcon style={{ color: '#fff' }} />
        </IconButton>
        <h1 style={styles.heading}>Finance App</h1>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Dashboard</Link></li>
        <li><Link to="/insurance" style={styles.link}>Insurance</Link></li>
        <li><Link to="/investments" style={styles.link}>Investments</Link></li>
      </ul> 
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <div style={styles.drawerContainer}>
          <List style={styles.mainList}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleDrawer(false)}>
                <Link to="/" style={styles.drawerLink}>
                  <ListItemText primary="Dashboard" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleDrawer(false)}>
                <Link to="/insurance" style={styles.drawerLink}>
                  <ListItemText primary="Insurance" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleDrawer(false)}>
                <Link to="/investments" style={styles.drawerLink}>
                  <ListItemText primary="Investments" />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
          <List style={styles.bottomList}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {
                console.log('settings');
                toggleDrawer(false);
              }}>
                <Link to="/settings" style={styles.drawerLink}>
                  <ListItemText primary="Settings" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>    
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    fontFamily: 'sans-serif',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  heading: {
    fontSize: '20px',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '17px',
  },
  drawer: {
    width: '250px',
    padding: '10px',
  },
  drawerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',  
    width: '250px',
    padding: '10px',
  },
  mainList: {
    padding: 0,
  },
  bottomList: {
    padding: 0,
    marginTop: 'auto',  
    borderTop: '1px solid #eee',
  },
  drawerLink: {
    textDecoration: 'none',
    color: '#333',
    width: '100%',
  },
};

export default Navbar;

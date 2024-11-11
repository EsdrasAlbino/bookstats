import { AppBar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export const MenuBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#646cff', boxShadow: 'none', borderRadius:8 }}>
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Lista
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};
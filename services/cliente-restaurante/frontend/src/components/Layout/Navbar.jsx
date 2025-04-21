import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography } from '@mui/material'

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#a40000' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Delivery App
        </Typography>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/register">Cadastro</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
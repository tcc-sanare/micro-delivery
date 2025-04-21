import { Typography, Box } from '@mui/material'

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        p: 30,
        gap: 3,
      }}
    >
      <Typography variant="h3">Bem-vindo ao Delivery App</Typography>
      <Typography>Escolha login ou cadastro no menu superior</Typography>
    </Box>
  )
}

export default Home
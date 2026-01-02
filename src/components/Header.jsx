import { AppBar, Toolbar, Typography, Box } from '@mui/material';

function Header() {
  return (
    <AppBar
      position="fixed" // makes it stick to the top
      sx={{
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#4e4d4dff', // dark grey color
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: 2 }}>
        <Typography variant="h6" component="div">
            <Box component="span" sx={{ fontWeight: 'bold', color: '#ffffff' }}>Pokeverse | </Box>
            <Box component="span" sx={{ fontWeight: 200 }}>All Pokemon</Box>
        </Typography>
      </Toolbar>

    </AppBar>
  );
}

export default Header;

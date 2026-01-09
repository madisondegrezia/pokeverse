import { useContext } from 'react'
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { CardContext } from "../contexts/CardContext";

function Header() {
  const { selectedCards } = useContext(CardContext)
  return (
    <AppBar
      position="fixed" // makes it stick to the top
      sx={{
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgb(196, 112, 112)', 
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: 2, justifyContent: 'space-between' }}>
        <Typography variant="h5" component="div">
            <Box component="span" sx={{ fontWeight: 'bold', color: '#ffffff' }}>Pokeverse</Box>
        </Typography>
        {selectedCards.length >= 2 && (
          <Button size="small" sx={{
              bgcolor: '#ca1b1b',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#a50d0d'
              }

            }}>Battle</Button>
        )}
      </Toolbar>

    </AppBar>
  );
}

export default Header;

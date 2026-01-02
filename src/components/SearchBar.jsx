import { TextField, Box } from '@mui/material';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <Box display="flex" justifyContent="center">
      <TextField
        label="Search..."
        variant="outlined"
        sx={{ width: '50%' }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  );
}

export default SearchBar;

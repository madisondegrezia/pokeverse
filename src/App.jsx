import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Typography, Box, Toolbar } from "@mui/material";
import './App.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CardGrid from './components/CardGrid'
import SquadGrid from "./components/SquadGrid";
import { CardProvider } from "./contexts/CardContext";

function App() {
  const [data, setData] = useState([]);         // Full array of items
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  useEffect(() => {
    setLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151") 
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => setData(json.results)) // Extract results array
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filter data based on search input
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CardProvider>
      <Container>
        <Header />
        {!loading && !error && (
          <Box mt={12}>
            <SquadGrid />
           </Box>

        )}
        <Box mt={2}>
          <Typography variant="h5" fontWeight="bold" align="center">All Pokemon</Typography>
        </Box>

        <Box mt={4}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Box>
        
        <Box mt={4} mb={4}>
          {loading && (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Typography color="error">Error: {error}</Typography>
            </Box>
          )}
          {!loading && !error && <CardGrid data={filteredData} />}
        </Box>
          
      </Container>
    </CardProvider>

  )
}

export default App
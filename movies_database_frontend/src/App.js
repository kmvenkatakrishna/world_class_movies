import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MovieList from './MovieList';
import AddMovie from './AddMovie';
import Header from './Header';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914',
    },
    secondary: {
      main: '#22223b',
    },
    background: {
      default: '#18181c',
      paper: '#232336',
    },
    text: {
      primary: '#fff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, Helvetica, Arial, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: 1,
    },
    h5: {
      fontWeight: 700,
      letterSpacing: 1,
    },
  },
  shape: {
    borderRadius: 14,
  },
});

function HomePage({ searchTerm }) {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button variant="contained" color="primary" size="large" onClick={() => navigate('/add')}>
          Add Movie
        </Button>
      </Box>
      <MovieList searchTerm={searchTerm} />
    </Container>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* Cinematic background */}
      <Box
        sx={{
          position: 'fixed',
          zIndex: -1,
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          background: `linear-gradient(120deg, #18181c 60%, #232336 100%), url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat`,
          filter: 'blur(2.5px) brightness(0.7)',
          opacity: 0.85,
        }}
      />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
        <Route path="/add" element={<AddMovie />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
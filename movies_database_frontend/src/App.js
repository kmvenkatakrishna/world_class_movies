import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MovieList from './MovieList';
import AddMovie from './AddMovie';
import MovieDetails from './MovieDetails';
import Header from './Header';
import LanguageList from './LanguageList';
import LanguageMovies from './LanguageMovies';

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
    <Box sx={{ width: '100%', px: { xs: 2, sm: 4, md: 6 }, pb: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4, mt: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={() => navigate('/add')}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: '0 4px 16px rgba(229, 9, 20, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(229, 9, 20, 0.4)',
            }
          }}
        >
          Add Movie
        </Button>
      </Box>
      <MovieList searchTerm={searchTerm} />
    </Box>
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
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/languages" element={<LanguageList />} />
        <Route path="/language/:lang" element={<LanguageMovies />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
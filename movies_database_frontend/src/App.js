import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Box } from '@mui/material';
import MovieList from './MovieList';
import AddMovie from './AddMovie';
import Header from './Header';

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
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
        <Route path="/add" element={<AddMovie />} />
      </Routes>
    </>
  );
}

export default App;
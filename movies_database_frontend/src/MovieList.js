import React, { useEffect, useState } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Stack, Typography, IconButton, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const LOCAL_KEY = 'movies_db';

function getInitialMovies() {
  const stored = localStorage.getItem(LOCAL_KEY);
  if (stored) return JSON.parse(stored);
  return [
    { _id: '1', title: 'Inception', language: 'English', genre: 'Sci-Fi', year: 2010, description: 'A mind-bending thriller.' },
    { _id: '2', title: 'Parasite', language: 'Korean', genre: 'Thriller', year: 2019, description: 'Oscar-winning drama.' },
  ];
}

function MovieList({ searchTerm = '' }) {
  const [movies, setMovies] = useState(getInitialMovies());

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(movies));
  }, [movies]);

  const filteredMovies = movies.filter(movie => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      (movie.title && movie.title.toLowerCase().includes(term)) ||
      (movie.genre && movie.genre.toLowerCase().includes(term))
    );
  });

  return (
    <>
      <Paper sx={{ boxShadow: 6, borderRadius: 3, p: 2, background: 'rgba(35,35,54,0.98)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 0.5 }}>Title</TableCell>
              <TableCell sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 0.5 }}>Language</TableCell>
              <TableCell sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 0.5 }}>Genre</TableCell>
              <TableCell sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 0.5 }}>Year</TableCell>
              <TableCell sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 0.5 }}>Description</TableCell>
              <TableCell sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 0.5 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMovies.map(movie => (
              <TableRow
                key={movie._id}
                sx={{
                  '&:hover': { backgroundColor: 'rgba(229,9,20,0.08)' },
                  transition: 'background 0.2s',
                }}
              >
                <TableCell sx={{ color: 'text.primary', fontWeight: 500 }}>{movie.title}</TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{movie.language}</TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{movie.genre}</TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{movie.year}</TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{movie.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setMovies(movies.filter(m => m._id !== movie._id))} color="primary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredMovies.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                  No movies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default MovieList; 
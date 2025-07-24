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
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMovies.map(movie => (
              <TableRow key={movie._id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.language}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell>{movie.description}</TableCell>
                <TableCell>
                  {/* Edit functionality can be added here if needed */}
                  <IconButton onClick={() => setMovies(movies.filter(m => m._id !== movie._id))} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredMovies.length === 0 && (
              <TableRow><TableCell colSpan={6} align="center">No movies found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default MovieList; 
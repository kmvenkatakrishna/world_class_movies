import React, { useEffect, useState } from 'react';
import {
  Container, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper, Stack, Typography, IconButton, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
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

function App() {
  const [movies, setMovies] = useState(getInitialMovies());
  const [form, setForm] = useState({ title: '', language: '', genre: '', year: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState({ language: '', genre: '' });
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  // Persist movies to localStorage whenever movies change
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(movies));
  }, [movies]);

  // Filtered and sorted movies
  const filteredMovies = movies.filter(movie => {
    return (
      (!filter.language || movie.language.toLowerCase().includes(filter.language.toLowerCase())) &&
      (!filter.genre || movie.genre.toLowerCase().includes(filter.genre.toLowerCase()))
    );
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    if (sortField === 'year') {
      valA = Number(valA) || 0;
      valB = Number(valB) || 0;
    } else {
      valA = (valA || '').toString().toLowerCase();
      valB = (valB || '').toString().toLowerCase();
    }
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Handle form input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle filter input
  const handleFilterChange = e => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  // Add or update movie (local only)
  const handleSubmit = e => {
    e.preventDefault();
    const movieData = { ...form, year: form.year ? Number(form.year) : '', _id: editingId || Date.now().toString() };
    if (editingId) {
      setMovies(movies.map(m => m._id === editingId ? movieData : m));
    } else {
      setMovies([...movies, movieData]);
    }
    setForm({ title: '', language: '', genre: '', year: '', description: '' });
    setEditingId(null);
  };

  // Edit movie
  const handleEdit = movie => {
    setForm({
      title: movie.title,
      language: movie.language,
      genre: movie.genre,
      year: movie.year,
      description: movie.description || '',
    });
    setEditingId(movie._id);
  };

  // Delete movie
  const handleDelete = id => {
    setMovies(movies.filter(m => m._id !== id));
    if (editingId === id) {
      setForm({ title: '', language: '', genre: '', year: '', description: '' });
      setEditingId(null);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setForm({ title: '', language: '', genre: '', year: '', description: '' });
    setEditingId(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>Movie Database</Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <TextField name="title" label="Title" value={form.title} onChange={handleChange} required size="small" />
            <TextField name="language" label="Language" value={form.language} onChange={handleChange} required size="small" />
            <TextField name="genre" label="Genre" value={form.genre} onChange={handleChange} required size="small" />
            <TextField name="year" label="Year" value={form.year} onChange={handleChange} type="number" size="small" />
            <TextField name="description" label="Description" value={form.description} onChange={handleChange} size="small" />
            <Button type="submit" variant="contained" color="primary">{editingId ? 'Update' : 'Add'}</Button>
            {editingId && <Button type="button" onClick={handleCancel} color="secondary" variant="outlined">Cancel</Button>}
          </Stack>
        </form>
      </Paper>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <Typography>Filter:</Typography>
          <TextField name="language" label="Language" value={filter.language} onChange={handleFilterChange} size="small" />
          <TextField name="genre" label="Genre" value={filter.genre} onChange={handleFilterChange} size="small" />
          <Button onClick={() => setFilter({ language: '', genre: '' })} variant="outlined">Clear</Button>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="sort-field-label">Sort By</InputLabel>
            <Select
              labelId="sort-field-label"
              value={sortField}
              label="Sort By"
              onChange={e => setSortField(e.target.value)}
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="sort-order-label">Order</InputLabel>
            <Select
              labelId="sort-order-label"
              value={sortOrder}
              label="Order"
              onChange={e => setSortOrder(e.target.value)}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>
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
            {sortedMovies.map(movie => (
              <TableRow key={movie._id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.language}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell>{movie.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(movie)} color="primary"><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(movie._id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {sortedMovies.length === 0 && (
              <TableRow><TableCell colSpan={6} align="center">No movies found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default App;
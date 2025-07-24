import React, { useState } from 'react';
import {
  Container, Paper, Stack, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, Snackbar, Alert, InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotesIcon from '@mui/icons-material/Notes';

const LOCAL_KEY = 'movies_db';
const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Other'
];

function AddMovie() {
  const [form, setForm] = useState({ title: '', language: '', genre: '', year: '', description: '' });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.language.trim()) newErrors.language = 'Language is required';
    if (!form.genre) newErrors.genre = 'Genre is required';
    if (form.year && (isNaN(form.year) || form.year < 1800 || form.year > new Date().getFullYear() + 1)) newErrors.year = 'Enter a valid year';
    return newErrors;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    const stored = localStorage.getItem(LOCAL_KEY);
    const movies = stored ? JSON.parse(stored) : [];
    const newMovie = { ...form, year: form.year ? Number(form.year) : '', _id: Date.now().toString() };
    movies.push(newMovie);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(movies));
    setSnackbarOpen(true);
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 6, background: 'rgba(35,35,54,0.98)', border: '1.5px solid #e50914' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1 }}>
          Add Movie
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack spacing={3}>
            <TextField
              name="title"
              label="Title"
              value={form.title}
              onChange={handleChange}
              required
              error={!!errors.title}
              helperText={errors.title || 'Enter the movie title'}
              size="medium"
              fullWidth
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{
                style: { color: '#fff' },
                startAdornment: (
                  <InputAdornment position="start">
                    <MovieIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="language"
              label="Language"
              value={form.language}
              onChange={handleChange}
              required
              error={!!errors.language}
              helperText={errors.language || 'e.g. English, Hindi, Korean'}
              size="medium"
              fullWidth
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{
                style: { color: '#fff' },
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl required error={!!errors.genre} fullWidth>
              <InputLabel sx={{ color: '#fff' }}>Genre</InputLabel>
              <Select
                name="genre"
                value={form.genre}
                label="Genre"
                onChange={handleChange}
                sx={{ color: '#fff', '.MuiSvgIcon-root': { color: '#fff' } }}
              >
                {GENRES.map(g => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: errors.genre ? 'error.main' : '#b3b3b3' }}>{errors.genre || 'Select a genre'}</FormHelperText>
            </FormControl>
            <TextField
              name="year"
              label="Year"
              value={form.year}
              onChange={handleChange}
              type="number"
              error={!!errors.year}
              helperText={errors.year || 'e.g. 2023'}
              size="medium"
              fullWidth
              inputProps={{ min: 1800, max: new Date().getFullYear() + 1 }}
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{
                style: { color: '#fff' },
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="description"
              label="Description"
              value={form.description}
              onChange={handleChange}
              multiline
              minRows={2}
              maxRows={4}
              helperText="Short description (optional)"
              size="medium"
              fullWidth
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{
                style: { color: '#fff' },
                startAdornment: (
                  <InputAdornment position="start">
                    <NotesIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button type="submit" variant="contained" color="primary" size="large" sx={{ fontWeight: 600, letterSpacing: 1 }}>
                Add Movie
              </Button>
              <Button type="button" variant="outlined" color="secondary" size="large" onClick={() => navigate('/')} sx={{ fontWeight: 600, letterSpacing: 1, borderColor: '#fff', color: '#fff', ':hover': { borderColor: '#e50914', color: '#e50914' } }}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
      <Snackbar open={snackbarOpen} autoHideDuration={1200} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Movie added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AddMovie; 
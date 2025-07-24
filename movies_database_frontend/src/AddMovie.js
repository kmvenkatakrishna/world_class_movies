import React, { useState } from 'react';
import { Container, TextField, Button, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LOCAL_KEY = 'movies_db';

function AddMovie() {
  const [form, setForm] = useState({ title: '', language: '', genre: '', year: '', description: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const stored = localStorage.getItem(LOCAL_KEY);
    const movies = stored ? JSON.parse(stored) : [];
    const newMovie = { ...form, year: form.year ? Number(form.year) : '', _id: Date.now().toString() };
    movies.push(newMovie);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(movies));
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>Add Movie</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField name="title" label="Title" value={form.title} onChange={handleChange} required size="small" />
            <TextField name="language" label="Language" value={form.language} onChange={handleChange} required size="small" />
            <TextField name="genre" label="Genre" value={form.genre} onChange={handleChange} required size="small" />
            <TextField name="year" label="Year" value={form.year} onChange={handleChange} type="number" size="small" />
            <TextField name="description" label="Description" value={form.description} onChange={handleChange} size="small" />
            <Button type="submit" variant="contained" color="primary">Add Movie</Button>
            <Button type="button" variant="outlined" color="secondary" onClick={() => navigate('/')}>Cancel</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default AddMovie; 
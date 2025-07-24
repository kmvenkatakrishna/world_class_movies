import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Box, CardActions, Fade } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MovieIcon from '@mui/icons-material/Movie';

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
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      <Grid container spacing={3}>
        {filteredMovies.length === 0 && (
          <Grid item xs={12}>
            <Fade in={true}><Typography align="center" color="text.secondary" sx={{ fontStyle: 'italic', mt: 6, fontSize: 22 }}>No movies found.</Typography></Fade>
          </Grid>
        )}
        {filteredMovies.map(movie => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: 6,
                background: 'rgba(35,35,54,0.98)',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.045) translateY(-4px)',
                  boxShadow: '0 8px 32px 0 #e5091440',
                },
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  sx={{ height: 180, background: 'linear-gradient(135deg, #232336 60%, #e50914 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  image={''}
                  title={movie.title}
                >
                  <MovieIcon sx={{ fontSize: 64, color: '#fff', opacity: 0.18, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
                </CardMedia>
                <IconButton
                  aria-label="delete"
                  onClick={() => setMovies(movies.filter(m => m._id !== movie._id))}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'primary.main',
                    background: 'rgba(24,24,28,0.7)',
                    zIndex: 2,
                    '&:hover': { background: 'rgba(229,9,20,0.18)', color: '#fff' },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 0.5, mb: 0.5 }}>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  <b>Genre:</b> {movie.genre} &nbsp; <b>Year:</b> {movie.year}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  <b>Language:</b> {movie.language}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 1 }}>
                  {movie.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ minHeight: 12 }} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MovieList; 
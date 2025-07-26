import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, CardMedia, IconButton, Chip, Fade, Button } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

const LOCAL_KEY = 'movies_db';

function LanguageMovies() {
  const { lang } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      const allMovies = JSON.parse(stored);
      setMovies(allMovies.filter(m => m.language && m.language.trim().toLowerCase() === decodeURIComponent(lang).toLowerCase()));
    }
  }, [lang]);

  const handleDelete = (id) => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      const allMovies = JSON.parse(stored);
      const updated = allMovies.filter(m => m._id !== id);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      setMovies(movies.filter(m => m._id !== id));
    }
  };

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ color: '#fff', mb: 3, '&:hover': { color: 'primary.main' } }}>
        Back to Home
      </Button>
      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 900, mb: 4, textAlign: 'center' }}>
        Movies in {decodeURIComponent(lang)}
      </Typography>
      {movies.length === 0 ? (
        <Fade in={true}><Typography align="center" color="text.secondary" sx={{ fontStyle: 'italic', mt: 6, fontSize: 22 }}>No movies found in this language.</Typography></Fade>
      ) : (
        <Grid container spacing={4}>
          {movies.map(movie => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
              <Card
                sx={{
                  width: '100%',
                  aspectRatio: '2/3',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  background: 'rgba(35,35,54,0.95)',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05) translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(229, 9, 20, 0.3)',
                  },
                }}
                onClick={() => navigate(`/movie/${movie._id}`)}
              >
                <Box sx={{ position: 'relative', height: '100%' }}>
                  <CardMedia
                    sx={{ 
                      height: '100%', 
                      background: `linear-gradient(135deg, #232336 0%, #e50914 100%)`,
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                    image={''}
                    title={movie.title}
                  >
                    <MovieIcon sx={{ fontSize: 48, color: '#fff', opacity: 0.2, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
                    <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.7)', borderRadius: 1, px: 1, py: 0.5 }}>
                      <StarIcon sx={{ fontSize: 16, color: '#ffd700', mr: 0.5 }} />
                      <Typography variant="caption" sx={{ color: '#fff', fontWeight: 600 }}>{movie.rating}</Typography>
                    </Box>
                    <IconButton
                      aria-label="delete"
                      onClick={e => { e.stopPropagation(); handleDelete(movie._id); }}
                      sx={{ position: 'absolute', bottom: 8, right: 8, color: 'primary.main', background: 'rgba(0,0,0,0.8)', zIndex: 2, '&:hover': { background: 'rgba(229,9,20,0.8)', color: '#fff' } }}
                    >
                      <DeleteIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </CardMedia>
                  <CardContent sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', color: '#fff', padding: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>{movie.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>{movie.year}</Typography>
                    <Chip label={movie.genre} size="small" sx={{ background: 'rgba(229, 9, 20, 0.8)', color: '#fff', fontWeight: 600, mt: 1 }} />
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default LanguageMovies; 
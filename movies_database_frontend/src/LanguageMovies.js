import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, CardMedia, IconButton, Chip, Fade, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import WarningIcon from '@mui/icons-material/Warning';

const LOCAL_KEY = 'movies_db';

function LanguageMovies() {
  const { lang } = useParams();
  const [movies, setMovies] = useState([]);
  const [languageName, setLanguageName] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const navigate = useNavigate();

  const loadMovies = () => {
    setLoading(true);
    const stored = localStorage.getItem(LOCAL_KEY);
    
    if (stored) {
      const allMovies = JSON.parse(stored);
      const decodedLang = decodeURIComponent(lang);
      setLanguageName(decodedLang);
      
      // More robust language filtering - check for exact match first, then case-insensitive
      const filteredMovies = allMovies.filter(movie => {
        if (!movie.language) {
          return false;
        }
        
        const movieLang = movie.language.trim();
        const searchLang = decodedLang.trim();
        
        // Exact match
        if (movieLang === searchLang) {
          return true;
        }
        
        // Case-insensitive match
        if (movieLang.toLowerCase() === searchLang.toLowerCase()) {
          return true;
        }
        
        return false;
      });
      
      setMovies(filteredMovies);
    } else {
      setMovies([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMovies();
  }, [lang]);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === LOCAL_KEY) {
        loadMovies();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    const handleCustomStorageChange = () => {
      loadMovies();
    };
    
    window.addEventListener('localStorageChange', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange);
    };
  }, [lang]);

  // Monitor state changes
  useEffect(() => {
  }, [movies, loading, languageName]);

  const handleDelete = (id) => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      const allMovies = JSON.parse(stored);
      const updated = allMovies.filter(m => m._id !== id);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      setMovies(movies.filter(m => m._id !== id));
    }
  };

  const handleDeleteClick = (e, movie) => {
    e.stopPropagation();
    setMovieToDelete(movie);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (movieToDelete) {
      handleDelete(movieToDelete._id);
      setDeleteDialogOpen(false);
      setMovieToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setMovieToDelete(null);
  };

  const handleRefresh = () => {
    loadMovies();
  };

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ color: '#fff', '&:hover': { color: 'primary.main' } }}>
          Back to Home
        </Button>
      </Box>
      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 900, mb: 4, textAlign: 'center' }}>
        {languageName} Movies
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <Typography variant="h6" color="text.secondary">Loading...</Typography>
        </Box>
      ) : movies.length === 0 ? (
        <Fade in={true}>
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography align="center" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: 22, mb: 2 }}>
              No movies found in {languageName}.
            </Typography>
            <Typography align="center" color="text.secondary" sx={{ fontSize: 16, mb: 4 }}>
              Try adding a movie in this language or check the console for debugging information.
            </Typography>
          </Box>
        </Fade>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {movies.map(movie => (
            <div key={movie._id} style={{ flex: '1 0 18%', margin: 8, minWidth: 180, maxWidth: 220 }}>
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
                    <MovieIcon sx={{ fontSize: 38, color: '#fff', opacity: 0.2, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
                    <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.7)', borderRadius: 1, px: 1, py: 0.5 }}>
                      <StarIcon sx={{ fontSize: 13, color: '#ffd700', mr: 0.5 }} />
                      <Typography variant="caption" sx={{ color: '#fff', fontWeight: 600 }}>{movie.rating}</Typography>
                    </Box>
                    <IconButton
                      aria-label="delete"
                      onClick={e => handleDeleteClick(e, movie)}
                      sx={{ position: 'absolute', bottom: 8, right: 8, color: 'primary.main', background: 'rgba(0,0,0,0.8)', zIndex: 2, '&:hover': { background: 'rgba(229,9,20,0.8)', color: '#fff' } }}
                    >
                      <DeleteIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                  </CardMedia>
                  <CardContent sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', color: '#fff', padding: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{movie.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.85rem' }}>{movie.year}</Typography>
                    <Chip label={movie.genre} size="small" sx={{ background: 'rgba(229, 9, 20, 0.8)', color: '#fff', fontWeight: 600, mt: 1 }} />
                  </CardContent>
                </Box>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{movieToDelete?.title}"? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LanguageMovies; 
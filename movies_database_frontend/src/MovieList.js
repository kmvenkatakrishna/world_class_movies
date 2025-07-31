import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardMedia, 
  Typography, 
  IconButton, 
  Box, 
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import AnimationIcon from '@mui/icons-material/Animation';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';

const LOCAL_KEY = 'movies_db';

function getInitialMovies() {
  const stored = localStorage.getItem(LOCAL_KEY);
  if (stored) {
    const storedMovies = JSON.parse(stored);
    // If we have stored movies, return them
    if (storedMovies.length > 0) {
      return storedMovies;
    }
  }
  
  // Only return sample data if localStorage is empty
  return [
    { 
      _id: '1', 
      title: 'Inception', 
      language: 'English', 
      genre: 'Sci-Fi', 
      year: 2010, 
      description: 'A mind-bending thriller about dreams within dreams.',
      rating: 4.8,
      recommended: true,
      type: 'movie'
    },
    { 
      _id: '2', 
      title: 'Parasite', 
      language: 'Korean', 
      genre: 'Thriller', 
      year: 2019, 
      description: 'Oscar-winning drama about class struggle.',
      rating: 4.9,
      recommended: true,
      type: 'movie'
    },
    { 
      _id: '3', 
      title: 'The Dark Knight', 
      language: 'English', 
      genre: 'Action', 
      year: 2008, 
      description: 'Batman faces his greatest challenge.',
      rating: 4.7,
      recommended: true,
      type: 'movie'
    },
    { 
      _id: '4', 
      title: 'La La Land', 
      language: 'English', 
      genre: 'Romance', 
      year: 2016, 
      description: 'A musical romance in modern Los Angeles.',
      rating: 4.6,
      recommended: false,
      type: 'movie'
    },
    { 
      _id: '5', 
      title: 'Interstellar', 
      language: 'English', 
      genre: 'Sci-Fi', 
      year: 2014, 
      description: 'Space exploration to save humanity.',
      rating: 4.5,
      recommended: false,
      type: 'movie'
    },
    { 
      _id: '6', 
      title: 'John Wick', 
      language: 'English', 
      genre: 'Action', 
      year: 2014, 
      description: 'A retired hitman seeks revenge.',
      rating: 4.4,
      recommended: false,
      type: 'movie'
    },
    { 
      _id: '7', 
      title: 'Breaking Bad', 
      language: 'English', 
      genre: 'Drama', 
      year: 2008, 
      description: 'A high school chemistry teacher turned methamphetamine manufacturer.',
      rating: 4.9,
      recommended: true,
      type: 'series'
    },
    { 
      _id: '8', 
      title: 'Attack on Titan', 
      language: 'Japanese', 
      genre: 'Action', 
      year: 2013, 
      description: 'Humanity fights for survival against giant humanoid creatures.',
      rating: 4.8,
      recommended: true,
      type: 'anime'
    }
  ];
}

function MovieCard({ movie, onDelete }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const route = movie.type === 'movie' ? '/movie' : movie.type === 'series' ? '/series' : '/anime';
    navigate(`${route}/${movie._id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
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
          '& .movie-overlay': {
            opacity: 1,
          },
        },
      }}
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
          <MovieIcon sx={{ 
            fontSize: 48, 
            color: '#fff', 
            opacity: 0.2, 
            position: 'absolute', 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%,-50%)' 
          }} />
          
          {/* Rating Badge */}
          <Box sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(0,0,0,0.7)',
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}>
            <StarIcon sx={{ fontSize: 16, color: '#ffd700', mr: 0.5 }} />
            <Typography variant="caption" sx={{ color: '#fff', fontWeight: 600 }}>
              {movie.rating}
            </Typography>
          </Box>

          {/* Content Type Badge */}
          <Box sx={{
            position: 'absolute',
            top: 8,
            right: movie.recommended ? 40 : 8,
            background: movie.type === 'movie' ? 'rgba(229, 9, 20, 0.8)' : 
                       movie.type === 'series' ? 'rgba(0, 150, 136, 0.8)' : 
                       'rgba(156, 39, 176, 0.8)',
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}>
            {movie.type === 'movie' ? <MovieIcon sx={{ fontSize: 16, color: '#fff' }} /> :
             movie.type === 'series' ? <TvIcon sx={{ fontSize: 16, color: '#fff' }} /> :
             <AnimationIcon sx={{ fontSize: 16, color: '#fff' }} />}
          </Box>

          {/* Recommended Badge */}
          {movie.recommended && (
            <Box sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'linear-gradient(45deg, #e50914, #ff6b6b)',
              borderRadius: 1,
              px: 1,
              py: 0.5,
            }}>
              <TrendingUpIcon sx={{ fontSize: 16, color: '#fff' }} />
            </Box>
          )}

          {/* Delete Button */}
          <IconButton
            aria-label="delete"
            onClick={(e) => onDelete(e, movie)}
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              color: 'primary.main',
              background: 'rgba(0,0,0,0.8)',
              zIndex: 2,
              '&:hover': { 
                background: 'rgba(229,9,20,0.8)', 
                color: '#fff' 
              },
            }}
          >
            <DeleteIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </CardMedia>

        {/* Overlay with movie info */}
        <Box
          className="movie-overlay"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
            color: '#fff',
            padding: 2,
            opacity: 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem' }}>
            {movie.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
            {movie.year} • {movie.language}
          </Typography>
          <Chip 
            label={movie.genre} 
            size="small" 
            sx={{ 
              background: 'rgba(229, 9, 20, 0.8)', 
              color: '#fff',
              fontWeight: 600
            }} 
          />
        </Box>
      </Box>
    </Card>
  );
}

function MovieSection({ title, movies, onDelete, icon, noTopMargin = false }) {
  if (movies.length === 0) return null;

  return (
    <Box sx={{ mb: 6, mt: noTopMargin ? 0 : 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {icon}
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: '#fff', 
            ml: 1,
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}
        >
          {title}
        </Typography>
      </Box>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
          xl: 'repeat(6, 1fr)'
        },
        gap: 2,
        width: '100%'
      }}>
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onDelete={onDelete} />
        ))}
      </Box>
    </Box>
  );
}

function MovieList({ searchTerm = '', contentType = null }) {
  const [movies, setMovies] = useState(getInitialMovies());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  // Initial load from localStorage
  useEffect(() => {
    const loadFromStorage = () => {
      const stored = localStorage.getItem(LOCAL_KEY);
      if (stored) {
        const storedMovies = JSON.parse(stored);
        if (storedMovies.length > 0) {
          // Ensure all movies have a type field
          const processedMovies = storedMovies.map(movie => ({
            ...movie,
            type: movie.type || 'movie' // Default to 'movie' if type is missing
          }));
          console.log(`Loaded ${processedMovies.length} movies from localStorage`);
          setMovies(processedMovies);
          
          // Update localStorage with the processed movies
          localStorage.setItem(LOCAL_KEY, JSON.stringify(processedMovies));
        }
      }
    };
    
    loadFromStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(movies));
    console.log(`Updated localStorage with ${movies.length} movies`);
  }, [movies]);

  // Listen for localStorage changes from other components
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === LOCAL_KEY) {
        const stored = localStorage.getItem(LOCAL_KEY);
        if (stored) {
          const storedMovies = JSON.parse(stored);
          // Ensure all movies have a type field
          const processedMovies = storedMovies.map(movie => ({
            ...movie,
            type: movie.type || 'movie' // Default to 'movie' if type is missing
          }));
          setMovies(processedMovies);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    const handleCustomStorageChange = () => {
      const stored = localStorage.getItem(LOCAL_KEY);
      if (stored) {
        const storedMovies = JSON.parse(stored);
        // Ensure all movies have a type field
        const processedMovies = storedMovies.map(movie => ({
          ...movie,
          type: movie.type || 'movie' // Default to 'movie' if type is missing
        }));
        setMovies(processedMovies);
      }
    };
    
    window.addEventListener('localStorageChange', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange);
    };
  }, []);

  const handleDeleteClick = (e, movie) => {
    e.stopPropagation();
    setMovieToDelete(movie);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (movieToDelete) {
      setMovies(movies.filter(m => m._id !== movieToDelete._id));
      setDeleteDialogOpen(false);
      setMovieToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setMovieToDelete(null);
  };

  const handleDelete = (movieId) => {
    setMovies(movies.filter(m => m._id !== movieId));
  };

  const filteredMovies = movies.filter(movie => {
    const term = searchTerm.trim().toLowerCase();
    const movieType = movie.type || 'movie'; // Default to 'movie' if type is missing
    
    // Filter by content type if specified
    if (contentType && movieType !== contentType) {
      return false;
    }
    
    // Filter by search term if specified
    if (term) {
      return (
        (movie.title && movie.title.toLowerCase().includes(term)) ||
        (movie.genre && movie.genre.toLowerCase().includes(term))
      );
    }
    
    return true;
  });

  // Group content by type
  const contentByType = filteredMovies.reduce((acc, item) => {
    const type = item.type || 'movie'; // Default to 'movie' if type is missing
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  // Group movies by genre within each type
  const contentByTypeAndGenre = {};
  Object.entries(contentByType).forEach(([type, items]) => {
    contentByTypeAndGenre[type] = items.reduce((acc, item) => {
      const genre = item.genre || 'Other';
      if (!acc[genre]) acc[genre] = [];
      acc[genre].push(item);
      return acc;
    }, {});
  });

  // Get recommended content
  const recommendedContent = filteredMovies.filter(item => item.recommended);

  if (filteredMovies.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '50vh' 
      }}>
        <MovieIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
        <Typography 
          variant="h5" 
          color="text.secondary" 
          sx={{ fontStyle: 'italic', textAlign: 'center' }}
        >
          No content found.
        </Typography>
      </Box>
    );
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'movie': return <MovieIcon sx={{ fontSize: 32, color: 'primary.main' }} />;
      case 'series': return <TvIcon sx={{ fontSize: 32, color: '#009688' }} />;
      case 'anime': return <AnimationIcon sx={{ fontSize: 32, color: '#9c27b0' }} />;
      default: return <MovieIcon sx={{ fontSize: 32, color: 'primary.main' }} />;
    }
  };

  const getTypeTitle = (type) => {
    switch(type) {
      case 'movie': return 'Movies';
      case 'series': return 'TV Series';
      case 'anime': return 'Anime';
      default: return 'Movies';
    }
  };

  return (
    <Box sx={{ width: '100%', pt: 2 }}>
      {/* Recommended Section */}
      {recommendedContent.length > 0 && (
        <MovieSection
          title="Recommended for You"
          movies={recommendedContent}
          onDelete={handleDeleteClick}
          icon={<TrendingUpIcon sx={{ fontSize: 32, color: 'primary.main' }} />}
          noTopMargin={true}
        />
      )}

      {/* Content by Type and Genre */}
      {Object.entries(contentByTypeAndGenre).map(([type, genres]) => (
        <Box key={type} sx={{ mb: 6 }}>
          {/* Type Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            {getTypeIcon(type)}
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#fff', 
                ml: 1,
                fontSize: { xs: '1.5rem', sm: '2rem' }
              }}
            >
              {getTypeTitle(type)}
            </Typography>
          </Box>
          
          {/* Genre Sections within Type */}
          {Object.entries(genres).map(([genre, genreItems]) => (
            <MovieSection
              key={`${type}-${genre}`}
              title={genre}
              movies={genreItems}
              onDelete={handleDeleteClick}
              icon={getTypeIcon(type)}
            />
          ))}
        </Box>
      ))}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description">
            Are you sure you want to delete "{movieToDelete?.title}"? This action cannot be undone.
          </Typography>
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

export default MovieList; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardMedia, 
  Typography, 
  IconButton, 
  Box, 
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MovieIcon from '@mui/icons-material/Movie';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const LOCAL_KEY = 'movies_db';

function getInitialMovies() {
  const stored = localStorage.getItem(LOCAL_KEY);
  if (stored) return JSON.parse(stored);
  return [
    { 
      _id: '1', 
      title: 'Inception', 
      language: 'English', 
      genre: 'Sci-Fi', 
      year: 2010, 
      description: 'A mind-bending thriller about dreams within dreams.',
      rating: 4.8,
      recommended: true
    },
    { 
      _id: '2', 
      title: 'Parasite', 
      language: 'Korean', 
      genre: 'Thriller', 
      year: 2019, 
      description: 'Oscar-winning drama about class struggle.',
      rating: 4.9,
      recommended: true
    },
    { 
      _id: '3', 
      title: 'The Dark Knight', 
      language: 'English', 
      genre: 'Action', 
      year: 2008, 
      description: 'Batman faces his greatest challenge.',
      rating: 4.7,
      recommended: true
    },
    { 
      _id: '4', 
      title: 'La La Land', 
      language: 'English', 
      genre: 'Romance', 
      year: 2016, 
      description: 'A musical romance in modern Los Angeles.',
      rating: 4.6,
      recommended: false
    },
    { 
      _id: '5', 
      title: 'Interstellar', 
      language: 'English', 
      genre: 'Sci-Fi', 
      year: 2014, 
      description: 'Space exploration to save humanity.',
      rating: 4.5,
      recommended: false
    },
    { 
      _id: '6', 
      title: 'John Wick', 
      language: 'English', 
      genre: 'Action', 
      year: 2014, 
      description: 'A retired hitman seeks revenge.',
      rating: 4.4,
      recommended: false
    }
  ];
}

function MovieCard({ movie, onDelete }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie._id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(movie._id);
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
            onClick={handleDeleteClick}
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
            opacity: 0,
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

function MovieSection({ title, movies, onDelete, icon }) {
  if (movies.length === 0) return null;

  return (
    <Box sx={{ mb: 6 }}>
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

function MovieList({ searchTerm = '' }) {
  const [movies, setMovies] = useState(getInitialMovies());

  useEffect(() => {
    console.log('Debug - Saving movies to localStorage:', movies);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(movies));
  }, [movies]);

  const handleDelete = (movieId) => {
    setMovies(movies.filter(m => m._id !== movieId));
  };

  const filteredMovies = movies.filter(movie => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      (movie.title && movie.title.toLowerCase().includes(term)) ||
      (movie.genre && movie.genre.toLowerCase().includes(term))
    );
  });

  // Group movies by genre
  const moviesByGenre = filteredMovies.reduce((acc, movie) => {
    const genre = movie.genre || 'Other';
    if (!acc[genre]) acc[genre] = [];
    acc[genre].push(movie);
    return acc;
  }, {});

  // Get recommended movies
  const recommendedMovies = filteredMovies.filter(movie => movie.recommended);

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
          No movies found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Recommended Section */}
      {recommendedMovies.length > 0 && (
        <MovieSection
          title="Recommended for You"
          movies={recommendedMovies}
          onDelete={handleDelete}
          icon={<TrendingUpIcon sx={{ fontSize: 32, color: 'primary.main' }} />}
        />
      )}

      {/* Genre Sections */}
      {Object.entries(moviesByGenre).map(([genre, genreMovies]) => (
        <MovieSection
          key={genre}
          title={genre}
          movies={genreMovies}
          onDelete={handleDelete}
          icon={<MovieIcon sx={{ fontSize: 32, color: 'primary.main' }} />}
        />
      ))}


    </Box>
  );
}

export default MovieList; 
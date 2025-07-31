import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Divider,
  Stack,
  IconButton,
  Paper,
  Rating,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ArrowBack,
  Star,
  CalendarToday,
  Language,
  Movie,
  PlayArrow,
  Favorite,
  Share,
  Delete,
  Edit,
  TrendingUp,
  AccessTime,
  Public,
  LocalMovies,
  Tv,
  Computer,
  Phone,
  Animation
} from '@mui/icons-material';

const LOCAL_KEY = 'movies_db';

// Mock streaming platforms data
const STREAMING_PLATFORMS = {
  'Inception': [
    { name: 'Netflix', icon: '🎬', available: true },
    { name: 'Amazon Prime', icon: '📺', available: true },
    { name: 'Disney+', icon: '🏰', available: false },
    { name: 'HBO Max', icon: '📺', available: true }
  ],
  'Parasite': [
    { name: 'Netflix', icon: '🎬', available: true },
    { name: 'Hulu', icon: '📺', available: true },
    { name: 'Amazon Prime', icon: '📺', available: false },
    { name: 'Apple TV+', icon: '🍎', available: false }
  ],
  'The Dark Knight': [
    { name: 'Netflix', icon: '🎬', available: false },
    { name: 'Amazon Prime', icon: '📺', available: true },
    { name: 'HBO Max', icon: '📺', available: true },
    { name: 'Disney+', icon: '🏰', available: false }
  ],
  'La La Land': [
    { name: 'Netflix', icon: '🎬', available: true },
    { name: 'Amazon Prime', icon: '📺', available: true },
    { name: 'Hulu', icon: '📺', available: false },
    { name: 'Apple TV+', icon: '🍎', available: true }
  ],
  'Interstellar': [
    { name: 'Netflix', icon: '🎬', available: true },
    { name: 'Amazon Prime', icon: '📺', available: true },
    { name: 'HBO Max', icon: '📺', available: false },
    { name: 'Paramount+', icon: '📺', available: true }
  ],
  'John Wick': [
    { name: 'Netflix', icon: '🎬', available: false },
    { name: 'Amazon Prime', icon: '📺', available: true },
    { name: 'Peacock', icon: '📺', available: true },
    { name: 'Hulu', icon: '📺', available: false }
  ]
};

// Mock external ratings
const EXTERNAL_RATINGS = {
  'Inception': {
    imdb: 8.8,
    rottenTomatoes: 87,
    metacritic: 74
  },
  'Parasite': {
    imdb: 8.6,
    rottenTomatoes: 99,
    metacritic: 96
  },
  'The Dark Knight': {
    imdb: 9.0,
    rottenTomatoes: 94,
    metacritic: 84
  },
  'La La Land': {
    imdb: 8.0,
    rottenTomatoes: 91,
    metacritic: 94
  },
  'Interstellar': {
    imdb: 8.6,
    rottenTomatoes: 73,
    metacritic: 74
  },
  'John Wick': {
    imdb: 7.4,
    rottenTomatoes: 86,
    metacritic: 68
  }
};

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      const movies = JSON.parse(stored);
      const foundMovie = movies.find(m => m._id === id);
      setMovie(foundMovie);
    }
    setLoading(false);
  }, [id]);

  const handleDelete = () => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      const movies = JSON.parse(stored);
      const updatedMovies = movies.filter(m => m._id !== id);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedMovies));
      navigate('/');
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    handleDelete();
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const getStreamingPlatforms = (movie) => {
    if (movie.streamingPlatforms && movie.streamingPlatforms.length > 0) {
      return movie.streamingPlatforms.map(platform => ({
        name: platform,
        icon: '🎬',
        available: true
      }));
    }
    return STREAMING_PLATFORMS[movie.title] || [
      { name: 'Netflix', icon: '🎬', available: false },
      { name: 'Amazon Prime', icon: '📺', available: false },
      { name: 'Hulu', icon: '📺', available: false },
      { name: 'Disney+', icon: '🏰', available: false }
    ];
  };

  const getExternalRatings = (movie) => {
    if (movie.imdbRating || movie.rottenTomatoesRating || movie.metacriticRating) {
      return {
        imdb: movie.imdbRating || 0,
        rottenTomatoes: movie.rottenTomatoesRating || 0,
        metacritic: movie.metacriticRating || 0
      };
    }
    return EXTERNAL_RATINGS[movie.title] || {
      imdb: 0,
      rottenTomatoes: 0,
      metacritic: 0
    };
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #18181c 0%, #232336 50%, #18181c 100%)', py: 4 }}>
        <Container maxWidth="lg">
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2, mb: 3 }} />
          <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
          <Skeleton variant="text" height={40} sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 2 }} />
              <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={30} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #18181c 0%, #232336 50%, #18181c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Movie sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
          <Typography variant="h4" sx={{ color: '#fff', mb: 2 }}>
            Content Not Found
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            The content you're looking for doesn't exist in our database.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            startIcon={<ArrowBack />}
            sx={{ borderRadius: 2, px: 3, py: 1.5 }}
          >
            Back to Home
          </Button>
        </Container>
      </Box>
    );
  }

  const streamingPlatforms = getStreamingPlatforms(movie);
  const externalRatings = getExternalRatings(movie);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #18181c 0%, #232336 50%, #18181c 100%)',
      py: 4
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{
              color: '#fff',
              mb: 2,
              '&:hover': { color: '#e50914' }
            }}
          >
            Back to Home
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <Fade in={true} timeout={800}>
              <Stack spacing={4}>
                {/* Hero Section */}
                <Card sx={{ 
                  borderRadius: 4, 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  background: 'rgba(35,35,54,0.95)',
                  border: '1px solid rgba(229, 9, 20, 0.2)',
                  backdropFilter: 'blur(10px)',
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    height: 300,
                    background: movie.type === 'movie' ? `linear-gradient(135deg, #232336 0%, #e50914 100%)` :
                             movie.type === 'series' ? `linear-gradient(135deg, #232336 0%, #009688 100%)` :
                             `linear-gradient(135deg, #232336 0%, #9c27b0 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    {movie.type === 'movie' ? <Movie sx={{ fontSize: 120, color: '#fff', opacity: 0.1 }} /> :
                     movie.type === 'series' ? <Tv sx={{ fontSize: 120, color: '#fff', opacity: 0.1 }} /> :
                     <Animation sx={{ fontSize: 120, color: '#fff', opacity: 0.1 }} />}
                    
                    {/* Action Buttons */}
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 16, 
                      right: 16, 
                      display: 'flex', 
                      gap: 1 
                    }}>
                      <IconButton
                        onClick={() => setIsFavorite(!isFavorite)}
                        sx={{
                          color: isFavorite ? '#e50914' : '#fff',
                          background: 'rgba(0,0,0,0.5)',
                          '&:hover': { background: 'rgba(229, 9, 20, 0.2)' }
                        }}
                      >
                        <Favorite />
                      </IconButton>
                      <IconButton
                        sx={{
                          color: '#fff',
                          background: 'rgba(0,0,0,0.5)',
                          '&:hover': { background: 'rgba(255,255,255,0.1)' }
                        }}
                      >
                        <Share />
                      </IconButton>
                      <IconButton
                        onClick={handleDeleteClick}
                        sx={{
                          color: '#e50914',
                          background: 'rgba(0,0,0,0.5)',
                          '&:hover': { background: 'rgba(229, 9, 20, 0.2)' }
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>

                    {/* Play Button */}
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      sx={{
                        position: 'absolute',
                        bottom: 24,
                        left: 24,
                        background: 'linear-gradient(45deg, #e50914, #ff6b6b)',
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 16px rgba(229, 9, 20, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #ff6b6b, #e50914)',
                          boxShadow: '0 6px 20px rgba(229, 9, 20, 0.4)',
                        }
                      }}
                    >
                      Watch Now
                    </Button>
                  </Box>

                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
                      <Box>
                        <Typography variant="h3" sx={{ 
                          color: '#fff', 
                          fontWeight: 900, 
                          mb: 1,
                          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                        }}>
                          {movie.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Chip 
                            label={movie.genre} 
                            sx={{ 
                              background: 'linear-gradient(45deg, #e50914, #ff6b6b)',
                              color: '#fff',
                              fontWeight: 600,
                              fontSize: '0.9rem'
                            }} 
                          />
                          <Chip 
                            label={movie.type === 'movie' ? 'Movie' : movie.type === 'series' ? 'TV Series' : 'Anime'}
                            sx={{ 
                              background: movie.type === 'movie' ? 'linear-gradient(45deg, #e50914, #ff6b6b)' :
                                       movie.type === 'series' ? 'linear-gradient(45deg, #009688, #00bcd4)' :
                                       'linear-gradient(45deg, #9c27b0, #e91e63)',
                              color: '#fff',
                              fontWeight: 600,
                              fontSize: '0.9rem'
                            }} 
                          />
                          {movie.recommended && (
                            <Chip 
                              icon={<TrendingUp />}
                              label="Recommended" 
                              sx={{ 
                                background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                                color: '#000',
                                fontWeight: 600,
                                fontSize: '0.9rem'
                              }} 
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>

                    {/* Movie Info */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarToday sx={{ color: 'primary.main' }} />
                          <Typography variant="body1" sx={{ color: '#fff' }}>
                            {movie.year}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Language sx={{ color: 'primary.main' }} />
                          <Typography variant="body1" sx={{ color: '#fff' }}>
                            {movie.language}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Star sx={{ color: '#ffd700' }} />
                          <Typography variant="body1" sx={{ color: '#fff' }}>
                            {movie.rating}/5.0
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Description */}
                    <Typography variant="body1" sx={{ 
                      color: 'text.secondary', 
                      lineHeight: 1.8,
                      fontSize: '1.1rem'
                    }}>
                      {movie.description}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Streaming Platforms */}
                <Card sx={{ 
                  borderRadius: 4, 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  background: 'rgba(35,35,54,0.95)',
                  border: '1px solid rgba(229, 9, 20, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 3 }}>
                      Where to Watch
                    </Typography>
                    <Grid container spacing={2}>
                      {streamingPlatforms.map((platform, index) => (
                        <Grid item xs={6} sm={3} key={index}>
                          <Paper sx={{
                            p: 2,
                            textAlign: 'center',
                            background: platform.available 
                              ? 'rgba(229, 9, 20, 0.1)' 
                              : 'rgba(255,255,255,0.05)',
                            border: platform.available 
                              ? '1px solid rgba(229, 9, 20, 0.3)' 
                              : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 2,
                            opacity: platform.available ? 1 : 0.5
                          }}>
                            <Typography variant="h4" sx={{ mb: 1 }}>
                              {platform.icon}
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              color: platform.available ? '#fff' : 'text.secondary',
                              fontWeight: 600
                            }}>
                              {platform.name}
                            </Typography>
                            <Chip 
                              label={platform.available ? 'Available' : 'Not Available'} 
                              size="small"
                              sx={{ 
                                mt: 1,
                                background: platform.available 
                                  ? 'linear-gradient(45deg, #4caf50, #66bb6a)' 
                                  : 'rgba(255,255,255,0.1)',
                                color: '#fff',
                                fontSize: '0.7rem'
                              }} 
                            />
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>

                                 {/* External Ratings */}
                 <Card sx={{ 
                   borderRadius: 4, 
                   boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                   background: 'rgba(35,35,54,0.95)',
                   border: '1px solid rgba(229, 9, 20, 0.2)',
                   backdropFilter: 'blur(10px)'
                 }}>
                   <CardContent sx={{ p: 4 }}>
                     <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 3 }}>
                       Ratings & Reviews
                     </Typography>
                     <Grid container spacing={3}>
                       <Grid item xs={12} sm={4}>
                         <Box sx={{ textAlign: 'center', p: 2 }}>
                           <Typography variant="h4" sx={{ color: '#ffd700', fontWeight: 900, mb: 1 }}>
                             {externalRatings.imdb}
                           </Typography>
                           <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                             IMDb
                           </Typography>
                           <Rating value={externalRatings.imdb / 2} readOnly precision={0.1} />
                         </Box>
                       </Grid>
                       <Grid item xs={12} sm={4}>
                         <Box sx={{ textAlign: 'center', p: 2 }}>
                           <Typography variant="h4" sx={{ color: '#ff6b35', fontWeight: 900, mb: 1 }}>
                             {externalRatings.rottenTomatoes}%
                           </Typography>
                           <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                             Rotten Tomatoes
                           </Typography>
                           <Box sx={{ 
                             width: 60, 
                             height: 60, 
                             borderRadius: '50%', 
                             border: '4px solid #ff6b35',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             margin: '0 auto'
                           }}>
                             <Typography variant="body2" sx={{ color: '#ff6b35', fontWeight: 600 }}>
                               {externalRatings.rottenTomatoes}%
                             </Typography>
                           </Box>
                         </Box>
                       </Grid>
                       <Grid item xs={12} sm={4}>
                         <Box sx={{ textAlign: 'center', p: 2 }}>
                           <Typography variant="h4" sx={{ color: '#00d4aa', fontWeight: 900, mb: 1 }}>
                             {externalRatings.metacritic}
                           </Typography>
                           <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                             Metacritic
                           </Typography>
                           <Box sx={{ 
                             width: 60, 
                             height: 60, 
                             borderRadius: '50%', 
                             border: '4px solid #00d4aa',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             margin: '0 auto'
                           }}>
                             <Typography variant="body2" sx={{ color: '#00d4aa', fontWeight: 600 }}>
                               {externalRatings.metacritic}
                             </Typography>
                           </Box>
                         </Box>
                       </Grid>
                     </Grid>
                   </CardContent>
                 </Card>

                 {/* Content Details */}
                 {(movie.director || movie.cast || movie.runtime || movie.budget || movie.boxOffice || movie.awards) && (
                   <Card sx={{ 
                     borderRadius: 4, 
                     boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                     background: 'rgba(35,35,54,0.95)',
                     border: '1px solid rgba(229, 9, 20, 0.2)',
                     backdropFilter: 'blur(10px)'
                   }}>
                     <CardContent sx={{ p: 4 }}>
                       <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 3 }}>
                         {movie.type === 'movie' ? 'Movie' : movie.type === 'series' ? 'Series' : 'Anime'} Details
                       </Typography>
                       <Grid container spacing={3}>
                         {movie.director && (
                           <Grid item xs={12} sm={6}>
                             <Box sx={{ p: 2, background: 'rgba(0,0,0,0.2)', borderRadius: 2 }}>
                               <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1 }}>
                                 Director
                               </Typography>
                               <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
                                 {movie.director}
                               </Typography>
                             </Box>
                           </Grid>
                         )}
                         {movie.cast && (
                           <Grid item xs={12} sm={6}>
                             <Box sx={{ p: 2, background: 'rgba(0,0,0,0.2)', borderRadius: 2 }}>
                               <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1 }}>
                                 Cast
                               </Typography>
                               <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
                                 {movie.cast}
                               </Typography>
                             </Box>
                           </Grid>
                         )}
                         {movie.runtime && (
                           <Grid item xs={12} sm={6}>
                             <Box sx={{ p: 2, background: 'rgba(0,0,0,0.2)', borderRadius: 2 }}>
                               <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1 }}>
                                 Runtime
                               </Typography>
                               <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
                                 {movie.runtime} minutes
                               </Typography>
                             </Box>
                           </Grid>
                         )}
                         {movie.budget && (
                           <Grid item xs={12} sm={6}>
                             <Box sx={{ p: 2, background: 'rgba(0,0,0,0.2)', borderRadius: 2 }}>
                               <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1 }}>
                                 Budget
                               </Typography>
                               <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
                                 {movie.budget}
                               </Typography>
                             </Box>
                           </Grid>
                         )}
                         {movie.boxOffice && (
                           <Grid item xs={12} sm={6}>
                             <Box sx={{ p: 2, background: 'rgba(0,0,0,0.2)', borderRadius: 2 }}>
                               <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1 }}>
                                 Box Office
                               </Typography>
                               <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
                                 {movie.boxOffice}
                               </Typography>
                             </Box>
                           </Grid>
                         )}
                         {movie.awards && (
                           <Grid item xs={12}>
                             <Box sx={{ p: 2, background: 'rgba(0,0,0,0.2)', borderRadius: 2 }}>
                               <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1 }}>
                                 Awards
                               </Typography>
                               <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
                                 {movie.awards}
                               </Typography>
                             </Box>
                           </Grid>
                         )}
                       </Grid>
                     </CardContent>
                   </Card>
                 )}

                 {/* Trailer Section */}
                 {movie.trailerUrl && (
                   <Card sx={{ 
                     borderRadius: 4, 
                     boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                     background: 'rgba(35,35,54,0.95)',
                     border: '1px solid rgba(229, 9, 20, 0.2)',
                     backdropFilter: 'blur(10px)'
                   }}>
                     <CardContent sx={{ p: 4 }}>
                       <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 3 }}>
                         Trailer
                       </Typography>
                       <Box sx={{ 
                         width: '100%', 
                         height: 400, 
                         background: 'rgba(0,0,0,0.3)', 
                         borderRadius: 2,
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         border: '1px solid rgba(255,255,255,0.1)'
                       }}>
                         <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                           Trailer URL: {movie.trailerUrl}
                         </Typography>
                       </Box>
                     </CardContent>
                   </Card>
                 )}
              </Stack>
            </Fade>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Fade in={true} timeout={1000}>
              <Stack spacing={3}>
                {/* Quick Info */}
                <Card sx={{ 
                  borderRadius: 4, 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  background: 'rgba(35,35,54,0.95)',
                  border: '1px solid rgba(229, 9, 20, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
                      Quick Info
                    </Typography>
                                         <List dense>
                       <ListItem sx={{ px: 0 }}>
                         <ListItemIcon>
                           <CalendarToday sx={{ color: 'primary.main' }} />
                         </ListItemIcon>
                         <ListItemText 
                           primary="Release Year" 
                           secondary={movie.year}
                           primaryTypographyProps={{ color: 'text.secondary', fontSize: '0.9rem' }}
                           secondaryTypographyProps={{ color: '#fff', fontWeight: 600 }}
                         />
                       </ListItem>
                       <ListItem sx={{ px: 0 }}>
                         <ListItemIcon>
                           <Language sx={{ color: 'primary.main' }} />
                         </ListItemIcon>
                         <ListItemText 
                           primary="Language" 
                           secondary={movie.language}
                           primaryTypographyProps={{ color: 'text.secondary', fontSize: '0.9rem' }}
                           secondaryTypographyProps={{ color: '#fff', fontWeight: 600 }}
                         />
                       </ListItem>
                       <ListItem sx={{ px: 0 }}>
                         <ListItemIcon>
                           <Movie sx={{ color: 'primary.main' }} />
                         </ListItemIcon>
                         <ListItemText 
                           primary="Genre" 
                           secondary={movie.genre}
                           primaryTypographyProps={{ color: 'text.secondary', fontSize: '0.9rem' }}
                           secondaryTypographyProps={{ color: '#fff', fontWeight: 600 }}
                         />
                       </ListItem>
                       <ListItem sx={{ px: 0 }}>
                         <ListItemIcon>
                           <Star sx={{ color: '#ffd700' }} />
                         </ListItemIcon>
                         <ListItemText 
                           primary="Rating" 
                           secondary={`${movie.rating}/5.0`}
                           primaryTypographyProps={{ color: 'text.secondary', fontSize: '0.9rem' }}
                           secondaryTypographyProps={{ color: '#fff', fontWeight: 600 }}
                         />
                       </ListItem>
                       {movie.runtime && (
                         <ListItem sx={{ px: 0 }}>
                           <ListItemIcon>
                             <AccessTime sx={{ color: 'primary.main' }} />
                           </ListItemIcon>
                           <ListItemText 
                             primary="Runtime" 
                             secondary={`${movie.runtime} min`}
                             primaryTypographyProps={{ color: 'text.secondary', fontSize: '0.9rem' }}
                             secondaryTypographyProps={{ color: '#fff', fontWeight: 600 }}
                           />
                         </ListItem>
                       )}
                       {movie.director && (
                         <ListItem sx={{ px: 0 }}>
                           <ListItemIcon>
                             <Movie sx={{ color: 'primary.main' }} />
                           </ListItemIcon>
                           <ListItemText 
                             primary="Director" 
                             secondary={movie.director}
                             primaryTypographyProps={{ color: 'text.secondary', fontSize: '0.9rem' }}
                             secondaryTypographyProps={{ color: '#fff', fontWeight: 600 }}
                           />
                         </ListItem>
                       )}
                     </List>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card sx={{ 
                  borderRadius: 4, 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  background: 'rgba(35,35,54,0.95)',
                  border: '1px solid rgba(229, 9, 20, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
                      Actions
                    </Typography>
                    <Stack spacing={2}>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<PlayArrow />}
                        sx={{
                          background: 'linear-gradient(45deg, #e50914, #ff6b6b)',
                          borderRadius: 2,
                          py: 1.5,
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #ff6b6b, #e50914)',
                          }
                        }}
                      >
                        Watch Now
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Edit />}
                        onClick={() => navigate(`/edit/${movie._id}`)}
                        sx={{
                          borderColor: 'rgba(255,255,255,0.3)',
                          color: '#fff',
                          borderRadius: 2,
                          py: 1.5,
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: '#e50914',
                            color: '#e50914',
                            background: 'rgba(229, 9, 20, 0.1)'
                          }
                        }}
                      >
                        Edit {movie.type === 'movie' ? 'Movie' : movie.type === 'series' ? 'Series' : 'Anime'}
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description">
            Are you sure you want to delete "{movie.title}"? This action cannot be undone.
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

export default MovieDetails; 
import React, { useState, useEffect } from 'react';
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MovieList from './MovieList';
import AddMovie from './AddMovie';
import MovieDetails from './MovieDetails';
import Header from './Header';
import LanguageList from './LanguageList';
import LanguageMovies from './LanguageMovies';
import Login from './Login';
import UserProfile from './UserProfile';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914',
    },
    secondary: {
      main: '#22223b',
    },
    background: {
      default: '#18181c',
      paper: '#232336',
    },
    text: {
      primary: '#fff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, Helvetica, Arial, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: 1,
    },
    h5: {
      fontWeight: 700,
      letterSpacing: 1,
    },
  },
  shape: {
    borderRadius: 14,
  },
});

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [searchParams] = useSearchParams();
  const contentType = searchParams.get('type');

  // Check for existing user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // If no user is logged in, show login screen
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  function HomePage({ searchTerm }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const contentType = searchParams.get('type');
    
    return (
      <Box sx={{ width: '100%', px: { xs: 2, sm: 4, md: 6 }, pb: 6, pt: 4 }}>
        {/* Add Content Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mb: 4, 
          mt: 2 
        }}>
          <Button
            onClick={() => navigate('/add')}
            sx={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.1rem',
              letterSpacing: 0.5,
              transition: 'all 0.3s',
              textTransform: 'none',
              background: 'linear-gradient(45deg, #e50914, #ff6b6b)',
              borderRadius: 3,
              px: 4,
              py: 1.5,
              boxShadow: '0 4px 15px rgba(229,9,20,0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #ff6b6b, #e50914)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(229,9,20,0.4)',
              },
            }}
          >
            Add Content
          </Button>
        </Box>
        
        {/* Welcome Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 6,
          background: 'rgba(35,35,54,0.95)',
          borderRadius: 4,
          p: 4,
          border: '1px solid rgba(229, 9, 20, 0.2)'
        }}>
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 900, 
              letterSpacing: 2,
              textShadow: '0 4px 20px rgba(229, 9, 20, 0.3)',
              mb: 2
            }}
          >
            Welcome back, {user.name}!
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'text.secondary', 
              fontWeight: 400,
              mb: 3,
              opacity: 0.8
            }}
          >
            Your personal collection of movies, TV series, and anime
          </Typography>
          
          {/* Quick Stats */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap', mt: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                Movies
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Feature Films
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#009688', fontWeight: 700 }}>
                TV Series
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Television Shows
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#9c27b0', fontWeight: 700 }}>
                Anime
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Japanese Animation
              </Typography>
            </Box>
          </Box>
          
          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4, flexWrap: 'wrap' }}>
            <Button
              onClick={() => navigate('/movies')}
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #e50914, #ff6b6b)',
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                '&:hover': {
                  background: 'linear-gradient(45deg, #ff6b6b, #e50914)',
                },
              }}
            >
              Browse All Content
            </Button>
            <Button
              onClick={() => navigate('/add')}
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(229, 9, 20, 0.1)',
                },
              }}
            >
              Add New Content
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  function MoviesPage({ searchTerm }) {
    const [searchParams] = useSearchParams();
    const contentType = searchParams.get('type');
    
    return (
      <Box sx={{ width: '100%', px: { xs: 2, sm: 4, md: 6 }, pb: 6, pt: 4 }}>
        <MovieList searchTerm={searchTerm} contentType={contentType} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #18181c 0%, #232336 50%, #18181c 100%)' }}>
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        user={user}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
        <Route path="/movies" element={<MoviesPage searchTerm={searchTerm} />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/series/:id" element={<MovieDetails />} />
        <Route path="/anime/:id" element={<MovieDetails />} />
        <Route path="/languages" element={<LanguageList />} />
        <Route path="/language/:lang" element={<LanguageMovies />} />
        <Route path="/profile" element={<UserProfile user={user} onLogout={handleLogout} />} />
      </Routes>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
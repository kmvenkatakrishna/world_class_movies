import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  InputBase,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Divider
} from '@mui/material';
import {
  Movie as MovieIcon,
  Search as SearchIcon,
  Language as LanguageIcon,
  Person,
  Settings,
  Logout,
  AccountCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LOCAL_KEY = 'movies_db';

// Available languages from AddMovie component
const LANGUAGES = [
  'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 
  'Kannada', 'Malayalam', 'Punjabi', 'Odia', 'Assamese', 'Sanskrit',
  'Urdu', 'Kashmiri', 'Konkani', 'Manipuri', 'Nepali', 'Sindhi',
  'Korean', 'Japanese', 'Chinese', 'Spanish', 'French', 'German', 'Italian',
  'Portuguese', 'Russian', 'Arabic', 'Turkish', 'Thai', 'Vietnamese',
  'Indonesian', 'Filipino', 'Swedish', 'Norwegian', 'Danish', 'Dutch',
  'Polish', 'Czech', 'Hungarian', 'Greek', 'Hebrew', 'Persian'
];

function Header({ searchTerm, onSearchChange, user, onLogout }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [contentCount, setContentCount] = useState(0);
  const [languageCounts, setLanguageCounts] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      const movies = JSON.parse(stored);
      setContentCount(movies.length);
      
      // Calculate language counts
      const counts = {};
      movies.forEach(movie => {
        if (movie.language) {
          const lang = movie.language.trim();
          counts[lang] = (counts[lang] || 0) + 1;
        }
      });
      setLanguageCounts(counts);
    }
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageMenuClick = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageSelect = (language) => {
    handleLanguageMenuClose();
    navigate(`/language/${encodeURIComponent(language)}`);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    onLogout();
  };

  return (
    <AppBar position="static" sx={{ background: 'rgba(35,35,54,0.95)', backdropFilter: 'blur(10px)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <MovieIcon sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff' }}>
            Movie Database
          </Typography>
        </Box>

        {/* Navigation Buttons and Search Bar */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {/* Content Type Navigation */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            <Button
              onClick={() => navigate('/movies')}
              sx={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: 0.5,
                transition: 'all 0.3s',
                textTransform: 'none',
                '&:hover': { color: '#e50914' }
              }}
            >
              All
            </Button>
            <Button
              onClick={() => navigate('/movies?type=movie')}
              sx={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: 0.5,
                transition: 'all 0.3s',
                textTransform: 'none',
                '&:hover': { color: '#e50914' }
              }}
            >
              Movies
            </Button>
            <Button
              onClick={() => navigate('/movies?type=series')}
              sx={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: 0.5,
                transition: 'all 0.3s',
                textTransform: 'none',
                '&:hover': { color: '#e50914' }
              }}
            >
              Series
            </Button>
            <Button
              onClick={() => navigate('/movies?type=anime')}
              sx={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: 0.5,
                transition: 'all 0.3s',
                textTransform: 'none',
                '&:hover': { color: '#e50914' }
              }}
            >
              Anime
            </Button>
          </Box>

          {/* Search Bar - Positioned to the right */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 3,
            px: 2,
            py: 0.5,
            minWidth: 300,
            ml: 2
          }}>
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              placeholder="Search movies, series, anime..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              sx={{ color: '#fff', '& input::placeholder': { color: 'text.secondary' } }}
            />
          </Box>

          {/* Language Dropdown */}
          <Button
            onClick={handleLanguageMenuClick}
            startIcon={<LanguageIcon />}
            sx={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: 0.5,
              transition: 'all 0.3s',
              textTransform: 'none',
              '&:hover': { color: '#e50914' }
            }}
          >
            Languages
          </Button>
          <Menu
            anchorEl={languageAnchorEl}
            open={Boolean(languageAnchorEl)}
            onClose={handleLanguageMenuClose}
            PaperProps={{
              sx: {
                background: 'rgba(35,35,54,0.95)',
                border: '1px solid rgba(229, 9, 20, 0.2)',
                backdropFilter: 'blur(10px)',
                mt: 1,
                maxHeight: 400,
                overflow: 'auto'
              }
            }}
          >
            {LANGUAGES.map((language) => (
              <MenuItem 
                key={language} 
                onClick={() => handleLanguageSelect(language)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(229, 9, 20, 0.1)',
                  }
                }}
              >
                <ListItemIcon>
                  <LanguageIcon sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText
                  primary={language}
                  secondary={`${languageCounts[language] || 0} content`}
                  primaryTypographyProps={{ color: '#fff' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </MenuItem>
            ))}
          </Menu>

          {/* User Profile */}
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <IconButton
                onClick={handleMenuClick}
                sx={{
                  p: 0,
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <Avatar
                  src={user.avatar}
                  sx={{
                    width: 40,
                    height: 40,
                    border: '2px solid rgba(229, 9, 20, 0.3)',
                    cursor: 'pointer'
                  }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    background: 'rgba(35,35,54,0.95)',
                    border: '1px solid rgba(229, 9, 20, 0.2)',
                    backdropFilter: 'blur(10px)',
                    mt: 1,
                    minWidth: 200
                  }
                }}
              >
                <MenuItem sx={{ pointerEvents: 'none' }}>
                  <ListItemIcon>
                    <AccountCircle sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={user.name}
                    secondary={user.role}
                    primaryTypographyProps={{ color: '#fff', fontWeight: 600 }}
                    secondaryTypographyProps={{ color: 'text.secondary' }}
                  />
                </MenuItem>
                <Divider sx={{ borderColor: 'rgba(229, 9, 20, 0.2)' }} />
                <MenuItem onClick={handleProfileClick}>
                  <ListItemIcon>
                    <Person sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profile"
                    primaryTypographyProps={{ color: '#fff' }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Settings sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Settings"
                    primaryTypographyProps={{ color: '#fff' }}
                  />
                </MenuItem>
                <Divider sx={{ borderColor: 'rgba(229, 9, 20, 0.2)' }} />
                <MenuItem onClick={handleLogoutClick}>
                  <ListItemIcon>
                    <Logout sx={{ color: '#ff6b6b' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{ color: '#ff6b6b' }}
                  />
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header; 
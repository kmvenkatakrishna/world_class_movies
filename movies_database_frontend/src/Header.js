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
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import TheatersIcon from '@mui/icons-material/Theaters';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(20,20,20,0.95)',
  boxShadow: '0 2px 16px 0 rgba(0,0,0,0.4)',
  backdropFilter: 'blur(6px)',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255,255,255,0.10)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  boxShadow: '0 1px 6px 0 rgba(0,0,0,0.18)',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  fontWeight: 500,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    background: 'transparent',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '28ch',
      },
    },
  },
}));

const LOCAL_KEY = 'movies_db';

function Header({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [languages, setLanguages] = useState([]);

  const loadLanguages = () => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      const movies = JSON.parse(stored);
      console.log('Header Debug - All movies from localStorage:', movies);
      const langCount = {};
      movies.forEach(movie => {
        if (movie.language) {
          const lang = movie.language.trim();
          langCount[lang] = (langCount[lang] || 0) + 1;
          console.log('Header Debug - Found language:', lang, 'for movie:', movie.title);
        }
      });
      console.log('Header Debug - Language counts:', langCount);
      setLanguages(Object.entries(langCount).sort((a, b) => b[1] - a[1]));
    } else {
      console.log('Header Debug - No movies found in localStorage');
    }
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === LOCAL_KEY) {
        loadLanguages();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    const handleCustomStorageChange = () => {
      loadLanguages();
    };
    
    window.addEventListener('localStorageChange', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange);
    };
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (language) => {
    const url = `/language/${encodeURIComponent(language)}`;
    console.log('Header Debug - Navigating to:', url, 'for language:', language);
    navigate(url);
    handleMenuClose();
  };

  const open = Boolean(anchorEl);

  // Add more Indian languages
  const indianLanguages = [
    'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 
    'Kannada', 'Malayalam', 'Punjabi', 'Odia', 'Assamese', 'Sanskrit',
    'Urdu', 'Kashmiri', 'Konkani', 'Manipuri', 'Nepali', 'Sindhi'
  ];

  // Combine existing languages with Indian languages
  const allLanguages = [...languages];
  indianLanguages.forEach(lang => {
    if (!allLanguages.find(([existingLang]) => existingLang.toLowerCase() === lang.toLowerCase())) {
      allLanguages.push([lang, 0]); // 0 count for languages not in database yet
    }
  });

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        px: { xs: 2, sm: 4, md: 6 },
        py: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TheatersIcon sx={{ 
            color: 'primary.main', 
            fontSize: 36, 
            mr: 1, 
            mb: 0.3, 
            filter: 'drop-shadow(0 2px 8px #e5091440)' 
          }} />
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 900, 
              fontFamily: 'Bebas Neue, Montserrat, Arial', 
              color: 'primary.main', 
              mr: 4, 
              letterSpacing: 2, 
              cursor: 'pointer', 
              textShadow: '0 2px 12px #e5091440',
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }} 
            onClick={() => navigate('/')}
          >
            Movie Database
          </Typography>
          
          {/* Movies Navigation Button */}
          {/* <Button
            onClick={() => navigate('/movies')}
            sx={{
              color: '#fff',
              textDecoration: 'none',
              marginRight: 2,
              fontWeight: 600,
              fontSize: '1.15rem',
              letterSpacing: 0.5,
              transition: 'color 0.2s',
              textTransform: 'none',
              '&:hover': {
                color: '#e50914',
                backgroundColor: 'rgba(229,9,20,0.1)',
              },
            }}
          >
            Movies
          </Button> */}
          
          <Box
            onMouseEnter={handleMenuOpen}
            onMouseLeave={handleMenuClose}
            sx={{ position: 'relative' }}
          >
            <Button
              sx={{
                color: '#fff',
                textDecoration: 'none',
                marginRight: 2,
                fontWeight: 600,
                fontSize: '1.15rem',
                letterSpacing: 0.5,
                transition: 'color 0.2s',
                textTransform: 'none',
                '&:hover': {
                  color: '#e50914',
                  backgroundColor: 'rgba(229,9,20,0.1)',
                },
              }}
              endIcon={<ExpandMoreIcon />}
            >
              Languages
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: 'rgba(35,35,54,0.98)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(10px)',
                  mt: 1,
                  minWidth: 200,
                  maxHeight: 400,
                  overflow: 'auto',
                }
              }}
              MenuListProps={{
                onMouseLeave: handleMenuClose,
                onMouseEnter: () => setAnchorEl(anchorEl), // Keep menu open when hovering over it
              }}
            >
              {allLanguages.map(([lang, count]) => (
                <MenuItem 
                  key={lang} 
                  onClick={() => handleLanguageSelect(lang)}
                  sx={{
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'rgba(229,9,20,0.2)',
                    },
                    py: 1.5,
                  }}
                >
                  <ListItemIcon>
                    <LanguageIcon sx={{ color: '#e50914', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={lang} 
                    secondary={count > 0 ? `${count} content` : 'No content yet'}
                    primaryTypographyProps={{
                      sx: { fontWeight: 600, fontSize: '1rem' }
                    }}
                    secondaryTypographyProps={{
                      sx: { color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }
                    }}
                  />
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          {/* Content Type Navigation */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={() => navigate('/movies')}
              sx={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                letterSpacing: 0.5,
                transition: 'color 0.2s',
                textTransform: 'none',
                '&:hover': {
                  color: '#e50914',
                  backgroundColor: 'rgba(229,9,20,0.1)',
                },
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
                fontSize: '1rem',
                letterSpacing: 0.5,
                transition: 'color 0.2s',
                textTransform: 'none',
                '&:hover': {
                  color: '#e50914',
                  backgroundColor: 'rgba(229,9,20,0.1)',
                },
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
                fontSize: '1rem',
                letterSpacing: 0.5,
                transition: 'color 0.2s',
                textTransform: 'none',
                '&:hover': {
                  color: '#009688',
                  backgroundColor: 'rgba(0,150,136,0.1)',
                },
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
                fontSize: '1rem',
                letterSpacing: 0.5,
                transition: 'color 0.2s',
                textTransform: 'none',
                '&:hover': {
                  color: '#9c27b0',
                  backgroundColor: 'rgba(156,39,176,0.1)',
                },
              }}
            >
              Anime
            </Button>
          </Box>
        </Box>
        <Search sx={{
          boxShadow: '0 0 0 0 #e50914',
          transition: 'box-shadow 0.3s',
          '&:focus-within': {
            boxShadow: '0 0 0 3px #e50914',
            backgroundColor: 'rgba(229,9,20,0.18)',
          },
        }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search by name or genre…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </Search>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Header; 
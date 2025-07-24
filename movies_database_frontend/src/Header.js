import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, InputBase, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import TheatersIcon from '@mui/icons-material/Theaters';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(20,20,20,0.95)',
  boxShadow: '0 2px 16px 0 rgba(0,0,0,0.4)',
  backdropFilter: 'blur(6px)',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: '#fff',
  textDecoration: 'none',
  marginRight: theme.spacing(4),
  fontWeight: 600,
  fontSize: '1.15rem',
  letterSpacing: 0.5,
  transition: 'color 0.2s',
  '&:hover': {
    color: '#e50914',
  },
  '&.active': {
    borderBottom: '2px solid #e50914',
    color: '#e50914',
  },
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

function Header({ searchTerm, setSearchTerm }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TheatersIcon sx={{ color: 'primary.main', fontSize: 36, mr: 1, mb: 0.3, filter: 'drop-shadow(0 2px 8px #e5091440)' }} />
          <Typography variant="h5" sx={{ fontWeight: 900, fontFamily: 'Bebas Neue, Montserrat, Arial', color: 'primary.main', mr: 4, letterSpacing: 2, cursor: 'pointer', textShadow: '0 2px 12px #e5091440' }} onClick={() => navigate('/')}>Movie Databse</Typography>
          <StyledLink to="/" className={location.pathname === '/' ? 'active' : ''}>Home</StyledLink>
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
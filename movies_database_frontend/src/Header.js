import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, InputBase, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
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
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#e50914', mr: 4, letterSpacing: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>Movie Databse</Typography>
          <StyledLink to="/" className={location.pathname === '/' ? 'active' : ''}>Home</StyledLink>
        </Box>
        <Search>
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
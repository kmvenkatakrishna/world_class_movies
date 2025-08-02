import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Fade,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Movie,
  Person,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon
} from '@mui/icons-material';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setError('');
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoggingIn(true);
    setError('');

    // Simulate login delay
    setTimeout(() => {
      setIsLoggingIn(false);
      
      // Create a default user for demo
      const user = {
        id: 1,
        username: formData.username,
        name: formData.username.charAt(0).toUpperCase() + formData.username.slice(1),
        email: `${formData.username}@example.com`,
        avatar: 'https://i.pravatar.cc/150?img=1',
        role: 'Movie Enthusiast'
      };
      
      onLogin(user);
    }, 1000);
  };

  const handleGuestLogin = () => {
    const guestUser = {
      id: 0,
      username: 'guest',
      name: 'Guest User',
      email: 'guest@example.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'Guest'
    };
    onLogin(guestUser);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: '#18181c',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23e50914" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.5
      }} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={true} timeout={1000}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            background: 'rgba(35,35,54,0.95)',
            border: '1px solid rgba(229, 9, 20, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <CardContent sx={{ p: 4 }}>
              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Movie sx={{ fontSize: 60, color: '#e50914', mb: 2 }} />
                <Typography 
                  variant="h3" 
                  sx={{ 
                    color: '#fff', 
                    fontWeight: 900, 
                    letterSpacing: 2,
                    mb: 1
                  }}
                >
                  Movie Database
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#b3b3b3', 
                    fontWeight: 400,
                    opacity: 0.8
                  }}
                >
                  Sign in to your account
                </Typography>
              </Box>

              {/* Login Form */}
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="Username"
                  value={formData.username}
                  onChange={handleInputChange('username')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: '#e50914' }} />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    sx: { color: '#b3b3b3' }
                  }}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(229, 9, 20, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#e50914',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#fff',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#e50914' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#b3b3b3' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    sx: { color: '#b3b3b3' }
                  }}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(229, 9, 20, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#e50914',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#fff',
                    },
                  }}
                />
              </Box>

              {/* Error Message */}
              {error && (
                <Alert severity="error" sx={{ mb: 3, background: 'rgba(244, 67, 54, 0.1)', color: '#ff6b6b' }}>
                  {error}
                </Alert>
              )}

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleLogin}
                  disabled={!formData.username || !formData.password || isLoggingIn}
                  startIcon={<LoginIcon />}
                  sx={{
                    background: 'linear-gradient(45deg, #e50914, #ff6b6b)',
                    borderRadius: 3,
                    py: 1.5,
                    fontWeight: 700,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #ff6b6b, #e50914)',
                    },
                    '&:disabled': {
                      background: 'rgba(255,255,255,0.1)',
                    }
                  }}
                >
                  {isLoggingIn ? 'Signing In...' : 'Sign In'}
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={handleGuestLogin}
                  sx={{
                    borderColor: 'rgba(229, 9, 20, 0.5)',
                    color: '#e50914',
                    borderRadius: 3,
                    py: 1.5,
                    fontWeight: 700,
                    '&:hover': {
                      borderColor: '#e50914',
                      backgroundColor: 'rgba(229, 9, 20, 0.1)',
                    },
                  }}
                >
                  Continue as Guest
                </Button>
              </Box>

              {/* Demo Info */}
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#b3b3b3', opacity: 0.7 }}>
                  💡 Demo Mode: Enter any username and password to login
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
}

export default Login; 
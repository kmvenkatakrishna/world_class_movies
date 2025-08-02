import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
  Button,
  Divider,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  LinearProgress,
  Badge,
  Tooltip,
  Fade
} from '@mui/material';
import {
  Person,
  Email,
  CalendarToday,
  Movie,
  Star,
  Favorite,
  Logout,
  Edit,
  Settings,
  TrendingUp,
  Language,
  Category,
  LocationOn,
  Phone,
  Verified,
  MoreVert,
  Share,
  Bookmark,
  History,
  Analytics,
  ArrowBack,
  PlayArrow,
  WatchLater,
  ThumbUp,
  Comment
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function UserProfile({ user, onLogout }) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    onLogout();
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  // Safely get user properties with defaults
  const userFavoriteGenres = user?.favoriteGenres || [];
  const userJoinDate = user?.joinDate || new Date().toISOString().split('T')[0];
  const userWatchlistCount = user?.watchlistCount || 0;
  const userReviewsCount = user?.reviewsCount || 0;

  // Calculate activity level based on reviews
  const getActivityLevel = () => {
    if (userReviewsCount >= 50) return { level: 'Expert', color: '#00c853', progress: 100 };
    if (userReviewsCount >= 25) return { level: 'Active', color: '#ff9800', progress: 75 };
    if (userReviewsCount >= 10) return { level: 'Regular', color: '#2196f3', progress: 50 };
    return { level: 'New', color: '#9e9e9e', progress: 25 };
  };

  const activityLevel = getActivityLevel();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: '#18181c',
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

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ pt: 4, pb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton 
                onClick={handleBackClick}
                sx={{ 
                  color: '#fff', 
                  background: 'rgba(229, 9, 20, 0.1)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { 
                    background: 'rgba(229, 9, 20, 0.2)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                My Profile
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Share Profile">
                <IconButton sx={{ 
                  color: '#fff', 
                  background: 'rgba(229, 9, 20, 0.1)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { background: 'rgba(229, 9, 20, 0.2)' }
                }}>
                  <Share />
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings">
                <IconButton sx={{ 
                  color: '#fff', 
                  background: 'rgba(229, 9, 20, 0.1)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { background: 'rgba(229, 9, 20, 0.2)' }
                }}>
                  <Settings />
                </IconButton>
              </Tooltip>
              <Button
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogoutClick}
                sx={{
                  borderColor: 'rgba(229, 9, 20, 0.5)',
                  color: '#e50914',
                  borderRadius: 3,
                  px: 3,
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#e50914',
                    backgroundColor: 'rgba(229, 9, 20, 0.1)',
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>

          {/* Profile Hero Section */}
          <Card sx={{ 
            borderRadius: 3, 
            background: 'rgba(35,35,54,0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            border: '1px solid rgba(229, 9, 20, 0.2)',
            overflow: 'visible',
            position: 'relative'
          }}>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #e50914 0%, #ff6b6b 100%)',
              borderRadius: '12px 12px 0 0',
              p: 4,
              textAlign: 'center',
              position: 'relative'
            }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Box sx={{ 
                    background: '#00c853', 
                    borderRadius: '50%', 
                    width: 24, 
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid #fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}>
                    <Verified sx={{ fontSize: 14, color: '#fff' }} />
                  </Box>
                }
              >
                <Avatar 
                  src={user?.avatar} 
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mx: 'auto', 
                    mb: 2,
                    border: '4px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                  }} 
                />
              </Badge>
              
              <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800, mb: 1 }}>
                {user?.name || 'User'}
              </Typography>
              
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, fontWeight: 500 }}>
                @{user?.username || 'username'}
              </Typography>
              
              <Chip 
                label={user?.role || 'User'} 
                icon={<Person />}
                sx={{ 
                  background: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontWeight: 700,
                  px: 2,
                  py: 1,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  '& .MuiChip-icon': { color: '#fff' }
                }} 
              />
            </Box>
            
            <CardContent sx={{ p: 4 }}>
              {/* Stats Grid */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Box sx={{ 
                      width: 60, 
                      height: 60, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #e50914, #ff6b6b)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 4px 20px rgba(229, 9, 20, 0.3)'
                    }}>
                      <Movie sx={{ fontSize: 28, color: '#fff' }} />
                    </Box>
                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, mb: 0.5 }}>
                      {userWatchlistCount}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#b3b3b3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                      Watchlist
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Box sx={{ 
                      width: 60, 
                      height: 60, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 4px 20px rgba(255, 107, 107, 0.3)'
                    }}>
                      <Star sx={{ fontSize: 28, color: '#fff' }} />
                    </Box>
                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, mb: 0.5 }}>
                      {userReviewsCount}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#b3b3b3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                      Reviews
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Box sx={{ 
                      width: 60, 
                      height: 60, 
                      borderRadius: '50%', 
                      background: `linear-gradient(135deg, ${activityLevel.color}, ${activityLevel.color}dd)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: `0 4px 20px ${activityLevel.color}40`
                    }}>
                      <TrendingUp sx={{ fontSize: 28, color: '#fff' }} />
                    </Box>
                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, mb: 0.5 }}>
                      {activityLevel.level}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#b3b3b3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                      Activity
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

              {/* Activity Level */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                    Activity Level
                  </Typography>
                  <Typography variant="body2" sx={{ color: activityLevel.color, fontWeight: 700, fontSize: '1.1rem' }}>
                    {activityLevel.level}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={activityLevel.progress}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: activityLevel.color,
                      borderRadius: 4
                    }
                  }} 
                />
              </Box>

              <Button
                variant="contained"
                startIcon={<Edit />}
                fullWidth
                sx={{
                  background: 'linear-gradient(135deg, #e50914, #ff6b6b)',
                  borderRadius: 3,
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '1rem',
                  boxShadow: '0 4px 20px rgba(229, 9, 20, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ff6b6b, #e50914)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 30px rgba(229, 9, 20, 0.4)',
                  },
                }}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Content Grid */}
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {/* Contact Information */}
              <Card sx={{ 
                borderRadius: 3, 
                background: 'rgba(35,35,54,0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(229, 9, 20, 0.2)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ mr: 1, color: '#e50914' }} />
                    Contact Information
                  </Typography>
                  
                  <List sx={{ p: 0 }}>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon>
                        <Email sx={{ color: '#e50914' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email Address" 
                        secondary={user?.email || 'No email provided'}
                        primaryTypographyProps={{ color: '#b3b3b3', fontSize: '0.9rem', fontWeight: 600 }}
                        secondaryTypographyProps={{ color: '#fff', fontWeight: 600 }}
                      />
                    </ListItem>
                    
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon>
                        <CalendarToday sx={{ color: '#e50914' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Member Since" 
                        secondary={new Date(userJoinDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                        primaryTypographyProps={{ color: '#b3b3b3', fontSize: '0.9rem', fontWeight: 600 }}
                        secondaryTypographyProps={{ color: '#fff', fontWeight: 600 }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              {/* Favorite Genres */}
              <Card sx={{ 
                borderRadius: 3, 
                background: 'rgba(35,35,54,0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(229, 9, 20, 0.2)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
                    <Category sx={{ mr: 1, color: '#e50914' }} />
                    Favorite Genres
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                    {userFavoriteGenres.length > 0 ? (
                      userFavoriteGenres.map((genre) => (
                        <Chip 
                          key={genre} 
                          label={genre} 
                          icon={<Category />}
                          sx={{ 
                            background: 'linear-gradient(135deg, #e50914, #ff6b6b)',
                            color: '#fff',
                            fontWeight: 700,
                            '& .MuiChip-icon': {
                              color: '#fff'
                            },
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 15px rgba(229, 9, 20, 0.4)'
                            }
                          }} 
                        />
                      ))
                    ) : (
                      <Box sx={{ 
                        textAlign: 'center', 
                        py: 4, 
                        width: '100%',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: 2,
                        border: '2px dashed rgba(255,255,255,0.2)'
                      }}>
                        <Category sx={{ fontSize: 48, color: '#666', mb: 2 }} />
                        <Typography variant="body1" sx={{ color: '#b3b3b3', fontStyle: 'italic', mb: 1 }}>
                          No favorite genres yet
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          Start adding movies to discover your preferences
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {/* Recent Activity */}
              <Card sx={{ 
                borderRadius: 3, 
                background: 'rgba(35,35,54,0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(229, 9, 20, 0.2)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
                    <History sx={{ mr: 1, color: '#e50914' }} />
                    Recent Activity
                  </Typography>
                  
                  <Box sx={{ 
                    textAlign: 'center', 
                    py: 6,
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    border: '2px dashed rgba(255,255,255,0.2)'
                  }}>
                    <Bookmark sx={{ fontSize: 48, color: '#666', mb: 2 }} />
                    <Typography variant="body1" sx={{ color: '#b3b3b3', fontStyle: 'italic', mb: 1 }}>
                      No recent activity
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Your recent movie activities will appear here
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card sx={{ 
                borderRadius: 3, 
                background: 'rgba(35,35,54,0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(229, 9, 20, 0.2)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
                    <PlayArrow sx={{ mr: 1, color: '#e50914' }} />
                    Quick Actions
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        startIcon={<Movie />}
                        fullWidth
                        sx={{
                          borderColor: '#e50914',
                          color: '#e50914',
                          borderRadius: 3,
                          py: 2,
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: '#e50914',
                            backgroundColor: 'rgba(229, 9, 20, 0.1)',
                          },
                        }}
                      >
                        Browse Movies
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        startIcon={<WatchLater />}
                        fullWidth
                        sx={{
                          borderColor: '#e50914',
                          color: '#e50914',
                          borderRadius: 3,
                          py: 2,
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: '#e50914',
                            backgroundColor: 'rgba(229, 9, 20, 0.1)',
                          },
                        }}
                      >
                        My Watchlist
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        startIcon={<ThumbUp />}
                        fullWidth
                        sx={{
                          borderColor: '#e50914',
                          color: '#e50914',
                          borderRadius: 3,
                          py: 2,
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: '#e50914',
                            backgroundColor: 'rgba(229, 9, 20, 0.1)',
                          },
                        }}
                      >
                        My Reviews
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        startIcon={<Comment />}
                        fullWidth
                        sx={{
                          borderColor: '#e50914',
                          color: '#e50914',
                          borderRadius: 3,
                          py: 2,
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: '#e50914',
                            backgroundColor: 'rgba(229, 9, 20, 0.1)',
                          },
                        }}
                      >
                        Add Review
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Spacing */}
        <Box sx={{ pb: 4 }} />
      </Container>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(35,35,54,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(229, 9, 20, 0.2)'
          }
        }}
      >
        <DialogTitle id="logout-dialog-title" sx={{ color: '#fff', fontWeight: 700 }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Typography id="logout-dialog-description" sx={{ color: '#b3b3b3' }}>
            Are you sure you want to logout? You'll need to sign in again to access your account.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} sx={{ color: '#b3b3b3' }}>
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserProfile; 
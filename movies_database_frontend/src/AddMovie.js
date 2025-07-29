import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, Snackbar, Alert, InputAdornment, Switch, FormControlLabel, Slider, Box, Grid, Card, CardContent, Divider, Chip, IconButton, Paper, Stepper, Step, StepLabel, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotesIcon from '@mui/icons-material/Notes';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import TvIcon from '@mui/icons-material/Tv';
import PublicIcon from '@mui/icons-material/Public';
import AccessTime from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LOCAL_KEY = 'movies_db';
const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Other'
];

const LANGUAGES = [
  'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 
  'Kannada', 'Malayalam', 'Punjabi', 'Odia', 'Assamese', 'Sanskrit',
  'Urdu', 'Kashmiri', 'Konkani', 'Manipuri', 'Nepali', 'Sindhi',
  'Korean', 'Japanese', 'Chinese', 'Spanish', 'French', 'German', 'Italian',
  'Portuguese', 'Russian', 'Arabic', 'Turkish', 'Thai', 'Vietnamese',
  'Indonesian', 'Filipino', 'Swedish', 'Norwegian', 'Danish', 'Dutch',
  'Polish', 'Czech', 'Hungarian', 'Greek', 'Hebrew', 'Persian'
];

const STREAMING_PLATFORMS = [
  'Netflix', 'Amazon Prime', 'Hulu', 'Disney+', 'HBO Max', 'Apple TV+', 'Paramount+', 'Peacock', 'Crunchyroll', 'Funimation'
];

const SECTIONS = [
  { label: 'Basic Info', icon: <MovieIcon /> },
  { label: 'Ratings', icon: <StarIcon /> },
  { label: 'Streaming Platforms', icon: <TvIcon /> },
  { label: 'Additional Info', icon: <NotesIcon /> },
];

function AddMovie() {
  const [form, setForm] = useState({ 
    title: '', 
    language: '', 
    genre: '', 
    year: '', 
    description: '',
    rating: 4.0,
    recommended: false,
    imdbRating: '',
    rottenTomatoesRating: '',
    metacriticRating: '',
    streamingPlatforms: [],
    director: '',
    cast: '',
    runtime: '',
    budget: '',
    boxOffice: '',
    awards: '',
    trailerUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [newPlatform, setNewPlatform] = useState('');
  const [expanded, setExpanded] = useState('basic'); // Only basic section expanded by default
  const navigate = useNavigate();

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.language.trim()) newErrors.language = 'Language is required';
    if (!form.genre) newErrors.genre = 'Genre is required';
    if (form.year && (isNaN(form.year) || form.year < 1800 || form.year > new Date().getFullYear() + 1)) newErrors.year = 'Enter a valid year';
    if (form.imdbRating && (isNaN(form.imdbRating) || form.imdbRating < 0 || form.imdbRating > 10)) newErrors.imdbRating = 'IMDb rating must be between 0-10';
    if (form.rottenTomatoesRating && (isNaN(form.rottenTomatoesRating) || form.rottenTomatoesRating < 0 || form.rottenTomatoesRating > 100)) newErrors.rottenTomatoesRating = 'Rotten Tomatoes rating must be between 0-100';
    if (form.metacriticRating && (isNaN(form.metacriticRating) || form.metacriticRating < 0 || form.metacriticRating > 100)) newErrors.metacriticRating = 'Metacritic rating must be between 0-100';
    return newErrors;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleRatingChange = (event, newValue) => {
    setForm({ ...form, rating: newValue });
  };

  const handleRecommendedChange = (event) => {
    setForm({ ...form, recommended: event.target.checked });
  };

  const handleAddPlatform = () => {
    if (newPlatform && !form.streamingPlatforms.includes(newPlatform)) {
      setForm({ ...form, streamingPlatforms: [...form.streamingPlatforms, newPlatform] });
      setNewPlatform('');
    }
  };

  const handleRemovePlatform = (platform) => {
    setForm({ ...form, streamingPlatforms: form.streamingPlatforms.filter(p => p !== platform) });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    const stored = localStorage.getItem(LOCAL_KEY);
    const movies = stored ? JSON.parse(stored) : [];
    const newMovie = { 
      ...form, 
      year: form.year ? Number(form.year) : '', 
      rating: Number(form.rating),
      imdbRating: form.imdbRating ? Number(form.imdbRating) : null,
      rottenTomatoesRating: form.rottenTomatoesRating ? Number(form.rottenTomatoesRating) : null,
      metacriticRating: form.metacriticRating ? Number(form.metacriticRating) : null,
      _id: Date.now().toString() 
    };
    movies.push(newMovie);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(movies));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('localStorageChange'));
    
    setSnackbarOpen(true);
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #18181c 0%, #232336 50%, #18181c 100%)',
      py: 4,
      px: { xs: 1, sm: 2, md: 4 }
    }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{
              color: '#fff',
              mb: 2,
              '&:hover': { color: '#e50914' }
            }}
          >
            Back to Home
          </Button>
          <Typography 
            variant="h3" 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 900, 
              letterSpacing: 2,
              textShadow: '0 4px 20px rgba(229, 9, 20, 0.3)',
              mb: 1
            }}
          >
            Add New Movie
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary', 
              fontWeight: 400,
              opacity: 0.8
            }}
          >
            Share your favorite movies with the community
          </Typography>
        </Box>

        {/* Stepper for visual guidance */}
        <Stepper alternativeLabel sx={{ mb: 5 }}>
          {SECTIONS.map((section, idx) => (
            <Step key={section.label} completed={false} active={false}>
              <StepLabel icon={section.icon}>{section.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Basic Information Accordion - Always Expanded */}
          <Accordion 
            expanded={expanded === 'basic'} 
            onChange={handleAccordionChange('basic')}
            sx={{ 
              mb: 2, 
              background: 'rgba(35,35,54,0.95)',
              border: '1px solid rgba(229, 9, 20, 0.2)',
              borderRadius: 2,
              '&:before': { display: 'none' },
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
              sx={{ 
                background: 'linear-gradient(45deg, #e50914, #ff6b6b)',
                color: '#fff',
                borderRadius: '8px 8px 0 0'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                <MovieIcon sx={{ fontSize: 28 }} /> Basic Information
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 4 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="title"
                    label="Movie Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    error={!!errors.title}
                    helperText={errors.title || 'Enter the movie title'}
                    size="large"
                    fullWidth
                    InputLabelProps={{ style: { color: '#fff', fontWeight: 600 }, shrink: true }}
                    InputProps={{
                      style: { color: '#fff', fontSize: '1.1rem', fontWeight: 500 },
                      startAdornment: (
                        <InputAdornment position="start">
                          <MovieIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl required error={!!errors.language} fullWidth>
                    <InputLabel sx={{ color: '#fff', fontWeight: 600 }}>Language</InputLabel>
                    <Select
                      name="language"
                      value={form.language}
                      label="Language"
                      onChange={handleChange}
                      sx={{ color: '#fff', fontSize: '1.1rem', '& .MuiSvgIcon-root': { color: '#fff' } }}
                    >
                      {LANGUAGES.map(lang => (
                        <MenuItem key={lang} value={lang} sx={{ fontSize: '1rem' }}>{lang}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: errors.language ? 'error.main' : '#b3b3b3' }}>{errors.language || 'Select a language'}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl required error={!!errors.genre} fullWidth>
                    <InputLabel sx={{ color: '#fff', fontWeight: 600 }}>Genre</InputLabel>
                    <Select
                      name="genre"
                      value={form.genre}
                      label="Genre"
                      onChange={handleChange}
                      sx={{ color: '#fff', fontSize: '1.1rem', '& .MuiSvgIcon-root': { color: '#fff' } }}
                    >
                      {GENRES.map(g => (
                        <MenuItem key={g} value={g} sx={{ fontSize: '1rem' }}>{g}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: errors.genre ? 'error.main' : '#b3b3b3' }}>{errors.genre || 'Select a genre'}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="year"
                    label="Release Year"
                    value={form.year}
                    onChange={handleChange}
                    type="number"
                    error={!!errors.year}
                    helperText={errors.year || 'e.g. 2023'}
                    size="large"
                    fullWidth
                    inputProps={{ min: 1800, max: new Date().getFullYear() + 1 }}
                    InputLabelProps={{ style: { color: '#fff', fontWeight: 600 }, shrink: true }}
                    InputProps={{
                      style: { color: '#fff', fontSize: '1.1rem' },
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonthIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Movie Description"
                    value={form.description}
                    onChange={handleChange}
                    multiline
                    minRows={3}
                    maxRows={6}
                    helperText="Tell us about the movie plot, characters, and what makes it special"
                    size="large"
                    fullWidth
                    InputLabelProps={{ style: { color: '#fff', fontWeight: 600 }, shrink: true }}
                    InputProps={{
                      style: { color: '#fff', fontSize: '1rem' },
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                          <NotesIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Ratings Section Accordion */}
          <Accordion 
            expanded={expanded === 'ratings'} 
            onChange={handleAccordionChange('ratings')}
            sx={{ 
              mb: 2, 
              background: 'rgba(35,35,54,0.95)',
              border: '1px solid rgba(229, 9, 20, 0.2)',
              borderRadius: 2,
              '&:before': { display: 'none' },
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
              sx={{ 
                background: 'rgba(0,0,0,0.3)',
                color: '#fff',
                borderRadius: '8px 8px 0 0'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarIcon sx={{ fontSize: 28, color: '#ffd700' }} /> Ratings & Reviews
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 4 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Box sx={{ p: 2, borderRadius: 2, background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Typography variant="subtitle1" sx={{ color: '#fff', mb: 2, display: 'flex', alignItems: 'center' }}>
                      <StarIcon sx={{ color: '#ffd700', mr: 1 }} /> Your Rating: {form.rating}/5.0
                    </Typography>
                    <Slider
                      value={form.rating}
                      onChange={handleRatingChange}
                      min={0}
                      max={5}
                      step={0.1}
                      marks={[
                        { value: 0, label: '0' },
                        { value: 2.5, label: '2.5' },
                        { value: 5, label: '5' }
                      ]}
                      sx={{
                        color: '#ffd700',
                        '& .MuiSlider-markLabel': { color: '#fff', fontWeight: 600 },
                        '& .MuiSlider-track': { background: 'linear-gradient(90deg, #ffd700, #ffed4e)', height: 6 },
                        '& .MuiSlider-thumb': { background: '#ffd700', boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)', width: 20, height: 20 },
                        '& .MuiSlider-rail': { background: 'rgba(255,255,255,0.2)', height: 6 }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    name="imdbRating"
                    label="IMDb"
                    value={form.imdbRating}
                    onChange={handleChange}
                    type="number"
                    error={!!errors.imdbRating}
                    helperText={errors.imdbRating || '0-10'}
                    size="large"
                    fullWidth
                    inputProps={{ min: 0, max: 10, step: 0.1 }}
                    InputLabelProps={{ style: { color: '#fff', fontWeight: 600 }, shrink: true }}
                    InputProps={{
                      style: { color: '#fff', fontSize: '1.1rem' },
                      startAdornment: (
                        <InputAdornment position="start">
                          <StarIcon sx={{ color: '#ffd700', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    name="rottenTomatoesRating"
                    label="Rotten (%)"
                    value={form.rottenTomatoesRating}
                    onChange={handleChange}
                    type="number"
                    error={!!errors.rottenTomatoesRating}
                    helperText={errors.rottenTomatoesRating || '0-100'}
                    size="large"
                    fullWidth
                    inputProps={{ min: 0, max: 100 }}
                    InputLabelProps={{ style: { color: '#fff', fontWeight: 600 }, shrink: true }}
                    InputProps={{
                      style: { color: '#fff', fontSize: '1.1rem' },
                      startAdornment: (
                        <InputAdornment position="start">
                          <PublicIcon sx={{ color: '#ff6b35', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    name="metacriticRating"
                    label="Metacritic"
                    value={form.metacriticRating}
                    onChange={handleChange}
                    type="number"
                    error={!!errors.metacriticRating}
                    helperText={errors.metacriticRating || '0-100'}
                    size="large"
                    fullWidth
                    inputProps={{ min: 0, max: 100 }}
                    InputLabelProps={{ style: { color: '#fff', fontWeight: 600 }, shrink: true }}
                    InputProps={{
                      style: { color: '#fff', fontSize: '1.1rem' },
                      startAdornment: (
                        <InputAdornment position="start">
                          <StarIcon sx={{ color: '#00d4aa', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Streaming Platforms Accordion */}
          <Accordion 
            expanded={expanded === 'streaming'} 
            onChange={handleAccordionChange('streaming')}
            sx={{ 
              mb: 2, 
              background: 'rgba(35,35,54,0.95)',
              border: '1px solid rgba(229, 9, 20, 0.2)',
              borderRadius: 2,
              '&:before': { display: 'none' },
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
              sx={{ 
                background: 'rgba(0,0,0,0.3)',
                color: '#fff',
                borderRadius: '8px 8px 0 0'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TvIcon sx={{ fontSize: 28, color: '#e50914' }} /> Streaming Platforms
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <FormControl fullWidth sx={{ maxWidth: 300 }}>
                  <InputLabel sx={{ color: '#fff' }}>Add Platform</InputLabel>
                  <Select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    sx={{ color: '#fff', '& .MuiSvgIcon-root': { color: '#fff' } }}
                  >
                    {STREAMING_PLATFORMS.map(platform => (
                      <MenuItem key={platform} value={platform} sx={{ fontSize: '1rem' }}>
                        {platform}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={handleAddPlatform}
                  disabled={!newPlatform}
                  sx={{
                    background: 'linear-gradient(45deg, #e50914, #ff6b6b)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #ff6b6b, #e50914)',
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {form.streamingPlatforms.map((platform, index) => (
                  <Chip
                    key={index}
                    label={platform}
                    onDelete={() => handleRemovePlatform(platform)}
                    deleteIcon={<DeleteIcon />}
                    sx={{
                      background: 'linear-gradient(45deg, #e50914, #ff6b6b)',
                      color: '#fff',
                      fontWeight: 600,
                      '& .MuiChip-deleteIcon': {
                        color: '#fff',
                        '&:hover': {
                          color: '#ffd700',
                        }
                      }
                    }}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Additional Information Accordion */}
          <Accordion 
            expanded={expanded === 'additional'} 
            onChange={handleAccordionChange('additional')}
            sx={{ 
              mb: 2, 
              background: 'rgba(35,35,54,0.95)',
              border: '1px solid rgba(229, 9, 20, 0.2)',
              borderRadius: 2,
              '&:before': { display: 'none' },
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
              sx={{ 
                background: 'rgba(0,0,0,0.3)',
                color: '#fff',
                borderRadius: '8px 8px 0 0'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                <NotesIcon sx={{ fontSize: 28, color: '#e50914' }} /> Additional Information
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 4 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="director"
                    label="Director"
                    value={form.director}
                    onChange={handleChange}
                    helperText="e.g. Christopher Nolan"
                    size="large"
                    fullWidth
                    InputLabelProps={{ style: { color: '#fff', fontWeight: 600 }, shrink: true }}
                    InputProps={{ style: { color: '#fff', fontSize: '1.1rem' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="cast"
                    label="Cast"
                    value={form.cast}
                    onChange={handleChange}
                    helperText="e.g. Leonardo DiCaprio, Ellen Page"
                    size="large"
                    fullWidth
                    InputLabelProps={{ style: { color: '#fff', fontWeight: 600 }, shrink: true }}
                    InputProps={{ style: { color: '#fff', fontSize: '1.1rem' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="runtime"
                    label="Runtime (minutes)"
                    value={form.runtime}
                    onChange={handleChange}
                    type="number"
                    helperText="e.g. 120"
                    size="large"
                    fullWidth
                    inputProps={{ min: 1, max: 999 }}
                    InputLabelProps={{ style: { color: '#fff', fontWeight: 600 }, shrink: true }}
                    InputProps={{ style: { color: '#fff', fontSize: '1.1rem' }, startAdornment: (
                      <InputAdornment position="start">
                        <AccessTime sx={{ color: 'primary.main', fontSize: 20 }} />
                      </InputAdornment>
                    ) }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="budget"
                    label="Budget"
                    value={form.budget}
                    onChange={handleChange}
                    helperText="e.g. $160 million"
                    size="large"
                    fullWidth
                    InputLabelProps={{ style: { color: '#fff', fontWeight: 600 }, shrink: true }}
                    InputProps={{ style: { color: '#fff', fontSize: '1.1rem' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="boxOffice"
                    label="Box Office"
                    value={form.boxOffice}
                    onChange={handleChange}
                    helperText="e.g. $836 million"
                    size="large"
                    fullWidth
                    InputLabelProps={{ style: { color: '#fff', fontWeight: 600 }, shrink: true }}
                    InputProps={{ style: { color: '#fff', fontSize: '1.1rem' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="awards"
                    label="Awards"
                    value={form.awards}
                    onChange={handleChange}
                    helperText="e.g. Academy Award for Best Picture"
                    size="large"
                    fullWidth
                    InputLabelProps={{ style: { color: '#fff', fontWeight: 600 }, shrink: true }}
                    InputProps={{ style: { color: '#fff', fontSize: '1.1rem' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="trailerUrl"
                    label="Trailer URL"
                    value={form.trailerUrl}
                    onChange={handleChange}
                    helperText="e.g. https://youtube.com/watch?v=..."
                    size="large"
                    fullWidth
                    InputLabelProps={{ style: { color: '#fff', fontWeight: 600 }, shrink: true }}
                    InputProps={{ style: { color: '#fff', fontSize: '1.1rem' } }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Recommended Switch & Submit */}
          <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, mb: 0, boxShadow: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, background: 'rgba(35,35,54,0.95)', border: '1px solid rgba(229, 9, 20, 0.2)' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.recommended}
                  onChange={handleRecommendedChange}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#e50914',
                      '&:hover': {
                        backgroundColor: 'rgba(229, 9, 20, 0.08)',
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#e50914',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ color: '#fff', display: 'flex', alignItems: 'center', fontSize: '1.1rem', fontWeight: 600 }}>
                  <TrendingUpIcon sx={{ mr: 1, color: form.recommended ? '#e50914' : '#b3b3b3', fontSize: 24 }} />
                  Mark as Recommended
                </Typography>
              }
            />
            <Box sx={{ flexGrow: 1 }} />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large" 
              startIcon={<AddIcon />}
              sx={{ 
                fontWeight: 700, 
                letterSpacing: 1,
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #e50914, #ff6b6b)',
                boxShadow: '0 4px 16px rgba(229, 9, 20, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #ff6b6b, #e50914)',
                  boxShadow: '0 6px 20px rgba(229, 9, 20, 0.4)',
                }
              }}
            >
              Add Movie
            </Button>
          </Paper>
        </form>
      </Container>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={2000} 
        onClose={() => setSnackbarOpen(false)} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%',
            background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
            color: '#fff',
            fontWeight: 600
          }}
        >
          Movie added successfully! Redirecting to home...
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddMovie; 
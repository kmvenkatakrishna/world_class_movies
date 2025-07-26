import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent, Chip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';

const LOCAL_KEY = 'movies_db';

function LanguageList() {
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      const movies = JSON.parse(stored);
      const langCount = {};
      movies.forEach(movie => {
        if (movie.language) {
          const lang = movie.language.trim();
          langCount[lang] = (langCount[lang] || 0) + 1;
        }
      });
      setLanguages(Object.entries(langCount).sort((a, b) => b[1] - a[1]));
    }
  }, []);

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 900, mb: 4, textAlign: 'center' }}>
        Browse by Language
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {languages.map(([lang, count]) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={lang}>
            <Card sx={{ borderRadius: 3, boxShadow: 6, background: 'rgba(35,35,54,0.98)' }}>
              <CardActionArea onClick={() => navigate(`/language/${encodeURIComponent(lang)}`)}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5 }}>
                  <LanguageIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                    {lang}
                  </Typography>
                  <Chip label={`${count} movie${count > 1 ? 's' : ''}`} color="primary" />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default LanguageList; 
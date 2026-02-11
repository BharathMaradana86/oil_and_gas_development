import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

const LOGO_SRC = '/hypervise-blue.png';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    // Login with basic auth credentials
    login(username.trim(), password);
  };

  return (
    <div className={styles.container}>
      <Container maxWidth="sm" className={styles.containerInner}>
        <Card className={styles.card} elevation={0}>
          <CardContent className={styles.cardContent}>
            <Box className={styles.header}>
              <Box className={styles.logoContainer}>
                <img
                  src={LOGO_SRC}
                  alt="Hypervise"
                  className={styles.logo}
                />
              </Box>
              <Typography variant="h5" component="h1" className={styles.title}>
                Sign In
              </Typography>
              <Typography variant="body2" className={styles.subtitle}>
                Oil & Gas AI Operations Platform
              </Typography>
              <Typography variant="body2" className={styles.brand}>
                Eternal Robotics
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} className={styles.form}>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 2, 
                    borderRadius: '8px',
                  }}
                >
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--accent)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--accent)',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--accent)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--accent)',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 1,
                  py: 1.5,
                  backgroundColor: 'var(--accent)',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(57, 93, 171, 0.2)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'var(--accent-hover)',
                    boxShadow: '0 4px 12px rgba(57, 93, 171, 0.3)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

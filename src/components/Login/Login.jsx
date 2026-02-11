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
    <Container maxWidth="sm" className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <Box className={styles.header}>
            <Typography variant="h4" component="h1" className={styles.title}>
              Oil & Gas AI Operations Platform
            </Typography>
            <Typography variant="body2" color="text.secondary" className={styles.subtitle}>
              Eternal Robotics
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              autoComplete="username"
              autoFocus
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              autoComplete="current-password"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              className={styles.submitButton}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

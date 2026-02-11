import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { mockGasLeak } from '../../data/mockGasLeak';

export default function GasLeakConfigurations({ platform }) {
  const [ppmThreshold, setPpmThreshold] = useState(mockGasLeak.ppmThreshold);
  const [alertEnabled, setAlertEnabled] = useState(true);

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        Gas Leak Detection · Configurations
      </Typography>

      <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', mb: 2 }}>Thresholds</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="PPM alert threshold"
            type="number"
            value={ppmThreshold}
            onChange={(e) => setPpmThreshold(Number(e.target.value))}
            inputProps={{ min: 0 }}
            size="small"
            sx={{ minWidth: 200 }}
          />
          <FormControlLabel
            control={<Switch checked={alertEnabled} onChange={(e) => setAlertEnabled(e.target.checked)} color="primary" />}
            label="Enable alerts when threshold exceeded"
          />
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Zone configuration ({mockGasLeak.zones.length} zones)</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F4F5F6' }}>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Zone</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>PPM</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Intensity</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Trend</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockGasLeak.zones.map((z) => (
                <TableRow key={z.id} hover>
                  <TableCell>{z.name}</TableCell>
                  <TableCell>{z.ppm}</TableCell>
                  <TableCell>{(z.intensity * 100).toFixed(0)}%</TableCell>
                  <TableCell>{z.trend || 'stable'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Button variant="contained" sx={{ bgcolor: '#395DAB' }}>Save configuration</Button>
    </Box>
  );
}

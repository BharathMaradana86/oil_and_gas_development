import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { mockFireSmoke } from '../../data/mockFireSmoke';

export default function FireSmokeReports({ platform }) {
  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        Fire & Smoke Detection · Reports
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderColor: '#395DAB', color: '#395DAB' }}>
          Export event log (CSV)
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623' }}>{mockFireSmoke.activeEvents}</Typography>
            <Typography variant="body2" color="text.secondary">Active events</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623' }}>{mockFireSmoke.totalSensors}</Typography>
            <Typography variant="body2" color="text.secondary">Sensors</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#101623' }}>{mockFireSmoke.lastDrillDate || '—'}</Typography>
            <Typography variant="body2" color="text.secondary">Last drill</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Sensor status</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F4F5F6' }}>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Zone</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Last check</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockFireSmoke.sensors.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>{s.zone}</TableCell>
                  <TableCell>{s.type}</TableCell>
                  <TableCell sx={{ color: '#36b37e' }}>{s.status}</TableCell>
                  <TableCell>{new Date(s.lastCheck).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ color: '#707784' }}>Summary</Typography>
        <Typography variant="body2" sx={{ color: '#101623', mt: 0.5 }}>
          Active events: {mockFireSmoke.activeEvents} · Total sensors: {mockFireSmoke.totalSensors} · Zones: {mockFireSmoke.zones.length}. No fire or smoke incidents in the selected period.
        </Typography>
      </Paper>
    </Box>
  );
}

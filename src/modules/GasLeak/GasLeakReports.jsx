import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import Grid from '@mui/material/Grid';
import { mockGasLeak } from '../../data/mockGasLeak';

export default function GasLeakReports({ platform }) {
  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        Gas Leak Detection · Reports
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderColor: '#395DAB', color: '#395DAB' }}>
          Export PPM history (CSV)
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderColor: '#395DAB', color: '#395DAB' }}>
          Export alerts (PDF)
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623' }}>{mockGasLeak.riskLevel}</Typography>
            <Typography variant="body2" color="text.secondary">Risk level</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623' }}>{mockGasLeak.ppmCurrent} ppm</Typography>
            <Typography variant="body2" color="text.secondary">Current PPM</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623' }}>{mockGasLeak.zonesMonitored}</Typography>
            <Typography variant="body2" color="text.secondary">Zones monitored</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#FF5630' }}>{mockGasLeak.alerts.length}</Typography>
            <Typography variant="body2" color="text.secondary">Active alerts</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Alert history</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F4F5F6' }}>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Zone</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Severity</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>PPM</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockGasLeak.alerts.map((a) => (
                <TableRow key={a.id} hover>
                  <TableCell>{new Date(a.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{a.zone}</TableCell>
                  <TableCell sx={{ color: a.severity === 'high' ? '#FF5630' : '#d29922', fontWeight: 500 }}>{a.severity}</TableCell>
                  <TableCell>{a.ppm}</TableCell>
                  <TableCell>{a.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

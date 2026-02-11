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
import { mockIntrusion } from '../../data/mockIntrusion';

export default function IntrusionReports({ platform }) {
  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        Intrusion Detection · Reports
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderColor: '#395DAB', color: '#395DAB' }}>
          Export event log (CSV)
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderColor: '#395DAB', color: '#395DAB' }}>
          Export summary (PDF)
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623' }}>{mockIntrusion.alerts24h}</Typography>
            <Typography variant="body2" color="text.secondary">Events (24h)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#36b37e' }}>{mockIntrusion.eventsResolved}</Typography>
            <Typography variant="body2" color="text.secondary">Resolved</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623' }}>{mockIntrusion.camerasTotal}</Typography>
            <Typography variant="body2" color="text.secondary">Cameras</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#FF5630' }}>{mockIntrusion.severitySummary?.find(s => s.severity === 'High')?.count ?? 0}</Typography>
            <Typography variant="body2" color="text.secondary">High severity</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Event log</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F4F5F6' }}>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Zone</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Severity</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Resolved</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockIntrusion.events.map((e) => (
                <TableRow key={e.id} hover>
                  <TableCell>{new Date(e.time).toLocaleString()}</TableCell>
                  <TableCell>{e.zone}</TableCell>
                  <TableCell sx={{ color: e.severity === 'high' ? '#FF5630' : '#d29922', fontWeight: 500 }}>{e.severity}</TableCell>
                  <TableCell>{e.resolved ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

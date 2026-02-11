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
import { mockAssetMonitoring } from '../../data/mockAssetMonitoring';

export default function AssetReports({ platform }) {
  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        Asset Monitoring · Reports
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderColor: '#395DAB', color: '#395DAB' }}>
          Export uptime report (CSV)
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderColor: '#395DAB', color: '#395DAB' }}>
          Export maintenance schedule (PDF)
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623' }}>{mockAssetMonitoring.uptimePercent}%</Typography>
            <Typography variant="body2" color="text.secondary">Overall uptime</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623' }}>{mockAssetMonitoring.totalAssets}</Typography>
            <Typography variant="body2" color="text.secondary">Total assets</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #FF5630', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#FF5630' }}>{mockAssetMonitoring.assetsCritical}</Typography>
            <Typography variant="body2" color="text.secondary">Critical</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #d29922', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#d29922' }}>{mockAssetMonitoring.assetsWarning}</Typography>
            <Typography variant="body2" color="text.secondary">Warning</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Maintenance due</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F4F5F6' }}>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Asset</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Due date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockAssetMonitoring.maintenanceAlerts.map((m) => (
                <TableRow key={m.id} hover>
                  <TableCell>{m.asset}</TableCell>
                  <TableCell>{m.type}</TableCell>
                  <TableCell>{m.dueDate}</TableCell>
                  <TableCell sx={{ color: m.priority === 'high' ? '#FF5630' : '#d29922', fontWeight: 500 }}>{m.priority}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ color: '#707784' }}>Summary</Typography>
        <Typography variant="body2" sx={{ color: '#101623', mt: 0.5 }}>
          Uptime: {mockAssetMonitoring.uptimePercent}% · Assets: {mockAssetMonitoring.totalAssets} · Critical: {mockAssetMonitoring.assetsCritical} · Warning: {mockAssetMonitoring.assetsWarning} · Maintenance tasks due: {mockAssetMonitoring.maintenanceAlerts.length}.
        </Typography>
      </Paper>
    </Box>
  );
}

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
import { mockAssetMonitoring } from '../../data/mockAssetMonitoring';

export default function AssetMonitoringReports({ platform }) {
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

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Maintenance due</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F4F5F6' }}>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Asset</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Due date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockAssetMonitoring.maintenanceAlerts.map((m) => (
                <TableRow key={m.id} hover>
                  <TableCell>{m.asset}</TableCell>
                  <TableCell>{m.type}</TableCell>
                  <TableCell sx={{ color: '#d29922', fontWeight: 500 }}>{m.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, mt: 2 }}>
        <Typography variant="subtitle2" sx={{ color: '#707784' }}>Summary</Typography>
        <Typography variant="body2" sx={{ color: '#101623', mt: 0.5 }}>
          Total assets: {mockAssetMonitoring.totalAssets} · Uptime: {mockAssetMonitoring.uptimePercent}% · Maintenance due: {mockAssetMonitoring.maintenanceAlerts.length}
        </Typography>
      </Paper>
    </Box>
  );
}

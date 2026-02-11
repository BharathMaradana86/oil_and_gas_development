import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { mockAssetMonitoring } from '../../data/mockAssetMonitoring';

export default function AssetConfigurations({ platform }) {
  const [alertOnCritical, setAlertOnCritical] = useState(true);

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        Asset Monitoring · Configurations
      </Typography>

      <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', mb: 2 }}>Alert rules</Typography>
        <FormControlLabel
          control={<Switch checked={alertOnCritical} onChange={(e) => setAlertOnCritical(e.target.checked)} color="primary" />}
          label="Alert when asset health is critical (&lt; 90%)"
        />
      </Paper>

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Assets ({mockAssetMonitoring.assets.length})</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F4F5F6' }}>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Asset</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Health %</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Last maintenance</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Runtime (h)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockAssetMonitoring.assets.map((a) => (
                <TableRow key={a.id} hover>
                  <TableCell>{a.name}</TableCell>
                  <TableCell>{a.status}</TableCell>
                  <TableCell sx={{ color: a.health >= 95 ? '#36b37e' : a.health >= 90 ? '#d29922' : '#FF5630' }}>{a.health}%</TableCell>
                  <TableCell>{a.lastMaintenance}</TableCell>
                  <TableCell>{a.runtimeHours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle2" sx={{ color: '#707784' }}>Maintenance due</Typography>
        <Typography variant="body2" sx={{ color: '#101623', mt: 0.5 }}>
          {mockAssetMonitoring.maintenanceAlerts.length} maintenance task(s) scheduled. Critical: {mockAssetMonitoring.assetsCritical}, Warning: {mockAssetMonitoring.assetsWarning}.
        </Typography>
      </Paper>

      <Button variant="contained" sx={{ bgcolor: '#395DAB' }}>Save configuration</Button>
    </Box>
  );
}

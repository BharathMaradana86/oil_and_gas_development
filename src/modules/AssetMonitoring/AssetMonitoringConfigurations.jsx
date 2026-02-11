import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { mockAssetMonitoring } from '../../data/mockAssetMonitoring';

export default function AssetMonitoringConfigurations({ platform }) {
  const [healthAlertThreshold, setHealthAlertThreshold] = useState(85);

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        Asset Monitoring · Configurations
      </Typography>

      <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', mb: 2 }}>Thresholds</Typography>
        <TextField
          label="Alert when health below (%)"
          type="number"
          value={healthAlertThreshold}
          onChange={(e) => setHealthAlertThreshold(Number(e.target.value))}
          inputProps={{ min: 0, max: 100 }}
          size="small"
          sx={{ minWidth: 220 }}
        />
      </Paper>

      <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', mb: 2 }}>Assets</Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5, color: '#101623' }}>
          {mockAssetMonitoring.assets.map((a) => (
            <li key={a.id}>{a.name} — {a.status}, health {a.health}%, last maintenance: {a.lastMaintenance}</li>
          ))}
        </Box>
      </Paper>

      <Button variant="contained" sx={{ bgcolor: '#395DAB' }}>Save configuration</Button>
    </Box>
  );
}

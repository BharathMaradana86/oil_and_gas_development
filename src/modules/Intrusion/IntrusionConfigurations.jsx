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
import { mockIntrusion } from '../../data/mockIntrusion';

export default function IntrusionConfigurations({ platform }) {
  const [alertOnEvent, setAlertOnEvent] = useState(true);

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        Intrusion Detection · Configurations
      </Typography>

      <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', mb: 2 }}>Alert rules</Typography>
        <FormControlLabel
          control={<Switch checked={alertOnEvent} onChange={(e) => setAlertOnEvent(e.target.checked)} color="primary" />}
          label="Alert on intrusion event"
        />
      </Paper>

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Cameras ({mockIntrusion.camerasTotal})</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F4F5F6' }}>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Zone</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Events (24h)</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockIntrusion.eventsByZone.map((e) => (
                <TableRow key={e.zone} hover>
                  <TableCell>{e.zone}</TableCell>
                  <TableCell>{e.count}</TableCell>
                  <TableCell sx={{ color: '#36b37e' }}>Active</TableCell>
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

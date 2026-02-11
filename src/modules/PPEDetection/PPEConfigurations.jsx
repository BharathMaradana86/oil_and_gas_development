import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { mockPPE } from '../../data/mockPPE';

export default function PPEConfigurations({ platform }) {
  const [complianceThreshold, setComplianceThreshold] = useState(95);
  const [alertOnViolation, setAlertOnViolation] = useState(true);
  const [defaultCamera, setDefaultCamera] = useState('cam-1');

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        PPE Detection · Configurations
      </Typography>

      <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', mb: 2 }}>Detection rules</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Min compliance % (alert below)"
            type="number"
            value={complianceThreshold}
            onChange={(e) => setComplianceThreshold(Number(e.target.value))}
            inputProps={{ min: 0, max: 100 }}
            size="small"
            sx={{ minWidth: 220 }}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Default camera view</InputLabel>
            <Select value={defaultCamera} label="Default camera view" onChange={(e) => setDefaultCamera(e.target.value)}>
              {mockPPE.cameras.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Switch checked={alertOnViolation} onChange={(e) => setAlertOnViolation(e.target.checked)} color="primary" />}
            label="Alert on violation"
          />
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', mb: 2 }}>PPE requirements</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <FormControlLabel control={<Switch defaultChecked />} label="Helmet required" />
          <FormControlLabel control={<Switch defaultChecked />} label="Vest required" />
          <FormControlLabel control={<Switch defaultChecked />} label="Gloves required" />
          <FormControlLabel control={<Switch defaultChecked={false} />} label="Safety glasses" />
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Camera list ({mockPPE.cameras.length})</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F4F5F6' }}>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Camera</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Compliance %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPPE.cameras.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>{c.label}</TableCell>
                  <TableCell>{c.status}</TableCell>
                  <TableCell>{c.compliance}%</TableCell>
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

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
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import { mockGasLeak } from '../../data/mockGasLeak';

export default function GasLeakAnalytics({ platform }) {
  const ppmData = mockGasLeak.ppmTimeline.map((d) => ({ name: d.time, ppm: d.ppm }));
  const zoneData = (mockGasLeak.ppmByZone || mockGasLeak.zones).map((z) => ({
    name: typeof z.name === 'string' ? z.name.slice(0, 14) : z.zone?.slice(0, 14) || 'Zone',
    ppm: z.ppm ?? 0,
  }));
  const weeklyData = mockGasLeak.weeklySummary || [];

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        Gas Leak Detection · Analytics
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>PPM timeline (24h)</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ppmData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="ppm" stroke="#395DAB" strokeWidth={2} name="PPM" dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>PPM by zone</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={zoneData} layout="vertical" margin={{ left: 60 }}>
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={55} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="ppm" fill="#395DAB" name="PPM" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {weeklyData.length > 0 && (
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Weekly average PPM & alerts</Typography>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar yAxisId="left" dataKey="avgPpm" fill="#395DAB" name="Avg PPM" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="alerts" fill="#FF5630" name="Alerts" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      )}

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Zone summary</Typography>
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
                  <TableCell sx={{ color: z.trend === 'rising' ? '#FF5630' : '#707784' }}>{z.trend || 'stable'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

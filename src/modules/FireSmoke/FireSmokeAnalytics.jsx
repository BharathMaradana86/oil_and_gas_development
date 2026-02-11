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
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { mockFireSmoke } from '../../data/mockFireSmoke';

export default function FireSmokeAnalytics({ platform }) {
  const trendData = mockFireSmoke.sensorTrend.map((d) => ({ name: d.time, events: d.events ?? 0 }));
  const tempData = mockFireSmoke.temperatureTrend || [];
  const weeklyData = mockFireSmoke.weeklyEvents || [];

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        Fire & Smoke Detection · Analytics
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Events by time (24h)</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={trendData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="events" fill="#395DAB" name="Events" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Avg temperature by hour (°C)</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={tempData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="avgTemp" stroke="#e67e22" strokeWidth={2} name="°C" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {weeklyData.length > 0 && (
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Events by day (7d)</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="events" fill="#395DAB" name="Events" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      )}

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Sensor status by zone</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F4F5F6' }}>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Zone</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Reading</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Last check</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockFireSmoke.sensors.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>{s.zone}</TableCell>
                  <TableCell>{s.type}</TableCell>
                  <TableCell sx={{ color: '#36b37e', fontWeight: 500 }}>{s.status}</TableCell>
                  <TableCell>{s.reading !== undefined ? (s.type === 'Heat' ? `${s.reading}°C` : s.reading) : '—'}</TableCell>
                  <TableCell>{new Date(s.lastCheck).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

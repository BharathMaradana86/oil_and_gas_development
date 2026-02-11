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
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { mockIntrusion } from '../../data/mockIntrusion';

export default function IntrusionAnalytics({ platform }) {
  const eventsByZone = mockIntrusion.eventsByZone || [];
  const severityData = mockIntrusion.severitySummary || [];

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        Intrusion Detection · Analytics
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Events by day</Typography>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockIntrusion.trend}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#395DAB" name="Events" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Events by zone</Typography>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={eventsByZone} layout="vertical" margin={{ left: 70 }}>
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="zone" width={65} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#395DAB" name="Events" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {severityData.length > 0 && (
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Events by severity</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={severityData}>
              <XAxis dataKey="severity" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#FF5630" name="Count" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      )}

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Event log</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F4F5F6' }}>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Zone</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Severity</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Camera</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Resolved</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockIntrusion.events.map((e) => (
                <TableRow key={e.id} hover>
                  <TableCell>{new Date(e.time).toLocaleString()}</TableCell>
                  <TableCell>{e.zone}</TableCell>
                  <TableCell>{e.type}</TableCell>
                  <TableCell sx={{ color: e.severity === 'high' ? '#FF5630' : '#707784', fontWeight: 500 }}>{e.severity}</TableCell>
                  <TableCell>{e.camera}</TableCell>
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

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
import { mockAssetMonitoring } from '../../data/mockAssetMonitoring';

export default function AssetMonitoringAnalytics({ platform }) {
  const uptimeData = mockAssetMonitoring.uptimeByAsset || [];
  const monthlyData = mockAssetMonitoring.monthlyUptime || [];

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        Asset Monitoring · Analytics
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Average health trend (7 days)</Typography>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockAssetMonitoring.healthTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis domain={[90, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="avg" stroke="#395DAB" strokeWidth={2} name="Avg health %" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Uptime by asset (%)</Typography>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={uptimeData} layout="vertical" margin={{ left: 90 }}>
              <XAxis type="number" domain={[95, 100]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={85} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="uptime" fill="#36b37e" name="Uptime %" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {monthlyData.length > 0 && (
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Monthly uptime (%)</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[95, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="pct" fill="#395DAB" name="Uptime %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      )}

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Asset health summary</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F4F5F6' }}>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Asset</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Health %</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Runtime (hrs)</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Last maintenance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockAssetMonitoring.assets.map((a) => (
                <TableRow key={a.id} hover>
                  <TableCell>{a.name}</TableCell>
                  <TableCell sx={{ color: a.status === 'Running' ? '#36b37e' : '#707784' }}>{a.status}</TableCell>
                  <TableCell>{a.health}%</TableCell>
                  <TableCell>{a.runtimeHours ?? '—'}</TableCell>
                  <TableCell>{a.lastMaintenance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

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
import { mockPPE } from '../../data/mockPPE';

export default function PPEAnalytics({ platform }) {
  const trendData = mockPPE.violationTrend.map((d) => ({ name: d.time, violations: d.count }));
  const complianceByDay = mockPPE.complianceByDay || [];
  const violationTypes = mockPPE.violationTypesSummary || [];

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', mb: 2 }}>
        PPE Detection · Analytics
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Violation trend (24h)</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="violations" stroke="#395DAB" strokeWidth={2} name="Violations" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Violations by time</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={trendData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="violations" fill="#395DAB" name="Violations" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Compliance by day (7d)</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={complianceByDay}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis domain={[85, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="pct" fill="#36b37e" name="Compliance %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#707784', mb: 1 }}>Violations by type</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={violationTypes} layout="vertical" margin={{ left: 80 }}>
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="type" width={75} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#FF5630" name="Count" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623', p: 2, pb: 0 }}>Camera-wise compliance</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F4F5F6' }}>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Camera</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Compliance %</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#101623' }}>Violations today</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPPE.cameras.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>{c.label}</TableCell>
                  <TableCell>{c.status}</TableCell>
                  <TableCell>{c.compliance}%</TableCell>
                  <TableCell>{c.violationsToday ?? 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

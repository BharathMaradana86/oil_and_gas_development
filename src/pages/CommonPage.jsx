import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import { useCaseRegistry } from '../config/useCaseRegistry';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import styles from './CommonPage.module.css';

const ICON_MAP = {
  Engineering: EngineeringIcon,
  LocalGasStation: LocalGasStationIcon,
  LocalFireDepartment: LocalFireDepartmentIcon,
  Security: SecurityIcon,
  Speed: SpeedIcon,
};

export default function CommonPage({ onSelectUseCase }) {
  const { client, site, demoMode } = usePlatform();

  const handleModuleClick = (useCaseId) => {
    if (onSelectUseCase) {
      onSelectUseCase(useCaseId);
    }
  };

  return (
    <div className={styles.root}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#101623', letterSpacing: '-0.01em' }}>
          Overview
        </Typography>
        <Typography variant="body2" sx={{ color: '#707784', mt: 0.5 }}>
          {client?.name} · {site?.name}
          {demoMode && ' · Demo mode'}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {useCaseRegistry.map((uc) => {
          const Icon = ICON_MAP[uc.icon] || EngineeringIcon;
          return (
            <Grid item xs={12} sm={6} md={4} key={uc.id}>
              <Paper
                elevation={0}
                onClick={() => handleModuleClick(uc.id)}
                sx={{
                  p: 2,
                  border: '1px solid #e5e7eb',
                  borderRadius: 2,
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#395DAB',
                    backgroundColor: 'rgba(57, 93, 171, 0.04)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Icon sx={{ fontSize: 28, color: '#395DAB' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#101623' }}>
                    {uc.name}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#707784' }}>
                  {uc.category} · {uc.status}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

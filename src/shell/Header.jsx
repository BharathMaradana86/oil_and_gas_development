import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { usePlatform } from '../context/PlatformContext';
import styles from './Header.module.css';

const LOGO_SRC = '/hypervise-blue.png';

export function Header() {
  const {
    client,
    site,
    timeRange,
    clients,
    sites,
    timeRanges,
    setClient,
    setSite,
    setTimeRange,
    globalAlertsCount,
    demoMode,
    setDemoMode,
  } = usePlatform();

  const [clientAnchor, setClientAnchor] = useState(null);
  const [siteAnchor, setSiteAnchor] = useState(null);
  const [timeAnchor, setTimeAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img
          src={LOGO_SRC}
          alt="Hypervise"
          className={styles.logo}
        />
        <span className={styles.subtitle}>Oil & Gas AI Operations · Eternal Robotics</span>
      </div>

      <div className={styles.controls}>
        <div className={styles.dropdownWrap}>
          <button
            className={styles.selector}
            onClick={(e) => setClientAnchor(e.currentTarget)}
          >
            {client?.name ?? 'Client'}
            <ExpandMoreIcon sx={{ fontSize: 20, color: '#A0A8B0' }} />
          </button>
          <Menu
            anchorEl={clientAnchor}
            open={Boolean(clientAnchor)}
            onClose={() => setClientAnchor(null)}
            PaperProps={{ sx: { mt: 1.5, minWidth: 220 } }}
          >
            {clients.map((c) => (
              <MenuItem
                key={c.id}
                onClick={() => { setClient(c.id); setClientAnchor(null); }}
                sx={{ color: '#232b39', fontSize: 14, fontWeight: 500 }}
              >
                {c.name}
              </MenuItem>
            ))}
          </Menu>
        </div>

        <div className={styles.dropdownWrap}>
          <button
            className={styles.selector}
            onClick={(e) => setSiteAnchor(e.currentTarget)}
          >
            {site?.name ?? 'Site'}
            <ExpandMoreIcon sx={{ fontSize: 20, color: '#A0A8B0' }} />
          </button>
          <Menu
            anchorEl={siteAnchor}
            open={Boolean(siteAnchor)}
            onClose={() => setSiteAnchor(null)}
            PaperProps={{ sx: { mt: 1.5, minWidth: 220 } }}
          >
            {sites.filter((s) => s.clientId === client?.id).map((s) => (
              <MenuItem
                key={s.id}
                onClick={() => { setSite(s.id); setSiteAnchor(null); }}
                sx={{ color: '#232b39', fontSize: 14, fontWeight: 500 }}
              >
                {s.name}
              </MenuItem>
            ))}
          </Menu>
        </div>

        <div className={styles.dropdownWrap}>
          <button
            className={styles.selector}
            onClick={(e) => setTimeAnchor(e.currentTarget)}
          >
            {timeRange?.label ?? 'Time range'}
            <ExpandMoreIcon sx={{ fontSize: 20, color: '#A0A8B0' }} />
          </button>
          <Menu
            anchorEl={timeAnchor}
            open={Boolean(timeAnchor)}
            onClose={() => setTimeAnchor(null)}
            PaperProps={{ sx: { mt: 1.5, minWidth: 180 } }}
          >
            {timeRanges.map((t) => (
              <MenuItem
                key={t.id}
                onClick={() => { setTimeRange(t.id); setTimeAnchor(null); }}
                sx={{ color: '#232b39', fontSize: 14, fontWeight: 500 }}
              >
                {t.label}
              </MenuItem>
            ))}
          </Menu>
        </div>

        <div className={styles.alertBadge}>
          <NotificationsActiveIcon sx={{ fontSize: 20, color: '#FF5630' }} />
          <span className={styles.alertCount}>{globalAlertsCount}</span>
        </div>

        <label className={styles.demoToggle}>
          {/* <input
            type="checkbox"
            checked={demoMode}
            onChange={(e) => setDemoMode(e.target.checked)}
          />
          <span>Demo Mode</span> */}
        </label>

        <IconButton
          size="small"
          onClick={(e) => setProfileAnchor(e.currentTarget)}
          sx={{ ml: 0.5 }}
          aria-controls={profileAnchor ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={profileAnchor ? 'true' : undefined}
        >
          <div className={styles.profileBtn}>
            <span className={styles.avatar}>U</span>
            <span className={styles.profileText}>User</span>
            <ExpandMoreIcon sx={{ fontSize: 20, color: '#A0A8B0' }} />
          </div>
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
              mt: 1.5,
              minWidth: 200,
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem sx={{ color: '#232b39', fontSize: 14, fontWeight: 500 }}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" sx={{ color: '#232b39' }} />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem sx={{ color: '#232b39', fontSize: 14, fontWeight: 500 }}>
            Settings
          </MenuItem>
          <MenuItem
            sx={{ color: '#FF5630', fontSize: 14, fontWeight: 500 }}
            onClick={() => setProfileAnchor(null)}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: '#FF5630' }} />
            </ListItemIcon>
            Sign out
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}

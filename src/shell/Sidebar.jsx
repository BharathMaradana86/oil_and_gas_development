import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import SummarizeIcon from '@mui/icons-material/Summarize';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import HomeIcon from '@mui/icons-material/Home';
import { getUseCasesByCategory, MODULE_SUB_ROUTES } from '../config/useCaseRegistry';
import styles from './Sidebar.module.css';

const ICON_MAP = {
  Engineering: EngineeringIcon,
  LocalGasStation: LocalGasStationIcon,
  LocalFireDepartment: LocalFireDepartmentIcon,
  Security: SecurityIcon,
  Speed: SpeedIcon,
};

function ModuleIcon({ name }) {
  const Icon = ICON_MAP[name] || EngineeringIcon;
  return <Icon className={styles.moduleIcon} />;
}

function SubNavIcon({ routeId }) {
  switch (routeId) {
    case 'overview': return <DashboardIcon className={styles.subNavIcon} />;
    case 'analytics': return <AnalyticsIcon className={styles.subNavIcon} />;
    case 'configurations': return <SettingsIcon className={styles.subNavIcon} />;
    case 'reports': return <SummarizeIcon className={styles.subNavIcon} />;
    default: return <DashboardIcon className={styles.subNavIcon} />;
  }
}

export function Sidebar({
  activeUseCaseId,
  activeSubRoute,
  onSelectUseCase,
  onSelectSubRoute,
  onSelectCommon,
}) {
  const grouped = getUseCasesByCategory();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <div className={styles.section}>
          <button
            type="button"
            className={`${styles.item} ${!activeUseCaseId ? styles.itemActive : ''}`}
            onClick={() => onSelectCommon()}
          >
            <span className={styles.iconWrap}>
              <HomeIcon className={styles.mainIcon} />
            </span>
            <span className={styles.label}>Common</span>
          </button>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Use cases</div>
          {grouped.map(({ category, useCases }) => (
            <div key={category} className={styles.category}>
              <div className={styles.categoryLabel}>{category}</div>
              <ul className={styles.list}>
                {useCases.map((uc) => (
                  <li key={uc.id} className={styles.listItem}>
                    <button
                      type="button"
                      className={`${styles.item} ${activeUseCaseId === uc.id ? styles.itemActive : ''}`}
                      onClick={() => onSelectUseCase(uc.id)}
                    >
                      <span className={styles.iconWrap}>
                        <ModuleIcon name={uc.icon} />
                      </span>
                      <span className={styles.label}>{uc.name}</span>
                      <span className={`${styles.badge} ${styles[`badge_${uc.status.toLowerCase()}`]}`}>
                        {uc.status}
                      </span>
                      {uc.hasAlerts && <span className={styles.alertDot} aria-label="Alerts" />}
                    </button>
                    {activeUseCaseId === uc.id && (
                      <ul className={styles.subList}>
                        {MODULE_SUB_ROUTES.map((route) => (
                          <li key={route.id}>
                            <button
                              type="button"
                              className={`${styles.subItem} ${activeSubRoute === route.id ? styles.subItemActive : ''}`}
                              onClick={() => onSelectSubRoute(route.id)}
                            >
                              <SubNavIcon routeId={route.id} />
                              <span>{route.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}

/**
 * Use Case Registry – configuration-driven.
 * icon: MUI icon name (used by Sidebar to render @mui/icons-material).
 */

export const CATEGORIES = {
  SAFETY: 'Safety',
  OPERATIONS: 'Operations',
  SECURITY: 'Security',
  ENVIRONMENT: 'Environment',
};

export const MODES = {
  LIVE: 'Live',
  DEMO: 'Demo',
  PILOT: 'Pilot',
};

/** Sub-routes for each module */
export const MODULE_SUB_ROUTES = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'configurations', label: 'Configurations' },
  { id: 'reports', label: 'Reports' },
];

export const useCaseRegistry = [
  {
    id: 'ppe-detection',
    name: 'PPE Detection',
    category: CATEGORIES.SAFETY,
    icon: 'Engineering',
    status: MODES.LIVE,
    hasAlerts: true,
    supportedModes: [MODES.LIVE, MODES.DEMO],
    loadOverview: () => import('../dashboards/PPEDetection/PPEDetectionDashboard.jsx'),
    loadAnalytics: () => import('../modules/PPEDetection/PPEAnalytics.jsx'),
    loadConfigurations: () => import('../modules/PPEDetection/PPEConfigurations.jsx'),
    loadReports: () => import('../modules/PPEDetection/PPEReports.jsx'),
  },
  {
    id: 'fire-smoke',
    name: 'Fire & Smoke Detection',
    category: CATEGORIES.SAFETY,
    icon: 'LocalFireDepartment',
    status: MODES.PILOT,
    hasAlerts: false,
    supportedModes: [MODES.LIVE, MODES.DEMO, MODES.PILOT],
    loadOverview: () => import('../dashboards/FireSmoke/FireSmokeDashboard.jsx'),
    loadAnalytics: () => import('../modules/FireSmoke/FireSmokeAnalytics.jsx'),
    loadConfigurations: () => import('../modules/FireSmoke/FireSmokeConfigurations.jsx'),
    loadReports: () => import('../modules/FireSmoke/FireSmokeReports.jsx'),
  },
  {
    id: 'intrusion',
    name: 'Intrusion Detection',
    category: CATEGORIES.SECURITY,
    icon: 'Security',
    status: MODES.LIVE,
    hasAlerts: true,
    supportedModes: [MODES.LIVE, MODES.DEMO],
    loadOverview: () => import('../dashboards/Intrusion/IntrusionDashboard.jsx'),
    loadAnalytics: () => import('../modules/Intrusion/IntrusionAnalytics.jsx'),
    loadConfigurations: () => import('../modules/Intrusion/IntrusionConfigurations.jsx'),
    loadReports: () => import('../modules/Intrusion/IntrusionReports.jsx'),
  },
  {
    id: 'asset-monitoring',
    name: 'Asset Monitoring',
    category: CATEGORIES.OPERATIONS,
    icon: 'Speed',
    status: MODES.DEMO,
    hasAlerts: false,
    supportedModes: [MODES.LIVE, MODES.DEMO],
    loadOverview: () => import('../dashboards/AssetMonitoring/AssetMonitoringDashboard.jsx'),
    loadAnalytics: () => import('../modules/AssetMonitoring/AssetMonitoringAnalytics.jsx'),
    loadConfigurations: () => import('../modules/AssetMonitoring/AssetMonitoringConfigurations.jsx'),
    loadReports: () => import('../modules/AssetMonitoring/AssetMonitoringReports.jsx'),
  },
];

export function getUseCaseById(id) {
  return useCaseRegistry.find((uc) => uc.id === id) ?? null;
}

export function getUseCasesByCategory() {
  const order = [CATEGORIES.SAFETY, CATEGORIES.OPERATIONS, CATEGORIES.SECURITY, CATEGORIES.ENVIRONMENT];
  const byCat = {};
  useCaseRegistry.forEach((uc) => {
    if (!byCat[uc.category]) byCat[uc.category] = [];
    byCat[uc.category].push(uc);
  });
  return order.filter((c) => byCat[c]?.length).map((category) => ({ category, useCases: byCat[category] }));
}

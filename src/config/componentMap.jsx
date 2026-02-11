/**
 * Static component map – no dynamic import, so content always renders without "Loading" or "Failed".
 * Maps (useCaseId, subRoute) to the correct component.
 */

import PPEDetectionDashboard from '../dashboards/PPEDetection/PPEDetectionDashboard.jsx';
import FireSmokeDashboard from '../dashboards/FireSmoke/FireSmokeDashboard.jsx';
import IntrusionDashboard from '../dashboards/Intrusion/IntrusionDashboard.jsx';
import AssetMonitoringDashboard from '../dashboards/AssetMonitoring/AssetMonitoringDashboard.jsx';

import PPEAnalytics from '../modules/PPEDetection/PPEAnalytics.jsx';
import PPEConfigurations from '../modules/PPEDetection/PPEConfigurations.jsx';
import PPEReports from '../modules/PPEDetection/PPEReports.jsx';

import FireSmokeAnalytics from '../modules/FireSmoke/FireSmokeAnalytics.jsx';
import FireSmokeConfigurations from '../modules/FireSmoke/FireSmokeConfigurations.jsx';
import FireSmokeReports from '../modules/FireSmoke/FireSmokeReports.jsx';

import IntrusionAnalytics from '../modules/Intrusion/IntrusionAnalytics.jsx';
import IntrusionConfigurations from '../modules/Intrusion/IntrusionConfigurations.jsx';
import IntrusionReports from '../modules/Intrusion/IntrusionReports.jsx';

import AssetMonitoringAnalytics from '../modules/AssetMonitoring/AssetMonitoringAnalytics.jsx';
import AssetMonitoringConfigurations from '../modules/AssetMonitoring/AssetMonitoringConfigurations.jsx';
import AssetMonitoringReports from '../modules/AssetMonitoring/AssetMonitoringReports.jsx';

const OVERVIEW = 'overview';
const ANALYTICS = 'analytics';
const CONFIGURATIONS = 'configurations';
const REPORTS = 'reports';

const map = {
  'ppe-detection': {
    [OVERVIEW]: PPEDetectionDashboard,
    [ANALYTICS]: PPEAnalytics,
    [CONFIGURATIONS]: PPEConfigurations,
    [REPORTS]: PPEReports,
  },
  'fire-smoke': {
    [OVERVIEW]: FireSmokeDashboard,
    [ANALYTICS]: FireSmokeAnalytics,
    [CONFIGURATIONS]: FireSmokeConfigurations,
    [REPORTS]: FireSmokeReports,
  },
  'intrusion': {
    [OVERVIEW]: IntrusionDashboard,
    [ANALYTICS]: IntrusionAnalytics,
    [CONFIGURATIONS]: IntrusionConfigurations,
    [REPORTS]: IntrusionReports,
  },
  'asset-monitoring': {
    [OVERVIEW]: AssetMonitoringDashboard,
    [ANALYTICS]: AssetMonitoringAnalytics,
    [CONFIGURATIONS]: AssetMonitoringConfigurations,
    [REPORTS]: AssetMonitoringReports,
  },
};

export function getComponent(useCaseId, subRoute) {
  const route = subRoute || OVERVIEW;
  const byCase = map[useCaseId];
  if (!byCase) return null;
  return byCase[route] || byCase[OVERVIEW];
}

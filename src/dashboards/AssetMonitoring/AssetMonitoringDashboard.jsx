import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/DashboardLayout/DashboardLayout';
import { mockAssetMonitoring } from '../../data/mockAssetMonitoring';
import styles from './AssetMonitoringDashboard.module.css';

export default function AssetMonitoringDashboard({ platform }) {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const data = mockAssetMonitoring;

  const runningCount = data.assets.filter((a) => a.status === 'Running').length;
  const healthStatus =
    data.assetsCritical > 0 ? 'critical' : data.assetsWarning > 0 ? 'warning' : 'healthy';

  const kpiSummary = (
    <div className={styles.kpiRow}>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.totalAssets}</span>
        <span className={styles.kpiLabel}>Total assets</span>
      </div>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.uptimePercent}%</span>
        <span className={styles.kpiLabel}>Overall uptime</span>
      </div>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{runningCount}</span>
        <span className={styles.kpiLabel}>Running</span>
      </div>
      <div className={styles.kpi}>
        <span className={`${styles.kpiValue} ${styles.kpiCritical}`}>{data.assetsCritical ?? 0}</span>
        <span className={styles.kpiLabel}>Critical</span>
      </div>
      <div className={styles.kpi}>
        <span className={`${styles.kpiValue} ${styles.kpiWarning}`}>{data.assetsWarning ?? 0}</span>
        <span className={styles.kpiLabel}>Warning</span>
      </div>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.maintenanceAlerts.length}</span>
        <span className={styles.kpiLabel}>Maintenance due</span>
      </div>
    </div>
  );

  const filteredAssets =
    statusFilter === 'all'
      ? data.assets
      : data.assets.filter((a) => a.status.toLowerCase() === statusFilter);

  const primaryVisualization = (
    <div className={styles.vizArea}>
      <div className={styles.sectionTitle}>Asset status at a glance</div>
      <div className={styles.assetGrid}>
        {filteredAssets.map((a) => {
          const healthClass =
            a.health >= 95 ? styles.healthOk : a.health >= 90 ? styles.healthWarn : styles.healthCritical;
          return (
            <motion.div
              key={a.id}
              className={`${styles.assetCard} ${selectedAsset === a.id ? styles.assetCardActive : ''}`}
              onClick={() => setSelectedAsset(selectedAsset === a.id ? null : a.id)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <div className={styles.assetHeader}>
                <span className={styles.assetName}>{a.name}</span>
                <span className={`${styles.assetStatus} ${styles[`status_${a.status.toLowerCase()}`]}`}>
                  {a.status}
                </span>
              </div>
              <div className={styles.healthBar}>
                <div
                  className={`${styles.healthFill} ${healthClass}`}
                  style={{ width: `${a.health}%` }}
                />
              </div>
              <div className={styles.assetMeta}>
                <span className={styles.healthLabel}>Health {a.health}%</span>
                {a.runtimeHours != null && a.runtimeHours > 0 && (
                  <span className={styles.runtimeLabel}>{a.runtimeHours} h runtime</span>
                )}
              </div>
              <div className={styles.assetFooter}>
                <span className={styles.maintenanceLabel}>Last maintenance: {a.lastMaintenance}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const metricsPanel = (
    <div className={styles.metricsContent}>
      <h3 className={styles.panelTitle}>Average health trend (7 days)</h3>
      <div className={styles.trendBars}>
        {data.healthTrend.map((p, i) => (
          <div
            key={i}
            className={styles.trendBar}
            style={{ height: `${p.avg}%` }}
            title={`${p.date}: ${p.avg}%`}
          />
        ))}
      </div>
      <div className={styles.trendLabels}>
        {data.healthTrend.map((p, i) => (
          <span key={i}>{p.date}</span>
        ))}
      </div>
      <h3 className={styles.panelTitle}>Monthly uptime (%)</h3>
      <div className={styles.trendBars}>
        {data.monthlyUptime.map((p, i) => (
          <div
            key={i}
            className={styles.uptimeBar}
            style={{ height: `${p.pct}%` }}
            title={`${p.month}: ${p.pct}%`}
          />
        ))}
      </div>
      <div className={styles.trendLabels}>
        {data.monthlyUptime.map((p, i) => (
          <span key={i}>{p.month}</span>
        ))}
      </div>
    </div>
  );

  const alertsPanel = (
    <div className={styles.alertsContent}>
      <h3 className={styles.panelTitle}>Maintenance due</h3>
      <ul className={styles.alertList}>
        {data.maintenanceAlerts.map((m) => (
          <li key={m.id} className={styles.alertItem}>
            <div className={styles.alertRow}>
              <span className={styles.alertAsset}>{m.asset}</span>
              <span className={`${styles.priorityBadge} ${styles[`priority_${m.priority}`]}`}>
                {m.priority}
              </span>
            </div>
            <span className={styles.alertType}>{m.type}</span>
            <span className={styles.alertDue}>Due: {m.dueDate}</span>
          </li>
        ))}
      </ul>
      {data.maintenanceAlerts.length === 0 && (
        <p className={styles.noAlerts}>No maintenance due in the current window.</p>
      )}
    </div>
  );

  const filtersAndControls = (
    <div className={styles.filters}>
      <select
        className={styles.filterSelect}
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All status</option>
        <option value="running">Running</option>
        <option value="idle">Idle</option>
        <option value="standby">Standby</option>
      </select>
      <select
        className={styles.filterSelect}
        value={selectedAsset ?? ''}
        onChange={(e) => setSelectedAsset(e.target.value || null)}
      >
        <option value="">Select asset</option>
        {data.assets.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>
      {platform?.demoMode && <span className={styles.demoBadge}>Demo</span>}
    </div>
  );

  return (
    <DashboardLayout
      name="Asset Monitoring"
      healthStatus={healthStatus}
      kpiSummary={kpiSummary}
      primaryVisualization={primaryVisualization}
      metricsPanel={metricsPanel}
      alertsPanel={alertsPanel}
      filtersAndControls={filtersAndControls}
    />
  );
}

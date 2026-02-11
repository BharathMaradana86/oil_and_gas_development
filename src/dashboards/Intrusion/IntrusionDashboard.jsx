import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/DashboardLayout/DashboardLayout';
import { mockIntrusion } from '../../data/mockIntrusion';
import styles from './IntrusionDashboard.module.css';

export default function IntrusionDashboard({ platform }) {
  const [selectedZone, setSelectedZone] = useState(null);
  const [severityFilter, setSeverityFilter] = useState('all');
  const data = mockIntrusion;

  const highCount = data.severitySummary?.find((s) => s.severity === 'High')?.count ?? 0;
  const openHigh = data.events.filter((e) => e.severity === 'high' && !e.resolved).length;
  const healthStatus = openHigh > 0 ? 'critical' : data.alerts24h > 5 ? 'warning' : 'healthy';

  const kpiSummary = (
    <div className={styles.kpiRow}>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.alerts24h}</span>
        <span className={styles.kpiLabel}>Events (24h)</span>
      </div>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.camerasTotal}</span>
        <span className={styles.kpiLabel}>Cameras</span>
      </div>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.zones}</span>
        <span className={styles.kpiLabel}>Zones armed</span>
      </div>
      <div className={styles.kpi}>
        <span className={`${styles.kpiValue} ${styles.kpiSuccess}`}>{data.eventsResolved ?? 0}</span>
        <span className={styles.kpiLabel}>Resolved today</span>
      </div>
      <div className={styles.kpi}>
        <span className={`${styles.kpiValue} ${styles.kpiDanger}`}>{highCount}</span>
        <span className={styles.kpiLabel}>High severity (total)</span>
      </div>
    </div>
  );

  const primaryVisualization = (
    <div className={styles.vizArea}>
      <div className={styles.sectionTitle}>Zones & coverage</div>
      <div className={styles.zoneGrid}>
        {data.zonesList.map((z) => (
          <motion.div
            key={z.id}
            className={`${styles.zoneCard} ${selectedZone === z.id ? styles.zoneCardActive : ''}`}
            onClick={() => setSelectedZone(selectedZone === z.id ? null : z.id)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
          >
            <div className={styles.zoneHeader}>
              <span className={styles.zoneName}>{z.name}</span>
              <span className={styles.zoneStatus}>{z.status}</span>
            </div>
            <div className={styles.zoneMeta}>
              <span className={styles.zoneCameras}>{z.cameras} camera{z.cameras !== 1 ? 's' : ''}</span>
              {z.eventsToday !== undefined && (
                <span className={z.eventsToday > 0 ? styles.eventsTodayAlert : styles.eventsTodayOk}>
                  {z.eventsToday} today
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const maxTrend = Math.max(...data.trend.map((p) => p.count), 1);

  const metricsPanel = (
    <div className={styles.metricsContent}>
      <h3 className={styles.panelTitle}>Events by day (7d)</h3>
      <div className={styles.trendBars}>
        {data.trend.map((p, i) => (
          <div
            key={i}
            className={styles.trendBar}
            style={{ height: `${Math.max(12, (p.count / maxTrend) * 100)}%` }}
            title={`${p.day}: ${p.count}`}
          />
        ))}
      </div>
      <div className={styles.trendLabels}>
        {data.trend.map((p, i) => (
          <span key={i}>{p.day}</span>
        ))}
      </div>
      <h3 className={styles.panelTitle}>Events by zone</h3>
      <div className={styles.zoneBars}>
        {data.eventsByZone.map((z, i) => (
          <div key={i} className={styles.zoneBarRow}>
            <span className={styles.zoneBarLabel}>{z.zone}</span>
            <div className={styles.zoneBarTrack}>
              <div
                className={styles.zoneBarFill}
                style={{ width: `${Math.min(100, (z.count / 15) * 100)}%` }}
                title={`${z.zone}: ${z.count}`}
              />
            </div>
            <span className={styles.zoneBarCount}>{z.count}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const filteredEvents =
    severityFilter === 'all'
      ? data.events
      : data.events.filter((e) => e.severity === severityFilter);

  const alertsPanel = (
    <div className={styles.alertsContent}>
      <h3 className={styles.panelTitle}>Recent events</h3>
      <ul className={styles.alertList}>
        {filteredEvents.map((e) => (
          <li key={e.id} className={styles.alertItem}>
            <div className={styles.alertRow}>
              <span className={e.severity === 'high' ? styles.sevHigh : e.severity === 'medium' ? styles.sevMedium : styles.sevLow}>
                {e.type}
              </span>
              {e.resolved && <span className={styles.resolvedBadge}>Resolved</span>}
            </div>
            <span className={styles.alertTime}>{new Date(e.time).toLocaleString()}</span>
            <span className={styles.alertZone}>{e.zone} · {e.camera}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const filtersAndControls = (
    <div className={styles.filters}>
      <select
        className={styles.filterSelect}
        value={severityFilter}
        onChange={(e) => setSeverityFilter(e.target.value)}
      >
        <option value="all">All severity</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select
        className={styles.filterSelect}
        value={selectedZone ?? ''}
        onChange={(e) => setSelectedZone(e.target.value || null)}
      >
        <option value="">All zones</option>
        {data.zonesList.map((z) => (
          <option key={z.id} value={z.id}>
            {z.name}
          </option>
        ))}
      </select>
      {platform?.demoMode && <span className={styles.demoBadge}>Demo</span>}
    </div>
  );

  return (
    <DashboardLayout
      name="Intrusion Detection"
      healthStatus={healthStatus}
      kpiSummary={kpiSummary}
      primaryVisualization={primaryVisualization}
      metricsPanel={metricsPanel}
      alertsPanel={alertsPanel}
      filtersAndControls={filtersAndControls}
    />
  );
}

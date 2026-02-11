import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/DashboardLayout/DashboardLayout';
import { mockPPE } from '../../data/mockPPE';
import { usePlatform } from '../../context/PlatformContext';
import styles from './PPEDetectionDashboard.module.css';

export default function PPEDetectionDashboard({ useCaseId, platform }) {
  const { demoMode } = platform ?? {};
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [severityFilter, setSeverityFilter] = useState('all');
  const data = mockPPE;

  const kpiSummary = (
    <div className={styles.kpiRow}>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.compliancePercent}%</span>
        <span className={styles.kpiLabel}>Compliance</span>
        {data.complianceTrend && <span className={styles.kpiTrend}>{data.complianceTrend}</span>}
      </div>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.totalCameras}</span>
        <span className={styles.kpiLabel}>Cameras</span>
      </div>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.totalWorkersTracked}</span>
        <span className={styles.kpiLabel}>Workers tracked</span>
      </div>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.violationsCount}</span>
        <span className={styles.kpiLabel}>Violations (24h)</span>
      </div>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.violationsResolved}</span>
        <span className={styles.kpiLabel}>Resolved today</span>
      </div>
    </div>
  );

  const primaryVisualization = (
    <div className={styles.vizArea}>
      <div className={styles.cameraGrid}>
        {data.cameras.map((cam) => (
          <motion.div
            key={cam.id}
            className={`${styles.cameraTile} ${selectedCamera === cam.id ? styles.cameraTileActive : ''}`}
            onClick={() => setSelectedCamera(selectedCamera === cam.id ? null : cam.id)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
          >
            <div className={styles.cameraPlaceholder}>
              <span className={styles.camLabel}>{cam.label}</span>
              <span className={styles.camLive}>LIVE</span>
              <div className={styles.boundingOverlay}>
                <span className={styles.overlayLabel}>Helmet ✓ Vest ✓ Gloves ✓</span>
              </div>
            </div>
            <div className={styles.cameraFooter}>
              <span>Compliance {cam.compliance}%</span>
              {cam.violationsToday !== undefined && <span className={styles.violationsToday}>{cam.violationsToday} today</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const metricsPanel = (
    <div className={styles.metricsContent}>
      <h3 className={styles.panelTitle}>Violation trend (24h)</h3>
      <div className={styles.trendChart}>
        {data.violationTrend.map((point, i) => (
          <div
            key={i}
            className={styles.trendBar}
            style={{ height: `${Math.max(10, point.count * 15)}%` }}
            title={`${point.time}: ${point.count}`}
          />
        ))}
      </div>
      <div className={styles.trendLabels}>
        {data.violationTrend.map((p, i) => (
          <span key={i}>{p.time}</span>
        ))}
      </div>
      <h3 className={styles.panelTitle}>Compliance by day (7d)</h3>
      <div className={styles.trendChart}>
        {data.complianceByDay.map((point, i) => (
          <div
            key={i}
            className={styles.complianceBar}
            style={{ height: `${point.pct}%` }}
            title={`${point.day}: ${point.pct}%`}
          />
        ))}
      </div>
      <div className={styles.trendLabels}>
        {data.complianceByDay.map((p, i) => (
          <span key={i}>{p.day}</span>
        ))}
      </div>
    </div>
  );

  const alertsPanel = (
    <div className={styles.alertsContent}>
      <h3 className={styles.panelTitle}>Recent violations</h3>
      <ul className={styles.alertList}>
        {data.violations.map((v) => (
          <li key={v.id} className={styles.alertItem}>
            <div className={styles.alertSnapshot}>
              <span className={styles.snapshotPlaceholder}>📷</span>
            </div>
            <div className={styles.alertMeta}>
              <span className={styles.alertType}>{v.type}</span>
              <span className={styles.alertTime}>
                {new Date(v.timestamp).toLocaleString()}
              </span>
              <span className={styles.alertConfidence}>
                {(v.confidence * 100).toFixed(0)}% confidence
              </span>
              <span className={styles.alertCamera}>{v.camera}</span>
            </div>
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
        onChange={(e) => setSelectedCamera(e.target.value || null)}
        value={selectedCamera ?? ''}
      >
        <option value="">All cameras</option>
        {data.cameras.map((c) => (
          <option key={c.id} value={c.id}>{c.label}</option>
        ))}
      </select>
      {demoMode && (
        <span className={styles.demoBadge}>Demo mode – simulated data</span>
      )}
    </div>
  );

  return (
    <DashboardLayout
      name="PPE Detection"
      healthStatus={data.compliancePercent >= 95 ? 'healthy' : data.compliancePercent >= 85 ? 'warning' : 'critical'}
      kpiSummary={kpiSummary}
      primaryVisualization={primaryVisualization}
      metricsPanel={metricsPanel}
      alertsPanel={alertsPanel}
      filtersAndControls={filtersAndControls}
    />
  );
}

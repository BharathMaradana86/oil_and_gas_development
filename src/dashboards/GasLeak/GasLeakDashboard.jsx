import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/DashboardLayout/DashboardLayout';
import { mockGasLeak } from '../../data/mockGasLeak';
import { usePlatform } from '../../context/PlatformContext';
import styles from './GasLeakDashboard.module.css';

export default function GasLeakDashboard({ useCaseId, platform }) {
  const { demoMode } = platform ?? {};
  const [selectedZone, setSelectedZone] = useState(null);
  const data = mockGasLeak;

  const riskColor = {
    low: 'var(--success)',
    normal: 'var(--success)',
    elevated: 'var(--warning)',
    high: 'var(--danger)',
    critical: 'var(--danger)',
  }[data.riskLevel];

  const kpiSummary = (
    <div className={styles.kpiRow}>
      <div className={styles.kpi}>
        <span className={styles.kpiValue} style={{ color: riskColor }}>
          {data.riskLevel.toUpperCase()}
        </span>
        <span className={styles.kpiLabel}>Risk level</span>
      </div>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.ppmCurrent} ppm</span>
        <span className={styles.kpiLabel}>Current PPM</span>
      </div>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.ppmPeak24h}</span>
        <span className={styles.kpiLabel}>Peak 24h (ppm)</span>
      </div>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.zonesMonitored}</span>
        <span className={styles.kpiLabel}>Zones monitored</span>
      </div>
      <div className={styles.kpi}>
        <span className={styles.kpiValue}>{data.alerts.length}</span>
        <span className={styles.kpiLabel}>Active alerts</span>
      </div>
    </div>
  );

  const primaryVisualization = (
    <div className={styles.vizArea}>
      <div className={styles.plantMap}>
        {data.zones.map((z) => (
          <motion.div
            key={z.id}
            className={`${styles.zoneDot} ${selectedZone === z.id ? styles.zoneDotActive : ''}`}
            style={{
              left: `${z.x}%`,
              top: `${z.y}%`,
              width: 24 + z.intensity * 32,
              height: 24 + z.intensity * 32,
              background: `radial-gradient(circle, ${intensityToColor(z.intensity)} 0%, transparent 70%)`,
              border: `2px solid ${z.intensity > 0.5 ? 'var(--danger)' : 'var(--warning)'}`,
            }}
            onClick={() => setSelectedZone(selectedZone === z.id ? null : z.id)}
            whileHover={{ scale: 1.1 }}
            title={`${z.name}: ${z.ppm} ppm`}
          >
            <span className={styles.zoneLabel}>{z.name}</span>
          </motion.div>
        ))}
      </div>
      <div className={styles.heatmapLegend}>
        <span>Low</span>
        <div className={styles.legendGradient} />
        <span>High</span>
      </div>
    </div>
  );

  const metricsPanel = (
    <div className={styles.metricsContent}>
      <h3 className={styles.panelTitle}>PPM timeline (24h)</h3>
      <div className={styles.ppmChart}>
        {data.ppmTimeline.map((point, i) => (
          <div key={i} className={styles.ppmBarWrap}>
            <div
              className={styles.ppmBar}
              style={{
                height: `${Math.min(100, (point.ppm / data.ppmThreshold) * 100)}%`,
              }}
              title={`${point.time}: ${point.ppm} ppm`}
            />
          </div>
        ))}
      </div>
      <div className={styles.trendLabels}>
        {data.ppmTimeline.map((p, i) => (
          <span key={i}>{p.time}</span>
        ))}
      </div>
      <h3 className={styles.panelTitle}>Weekly avg PPM</h3>
      <div className={styles.ppmChart}>
        {data.weeklySummary && data.weeklySummary.map((point, i) => (
          <div key={i} className={styles.ppmBarWrap}>
            <div
              className={styles.ppmBar}
              style={{
                height: `${Math.min(100, (point.avgPpm / 60) * 100)}%`,
              }}
              title={`${point.day}: ${point.avgPpm} ppm, ${point.alerts} alerts`}
            />
          </div>
        ))}
      </div>
      <div className={styles.trendLabels}>
        {data.weeklySummary && data.weeklySummary.map((p, i) => (
          <span key={i}>{p.day}</span>
        ))}
      </div>
    </div>
  );

  const alertsPanel = (
    <div className={styles.alertsContent}>
      <h3 className={styles.panelTitle}>Alerts & events</h3>
      <ul className={styles.alertList}>
        {data.alerts.map((a) => (
          <li key={a.id} className={styles.alertItem}>
            <span className={`${styles.severityDot} ${styles[`sev_${a.severity}`]}`} />
            <div className={styles.alertMeta}>
              <span className={styles.alertMessage}>{a.message}</span>
              <span className={styles.alertTime}>
                {new Date(a.timestamp).toLocaleString()}
              </span>
              <span className={styles.alertPpm}>{a.ppm} ppm · {a.zone}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const filtersAndControls = (
    <div className={styles.filters}>
      <select className={styles.filterSelect}>
        <option>All zones</option>
        {data.zones.map((z) => (
          <option key={z.id} value={z.id}>{z.name}</option>
        ))}
      </select>
      <select className={styles.filterSelect}>
        <option>All severity</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      {demoMode && (
        <span className={styles.demoBadge}>Demo mode – simulated data</span>
      )}
    </div>
  );

  return (
    <DashboardLayout
      name="Gas Leak Detection"
      healthStatus={data.riskLevel === 'critical' || data.riskLevel === 'high' ? 'critical' : data.riskLevel === 'elevated' ? 'warning' : 'healthy'}
      kpiSummary={kpiSummary}
      primaryVisualization={primaryVisualization}
      metricsPanel={metricsPanel}
      alertsPanel={alertsPanel}
      filtersAndControls={filtersAndControls}
    />
  );
}

function intensityToColor(intensity) {
  if (intensity <= 0.3) return 'rgba(63, 185, 80, 0.6)';
  if (intensity <= 0.6) return 'rgba(210, 153, 34, 0.7)';
  return 'rgba(248, 81, 73, 0.8)';
}

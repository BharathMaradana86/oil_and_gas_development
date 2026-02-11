import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/DashboardLayout/DashboardLayout';
import { mockFireSmoke } from '../../data/mockFireSmoke';
import styles from './FireSmokeDashboard.module.css';

function heatmapColor(value) {
  if (value <= 25) return 'var(--heat-low)';
  if (value <= 50) return 'var(--heat-mid)';
  if (value <= 75) return 'var(--heat-high)';
  return 'var(--heat-critical)';
}

export default function FireSmokeDashboard({ platform }) {
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedStream, setSelectedStream] = useState(null);
  const data = mockFireSmoke;

  const kpiSummary = (
    <div className={styles.kpiRow}>
      <div className={styles.kpi}><span className={styles.kpiValue}>{data.activeEvents}</span><span className={styles.kpiLabel}>Active events</span></div>
      <div className={styles.kpi}><span className={styles.kpiValue}>{data.totalSensors}</span><span className={styles.kpiLabel}>Sensors</span></div>
      <div className={styles.kpi}><span className={styles.kpiValue}>{data.zonesMonitored ?? data.zones.length}</span><span className={styles.kpiLabel}>Zones</span></div>
      <div className={styles.kpi}><span className={styles.kpiValue}>{data.liveStreams.length}</span><span className={styles.kpiLabel}>Live feeds</span></div>
      {data.lastDrillDate && <div className={styles.kpi}><span className={styles.kpiValue}>{data.lastDrillDate}</span><span className={styles.kpiLabel}>Last drill</span></div>}
    </div>
  );

  const primaryVisualization = (
    <div className={styles.vizArea}>
      {/* Heatmap section */}
      <div className={styles.heatmapSection}>
        <h3 className={styles.sectionTitle}>Temperature / risk heatmap</h3>
        <div className={styles.heatmapGrid}>
          {data.heatmapGrid.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.heatmapRow}>
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={styles.heatmapCell}
                  style={{ backgroundColor: heatmapColor(cell.value) }}
                  title={`${cell.label}: ${cell.value}°C / risk ${cell.value}%`}
                >
                  <span className={styles.heatmapValue}>{cell.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.heatmapLegend}>
          <span>Low</span>
          <div className={styles.legendBar} />
          <span>High</span>
        </div>
      </div>

      {/* Live streaming section */}
      <div className={styles.liveSection}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.liveDot} /> Live streams
        </h3>
        <div className={styles.streamGrid}>
          {data.liveStreams.map((stream) => (
            <motion.div
              key={stream.id}
              className={`${styles.streamCard} ${selectedStream === stream.id ? styles.streamCardActive : ''}`}
              onClick={() => setSelectedStream(selectedStream === stream.id ? null : stream.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.streamFrame}>
                <div className={styles.streamPlaceholder}>
                  <span className={styles.streamIcon}>📹</span>
                  <span className={styles.streamLabel}>{stream.name}</span>
                  <span className={styles.liveBadge}>LIVE</span>
                </div>
              </div>
              <div className={styles.streamFooter}>
                <span className={styles.streamZone}>{stream.zone}</span>
                <span className={styles.streamStatus}>{stream.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Zone cards (compact) */}
      <div className={styles.zoneSection}>
        <h3 className={styles.sectionTitle}>Zones</h3>
        <div className={styles.sensorGrid}>
          {data.zones.map((z) => (
            <motion.div
              key={z.id}
              className={`${styles.zoneCard} ${selectedZone === z.id ? styles.zoneCardActive : ''}`}
              onClick={() => setSelectedZone(selectedZone === z.id ? null : z.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.zoneHeader}>
                <span className={styles.zoneName}>{z.name}</span>
                <span className={styles.zoneStatus}>{z.status}</span>
              </div>
              <div className={styles.zoneSensors}>{z.sensors} sensors</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const metricsPanel = (
    <div className={styles.metricsContent}>
      <h3 className={styles.panelTitle}>Sensor events (24h)</h3>
      <div className={styles.trendBars}>
        {data.sensorTrend.map((p, i) => (
          <div key={i} className={styles.trendBar} style={{ height: `${Math.max(8, (p.events || 0) * 30)}%` }} title={`${p.time}: ${p.events ?? 0}`} />
        ))}
      </div>
      <div className={styles.trendLabels}>
        {data.sensorTrend.map((p, i) => (
          <span key={i}>{p.time}</span>
        ))}
      </div>
      {data.temperatureTrend && (
        <>
          <h3 className={styles.panelTitle}>Avg temp by hour (°C)</h3>
          <div className={styles.trendBars}>
            {data.temperatureTrend.map((p, i) => (
              <div key={i} className={styles.trendBarTemp} style={{ height: `${Math.min(100, (p.avgTemp / 60) * 100)}%` }} title={`${p.hour}: ${p.avgTemp}°C`} />
            ))}
          </div>
          <div className={styles.trendLabels}>
            {data.temperatureTrend.map((p, i) => (
              <span key={i}>{p.hour}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );

  const alertsPanel = (
    <div className={styles.alertsContent}>
      <h3 className={styles.panelTitle}>Alerts</h3>
      {data.alerts.length === 0 ? (
        <p className={styles.noAlerts}>No active fire or smoke alerts.</p>
      ) : (
        <ul className={styles.alertList}>
          {data.alerts.map((a) => (
            <li key={a.id} className={styles.alertItem}>{a.message}</li>
          ))}
        </ul>
      )}
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
        <option>All streams</option>
        {data.liveStreams.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      {platform?.demoMode && <span className={styles.demoBadge}>Demo</span>}
    </div>
  );

  return (
    <DashboardLayout
      name="Fire & Smoke Detection"
      healthStatus="healthy"
      kpiSummary={kpiSummary}
      primaryVisualization={primaryVisualization}
      metricsPanel={metricsPanel}
      alertsPanel={alertsPanel}
      filtersAndControls={filtersAndControls}
    />
  );
}

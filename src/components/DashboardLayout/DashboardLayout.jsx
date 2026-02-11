import React from 'react';
import styles from './DashboardLayout.module.css';

/**
 * Mandatory structure for every use case dashboard.
 * Use Case Header | Primary Visualization | Metrics & Insights | Alerts & Events | Filters & Controls
 * Children are free to compose their own sections; this provides the grid and section semantics.
 */
export function DashboardLayout({
  name,
  healthStatus = 'healthy', // healthy | warning | critical
  kpiSummary,
  primaryVisualization,
  metricsPanel,
  alertsPanel,
  filtersAndControls,
}) {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>{name}</h1>
          <span className={`${styles.health} ${styles[`health_${healthStatus}`]}`}>
            {healthStatus === 'healthy' && '● Healthy'}
            {healthStatus === 'warning' && '● Warning'}
            {healthStatus === 'critical' && '● Critical'}
          </span>
        </div>
        {kpiSummary && <div className={styles.kpiSummary}>{kpiSummary}</div>}
      </header>

      {filtersAndControls && (
        <div className={styles.filters}>{filtersAndControls}</div>
      )}

      <section className={styles.primaryViz} aria-label="Primary visualization">
        {primaryVisualization}
      </section>

      <div className={styles.lower}>
        {metricsPanel && (
          <section className={styles.metrics} aria-label="Metrics and insights">
            {metricsPanel}
          </section>
        )}
        {alertsPanel && (
          <section className={styles.alerts} aria-label="Alerts and events">
            {alertsPanel}
          </section>
        )}
      </div>
    </div>
  );
}

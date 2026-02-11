import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Shell } from './shell/Shell';
import { DashboardOrchestrator } from './orchestrator/DashboardOrchestrator';
import styles from './App.module.css';

export default function App() {
  const [activeUseCaseId, setActiveUseCaseId] = useState(null);
  const [activeSubRoute, setActiveSubRoute] = useState('overview');

  const handleSelectUseCase = (id) => {
    setActiveUseCaseId(id);
    setActiveSubRoute('overview');
  };

  return (
    <div className={styles.app}>
      <Shell
        activeUseCaseId={activeUseCaseId}
        activeSubRoute={activeSubRoute}
        onSelectUseCase={handleSelectUseCase}
        onSelectSubRoute={setActiveSubRoute}
        onSelectCommon={() => {
          setActiveUseCaseId(null);
          setActiveSubRoute('overview');
        }}
      />
      <main className={styles.main}>
        <AnimatePresence mode="wait">
          <DashboardOrchestrator
            key={`${activeUseCaseId ?? 'common'}-${activeSubRoute}`}
            useCaseId={activeUseCaseId}
            subRoute={activeSubRoute}
          />
        </AnimatePresence>
      </main>
    </div>
  );
}

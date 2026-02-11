import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Shell } from './shell/Shell';
import { DashboardOrchestrator } from './orchestrator/DashboardOrchestrator';
import { Login } from './components/Login/Login';
import { useAuth } from './context/AuthContext';
import styles from './App.module.css';

export default function App() {
  const { isAuthenticated } = useAuth();
  const [activeUseCaseId, setActiveUseCaseId] = useState(null);
  const [activeSubRoute, setActiveSubRoute] = useState('overview');

  const handleSelectUseCase = (id) => {
    setActiveUseCaseId(id);
    setActiveSubRoute('overview');
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login />;
  }

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
            onSelectUseCase={handleSelectUseCase}
          />
        </AnimatePresence>
      </main>
    </div>
  );
}

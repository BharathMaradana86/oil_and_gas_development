import React, { createContext, useContext, useState, useCallback } from 'react';

const PlatformContext = createContext(null);

const DEFAULT_TIME_RANGES = [
  { id: '1h', label: 'Last 1 hour' },
  { id: '6h', label: 'Last 6 hours' },
  { id: '24h', label: 'Last 24 hours' },
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
];

const DEFAULT_CLIENTS = [
  { id: 'client-1', name: 'Offshore Platform Alpha' },
  { id: 'client-2', name: 'Refinery North' },
  { id: 'client-3', name: 'Pipeline Terminal West' },
];

const DEFAULT_SITES = [
  { id: 'site-1', name: 'Main Control Room', clientId: 'client-1' },
  { id: 'site-2', name: 'Processing Unit A', clientId: 'client-1' },
  { id: 'site-3', name: 'Storage Yard', clientId: 'client-1' },
  { id: 'site-4', name: 'Distillation Block', clientId: 'client-2' },
];

export function PlatformProvider({ children }) {
  const [client, setClient] = useState(DEFAULT_CLIENTS[0]);
  const [site, setSite] = useState(DEFAULT_SITES[0]);
  const [timeRange, setTimeRange] = useState(DEFAULT_TIME_RANGES[2]); // 24h
  const [globalAlertsCount, setGlobalAlertsCount] = useState(3);
  const [demoMode, setDemoMode] = useState(false);
  const [demoScenario, setDemoScenario] = useState(null); // per use case

  const setClientById = useCallback((id) => {
    const c = DEFAULT_CLIENTS.find((x) => x.id === id);
    if (c) setClient(c);
  }, []);

  const setSiteById = useCallback((id) => {
    const s = DEFAULT_SITES.find((x) => x.id === id);
    if (s) setSite(s);
  }, []);

  const setTimeRangeById = useCallback((id) => {
    const t = DEFAULT_TIME_RANGES.find((x) => x.id === id);
    if (t) setTimeRange(t);
  }, []);

  const value = {
    client,
    site,
    timeRange,
    globalAlertsCount,
    demoMode,
    demoScenario,
    setClient: setClientById,
    setSite: setSiteById,
    setTimeRange: setTimeRangeById,
    setGlobalAlertsCount,
    setDemoMode,
    setDemoScenario,
    clients: DEFAULT_CLIENTS,
    sites: DEFAULT_SITES,
    timeRanges: DEFAULT_TIME_RANGES,
  };

  return (
    <PlatformContext.Provider value={value}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error('usePlatform must be used within PlatformProvider');
  return ctx;
}

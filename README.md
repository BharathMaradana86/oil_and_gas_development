# Oil & Gas AI Operations Platform

**Eternal Robotics** – One persistent master UI shell that dynamically loads and switches independent use-case dashboards (micro-frontend style). No page reloads.

## Features

- **Master UI Shell** – Persistent header (platform name, client/site selector, global time range, alert indicator, user profile) and left sidebar (Use Case Navigator by Safety, Operations, Security, Environment).
- **UI Orchestrator** – Lazy loads each use-case dashboard, passes shared context (client, site, time range), handles mount/unmount, smooth Framer Motion transitions.
- **Use Case Dashboard Contract** – Every dashboard follows: Use Case Header (name, health, KPIs), Primary Visualization, Metrics & Insights, Alerts & Events, Filters & Controls.
- **Use Case Registry** – Configuration-driven; adding a new use case only requires registering in `src/config/useCaseRegistry.js`.
- **Demo Mode** – Global toggle for simulated data; dashboards show “Demo mode” when enabled.

## Use Cases (in registry)

| Use Case              | Category    | Status | Dashboard |
|-----------------------|------------|--------|-----------|
| PPE Detection         | Safety     | Live   | Full (camera grid, compliance, violations) |
| Gas Leak Detection    | Safety     | Live   | Full (plant map heatmap, PPM, alerts) |
| Fire & Smoke Detection| Safety     | Pilot  | Stub      |
| Intrusion Detection   | Security   | Live   | Stub      |
| Asset Monitoring      | Operations | Demo   | Stub      |

## Tech Stack

- **React 18** + **Vite**
- **Context API** for shared state (client, site, time range, demo mode)
- **Dynamic imports** for lazy-loaded dashboards
- **Framer Motion** for transitions
- Mock JSON data (replace with API later)

## Folder Structure

```
src/
├── config/
│   └── useCaseRegistry.js      # Use case registry (id, name, category, icon, load)
├── context/
│   └── PlatformContext.jsx    # Client, site, time range, demo mode
├── shell/
│   ├── Shell.jsx
│   ├── Header.jsx             # Brand, client/site/time, alerts, demo toggle, profile
│   └── Sidebar.jsx            # Use Case Navigator by category
├── orchestrator/
│   └── DashboardOrchestrator.jsx  # Lazy load, lifecycle, transitions
├── components/
│   └── DashboardLayout/       # Contract layout (header, viz, metrics, alerts, filters)
├── dashboards/
│   ├── PPEDetection/          # PPE Detection dashboard
│   ├── GasLeak/               # Gas Leak Detection dashboard
│   ├── FireSmoke/             # Stub
│   ├── Intrusion/             # Stub
│   └── AssetMonitoring/       # Stub
├── data/
│   ├── mockPPE.js
│   └── mockGasLeak.js
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

## Running

```bash
npm install
npm run dev
```

Open http://localhost:3000. Select a use case from the sidebar to load its dashboard.

## Adding a New Use Case

1. Create a dashboard component under `src/dashboards/YourUseCase/`.
2. In `src/config/useCaseRegistry.js`, add an entry with `id`, `name`, `category`, `icon`, `status`, `hasAlerts`, `supportedModes`, and `load: () => import('../dashboards/YourUseCase/YourUseCaseDashboard.jsx')`.

No changes to the shell or orchestrator are required.

import React, { createContext, useContext, useState } from 'react';

type Tab =
  | 'Dashboard'
  | 'Partite'
  | 'Giocatori'
  | 'Statistiche'
  | 'Mister'
  | 'Squadre';

type Toast = { message: string; type: 'success' | 'error' } | null;

type Ctx = {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  activeTeamId: string | null;
  setActiveTeamId: (id: string | null) => void;
  toast: Toast;
  setToast: (t: Toast) => void;
  reportingMatchId: string | null;
  clearMatchReport: () => void;
};

const AppContext = createContext<Ctx | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Dashboard');
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [reportingMatchId, setReportingMatchId] = useState<string | null>(null);

  const clearMatchReport = () => setReportingMatchId(null);

  const value: Ctx = {
    activeTab,
    setActiveTab,
    activeTeamId,
    setActiveTeamId,
    toast,
    setToast,
    reportingMatchId,
    clearMatchReport,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useAppContext(): Ctx {
  const ctx = useContext(AppContext);
  if (!ctx) {
    // fallback ultra-sicuro: non crashare mai
    return {
      activeTab: 'Dashboard',
      setActiveTab: () => {},
      activeTeamId: null,
      setActiveTeamId: () => {},
      toast: null,
      setToast: () => {},
      reportingMatchId: null,
      clearMatchReport: () => {},
    };
  }
  return ctx;
}

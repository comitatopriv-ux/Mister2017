import React from 'react';
import { useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import MatchesScreen from './screens/MatchesScreen';
import PlayersScreen from './screens/PlayersScreen';
import StatsScreen from './screens/StatsScreen';
import CoachesScreen from './screens/CoachesScreen';
import TeamsScreen from './screens/TeamsScreen';
import Toast from './components/common/Toast';
import MatchReportModal from './components/common/MatchReportModal';
console.log("✅ App loaded");

const App: React.FC = () => {
  const { activeTab, activeTeamId, toast, reportingMatchId, clearMatchReport } = useAppContext();

  const renderScreen = () => {
    if (!activeTeamId) {
      return <TeamsScreen />;
    }
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Partite':
        return <MatchesScreen />;
      case 'Giocatori':
        return <PlayersScreen />;
      case 'Statistiche':
        return <StatsScreen />;
      case 'Mister':
        return <CoachesScreen />;
      default:
        return <Dashboard />;
    }
  };

try {
  return (
    <>
      {activeTeamId ? (
        <Layout>
          {renderScreen()}
        </Layout>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <TeamsScreen />
        </div>
      )}
      {toast && <Toast message={toast.message} type={toast.type} />}
      <MatchReportModal
        isOpen={!!reportingMatchId}
        onClose={clearMatchReport}
        matchId={reportingMatchId}
      />
    </>
  );
} catch (err) {
  console.error("❌ Errore durante il render:", err);
  return (
    <div
      style={{
        background: "black",
        color: "lime",
        padding: "20px",
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
      }}
    >
      ⚠️ ERRORE NEL RENDER:
      {"\n\n"}
      {String(err && (err.stack || err.message || err))}
    </div>
  );
}

// 👇 CHIUDI IL COMPONENTE QUI!
};

export default App;

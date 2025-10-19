import { ReactNode } from 'react';

export interface Team {
  id: string;
  name: string;
  primaryColorHex: string;
  secondaryColorHex: string;
}

export interface Player {
  id:string;
  teamId: string;
  firstName: string;
  lastName: string;
  jerseyNumber?: number;
  photoUrl?: string;
}

export interface Coach {
  id: string;
  name: string;
  photoUrl?: string;
}

export interface Tournament {
  id: string;
  name: string;
  presenceWeight: number;
}

export interface Match {
  id: string;
  date: string; // ISO string
  opponent: string;
  tournamentId: string;
  result: { home: number; away: number };
  coachIds: string[];
  attendees: { playerId: string; role: 'starter' | 'sub' }[];
  scorers: { playerId?: string; isOwnGoal: boolean; goals: number }[];
}

export interface Insight {
  title: string;
  description: string;
  emoji?: string;
}

export interface MatchReport {
  title: string;
  content: string;
}

export type ToastType = 'success' | 'error';
export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

export type LeaderboardPlayer = Player & { score: number | string };

export interface ParsedMatchFromText {
  date?: string;
  tournamentName?: string;
  opponentName?: string;
  homeScore?: number;
  awayScore?: number;
  attendees?: string[];
  scorers?: { lastName?: string; isOwnGoal?: boolean; goals: number }[];
  coachNames?: string[];
  parseErrors?: string[];
}


export interface AppContextType {
  // State
  activeTab: string;
  teams: Team[];
  players: Player[];
  coaches: Coach[];
  tournaments: Tournament[];
  matches: Match[];
  activeTeamId: string | null;
  toast: ToastMessage | null;
  aiInsights: Insight[] | null;
  isGeneratingInsight: boolean;
  reportingMatchId: string | null;
  aiGeneratedReport: MatchReport | null;
  isGeneratingReport: boolean;
  
  // Actions
  setActiveTab: (tab: string) => void;
  setActiveTeamId: (teamId: string | null) => void;
  showToast: (message: string, type: ToastType) => void;
  generateAiInsight: () => Promise<void>;
  showMatchReport: (matchId: string) => void;
  generateAIMatchSummary: (matchId: string) => Promise<void>;
  clearMatchReport: () => void;

  addTeam: (team: Omit<Team, 'id'>) => Team;
  
  addPlayer: (player: Omit<Player, 'id' | 'teamId'>) => Player;
  updatePlayer: (player: Player) => void;
  deletePlayer: (playerId: string) => void;
  
  addCoach: (coach: Omit<Coach, 'id'>) => Coach;
  updateCoach: (coach: Coach) => void;
  deleteCoach: (coachId: string) => void;

  addTournament: (tournament: Omit<Tournament, 'id'>) => Tournament;
  updateTournament: (tournament: Tournament) => void;
  deleteTournament: (tournamentId: string) => void;
  
  addMatch: (match: Omit<Match, 'id'>) => Match;
  updateMatch: (match: Match) => void;
  deleteMatch: (matchId: string) => void;
}

export interface AppProviderProps {
    children: ReactNode;
}
/**
 * Core TypeScript types for the Would You Rather application
 */

export interface User {
  id: string;
  name: string;
  avatarURL: string;
  answers: Record<string, 'optionOne' | 'optionTwo'>;
  questions: string[];
}

export interface QuestionOption {
  votes: string[];
  text: string;
}

export interface Question {
  id: string;
  author: string;
  timestamp: number;
  optionOne: QuestionOption;
  optionTwo: QuestionOption;
}

export interface FormattedQuestion {
  id: string;
  name: string;
  avatar: string;
  timestamp: number;
  optionOne: QuestionOption;
  optionTwo: QuestionOption;
  hasVoted: boolean;
  userVote?: 'optionOne' | 'optionTwo';
}

export interface CreateQuestionInput {
  optionOneText: string;
  optionTwoText: string;
  author: string;
}

export interface SaveQuestionAnswerInput {
  authedUser: string;
  qid: string;
  answer: 'optionOne' | 'optionTwo';
}

export interface LeaderboardEntry {
  user: User;
  answeredCount: number;
  createdCount: number;
  score: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

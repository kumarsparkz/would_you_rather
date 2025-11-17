/**
 * Utility functions
 */

import type { Question, User, FormattedQuestion, LeaderboardEntry } from './types';

/**
 * Format a question with user information
 */
export function formatQuestion(
  question: Question,
  author: User,
  authedUserId: string
): FormattedQuestion {
  const userVote = question.optionOne.votes.includes(authedUserId)
    ? 'optionOne' as const
    : question.optionTwo.votes.includes(authedUserId)
    ? 'optionTwo' as const
    : undefined;

  return {
    id: question.id,
    name: author.name,
    avatar: author.avatarURL,
    timestamp: question.timestamp,
    optionOne: question.optionOne,
    optionTwo: question.optionTwo,
    hasVoted: userVote !== undefined,
    userVote,
  };
}

/**
 * Calculate leaderboard data
 */
export function calculateLeaderboard(users: Record<string, User>): LeaderboardEntry[] {
  return Object.values(users)
    .map((user) => ({
      user,
      answeredCount: Object.keys(user.answers).length,
      createdCount: user.questions.length,
      score: Object.keys(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => b.score - a.score);
}

/**
 * Format a date for display
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return 'Today';
  } else if (days === 1) {
    return 'Yesterday';
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}

/**
 * Calculate percentage for poll results
 */
export function calculatePercentage(votes: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((votes / total) * 100);
}

/**
 * Combine class names
 */
export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

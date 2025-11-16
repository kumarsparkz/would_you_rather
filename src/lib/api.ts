/**
 * API client for data operations
 * Provides a centralized interface for all data fetching and mutations
 */

import type { User, Question, CreateQuestionInput, SaveQuestionAnswerInput } from './types';

// Simulated delay for API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let users: Record<string, User> = {
  sarahedo: {
    id: 'sarahedo',
    name: 'Sarah Edo',
    avatarURL: 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    name: 'Tyler McGinnis',
    avatarURL: 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  johndoe: {
    id: 'johndoe',
    name: 'John Doe',
    avatarURL: 'https://tylermcginnis.com/would-you-rather/dan.jpg',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
};

let questions: Record<string, Question> = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['sarahedo'],
      text: 'have horrible short term memory',
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'johndoe',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'become a superhero',
    },
    optionTwo: {
      votes: ['johndoe', 'sarahedo'],
      text: 'become a supervillain'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'sarahedo',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'be telekinetic',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'be telepathic'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'tylermcginnis',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'be a front-end developer',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'be a back-end developer'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'tylermcginnis',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['tylermcginnis'],
      text: 'find $50 yourself',
    },
    optionTwo: {
      votes: ['johndoe'],
      text: 'have your best friend find $500'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'johndoe',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['johndoe'],
      text: 'write JavaScript',
    },
    optionTwo: {
      votes: ['tylermcginnis'],
      text: 'write Swift'
    }
  },
};

function generateUID(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const api = {
  /**
   * Get all users
   */
  async getUsers(): Promise<Record<string, User>> {
    await delay(800);
    return { ...users };
  },

  /**
   * Get a specific user by ID
   */
  async getUser(id: string): Promise<User | undefined> {
    await delay(500);
    return users[id];
  },

  /**
   * Get all questions
   */
  async getQuestions(): Promise<Record<string, Question>> {
    await delay(800);
    return { ...questions };
  },

  /**
   * Get a specific question by ID
   */
  async getQuestion(id: string): Promise<Question | undefined> {
    await delay(500);
    return questions[id];
  },

  /**
   * Create a new question
   */
  async saveQuestion(input: CreateQuestionInput): Promise<Question> {
    await delay(1000);

    const question: Question = {
      id: generateUID(),
      timestamp: Date.now(),
      author: input.author,
      optionOne: {
        votes: [],
        text: input.optionOneText,
      },
      optionTwo: {
        votes: [],
        text: input.optionTwoText,
      }
    };

    questions = {
      ...questions,
      [question.id]: question
    };

    users = {
      ...users,
      [input.author]: {
        ...users[input.author],
        questions: users[input.author].questions.concat([question.id])
      }
    };

    return question;
  },

  /**
   * Save user's answer to a question
   */
  async saveQuestionAnswer(input: SaveQuestionAnswerInput): Promise<void> {
    await delay(500);

    users = {
      ...users,
      [input.authedUser]: {
        ...users[input.authedUser],
        answers: {
          ...users[input.authedUser].answers,
          [input.qid]: input.answer
        }
      }
    };

    questions = {
      ...questions,
      [input.qid]: {
        ...questions[input.qid],
        [input.answer]: {
          ...questions[input.qid][input.answer],
          votes: questions[input.qid][input.answer].votes.concat([input.authedUser])
        }
      }
    };
  },
};

export type QuestionType = 'multiple-choice' | 'code-challenge'

export interface BaseQuestion {
  id: string
  type: QuestionType
  topic: string
  difficulty: 'beginner' | 'easy' | 'medium'
  question: string
  explanation: string
  points: number
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice'
  options: string[]
  correctAnswer: number
}

export interface CodeChallengeQuestion extends BaseQuestion {
  type: 'code-challenge'
  starterCode: string
  correctAnswer: string
}

export type Question = MultipleChoiceQuestion | CodeChallengeQuestion

export interface Test {
  id: string
  title: string
  description: string
  questions: Question[]
}

export interface UserAnswer {
  questionId: string
  answer: string | number
  isCorrect: boolean
  timestamp: number
}

export interface TestState {
  selectedTest: Test | null
  currentQuestionIndex: number
  answers: UserAnswer[]
  showFeedback: boolean
  currentFeedback: { isCorrect: boolean; explanation: string } | null
  isTestComplete: boolean
  score: number
}

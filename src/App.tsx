import { useReducer } from 'react'
import TestSelector from './components/TestSelector'
import QuestionCard from './components/QuestionCard'
import MultipleChoice from './components/MultipleChoice'
import CodeChallenge from './components/CodeChallenge'
import ProgressBar from './components/ProgressBar'
import FeedbackMessage from './components/FeedbackMessage'
import Navigation from './components/Navigation'
import ResultsScreen from './components/ResultsScreen'
import { pythonTests } from './data/pythonQuestions'
import type { TestState, Test, Question, UserAnswer } from './types'

type Action =
  | { type: 'SELECT_TEST'; payload: Test }
  | { type: 'SELECT_ANSWER'; payload: number }
  | { type: 'SUBMIT_CODE_ANSWER'; payload: string }
  | { type: 'SUBMIT_ANSWER' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'RESTART' }

const initialState: TestState = {
  selectedTest: null,
  currentQuestionIndex: 0,
  answers: [],
  showFeedback: false,
  currentFeedback: null,
  isTestComplete: false,
  score: 0
}

function reducer(state: TestState, action: Action): TestState {
  switch (action.type) {
    case 'SELECT_TEST':
      console.log('App state: Test selected', action.payload.id)
      return {
        ...initialState,
        selectedTest: action.payload
      }

    case 'SELECT_ANSWER': {
      if (!state.selectedTest || state.showFeedback) return state

      const currentQuestion = state.selectedTest.questions[state.currentQuestionIndex]
      if (currentQuestion.type !== 'multiple-choice') return state

      // Store selected answer temporarily
      return {
        ...state,
        answers: [
          ...state.answers.filter(a => a.questionId !== currentQuestion.id),
          {
            questionId: currentQuestion.id,
            answer: action.payload,
            isCorrect: action.payload === currentQuestion.correctAnswer,
            timestamp: Date.now()
          }
        ]
      }
    }

    case 'SUBMIT_CODE_ANSWER': {
      if (!state.selectedTest || state.showFeedback) return state

      const currentQuestion = state.selectedTest.questions[state.currentQuestionIndex]
      if (currentQuestion.type !== 'code-challenge') return state

      const isCorrect = action.payload.trim() === currentQuestion.correctAnswer.trim()
      const userAnswer: UserAnswer = {
        questionId: currentQuestion.id,
        answer: action.payload,
        isCorrect,
        timestamp: Date.now()
      }

      console.log('Answer submitted:', isCorrect ? 'Correct!' : 'Incorrect')

      const newScore = state.score + (isCorrect ? currentQuestion.points : 0)
      console.log('Score:', newScore, '/', state.selectedTest.questions.slice(0, state.currentQuestionIndex + 1).reduce((sum, q) => sum + q.points, 0))

      return {
        ...state,
        answers: [
          ...state.answers.filter(a => a.questionId !== currentQuestion.id),
          userAnswer
        ],
        showFeedback: true,
        currentFeedback: {
          isCorrect,
          explanation: currentQuestion.explanation
        },
        score: newScore
      }
    }

    case 'SUBMIT_ANSWER': {
      if (!state.selectedTest || state.showFeedback) return state

      const currentQuestion = state.selectedTest.questions[state.currentQuestionIndex]
      const existingAnswer = state.answers.find(a => a.questionId === currentQuestion.id)

      if (!existingAnswer) return state

      console.log('Answer submitted:', existingAnswer.isCorrect ? 'Correct!' : 'Incorrect')

      const newScore = state.score + (existingAnswer.isCorrect ? currentQuestion.points : 0)
      const totalPointsSoFar = state.selectedTest.questions
        .slice(0, state.currentQuestionIndex + 1)
        .reduce((sum, q) => sum + q.points, 0)

      console.log('Score:', newScore, '/', totalPointsSoFar)

      return {
        ...state,
        showFeedback: true,
        currentFeedback: {
          isCorrect: existingAnswer.isCorrect,
          explanation: currentQuestion.explanation
        },
        score: newScore
      }
    }

    case 'NEXT_QUESTION': {
      if (!state.selectedTest) return state

      const nextIndex = state.currentQuestionIndex + 1

      if (nextIndex >= state.selectedTest.questions.length) {
        const maxScore = state.selectedTest.questions.reduce((sum, q) => sum + q.points, 0)
        const percentage = Math.round((state.score / maxScore) * 100)
        console.log('Test completed! Final score:', state.score, '/', maxScore, `(${percentage}%)`)

        return {
          ...state,
          isTestComplete: true,
          showFeedback: false,
          currentFeedback: null
        }
      }

      console.log('Moving to question', nextIndex + 1, 'of', state.selectedTest.questions.length)

      return {
        ...state,
        currentQuestionIndex: nextIndex,
        showFeedback: false,
        currentFeedback: null
      }
    }

    case 'PREVIOUS_QUESTION': {
      if (!state.selectedTest || state.currentQuestionIndex === 0) return state

      console.log('Moving to question', state.currentQuestionIndex, 'of', state.selectedTest.questions.length)

      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex - 1,
        showFeedback: false,
        currentFeedback: null
      }
    }

    case 'RESTART':
      console.log('App reset: Returning to test selection')
      return initialState

    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  console.log('App rendered with state:', {
    hasTest: !!state.selectedTest,
    questionIndex: state.currentQuestionIndex,
    isComplete: state.isTestComplete
  })

  // Show results screen
  if (state.isTestComplete && state.selectedTest) {
    return (
      <ResultsScreen
        test={state.selectedTest}
        answers={state.answers}
        score={state.score}
        maxScore={state.selectedTest.questions.reduce((sum, q) => sum + q.points, 0)}
        onRestart={() => dispatch({ type: 'RESTART' })}
      />
    )
  }

  // Show test selector
  if (!state.selectedTest) {
    return (
      <TestSelector
        tests={pythonTests}
        onSelectTest={(test) => dispatch({ type: 'SELECT_TEST', payload: test })}
      />
    )
  }

  // Show test questions
  const currentQuestion = state.selectedTest.questions[state.currentQuestionIndex]
  const currentAnswer = state.answers.find(a => a.questionId === currentQuestion.id)
  const maxScore = state.selectedTest.questions
    .slice(0, state.currentQuestionIndex + 1)
    .reduce((sum, q) => sum + q.points, 0)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '28px',
            fontWeight: 'bold',
            margin: 0
          }}>
            {state.selectedTest.title}
          </h1>
        </div>

        <ProgressBar
          current={state.currentQuestionIndex + 1}
          total={state.selectedTest.questions.length}
          score={state.score}
          maxScore={maxScore}
        />

        <QuestionCard
          question={currentQuestion}
          questionNumber={state.currentQuestionIndex + 1}
          totalQuestions={state.selectedTest.questions.length}
        />

        {currentQuestion.type === 'multiple-choice' ? (
          <MultipleChoice
            question={currentQuestion}
            selectedAnswer={currentAnswer?.answer as number | null ?? null}
            onSelectAnswer={(index) => dispatch({ type: 'SELECT_ANSWER', payload: index })}
            disabled={state.showFeedback}
          />
        ) : (
          <CodeChallenge
            question={currentQuestion}
            onSubmitAnswer={(code) => dispatch({ type: 'SUBMIT_CODE_ANSWER', payload: code })}
            disabled={state.showFeedback}
          />
        )}

        {state.showFeedback && state.currentFeedback && (
          <FeedbackMessage
            isCorrect={state.currentFeedback.isCorrect}
            explanation={state.currentFeedback.explanation}
          />
        )}

        <div style={{ marginTop: '20px' }}>
          <Navigation
            onPrevious={() => dispatch({ type: 'PREVIOUS_QUESTION' })}
            onNext={() => dispatch({ type: 'NEXT_QUESTION' })}
            onSubmit={() => dispatch({ type: 'SUBMIT_ANSWER' })}
            showPrevious={state.currentQuestionIndex > 0 && !state.showFeedback}
            showNext={state.showFeedback}
            showSubmit={!state.showFeedback && currentQuestion.type === 'multiple-choice'}
            nextDisabled={false}
            submitDisabled={!currentAnswer}
          />
        </div>
      </div>
    </div>
  )
}

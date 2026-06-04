import type { Question } from '../types'

interface QuestionCardProps {
  question: Question
  questionNumber: number
  totalQuestions: number
}

export default function QuestionCard({ question, questionNumber, totalQuestions }: QuestionCardProps) {
  console.log('Showing question:', questionNumber, '/', totalQuestions, '-', question.topic)

  const difficultyColors = {
    beginner: '#48bb78',
    easy: '#4299e1',
    medium: '#ed8936'
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      marginBottom: '20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <span style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          Question {questionNumber} of {totalQuestions}
        </span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{
            background: difficultyColors[question.difficulty],
            color: 'white',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'capitalize'
          }}>
            {question.difficulty}
          </span>
          <span style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {question.topic}
          </span>
        </div>
      </div>

      <h2 style={{
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        lineHeight: '1.5'
      }}>
        {question.question}
      </h2>

      <div style={{
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '14px'
      }}>
        {question.points} points
      </div>
    </div>
  )
}

import type { Test, UserAnswer } from '../types'

interface ResultsScreenProps {
  test: Test
  answers: UserAnswer[]
  score: number
  maxScore: number
  onRestart: () => void
}

export default function ResultsScreen({ test, answers, score, maxScore, onRestart }: ResultsScreenProps) {
  const percentage = Math.round((score / maxScore) * 100)
  const correctCount = answers.filter(a => a.isCorrect).length
  const totalQuestions = test.questions.length

  console.log('Test completed! Final score:', score, '/', maxScore, `(${percentage}%)`)

  let gradeColor = '#f56565' // Red for < 60%
  let gradeText = 'Keep Practicing!'

  if (percentage >= 90) {
    gradeColor = '#48bb78' // Green for 90%+
    gradeText = 'Excellent!'
  } else if (percentage >= 70) {
    gradeColor = '#4299e1' // Blue for 70-89%
    gradeText = 'Good Job!'
  } else if (percentage >= 60) {
    gradeColor = '#ed8936' // Orange for 60-69%
    gradeText = 'Not Bad!'
  }

  const handleRestart = () => {
    console.log('Restarting - returning to test selection')
    onRestart()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        maxWidth: '700px',
        width: '100%'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          Test Complete!
        </h1>

        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: gradeColor,
            marginBottom: '10px'
          }}>
            {percentage}%
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '10px'
          }}>
            {gradeText}
          </div>
          <div style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            {correctCount} out of {totalQuestions} correct
          </div>
          <div style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.8)',
            marginTop: '8px'
          }}>
            Score: {score} / {maxScore} points
          </div>
        </div>

        <h2 style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          Question Results:
        </h2>

        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          marginBottom: '30px'
        }}>
          {test.questions.map((question, index) => {
            const answer = answers.find(a => a.questionId === question.id)
            const isCorrect = answer?.isCorrect ?? false

            return (
              <div
                key={question.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '12px',
                  borderLeft: `4px solid ${isCorrect ? '#48bb78' : '#f56565'}`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      Question {index + 1}
                    </span>
                    <div style={{
                      color: 'white',
                      fontSize: '14px',
                      marginTop: '4px',
                      lineHeight: '1.4'
                    }}>
                      {question.question}
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginLeft: '16px'
                  }}>
                    <span style={{
                      fontSize: '20px'
                    }}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <span style={{
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {question.points} pts
                    </span>
                  </div>
                </div>
                <div style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.4'
                }}>
                  {question.explanation}
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={handleRestart}
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '12px',
            padding: '16px',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
          }}
        >
          Take Another Test
        </button>
      </div>
    </div>
  )
}

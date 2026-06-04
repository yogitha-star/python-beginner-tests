interface FeedbackMessageProps {
  isCorrect: boolean
  explanation: string
}

export default function FeedbackMessage({ isCorrect, explanation }: FeedbackMessageProps) {
  console.log('Feedback shown:', isCorrect ? 'Correct!' : 'Incorrect')

  return (
    <div style={{
      background: isCorrect
        ? 'rgba(72, 187, 120, 0.2)'
        : 'rgba(245, 101, 101, 0.2)',
      border: `2px solid ${isCorrect ? '#48bb78' : '#f56565'}`,
      borderRadius: '12px',
      padding: '20px',
      marginTop: '20px',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <span style={{
          fontSize: '24px',
          marginRight: '10px'
        }}>
          {isCorrect ? '✓' : '✗'}
        </span>
        <h3 style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          margin: 0
        }}>
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </h3>
      </div>
      <p style={{
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '15px',
        margin: 0,
        lineHeight: '1.6'
      }}>
        {explanation}
      </p>
    </div>
  )
}

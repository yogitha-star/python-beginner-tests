interface ProgressBarProps {
  current: number
  total: number
  score: number
  maxScore: number
}

export default function ProgressBar({ current, total, score, maxScore }: ProgressBarProps) {
  const progress = (current / total) * 100
  const scorePercentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      marginBottom: '20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <span style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Progress: {current} / {total}
        </span>
        <span style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Score: {score} / {maxScore} ({scorePercentage}%)
        </span>
      </div>

      <div style={{
        width: '100%',
        height: '12px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '6px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #48bb78 0%, #38a169 100%)',
          transition: 'width 0.3s ease',
          borderRadius: '6px'
        }} />
      </div>
    </div>
  )
}

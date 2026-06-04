interface NavigationProps {
  onPrevious?: () => void
  onNext?: () => void
  onSubmit?: () => void
  showPrevious: boolean
  showNext: boolean
  showSubmit: boolean
  nextDisabled?: boolean
  submitDisabled?: boolean
}

export default function Navigation({
  onPrevious,
  onNext,
  onSubmit,
  showPrevious,
  showNext,
  showSubmit,
  nextDisabled = false,
  submitDisabled = false
}: NavigationProps) {
  const handlePrevious = () => {
    if (onPrevious) {
      console.log('Navigation: Previous clicked')
      onPrevious()
    }
  }

  const handleNext = () => {
    if (onNext) {
      console.log('Navigation: Next clicked')
      onNext()
    }
  }

  const handleSubmit = () => {
    if (onSubmit) {
      console.log('Navigation: Submit clicked')
      onSubmit()
    }
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px'
    }}>
      {showPrevious ? (
        <button
          onClick={handlePrevious}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit',
            flex: 1
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
          }}
        >
          ← Previous
        </button>
      ) : (
        <div style={{ flex: 1 }} />
      )}

      {showNext && (
        <button
          onClick={handleNext}
          disabled={nextDisabled}
          style={{
            background: nextDisabled
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: nextDisabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit',
            flex: 1,
            opacity: nextDisabled ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (!nextDisabled) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
            }
          }}
          onMouseLeave={(e) => {
            if (!nextDisabled) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            }
          }}
        >
          Next →
        </button>
      )}

      {showSubmit && (
        <button
          onClick={handleSubmit}
          disabled={submitDisabled}
          style={{
            background: submitDisabled
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(72, 187, 120, 0.5)',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: submitDisabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit',
            flex: 1,
            opacity: submitDisabled ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (!submitDisabled) {
              e.currentTarget.style.background = 'rgba(72, 187, 120, 0.7)'
            }
          }}
          onMouseLeave={(e) => {
            if (!submitDisabled) {
              e.currentTarget.style.background = 'rgba(72, 187, 120, 0.5)'
            }
          }}
        >
          Submit Answer
        </button>
      )}
    </div>
  )
}

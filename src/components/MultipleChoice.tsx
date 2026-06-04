import type { MultipleChoiceQuestion } from '../types'

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion
  selectedAnswer: number | null
  onSelectAnswer: (answerIndex: number) => void
  disabled: boolean
}

export default function MultipleChoice({ question, selectedAnswer, onSelectAnswer, disabled }: MultipleChoiceProps) {
  const handleSelect = (index: number) => {
    if (!disabled) {
      console.log('Multiple choice option selected:', index, '-', question.options[index])
      onSelectAnswer(index)
    }
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={disabled}
              style={{
                background: isSelected
                  ? 'rgba(255, 255, 255, 0.3)'
                  : 'rgba(255, 255, 255, 0.1)',
                border: isSelected
                  ? '2px solid rgba(255, 255, 255, 0.6)'
                  : '2px solid transparent',
                borderRadius: '12px',
                padding: '16px 20px',
                color: 'white',
                fontSize: '16px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                fontFamily: 'inherit',
                opacity: disabled ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!disabled && !isSelected) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onMouseLeave={(e) => {
                if (!disabled && !isSelected) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <span style={{ fontWeight: 'bold', marginRight: '12px' }}>
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

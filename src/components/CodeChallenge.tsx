import { useState } from 'react'
import type { CodeChallengeQuestion } from '../types'

interface CodeChallengeProps {
  question: CodeChallengeQuestion
  onSubmitAnswer: (answer: string) => void
  disabled: boolean
}

export default function CodeChallenge({ question, onSubmitAnswer, disabled }: CodeChallengeProps) {
  const [code, setCode] = useState(question.starterCode)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!disabled) {
      setCode(e.target.value)
      console.log('Code input changed')
    }
  }

  const handleSubmit = () => {
    if (!disabled && code.trim()) {
      console.log('Code challenge submitted:', code.trim())
      onSubmitAnswer(code.trim())
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
      <label style={{
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '14px',
        fontWeight: 'bold',
        display: 'block',
        marginBottom: '10px'
      }}>
        Your Python Code:
      </label>

      <textarea
        value={code}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Write your Python code here..."
        style={{
          width: '100%',
          minHeight: '150px',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '16px',
          color: 'white',
          fontSize: '14px',
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
          resize: 'vertical',
          marginBottom: '16px',
          opacity: disabled ? 0.7 : 1,
          cursor: disabled ? 'not-allowed' : 'text'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={disabled || !code.trim()}
        style={{
          background: disabled || !code.trim()
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(255, 255, 255, 0.3)',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: disabled || !code.trim() ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          fontFamily: 'inherit',
          opacity: disabled || !code.trim() ? 0.5 : 1
        }}
        onMouseEnter={(e) => {
          if (!disabled && code.trim()) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && code.trim()) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
          }
        }}
      >
        Check Answer
      </button>
    </div>
  )
}

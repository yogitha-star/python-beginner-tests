import type { Test } from '../types'

interface TestSelectorProps {
  tests: Test[]
  onSelectTest: (test: Test) => void
}

export default function TestSelector({ tests, onSelectTest }: TestSelectorProps) {
  console.log('TestSelector rendered with', tests.length, 'available tests')

  const handleSelect = (test: Test) => {
    console.log('Test selected:', test.id, '-', test.title)
    onSelectTest(test)
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
        maxWidth: '600px',
        width: '100%'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          Python Beginner Tests
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '16px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          Select a test to begin your Python learning journey
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {tests.map((test) => (
            <div
              key={test.id}
              onClick={() => handleSelect(test)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'transparent'
              }}
            >
              <h2 style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                {test.title}
              </h2>
              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '14px',
                marginBottom: '12px'
              }}>
                {test.description}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px'
                }}>
                  {test.questions.length} questions
                </span>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px'
                }}>
                  {test.questions.reduce((sum, q) => sum + q.points, 0)} points total
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

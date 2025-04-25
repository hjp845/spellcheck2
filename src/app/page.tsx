'use client'

import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    if (!text.trim()) return

    setLoading(true)
    setResult('')

    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      const data = await res.json()
      setResult(data.result)
    } catch (err) {
      setResult('오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1>📝 한국어 맞춤법 검사기</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginTop: '1rem' }}
        placeholder="검사할 문장을 입력하세요..."
      />
      <button
        onClick={handleCheck}
        disabled={loading}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {loading ? '검사 중...' : '맞춤법 검사'}
      </button>

      {result && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <h2>✅ 교정 결과</h2>
          <p>{result}</p>
        </div>
      )}
    </main>
  )
}

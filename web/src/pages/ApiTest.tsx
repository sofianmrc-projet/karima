import React, { useState, useEffect } from 'react'
import { api } from '../lib/api'

const ApiTest = () => {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testApi = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('Testing API...')
      const sections = await api.getSections()
      console.log('API Response:', sections)
      setResult(sections)
    } catch (err) {
      console.error('API Error:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const testSectionsByCategory = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('Testing API with category...')
      const sections = await api.getSectionsByCategory('À propos')
      console.log('API Response (À propos):', sections)
      setResult(sections)
    } catch (err) {
      console.error('API Error:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Test de l'API</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={testApi}
          disabled={loading}
          style={{ 
            padding: '0.5rem 1rem', 
            marginRight: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Test en cours...' : 'Tester API (toutes sections)'}
        </button>
        
        <button 
          onClick={testSectionsByCategory}
          disabled={loading}
          style={{ 
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Test en cours...' : 'Tester API (À propos)'}
        </button>
      </div>

      {error && (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <strong>Erreur:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{ 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <strong>Résultat:</strong>
          <pre style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default ApiTest

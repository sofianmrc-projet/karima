import { useState } from 'react'
import { authService, User, LoginRequest } from '../lib/auth'

interface LoginFormProps {
  onLogin: (user: User) => void
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authService.login(formData)
      onLogin(response.user)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="card" style={{ padding: 'var(--space-2xl)' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <label htmlFor="email" style={{ 
            display: 'block', 
            marginBottom: 'var(--space-sm)',
            fontWeight: '500'
          }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: 'var(--space-md)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius)',
              fontSize: '1rem'
            }}
            placeholder="admin@karima.com"
          />
        </div>

        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <label htmlFor="password" style={{ 
            display: 'block', 
            marginBottom: 'var(--space-sm)',
            fontWeight: '500'
          }}>
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: 'var(--space-md)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius)',
              fontSize: '1rem'
            }}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div style={{
            padding: 'var(--space-md)',
            backgroundColor: 'var(--danger-light)',
            color: 'var(--danger)',
            borderRadius: 'var(--radius)',
            marginBottom: 'var(--space-lg)',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <div style={{
        marginTop: 'var(--space-xl)',
        padding: 'var(--space-lg)',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius)',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)'
      }}>
        <strong>Compte de démonstration :</strong><br />
        Email: admin@karima.com<br />
        Mot de passe:  adminkarima81
      </div>
    </div>
  )
}

export default LoginForm

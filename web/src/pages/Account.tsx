import { useState, useEffect } from 'react'
import { authService, User } from '../lib/auth'
import LoginForm from '../components/LoginForm'
import DashboardAdmin from '../components/DashboardAdmin'

const Account = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const currentUser = await authService.getCurrentUser()
          setUser(currentUser)
        } catch (error) {
          console.error('Erreur lors de la vérification de l\'authentification:', error)
          // En cas d'erreur, déconnecter l'utilisateur
          await authService.logout()
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogin = (user: User) => {
    setUser(user)
  }

  const handleLogout = async () => {
    await authService.logout()
    setUser(null)
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid var(--primary-light)',
            borderTop: '4px solid var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto var(--space-lg)'
          }}></div>
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="section">
        <div className="container">
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
              <h1>Mon Compte</h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Connectez-vous pour accéder à l'espace d'administration
              </p>
            </div>
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>Mon Compte</h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Bienvenue, {user.firstName} {user.lastName}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-outline"
              style={{ marginLeft: 'var(--space-lg)' }}
            >
              Se déconnecter
            </button>
          </div>
        </div>
        
        {user.isAdmin ? (
          <DashboardAdmin />
        ) : (
          <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
            <h2>Accès restreint</h2>
            <p>Vous n'avez pas les permissions nécessaires pour accéder à cette section.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Account

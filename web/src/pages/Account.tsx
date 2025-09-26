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
      <div>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%)',
          color: 'black',
          padding: 'var(--space-3xl) 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}>
          {/* Overlay pour contrôler l'opacité de l'image de fond */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(247, 247, 245, 0.7)',
            zIndex: 1,
            pointerEvents: 'none'
          }}></div>
          
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ 
              fontSize: '3rem', 
              marginBottom: 'var(--space-lg)',
              fontWeight: '700'
            }}>
              Mon Compte
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              marginBottom: 'var(--space-2xl)',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto var(--space-2xl)'
            }}>
              Connectez-vous pour accéder à l'espace d'administration
            </p>
          </div>
        </section>

        <div className="section">
          <div className="container">
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <LoginForm onLogin={handleLogin} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%)',
        color: 'black',
        padding: 'var(--space-3xl) 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Overlay pour contrôler l'opacité de l'image de fond */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(247, 247, 245, 0.7)',
          zIndex: 1,
          pointerEvents: 'none'
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ 
                fontSize: '3rem', 
                marginBottom: 'var(--space-sm)',
                fontWeight: '700'
              }}>
                Mon Compte
              </h1>
              <p style={{ 
                fontSize: '1.25rem', 
                opacity: 0.9
              }}>
                Bienvenue, {user.firstName} {user.lastName}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-outline"
              style={{ 
                marginLeft: 'var(--space-lg)',
                borderColor: 'black',
                color: 'black'
              }}
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </section>

      <div className="section">
        <div className="container">
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
    </div>
  )
}

export default Account

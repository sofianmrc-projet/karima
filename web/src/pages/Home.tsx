import { Link } from 'react-router-dom'
import { ArrowRight, Users, Award, Clock } from 'lucide-react'
import { useSections } from '../hooks/useSections'

const Home = () => {
  const { sections, loading, error } = useSections('Cabinet')

  // Fonction pour récupérer une section par sa clé
  const getSectionContent = (key: string) => {
    const section = sections.find(s => s.key === key)
    return section?.content || ''
  }

  // Fonction pour récupérer le titre d'une section par sa clé
  const getSectionTitle = (key: string) => {
    const section = sections.find(s => s.key === key)
    return section?.title || ''
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
        <p>Chargement du contenu...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
        <p style={{ color: 'var(--danger)' }}>Erreur lors du chargement: {error}</p>
      </div>
    )
  }

  return (
    <div>
      {/* Affichage normal de la page d'accueil */}
      {sections.length > 0 ? (
        <div>
          {/* Hero Section */}
          <section className="hero-section" style={{
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
                fontSize: '3.5rem', 
                marginBottom: 'var(--space-xl)',
                fontWeight: '700',
                letterSpacing: '-0.05em',
                lineHeight: '1.1'
              }}>
                {sections[0]?.title || 'Cabinet Karima'}
              </h1>
              <p style={{ 
                fontSize: '1.375rem', 
                marginBottom: 'var(--space-2xl)',
                opacity: 0.95,
                maxWidth: '700px',
                margin: '0 auto var(--space-2xl)',
                lineHeight: '1.6',
                fontWeight: '400'
              }}>
                {sections[0]?.content || 'Consultante en droit social et accompagnement RH'}
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-xl)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/services" className="btn btn-accent" style={{ 
                  textDecoration: 'none',
                  fontSize: '1.125rem',
                  padding: 'var(--space-lg) var(--space-2xl)'
                }}>
                  Découvrir nos domaines d'intervention
                  <ArrowRight size={18} style={{ marginLeft: 'var(--space-sm)' }} />
                </Link>
            <Link to="/contact" className="btn btn-outline" style={{
              textDecoration: 'none',
              borderColor: 'black',
              color: 'black',
                  fontSize: '1.125rem',
                  padding: 'var(--space-lg) var(--space-2xl)'
                }}>
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
          </section>

          {/* Toutes les autres sections */}
          {sections.slice(1).map((section, index) => (
            <section key={section.id} className="section" style={{ 
              backgroundColor: index % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-primary)' 
            }}>
              <div className="container">
                <div className="text-center">
                  <h2 style={{ marginBottom: 'var(--space-lg)' }}>
                    {section.title}
                  </h2>
                  <p style={{ 
                    fontSize: '1.125rem', 
                    color: 'var(--text-secondary)',
                    maxWidth: '800px',
                    margin: '0 auto'
                  }}>
                    {section.content}
                  </p>
                  {section.description && (
                    <p style={{ 
                      fontSize: '1rem', 
                      color: 'var(--text-primary)',
                      marginTop: 'var(--space-md)',
                      fontStyle: 'italic'
                    }}>
                      {section.description}
                    </p>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
          <h2>Page d'accueil</h2>
          <p>Contenu par défaut - Aucune section trouvée dans la base de données</p>
        </div>
      )}
    </div>
  )
}

export default Home


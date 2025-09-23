import { Link } from 'react-router-dom'
import { ArrowRight, Users, Award, Clock } from 'lucide-react'
import { useSections } from '../hooks/useSections'

const Home = () => {
  const { sections, loading, error } = useSections('Accueil')

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
          <section style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
            color: 'white',
            padding: 'var(--space-3xl) 0',
            textAlign: 'center'
          }}>
            <div className="container">
              <h1 style={{ 
                fontSize: '3rem', 
                marginBottom: 'var(--space-lg)',
                fontWeight: '700'
              }}>
                {sections[0]?.title || 'Bienvenue chez Karima'}
              </h1>
              <p style={{ 
                fontSize: '1.25rem', 
                marginBottom: 'var(--space-2xl)',
                opacity: 0.9,
                maxWidth: '600px',
                margin: '0 auto var(--space-2xl)'
              }}>
                {sections[0]?.content || 'Votre partenaire de confiance pour des solutions innovantes'}
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-lg)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/services" className="btn btn-accent" style={{ textDecoration: 'none' }}>
                  Découvrir nos services
                  <ArrowRight size={16} style={{ marginLeft: 'var(--space-sm)' }} />
                </Link>
                <Link to="/contact" className="btn btn-outline" style={{ 
                  textDecoration: 'none',
                  borderColor: 'white',
                  color: 'white'
                }}>
                  Nous contacter
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


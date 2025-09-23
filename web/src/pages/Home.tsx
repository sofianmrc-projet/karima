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
            {getSectionTitle('hero') || 'Bienvenue chez Karima'}
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: 'var(--space-2xl)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto var(--space-2xl)'
          }}>
            {getSectionContent('hero') || 'Votre partenaire de confiance pour des solutions innovantes'}
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

      {/* Stats Section - Dynamique depuis la base de données */}
      {sections.filter(s => s.key.includes('stat')).length > 0 && (
        <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-xl)',
              textAlign: 'center'
            }}>
              {sections.filter(s => s.key.includes('stat')).map((section, index) => (
                <div key={index}>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    color: 'var(--primary)',
                    marginBottom: 'var(--space-sm)'
                  }}>
                    {section.title}
                  </div>
                  <div style={{
                    color: 'var(--text-secondary)',
                    fontWeight: '500'
                  }}>
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section - Dynamique depuis la base de données */}
      {sections.filter(s => s.key.includes('service')).length > 0 && (
        <section className="section">
          <div className="container">
            <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
              <h2>Nos services</h2>
              <p style={{ 
                fontSize: '1.125rem', 
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Des solutions complètes pour répondre à tous vos besoins professionnels
              </p>
            </div>
            <div className="grid grid-3">
              {sections.filter(s => s.key.includes('service')).slice(0, 3).map((section, index) => (
                <div key={index} className="card">
                  <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
                    <Users size={48} style={{ color: 'var(--primary)', marginBottom: 'var(--space-lg)' }} />
                    <h3>{section.title}</h3>
                    <p>{section.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
              <Link to="/services" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                Voir tous nos services
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* Section À propos dynamique */}
      {sections.filter(s => s.key.includes('about')).length > 0 && (
        <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="container">
            <div className="text-center">
              <h2>À propos de nous</h2>
              <p style={{ 
                fontSize: '1.125rem', 
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Découvrez notre histoire et notre mission.
              </p>
            </div>
          </div>
        </section>
      )}

    </div>
  )
}

export default Home


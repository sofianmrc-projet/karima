import { useSections } from '../hooks/useSections'

const About = () => {
  const { sections, loading, error } = useSections('À propos')

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
        <h1>À propos de Karima</h1>
        <p style={{ color: 'var(--danger)', marginBottom: 'var(--space-lg)' }}>
          Erreur lors du chargement: {error}
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
          Le contenu de cette page sera bientôt disponible. 
          <br />
          Veuillez revenir plus tard ou contacter l'administrateur.
        </p>
      </div>
    )
  }

  // Si aucune section n'est trouvée, afficher un message
  if (sections.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
        <h1>À propos de Karima</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
          Le contenu de cette page sera bientôt disponible. 
          <br />
          Veuillez revenir plus tard ou contacter l'administrateur.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Affichage de toutes les sections de la catégorie À propos */}
      {sections.length > 0 ? (
        <div>
          {/* Hero Section - Première section */}
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
                {sections[0]?.title || 'À propos de Karima'}
              </h1>
              <p style={{ 
                fontSize: '1.25rem', 
                marginBottom: 'var(--space-2xl)',
                opacity: 0.9,
                maxWidth: '600px',
                margin: '0 auto var(--space-2xl)'
              }}>
                {sections[0]?.content || 'Découvrez notre histoire, nos valeurs et notre mission.'}
              </p>
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
          <h2>À propos de Karima</h2>
          <p>Contenu par défaut - Aucune section trouvée dans la base de données</p>
        </div>
      )}
    </div>
  )
}

export default About


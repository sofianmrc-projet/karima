import { useSections } from '../hooks/useSections'

const Blog = () => {
  const { sections, loading, error } = useSections('Blog')

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
      {/* Affichage de toutes les sections de la catégorie Blog */}
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
                {sections[0]?.title || 'Blog & Actualités'}
              </h1>
              <p style={{ 
                fontSize: '1.25rem', 
                marginBottom: 'var(--space-2xl)',
                opacity: 0.9,
                maxWidth: '600px',
                margin: '0 auto var(--space-2xl)'
              }}>
                {sections[0]?.content || 'Découvrez nos derniers articles, conseils et réflexions.'}
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
          <h2>Blog & Actualités</h2>
          <p>Contenu par défaut - Aucune section trouvée dans la base de données</p>
        </div>
      )}
    </div>
  )
}

export default Blog


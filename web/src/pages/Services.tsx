import MediaGallery from '../components/MediaGallery'
import { useSections } from '../hooks/useSections'

const Services = () => {
  const { sections, loading, error } = useSections('Services')


  if (loading) {
    return (
      <div className="container section text-center">
        <p>Chargement du contenu...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container section text-center">
        <p className="text-error">{error}</p>
      </div>
    )
  }

  return (
    <div>
      {/* Affichage de toutes les sections de la catégorie Services */}
      {sections.length > 0 ? (
        <div>
          {/* Hero Section - Première section */}
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
                {sections[0]?.title || 'Nos Services'}
              </h1>
              <p style={{ 
                fontSize: '1.25rem', 
                marginBottom: 'var(--space-2xl)',
                opacity: 0.9,
                maxWidth: '600px',
                margin: '0 auto var(--space-2xl)'
              }}>
                {sections[0]?.content || 'Des solutions complètes et personnalisées pour répondre à tous vos besoins professionnels.'}
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

          {/* Galerie d'images des services */}
          <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container">
              <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                Nos réalisations en images
              </h3>
              <MediaGallery 
                category="services" 
                columns={4} 
                showDescription={true} 
              />
            </div>
          </section>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
          <h2>Nos Services</h2>
          <p>Contenu par défaut - Aucune section trouvée dans la base de données</p>
        </div>
      )}
    </div>
  )
}

export default Services


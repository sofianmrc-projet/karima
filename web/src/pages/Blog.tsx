import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { useSections } from '../hooks/useSections'

const Blog = () => {
  const { sections, loading, error } = useSections('Blog')

  // Fonction pour récupérer une section par sa clé
  const getSectionContent = (key: string) => {
    const section = sections.find(s => s.key === key)
    return section?.content || ''
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
            {getSectionContent('blog_hero') || 'Blog & Actualités'}
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: 'var(--space-2xl)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto var(--space-2xl)'
          }}>
            {getSectionContent('blog_hero_description') || 'Découvrez nos derniers articles, conseils et réflexions sur l\'excellence organisationnelle et le développement professionnel.'}
          </p>
        </div>
      </section>

      {/* Content from database */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2>{getSectionContent('blog_content_title') || 'Articles récents'}</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {getSectionContent('blog_content_description') || 'Explorez notre collection d\'articles pour approfondir vos connaissances et découvrir les meilleures pratiques.'}
            </p>
          </div>
          
          {/* Display content from database sections */}
          {sections.length > 0 ? (
            <div className="grid grid-3">
              {sections.map((section, index) => (
                <div key={index} className="card" style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ 
                      fontSize: '1.25rem',
                      marginBottom: 'var(--space-md)',
                      color: 'var(--primary)',
                      lineHeight: 1.3
                    }}>
                      {section.title}
                    </h3>
                    <div style={{ 
                      color: 'var(--text-secondary)',
                      marginBottom: 'var(--space-lg)',
                      lineHeight: 1.5,
                      flex: 1
                    }}>
                      {section.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center" style={{ padding: 'var(--space-3xl)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                Aucun article disponible pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section">
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-3xl)',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{ color: 'white', marginBottom: 'var(--space-lg)' }}>
              {getSectionContent('newsletter_title') || 'Restez informé'}
            </h2>
            <p style={{ 
              opacity: 0.9, 
              marginBottom: 'var(--space-xl)',
              fontSize: '1.125rem',
              maxWidth: '600px',
              margin: '0 auto var(--space-xl)'
            }}>
              {getSectionContent('newsletter_description') || 'Abonnez-vous à notre newsletter pour recevoir nos derniers articles et conseils directement dans votre boîte mail.'}
            </p>
            <div style={{ 
              display: 'flex', 
              gap: 'var(--space-md)', 
              justifyContent: 'center',
              flexWrap: 'wrap',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <input
                type="email"
                placeholder="Votre adresse email"
                className="form-input"
                style={{ flex: 1, minWidth: '250px' }}
              />
              <button className="btn btn-accent">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog


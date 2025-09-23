import { Users, Target, Award, Heart, CheckCircle, Quote } from 'lucide-react'
import { useSections } from '../hooks/useSections'

const About = () => {
  const { sections, loading, error } = useSections('À propos')

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

  // Données statiques supprimées - tout provient maintenant de la base de données

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
            {getSectionContent('about_hero') || 'À propos de Karima'}
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: 'var(--space-2xl)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto var(--space-2xl)'
          }}>
            {getSectionContent('about_hero_description') || 'Depuis plus de 10 ans, nous accompagnons les organisations dans leur transformation'} 
            et leur développement avec passion et expertise.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: 'var(--space-lg)' }}>
                {getSectionContent('about_story_title') || 'Notre histoire'}
              </h2>
              <p style={{ 
                fontSize: '1.125rem', 
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-lg)',
                lineHeight: 1.6
              }}>
                {getSectionContent('about_story_1') || 'Fondée en 2013, Karima est née de la volonté de créer un cabinet de conseil différent, centré sur l\'humain et l\'innovation. Notre équipe d\'experts passionnés s\'engage à fournir des solutions sur mesure qui transforment réellement les organisations.'}
              </p>
              <p style={{ 
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-lg)',
                lineHeight: 1.6
              }}>
                {getSectionContent('about_story_2') || 'Nous croyons que chaque organisation a un potentiel unique à révéler. Notre mission est de vous accompagner dans cette révélation en combinant expertise technique, approche humaine et innovation constante.'}
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
                {sections.filter(s => s.key.includes('achievement')).map((section, index) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: 'var(--primary)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      {section.title}
                    </div>
                    <div style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem'
                    }}>
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-2xl)',
              color: 'white',
              textAlign: 'center'
            }}>
              <Quote size={48} style={{ 
                opacity: 0.7, 
                marginBottom: 'var(--space-lg)',
                margin: '0 auto var(--space-lg)'
              }} />
              <blockquote style={{
                fontSize: '1.125rem',
                fontStyle: 'italic',
                marginBottom: 'var(--space-lg)',
                lineHeight: 1.6
              }}>
                "Notre succès se mesure à celui de nos clients. 
                Chaque projet est une opportunité de créer de la valeur 
                et d'impacter positivement les organisations."
              </blockquote>
              <div style={{ 
                fontWeight: '600',
                opacity: 0.9
              }}>
                — Équipe Karima
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2>{getSectionContent('about_values_title') || 'Nos valeurs'}</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {getSectionContent('about_values_description') || 'Ces valeurs fondamentales guident chacune de nos actions et définissent notre approche du conseil.'}
            </p>
          </div>
          <div className="grid grid-2">
            {sections.filter(s => s.key.includes('value')).map((section, index) => (
              <div key={index} className="card" style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                gap: 'var(--space-lg)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60px',
                  height: '60px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  flexShrink: 0
                }}>
                  <Target size={24} />
                </div>
                <div>
                  <h3 style={{ 
                    marginBottom: 'var(--space-md)',
                    color: 'var(--primary)'
                  }}>
                    {section.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2>{getSectionContent('about_team_title') || 'Notre équipe'}</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {getSectionContent('about_team_description') || 'Des experts passionnés et expérimentés, unis par la volonté de vous accompagner vers l\'excellence.'}
            </p>
          </div>
          <div className="grid grid-3">
            {sections.filter(s => s.key.includes('team')).map((section, index) => (
              <div key={index} className="card" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: '700',
                  margin: '0 auto var(--space-lg)',
                  border: '4px solid var(--primary)'
                }}>
                  {section.title.charAt(0)}
                </div>
                <h3 style={{ 
                  marginBottom: 'var(--space-sm)',
                  color: 'var(--primary)'
                }}>
                  {section.title}
                </h3>
                <div style={{
                  color: 'var(--accent)',
                  fontWeight: '600',
                  marginBottom: 'var(--space-md)'
                }}>
                  {getSectionContent('team_role_' + (index + 1)) || 'Membre de l\'équipe'}
                </div>
                <p style={{ 
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.5
                }}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center">
              <h2 style={{ marginBottom: 'var(--space-lg)' }}>
                {getSectionContent('about_mission_title') || 'Notre mission'}
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)',
              maxWidth: '800px',
              margin: '0 auto var(--space-xl)',
              lineHeight: 1.6
            }}>
              Transformer les organisations en révélant leur potentiel unique, 
              en optimisant leurs processus et en développant les compétences 
              de leurs équipes pour créer une valeur durable.
            </p>
            <div style={{
              display: 'flex',
              gap: 'var(--space-lg)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: 'var(--space-2xl)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <CheckCircle size={20} style={{ color: 'var(--success)' }} />
                <span>Expertise reconnue</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <CheckCircle size={20} style={{ color: 'var(--success)' }} />
                <span>Approche personnalisée</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <CheckCircle size={20} style={{ color: 'var(--success)' }} />
                <span>Résultats mesurables</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About


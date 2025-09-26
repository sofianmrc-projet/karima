import { Link } from 'react-router-dom'
import { ArrowRight, Users, Award, Clock, Scale, Shield, CheckCircle, Target, Briefcase, Heart, Star, TrendingUp, FileText, Lightbulb, Users2, Building, Globe, Gavel } from 'lucide-react'
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

          {/* Section Domaines d'intervention */}
          <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container">
              <div className="text-center">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 'var(--space-md)',
                  marginBottom: 'var(--space-lg)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: '#2D3748',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    <Scale size={28} />
                  </div>
                  <h2 style={{ 
                    margin: 0,
                    color: '#2D3748',
                    fontSize: '2rem'
                  }}>
                    Domaines d'intervention
                  </h2>
                </div>
                
                <div className="grid grid-3" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                  {[
                    { icon: Shield, title: 'Droit du travail', desc: 'Conformité réglementaire et gestion des contrats' },
                    { icon: Users, title: 'Relations sociales', desc: 'Négociation collective et médiation' },
                    { icon: FileText, title: 'Audit social', desc: 'Analyse et amélioration des pratiques RH' },
                    { icon: Award, title: 'Formation RH', desc: 'Développement des compétences managériales' },
                    { icon: Briefcase, title: 'Accompagnement', desc: 'Suivi personnalisé des dirigeants' },
                    { icon: CheckCircle, title: 'Conformité', desc: 'Mise en conformité réglementaire' }
                  ].map((domain, index) => {
                    const IconComponent = domain.icon
                    return (
                      <div key={index} className="card" style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '48px',
                          height: '48px',
                          borderRadius: 'var(--radius-lg)',
                          backgroundColor: '#2D3748',
                          color: 'white',
                          margin: '0 auto var(--space-md)'
                        }}>
                          <IconComponent size={24} />
                        </div>
                        <h3 style={{ color: '#2D3748', marginBottom: 'var(--space-md)', fontSize: '1.1rem' }}>{domain.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>{domain.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Section Pourquoi nous choisir */}
          <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="container">
              <div className="text-center">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 'var(--space-md)',
                  marginBottom: 'var(--space-lg)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: '#2D3748',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    <Star size={28} />
                  </div>
                  <h2 style={{ 
                    margin: 0,
                    color: '#2D3748',
                    fontSize: '2rem'
                  }}>
                    Pourquoi nous choisir ?
                  </h2>
                </div>
                
                <div className="grid grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
                  {[
                    { icon: Award, title: 'Expertise reconnue', desc: 'Plus de 15 ans d\'expérience en droit social et accompagnement RH' },
                    { icon: Heart, title: 'Approche bienveillante', desc: 'Une méthode humaine qui respecte les personnes et les enjeux' },
                    { icon: Target, title: 'Solutions sur mesure', desc: 'Des interventions adaptées aux spécificités de votre entreprise' },
                    { icon: Clock, title: 'Réactivité', desc: 'Réponse rapide et accompagnement dans les délais convenus' }
                  ].map((advantage, index) => {
                    const IconComponent = advantage.icon
                    return (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--space-lg)',
                        padding: 'var(--space-lg)',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--space-md)',
                        textAlign: 'left'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '48px',
                          height: '48px',
                          borderRadius: 'var(--radius-lg)',
                          backgroundColor: '#2D3748',
                          color: 'white',
                          flexShrink: 0
                        }}>
                          <IconComponent size={24} />
                        </div>
                        <div>
                          <h3 style={{ color: '#2D3748', marginBottom: 'var(--space-xs)', fontSize: '1.1rem' }}>{advantage.title}</h3>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>{advantage.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Sections dynamiques de la base de données */}
          {sections.length > 1 && (
            <div>
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
          )}

          {/* Section CTA */}
          <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container">
              <div className="text-center">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 'var(--space-md)',
                  marginBottom: 'var(--space-lg)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: '#2D3748',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    <Lightbulb size={28} />
                  </div>
                  <h2 style={{ 
                    margin: 0,
                    color: '#2D3748',
                    fontSize: '2rem'
                  }}>
                    Prêt à transformer votre gestion sociale ?
                  </h2>
                </div>
                
                <p style={{ 
                  fontSize: '1.125rem', 
                  color: 'var(--text-secondary)',
                  maxWidth: '600px',
                  margin: '0 auto var(--space-xl)',
                  lineHeight: 1.6
                }}>
                  Contactez-nous dès aujourd'hui pour une consultation personnalisée et découvrez comment nous pouvons vous accompagner.
                </p>
                
                <div style={{ display: 'flex', gap: 'var(--space-lg)', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link 
                    to="/contact" 
                    className="btn btn-primary"
                    style={{
                      backgroundColor: '#2D3748',
                      color: 'white',
                      border: 'none',
                      fontSize: '1.125rem',
                      padding: 'var(--space-lg) var(--space-2xl)',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1A202C'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2D3748'
                    }}
                  >
                    Prendre Contact
                  </Link>
                  <Link 
                    to="/services" 
                    className="btn btn-outline"
                    style={{
                      backgroundColor: 'transparent',
                      color: '#2D3748',
                      border: '2px solid #2D3748',
                      fontSize: '1.125rem',
                      padding: 'var(--space-lg) var(--space-2xl)',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#2D3748'
                      e.currentTarget.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#2D3748'
                    }}
                  >
                    Nos Services
                  </Link>
                </div>
              </div>
            </div>
          </section>
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


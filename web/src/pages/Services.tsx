import MediaGallery from '../components/MediaGallery'
import { useSections } from '../hooks/useSections'
import { 
  Scale, 
  Users, 
  FileText, 
  GraduationCap, 
  Shield, 
  CheckCircle, 
  Clock, 
  Target, 
  Award, 
  Briefcase,
  Lightbulb,
  Users2,
  Building,
  BookOpen,
  User,
  Heart,
  Star,
  Globe,
  TrendingUp,
  Gavel
} from 'lucide-react'

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

  // Fonction pour récupérer une section par sa clé
  const getSectionContent = (key: string) => {
    const section = sections.find(s => s.key === key)
    return section?.content || ''
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
            {sections[0]?.content || 'Des solutions complètes et personnalisées en droit social pour accompagner votre entreprise vers l\'excellence.'}
          </p>
        </div>
      </section>

      {/* Section Conseil Juridique */}
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
                Conseil Juridique
              </h2>
            </div>
            
            <div className="grid grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
              {[
                { title: 'Conformité réglementaire', desc: 'Audit et mise en conformité de vos pratiques RH' },
                { title: 'Rédaction de contrats', desc: 'Élaboration de contrats de travail et documents RH' },
                { title: 'Négociation collective', desc: 'Accompagnement dans les négociations avec les partenaires sociaux' },
                { title: 'Résolution de conflits', desc: 'Médiation et gestion des litiges sociaux' }
              ].map((service, index) => (
                <div key={index} className="card" style={{ textAlign: 'left', padding: 'var(--space-lg)' }}>
                  <h3 style={{ color: '#2D3748', marginBottom: 'var(--space-md)', fontSize: '1.1rem' }}>{service.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Formation */}
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
                <GraduationCap size={28} />
              </div>
              <h2 style={{ 
                margin: 0,
                color: '#2D3748',
                fontSize: '2rem'
              }}>
                Formation & Accompagnement
              </h2>
            </div>
            
            <div className="grid grid-3" style={{ maxWidth: '1000px', margin: '0 auto' }}>
              {[
                { title: 'Formation RH', desc: 'Sensibilisation des équipes aux enjeux sociaux' },
                { title: 'Coaching Managers', desc: 'Développement des compétences managériales' },
                { title: 'Ateliers pratiques', desc: 'Mise en situation et cas pratiques' },
                { title: 'E-learning', desc: 'Modules de formation à distance' },
                { title: 'Suivi personnalisé', desc: 'Accompagnement individuel des dirigeants' },
                { title: 'Certification', desc: 'Validation des acquis et compétences' }
              ].map((formation, index) => (
                <div key={index} className="card" style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
                  <h3 style={{ color: '#2D3748', marginBottom: 'var(--space-md)', fontSize: '1rem' }}>{formation.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{formation.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Audit Social */}
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
                <Shield size={28} />
              </div>
              <h2 style={{ 
                margin: 0,
                color: '#2D3748',
                fontSize: '2rem'
              }}>
                Audit Social
              </h2>
            </div>
            
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div className="grid grid-2">
                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                  <h3 style={{ color: '#2D3748', marginBottom: 'var(--space-lg)', textAlign: 'center' }}>Audit Complet</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      'Analyse des contrats de travail',
                      'Vérification de la conformité réglementaire',
                      'Évaluation des pratiques RH',
                      'Identification des risques sociaux',
                      'Recommandations personnalisées'
                    ].map((item, index) => (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 'var(--space-sm)',
                        color: 'var(--text-secondary)'
                      }}>
                        <CheckCircle size={16} style={{ color: '#2D3748', marginRight: 'var(--space-sm)', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                  <h3 style={{ color: '#2D3748', marginBottom: 'var(--space-lg)', textAlign: 'center' }}>Rapport Détaillé</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      'Diagnostic complet de la situation',
                      'Plan d\'action priorisé',
                      'Calendrier de mise en œuvre',
                      'Indicateurs de suivi',
                      'Support de présentation'
                    ].map((item, index) => (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 'var(--space-sm)',
                        color: 'var(--text-secondary)'
                      }}>
                        <FileText size={16} style={{ color: '#2D3748', marginRight: 'var(--space-sm)', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Processus */}
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
                <Target size={28} />
              </div>
              <h2 style={{ 
                margin: 0,
                color: '#2D3748',
                fontSize: '2rem'
              }}>
                Notre Processus
              </h2>
            </div>
            
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              {[
                { step: '1', title: 'Analyse', desc: 'Étude approfondie de votre situation et de vos besoins', icon: Lightbulb },
                { step: '2', title: 'Proposition', desc: 'Élaboration d\'une solution personnalisée et adaptée', icon: FileText },
                { step: '3', title: 'Mise en œuvre', desc: 'Accompagnement dans la réalisation du projet', icon: Briefcase },
                { step: '4', title: 'Suivi', desc: 'Monitoring et ajustements pour garantir le succès', icon: TrendingUp }
              ].map((process, index) => {
                const IconComponent = process.icon
                return (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
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
                      borderRadius: '50%',
                      backgroundColor: '#2D3748',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      flexShrink: 0
                    }}>
                      {process.step}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-md)',
                      flex: 1
                    }}>
                      <IconComponent size={24} style={{ color: '#2D3748', flexShrink: 0 }} />
                      <div>
                        <h3 style={{ color: '#2D3748', marginBottom: 'var(--space-xs)', fontSize: '1.1rem' }}>{process.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>{process.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section Tarifs */}
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
                <Award size={28} />
              </div>
              <h2 style={{ 
                margin: 0,
                color: '#2D3748',
                fontSize: '2rem'
              }}>
                Nos Tarifs
              </h2>
            </div>
            
            <div className="grid grid-3" style={{ maxWidth: '1000px', margin: '0 auto' }}>
              {[
                { 
                  title: 'Consultation', 
                  price: '150€/h', 
                  features: ['Conseil ponctuel', 'Analyse rapide', 'Recommandations', 'Support téléphonique'],
                  popular: false
                },
                { 
                  title: 'Accompagnement', 
                  price: '1200€/mois', 
                  features: ['Suivi régulier', 'Formation équipe', 'Support complet', 'Rapports mensuels'],
                  popular: true
                },
                { 
                  title: 'Audit Complet', 
                  price: 'Sur devis', 
                  features: ['Analyse approfondie', 'Rapport détaillé', 'Plan d\'action', 'Suivi 6 mois'],
                  popular: false
                }
              ].map((offer, index) => (
                <div key={index} className="card" style={{ 
                  textAlign: 'center', 
                  padding: 'var(--space-xl)',
                  position: 'relative',
                  border: offer.popular ? '2px solid #2D3748' : '1px solid var(--border)'
                }}>
                  {offer.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#2D3748',
                      color: 'white',
                      padding: 'var(--space-xs) var(--space-md)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      Recommandé
                    </div>
                  )}
                  <h3 style={{ color: '#2D3748', marginBottom: 'var(--space-md)', fontSize: '1.2rem' }}>{offer.title}</h3>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#2D3748', marginBottom: 'var(--space-lg)' }}>
                    {offer.price}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {offer.features.map((feature, featureIndex) => (
                      <li key={featureIndex} style={{
                        padding: 'var(--space-sm) 0',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                      }}>
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
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
                <Users2 size={28} />
              </div>
              <h2 style={{ 
                margin: 0,
                color: '#2D3748',
                fontSize: '2rem'
              }}>
                Prêt à Commencer ?
              </h2>
            </div>
            
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto var(--space-xl)',
              lineHeight: 1.6
            }}>
              Contactez-nous pour une consultation personnalisée et découvrez comment nous pouvons vous accompagner.
            </p>
            
            <div style={{ display: 'flex', gap: 'var(--space-lg)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="/contact" 
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
                Demander un Devis
              </a>
              <a 
                href="/about" 
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
                En Savoir Plus
              </a>
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
                  <h2 style={{ 
                    marginBottom: 'var(--space-lg)',
                    color: '#2D3748',
                    fontSize: '2rem'
                  }}>
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

    </div>
  )
}

export default Services


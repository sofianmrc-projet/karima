import { useSections } from '../hooks/useSections'
import { 
  BookOpen, 
  Calendar, 
  User, 
  Tag, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  FileText, 
  Lightbulb, 
  Scale, 
  Shield, 
  Users, 
  Award, 
  CheckCircle, 
  Target, 
  Briefcase, 
  Heart, 
  Star, 
  Globe, 
  Gavel
} from 'lucide-react'

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

          {/* Section Articles récents */}
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
                    <BookOpen size={28} />
                  </div>
                  <h2 style={{ 
                    margin: 0,
                    color: '#2D3748',
                    fontSize: '2rem'
                  }}>
                    Articles récents
                  </h2>
                </div>
                
                <div className="grid grid-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  {[
                    { 
                      title: 'Réforme du droit du travail 2024 : ce qui change pour les entreprises',
                      excerpt: 'Découvrez les principales modifications réglementaires et leurs impacts sur la gestion RH.',
                      date: '15 Janvier 2024',
                      category: 'Droit du travail',
                      readTime: '5 min',
                      icon: Scale
                    },
                    { 
                      title: 'Négociation collective : stratégies pour un dialogue social efficace',
                      excerpt: 'Conseils pratiques pour améliorer les relations avec les partenaires sociaux.',
                      date: '8 Janvier 2024',
                      category: 'Relations sociales',
                      readTime: '7 min',
                      icon: Users
                    },
                    { 
                      title: 'Audit social : identifier et prévenir les risques RH',
                      excerpt: 'Guide méthodologique pour réaliser un audit social complet et efficace.',
                      date: '2 Janvier 2024',
                      category: 'Audit social',
                      readTime: '6 min',
                      icon: Shield
                    }
                  ].map((article, index) => {
                    const IconComponent = article.icon
                    return (
                      <div key={index} className="card" style={{ 
                        textAlign: 'left', 
                        padding: 'var(--space-lg)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-sm)',
                          marginBottom: 'var(--space-md)'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: '#2D3748',
                            color: 'white',
                            flexShrink: 0
                          }}>
                            <IconComponent size={16} />
                          </div>
                          <span style={{
                            backgroundColor: 'var(--bg-tertiary)',
                            color: '#2D3748',
                            padding: 'var(--space-xs) var(--space-sm)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {article.category}
                          </span>
                        </div>
                        
                        <h3 style={{ 
                          color: '#2D3748', 
                          marginBottom: 'var(--space-md)', 
                          fontSize: '1.1rem',
                          lineHeight: '1.4',
                          flex: 1
                        }}>
                          {article.title}
                        </h3>
                        
                        <p style={{ 
                          color: 'var(--text-secondary)', 
                          fontSize: '0.95rem', 
                          marginBottom: 'var(--space-md)',
                          lineHeight: '1.5',
                          flex: 1
                        }}>
                          {article.excerpt}
                        </p>
                        
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: 'auto',
                          paddingTop: 'var(--space-md)',
                          borderTop: '1px solid var(--border)'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-sm)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.85rem'
                          }}>
                            <Calendar size={14} />
                            <span>{article.date}</span>
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-xs)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.85rem'
                          }}>
                            <Clock size={14} />
                            <span>{article.readTime}</span>
                          </div>
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

          {/* Section Newsletter */}
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
                    <TrendingUp size={28} />
                  </div>
                  <h2 style={{ 
                    margin: 0,
                    color: '#2D3748',
                    fontSize: '2rem'
                  }}>
                    Restez informé
                  </h2>
                </div>
                
                <p style={{ 
                  fontSize: '1.125rem', 
                  color: 'var(--text-secondary)',
                  maxWidth: '600px',
                  margin: '0 auto var(--space-xl)',
                  lineHeight: 1.6
                }}>
                  Abonnez-vous à notre newsletter pour recevoir nos derniers articles et conseils en droit social.
                </p>
                
                <div style={{ 
                  maxWidth: '500px', 
                  margin: '0 auto',
                  display: 'flex',
                  gap: 'var(--space-md)',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  <input 
                    type="email" 
                    placeholder="Votre adresse email"
                    style={{
                      flex: 1,
                      minWidth: '250px',
                      padding: 'var(--space-md)',
                      border: '2px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#2D3748'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }}
                  />
                  <button 
                    style={{
                      backgroundColor: '#2D3748',
                      color: 'white',
                      border: 'none',
                      padding: 'var(--space-md) var(--space-xl)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-sm)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1A202C'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2D3748'
                    }}
                  >
                    S'abonner
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>
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


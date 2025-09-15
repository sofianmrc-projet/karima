import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Users, Award, Clock } from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import TodoList from '../components/TodoList'

const Home = () => {
  const services = [
    {
      icon: Users,
      title: 'Consulting',
      description: 'Accompagnement personnalisé pour optimiser vos processus et améliorer vos performances.',
      features: [
        'Audit de vos processus actuels',
        'Recommandations personnalisées',
        'Plan d\'action détaillé',
        'Suivi et accompagnement'
      ]
    },
    {
      icon: Award,
      title: 'Formation',
      description: 'Formations sur mesure pour développer les compétences de vos équipes.',
      features: [
        'Programmes adaptés à vos besoins',
        'Formateurs experts certifiés',
        'Méthodes pédagogiques innovantes',
        'Certification à la clé'
      ]
    },
    {
      icon: Clock,
      title: 'Accompagnement',
      description: 'Support continu pour assurer la réussite de vos projets et transformations.',
      features: [
        'Suivi régulier des projets',
        'Support technique permanent',
        'Ajustements en temps réel',
        'Rapports de progression'
      ]
    }
  ]

  const stats = [
    { number: '500+', label: 'Clients satisfaits' },
    { number: '10+', label: 'Années d\'expérience' },
    { number: '50+', label: 'Projets réalisés' },
    { number: '98%', label: 'Taux de satisfaction' }
  ]

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
            Votre partenaire de confiance
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: 'var(--space-2xl)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto var(--space-2xl)'
          }}>
            Nous vous accompagnons dans vos projets avec des solutions sur mesure, 
            une expertise reconnue et un engagement total envers votre succès.
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

      {/* Stats Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-xl)',
            textAlign: 'center'
          }}>
            {stats.map((stat, index) => (
              <div key={index}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: 'var(--primary)',
                  marginBottom: 'var(--space-sm)'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  color: 'var(--text-secondary)',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
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
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
            <Link to="/services" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Voir tous nos services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: 'var(--space-lg)' }}>
                Pourquoi choisir Karima ?
              </h2>
              <p style={{ 
                fontSize: '1.125rem', 
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-xl)'
              }}>
                Notre approche unique et notre engagement envers l'excellence 
                font de nous le partenaire idéal pour vos projets.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                {[
                  'Expertise reconnue dans notre domaine',
                  'Approche personnalisée pour chaque client',
                  'Engagement total envers votre succès',
                  'Support continu et suivi rigoureux'
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle size={20} style={{ 
                      color: 'var(--success)', 
                      marginRight: 'var(--space-md)',
                      flexShrink: 0
                    }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
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
              <h3 style={{ color: 'white', marginBottom: 'var(--space-lg)' }}>
                Prêt à commencer ?
              </h3>
              <p style={{ 
                opacity: 0.9, 
                marginBottom: 'var(--space-xl)',
                fontSize: '1.125rem'
              }}>
                Contactez-nous dès aujourd'hui pour discuter de vos besoins 
                et découvrir comment nous pouvons vous aider.
              </p>
              <Link to="/contact" className="btn btn-accent" style={{ textDecoration: 'none' }}>
                Prendre contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2>Démonstration technique</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Cette section démontre les fonctionnalités CRUD avec l'API backend 
              et la base de données SQL Server.
            </p>
          </div>
          <TodoList />
        </div>
      </section>
    </div>
  )
}

export default Home


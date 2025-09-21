import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Users, Award, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import ServiceCard from '../components/ServiceCard'
import ContentDisplay from '../components/ContentDisplay'
import { api } from '../lib/api'

const Home = () => {
  const [content, setContent] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await api.getServiceContent()
        setContent(data)
      } catch (error) {
        console.error('Erreur lors du chargement du contenu:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

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

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
        <p>Chargement du contenu...</p>
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
            {content.home_hero_title || 'Bienvenue chez Karima'}
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: 'var(--space-2xl)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto var(--space-2xl)'
          }}>
            {content.home_hero_subtitle || 'Votre partenaire de confiance'}
          </p>
          <p style={{ 
            fontSize: '1.125rem', 
            marginBottom: 'var(--space-2xl)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto var(--space-2xl)'
          }}>
            {content.home_hero_description || 'Des solutions innovantes pour votre entreprise'}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-lg)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn btn-accent" style={{ textDecoration: 'none' }}>
              {content.home_hero_cta_text || 'Découvrir nos services'}
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
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--primary)',
                marginBottom: 'var(--space-sm)'
              }}>
                {content.home_stat_1_number || '100+'}
              </div>
              <div style={{
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}>
                {content.home_stat_1_label || 'Projets réalisés'}
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--primary)',
                marginBottom: 'var(--space-sm)'
              }}>
                {content.home_stat_2_number || '50+'}
              </div>
              <div style={{
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}>
                {content.home_stat_2_label || 'Clients satisfaits'}
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--primary)',
                marginBottom: 'var(--space-sm)'
              }}>
                {content.home_stat_3_number || '5+'}
              </div>
              <div style={{
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}>
                {content.home_stat_3_label || 'Années d\'expérience'}
              </div>
            </div>
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

      {/* Affichage du contenu de la base de données */}
      <section className="section">
        <div className="container">
          <ContentDisplay />
        </div>
      </section>

    </div>
  )
}

export default Home


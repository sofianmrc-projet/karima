import { Users, Award, Clock, Target, BarChart3, Shield } from 'lucide-react'
import ServiceCard from '../components/ServiceCard'

const Services = () => {
  const services = [
    {
      icon: Users,
      title: 'Consulting Stratégique',
      description: 'Accompagnement personnalisé pour optimiser vos processus et améliorer vos performances organisationnelles.',
      features: [
        'Audit complet de vos processus actuels',
        'Analyse des points d\'amélioration',
        'Recommandations personnalisées et détaillées',
        'Plan d\'action avec échéancier précis',
        'Suivi et accompagnement dans la mise en œuvre',
        'Formation des équipes aux nouvelles pratiques'
      ]
    },
    {
      icon: Award,
      title: 'Formation Professionnelle',
      description: 'Formations sur mesure pour développer les compétences de vos équipes et améliorer leur performance.',
      features: [
        'Programmes adaptés à vos besoins spécifiques',
        'Formateurs experts certifiés dans leur domaine',
        'Méthodes pédagogiques innovantes et interactives',
        'Certification professionnelle à la clé',
        'Support post-formation et ressources en ligne',
        'Évaluation continue des acquis'
      ]
    },
    {
      icon: Clock,
      title: 'Accompagnement Continu',
      description: 'Support permanent pour assurer la réussite de vos projets et transformations organisationnelles.',
      features: [
        'Suivi régulier et personnalisé des projets',
        'Support technique et méthodologique permanent',
        'Ajustements en temps réel selon les besoins',
        'Rapports de progression détaillés',
        'Intervention rapide en cas de difficultés',
        'Optimisation continue des processus'
      ]
    },
    {
      icon: Target,
      title: 'Audit et Diagnostic',
      description: 'Analyse approfondie de votre organisation pour identifier les opportunités d\'amélioration.',
      features: [
        'Audit complet de l\'organisation',
        'Diagnostic des forces et faiblesses',
        'Benchmarking avec les meilleures pratiques',
        'Recommandations prioritaires et chiffrées',
        'Plan de transformation détaillé',
        'Indicateurs de performance personnalisés'
      ]
    },
    {
      icon: BarChart3,
      title: 'Optimisation des Processus',
      description: 'Amélioration continue de vos processus métier pour maximiser l\'efficacité et la qualité.',
      features: [
        'Cartographie des processus existants',
        'Identification des goulots d\'étranglement',
        'Redesign des processus optimisés',
        'Mise en place d\'outils de mesure',
        'Formation des équipes aux nouveaux processus',
        'Suivi et amélioration continue'
      ]
    },
    {
      icon: Shield,
      title: 'Conformité et Qualité',
      description: 'Accompagnement pour la mise en conformité et l\'amélioration de la qualité de vos services.',
      features: [
        'Audit de conformité réglementaire',
        'Mise en place de systèmes qualité',
        'Formation aux normes et standards',
        'Préparation aux certifications',
        'Suivi et maintenance de la conformité',
        'Amélioration continue de la qualité'
      ]
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Analyse',
      description: 'Nous analysons vos besoins et votre situation actuelle pour comprendre vos enjeux.'
    },
    {
      step: '02',
      title: 'Proposition',
      description: 'Nous vous proposons une solution personnalisée adaptée à vos objectifs.'
    },
    {
      step: '03',
      title: 'Mise en œuvre',
      description: 'Nous accompagnons la mise en œuvre avec un suivi rigoureux et des ajustements.'
    },
    {
      step: '04',
      title: 'Suivi',
      description: 'Nous assurons un suivi continu pour garantir les résultats et l\'amélioration.'
    }
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
            Nos Services
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: 'var(--space-2xl)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto var(--space-2xl)'
          }}>
            Des solutions complètes et personnalisées pour répondre à tous vos besoins professionnels 
            et vous accompagner vers l'excellence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2>Nos domaines d'expertise</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Chaque service est conçu pour vous apporter une valeur ajoutée réelle 
              et mesurable dans votre domaine d'activité.
            </p>
          </div>
          <div className="grid grid-3">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2>Notre méthode de travail</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Une approche structurée et éprouvée pour garantir le succès de vos projets.
            </p>
          </div>
          <div className="grid grid-2">
            {processSteps.map((step, index) => (
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
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  flexShrink: 0
                }}>
                  {step.step}
                </div>
                <div>
                  <h3 style={{ 
                    marginBottom: 'var(--space-md)',
                    color: 'var(--primary)'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Prêt à transformer votre organisation ?
            </h2>
            <p style={{ 
              opacity: 0.9, 
              marginBottom: 'var(--space-xl)',
              fontSize: '1.125rem',
              maxWidth: '600px',
              margin: '0 auto var(--space-xl)'
            }}>
              Contactez-nous dès aujourd'hui pour discuter de vos besoins 
              et découvrir comment nos services peuvent vous aider à atteindre vos objectifs.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-lg)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn btn-accent" style={{ textDecoration: 'none' }}>
                Demander un devis
              </a>
              <a href="tel:+33123456789" className="btn btn-outline" style={{ 
                textDecoration: 'none',
                borderColor: 'white',
                color: 'white'
              }}>
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services


import { useSections } from '../hooks/useSections'
import { 
  User, 
  Target, 
  Heart, 
  Award, 
  Users, 
  BookOpen, 
  Lightbulb, 
  Shield, 
  Star,
  Briefcase,
  GraduationCap,
  Globe,
  Clock,
  CheckCircle,
  TrendingUp,
  Users2,
  Scale,
  Gavel,
  FileText,
  Building
} from 'lucide-react'

const About = () => {
  const { sections, loading, error } = useSections('À propos')

  const sectionIcons = [
    User, Target, Heart, Award, Users, Briefcase, GraduationCap, Lightbulb, Shield, Star,
    Scale, Gavel, Globe, Clock, CheckCircle, TrendingUp, Users2, FileText, Building, BookOpen
  ]

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
            À propos de Karima
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: 'var(--space-2xl)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto var(--space-2xl)'
          }}>
            Consultante experte en droit social, je vous accompagne dans la gestion de vos ressources humaines avec expertise et bienveillance.
          </p>
        </div>
      </section>

      {/* Section Présentation */}
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
                <User size={28} />
              </div>
              <h2 style={{ 
                margin: 0,
                color: '#2D3748',
                fontSize: '2rem'
              }}>
                Mon Profil
              </h2>
            </div>
            
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Diplômée en droit social avec plus de 15 ans d'expérience, je me spécialise dans l'accompagnement des entreprises 
              dans la gestion de leurs relations sociales. Mon approche combine expertise juridique et compréhension des enjeux humains.
            </p>
          </div>
        </div>
      </section>

      {/* Section Mission */}
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
                Ma Mission
              </h2>
            </div>
            
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Accompagner les dirigeants et les équipes RH dans la mise en place de politiques sociales équitables et conformes, 
              tout en préservant l'harmonie et la performance de l'organisation.
            </p>
          </div>
        </div>
      </section>

      {/* Section Valeurs */}
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
                <Heart size={28} />
              </div>
              <h2 style={{ 
                margin: 0,
                color: '#2D3748',
                fontSize: '2rem'
              }}>
                Mes Valeurs
              </h2>
            </div>
            
            <div className="grid grid-3" style={{ maxWidth: '900px', margin: '0 auto' }}>
              {[
                { title: 'Éthique', desc: 'Respect des principes déontologiques et de l\'équité' },
                { title: 'Bienveillance', desc: 'Approche humaine et respectueuse des personnes' },
                { title: 'Excellence', desc: 'Recherche constante de la qualité et de l\'efficacité' }
              ].map((value, index) => (
                <div key={index} className="card" style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
                  <h3 style={{ color: '#2D3748', marginBottom: 'var(--space-md)' }}>{value.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Expertise */}
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
                <Award size={28} />
              </div>
              <h2 style={{ 
                margin: 0,
                color: '#2D3748',
                fontSize: '2rem'
              }}>
                Mon Expertise
              </h2>
            </div>
            
            <div className="grid grid-2" style={{ maxWidth: '800px', margin: '0 auto' }}>
              {[
                'Droit du travail et relations sociales',
                'Négociation collective et accords d\'entreprise',
                'Gestion des conflits et médiation',
                'Conformité réglementaire et audits sociaux',
                'Formation des équipes RH et managers',
                'Accompagnement au changement organisationnel'
              ].map((skill, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                  padding: 'var(--space-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: 'var(--space-sm)'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#2D3748',
                    flexShrink: 0
                  }} />
                  <span style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Expérience */}
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
                <Briefcase size={28} />
              </div>
              <h2 style={{ 
                margin: 0,
                color: '#2D3748',
                fontSize: '2rem'
              }}>
                Mon Parcours
              </h2>
            </div>
            
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              {[
                { year: '2020 - Aujourd\'hui', title: 'Consultante Indépendante', desc: 'Accompagnement d\'entreprises de toutes tailles dans la gestion sociale' },
                { year: '2015 - 2020', title: 'Responsable RH Senior', desc: 'Direction des relations sociales dans une PME de 200 salariés' },
                { year: '2010 - 2015', title: 'Juriste Social', desc: 'Conseil juridique et formation dans un cabinet spécialisé' },
                { year: '2008 - 2010', title: 'Début de Carrière', desc: 'Premiers pas dans le droit social en tant que juriste junior' }
              ].map((exp, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-lg)',
                  padding: 'var(--space-lg)',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: 'var(--space-md)',
                  textAlign: 'left'
                }}>
                  <div style={{
                    backgroundColor: '#2D3748',
                    color: 'white',
                    padding: 'var(--space-sm) var(--space-md)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    flexShrink: 0,
                    minWidth: '120px',
                    textAlign: 'center'
                  }}>
                    {exp.year}
                  </div>
                  <div>
                    <h3 style={{ color: '#2D3748', marginBottom: 'var(--space-xs)', fontSize: '1.1rem' }}>{exp.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact CTA */}
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
                Travaillons Ensemble
              </h2>
            </div>
            
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto var(--space-xl)',
              lineHeight: 1.6
            }}>
              Vous avez des questions sur la gestion de vos relations sociales ? 
              N'hésitez pas à me contacter pour un échange personnalisé.
            </p>
            
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
              Prendre Contact
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About


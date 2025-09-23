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
        <p style={{ color: 'var(--danger)' }}>Erreur lors du chargement: {error}</p>
      </div>
    )
  }

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous nous engageons à fournir des services de la plus haute qualité, en dépassant constamment les attentes de nos clients.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Nous croyons en la force du travail d\'équipe et en l\'importance de créer des partenariats durables avec nos clients.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Notre passion pour l\'excellence et l\'innovation nous pousse à toujours chercher les meilleures solutions pour nos clients.'
    },
    {
      icon: Award,
      title: 'Intégrité',
      description: 'Nous agissons avec transparence, honnêteté et respect dans toutes nos interactions et décisions.'
    }
  ]

  const team = [
    {
      name: 'Marie Dubois',
      role: 'Directrice Générale',
      description: '15 ans d\'expérience dans le conseil stratégique et la transformation organisationnelle.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Jean Martin',
      role: 'Directeur Technique',
      description: 'Expert en optimisation des processus et en mise en œuvre de solutions technologiques.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Sophie Laurent',
      role: 'Responsable Formation',
      description: 'Spécialiste en développement des compétences et en pédagogie innovante.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
    }
  ]

  const achievements = [
    { number: '500+', label: 'Clients accompagnés' },
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
                {achievements.map((achievement, index) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: 'var(--primary)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      {achievement.number}
                    </div>
                    <div style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem'
                    }}>
                      {achievement.label}
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
              Ces valeurs fondamentales guident chacune de nos actions 
              et définissent notre approche du conseil.
            </p>
          </div>
          <div className="grid grid-2">
            {values.map((value, index) => (
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
                  <value.icon size={24} />
                </div>
                <div>
                  <h3 style={{ 
                    marginBottom: 'var(--space-md)',
                    color: 'var(--primary)'
                  }}>
                    {value.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    {value.description}
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
              Des experts passionnés et expérimentés, unis par la volonté 
              de vous accompagner vers l'excellence.
            </p>
          </div>
          <div className="grid grid-3">
            {team.map((member, index) => (
              <div key={index} className="card" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundImage: `url(${member.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  margin: '0 auto var(--space-lg)',
                  border: '4px solid var(--primary)'
                }} />
                <h3 style={{ 
                  marginBottom: 'var(--space-sm)',
                  color: 'var(--primary)'
                }}>
                  {member.name}
                </h3>
                <div style={{
                  color: 'var(--accent)',
                  fontWeight: '600',
                  marginBottom: 'var(--space-md)'
                }}>
                  {member.role}
                </div>
                <p style={{ 
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.5
                }}>
                  {member.description}
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


import { Users, Award, Clock, Target, BarChart3, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import ServiceCard from '../components/ServiceCard'
import MediaGallery from '../components/MediaGallery'
import { api, ServiceContent } from '../lib/api'

const Services = () => {
  const [serviceContent, setServiceContent] = useState<ServiceContent>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await api.getServiceContent()
        setServiceContent(content)
      } catch (err) {
        setError('Erreur lors du chargement du contenu')
        console.error('Error fetching service content:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  // Services dynamiques depuis la base de données
  const getServices = () => {
    const serviceIcons = [Users, Award, Clock, Target, BarChart3, Shield];
    
    return Array.from({ length: 6 }, (_, index) => {
      const serviceNum = index + 1;
      const features = serviceContent[`service_${serviceNum}_features`]?.split('|') || [];
      
      return {
        icon: serviceIcons[index],
        title: serviceContent[`service_${serviceNum}_title`] || `Service ${serviceNum}`,
        description: serviceContent[`service_${serviceNum}_description`] || 'Description du service',
        features: features
      };
    });
  };

  const services = getServices();

  // Processus dynamique depuis la base de données
  const getProcessSteps = () => {
    return Array.from({ length: 4 }, (_, index) => {
      const stepNum = index + 1;
      return {
        step: serviceContent[`process_step_${stepNum}_number`] || `${stepNum.toString().padStart(2, '0')}`,
        title: serviceContent[`process_step_${stepNum}_title`] || `Étape ${stepNum}`,
        description: serviceContent[`process_step_${stepNum}_description`] || 'Description de l\'étape'
      };
    });
  };

  const processSteps = getProcessSteps();

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
            {serviceContent.hero_title || 'Nos Services'}
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: 'var(--space-2xl)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto var(--space-2xl)'
          }}>
            {serviceContent.hero_description || 'Des solutions complètes et personnalisées pour répondre à tous vos besoins professionnels et vous accompagner vers l\'excellence.'}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2>{serviceContent.services_section_title || 'Nos domaines d\'expertise'}</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {serviceContent.services_section_description || 'Chaque service est conçu pour vous apporter une valeur ajoutée réelle et mesurable dans votre domaine d\'activité.'}
            </p>
          </div>
          <div className="grid grid-3">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          
          {/* Galerie d'images des services */}
          <div style={{ marginTop: 'var(--space-3xl)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
              {serviceContent.gallery_title || 'Nos réalisations en images'}
            </h3>
            <MediaGallery 
              category="services" 
              columns={4} 
              showDescription={true} 
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2>{serviceContent.process_section_title || 'Notre méthode de travail'}</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {serviceContent.process_section_description || 'Une approche structurée et éprouvée pour garantir le succès de vos projets.'}
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
              {serviceContent.cta_title || 'Prêt à transformer votre organisation ?'}
            </h2>
            <p style={{ 
              opacity: 0.9, 
              marginBottom: 'var(--space-xl)',
              fontSize: '1.125rem',
              maxWidth: '600px',
              margin: '0 auto var(--space-xl)'
            }}>
              {serviceContent.cta_description || 'Contactez-nous dès aujourd\'hui pour discuter de vos besoins et découvrir comment nos services peuvent vous aider à atteindre vos objectifs.'}
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


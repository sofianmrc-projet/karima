import ContactForm from '../components/ContactForm'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { useSections } from '../hooks/useSections'

const Contact = () => {
  const { sections, loading, error } = useSections('Contact')

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
  // Récupérer les informations de contact depuis la base de données
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: getSectionContent('contact_email') || 'contact@karima.fr',
      description: getSectionContent('contact_email_desc') || 'Réponse sous 24h'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: getSectionContent('contact_phone') || '01 23 45 67 89',
      description: getSectionContent('contact_phone_desc') || 'Lun-Ven 9h-18h'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      value: getSectionContent('contact_address') || '123 Avenue des Champs',
      description: getSectionContent('contact_address_desc') || '75008 Paris, France'
    },
    {
      icon: Clock,
      title: 'Horaires',
      value: getSectionContent('contact_hours') || '9h00 - 18h00',
      description: getSectionContent('contact_hours_desc') || 'Lundi au Vendredi'
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
            {getSectionContent('contact_hero') || 'Contactez-nous'}
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: 'var(--space-2xl)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto var(--space-2xl)'
          }}>
            {getSectionContent('contact_hero_description') || 'Nous sommes là pour répondre à vos questions et vous accompagner'} 
            dans vos projets. N'hésitez pas à nous contacter.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'flex-start' }}>
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 style={{ marginBottom: 'var(--space-lg)' }}>
                Informations de contact
              </h2>
              <p style={{ 
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-xl)',
                fontSize: '1.125rem'
              }}>
                Plusieurs moyens de nous joindre selon vos préférences. 
                Nous nous engageons à vous répondre rapidement.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                {contactInfo.map((info, index) => (
                  <div key={index} className="card" style={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-lg)',
                    padding: 'var(--space-lg)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      <info.icon size={24} />
                    </div>
                    <div>
                      <h3 style={{ 
                        marginBottom: 'var(--space-xs)',
                        color: 'var(--primary)',
                        fontSize: '1.125rem'
                      }}>
                        {info.title}
                      </h3>
                      <div style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-xs)'
                      }}>
                        {info.value}
                      </div>
                      <div style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem'
                      }}>
                        {info.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="card" style={{ 
                marginTop: 'var(--space-xl)',
                backgroundColor: 'var(--bg-tertiary)'
              }}>
                <h3 style={{ 
                  marginBottom: 'var(--space-md)',
                  color: 'var(--primary)'
                }}>
                  Pourquoi nous choisir ?
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {[
                    'Réponse rapide sous 24h',
                    'Expertise reconnue dans notre domaine',
                    'Approche personnalisée pour chaque client',
                    'Suivi rigoureux de vos projets',
                    'Engagement total envers votre succès'
                  ].map((item, index) => (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 'var(--space-sm)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent)',
                        marginRight: 'var(--space-sm)',
                        flexShrink: 0
                      }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2>{getSectionContent('contact_faq_title') || 'Questions fréquentes'}</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Retrouvez les réponses aux questions les plus courantes 
              sur nos services et notre approche.
            </p>
          </div>
          <div className="grid grid-2">
            {[
              {
                question: 'Combien de temps faut-il pour voir les premiers résultats ?',
                answer: 'Les premiers résultats sont généralement visibles dès les premières semaines de mise en œuvre. Cependant, l\'impact complet se mesure généralement sur 3 à 6 mois selon la complexité du projet.'
              },
              {
                question: 'Proposez-vous des formations personnalisées ?',
                answer: 'Oui, toutes nos formations sont adaptées aux besoins spécifiques de votre organisation. Nous commençons par analyser vos enjeux avant de concevoir un programme sur mesure.'
              },
              {
                question: 'Quel est votre taux de satisfaction client ?',
                answer: 'Nous maintenons un taux de satisfaction de 98% grâce à notre approche personnalisée et notre engagement envers l\'excellence. La satisfaction de nos clients est notre priorité absolue.'
              },
              {
                question: 'Offrez-vous un suivi après la formation ?',
                answer: 'Absolument ! Nous proposons un suivi de 3 mois inclus dans tous nos programmes de formation, avec des sessions de coaching et des ressources en ligne pour assurer la mise en pratique.'
              }
            ].map((faq, index) => (
              <div key={index} className="card">
                <h3 style={{ 
                  marginBottom: 'var(--space-md)',
                  color: 'var(--primary)',
                  fontSize: '1.125rem'
                }}>
                  {faq.question}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6
                }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact


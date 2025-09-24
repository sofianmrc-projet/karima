import { Mail, Phone, MapPin } from 'lucide-react'
import { useSections } from '../hooks/useSections'

const Footer = () => {
  const { sections, loading, error } = useSections('Footer')

  // Fonction pour récupérer une section par sa clé
  const getSectionContent = (key: string) => {
    const section = sections.find(s => s.key === key)
    return section?.content || ''
  }

  if (loading) {
    return (
      <footer style={{
        backgroundColor: 'var(--primary)',
        color: 'var(--text-white)',
        padding: 'var(--space-3xl) 0 var(--space-xl)',
        textAlign: 'center'
      }}>
        <div className="container">
          <p>Chargement du footer...</p>
        </div>
      </footer>
    )
  }
  return (
    <footer style={{
      backgroundColor: 'var(--primary)',
      color: 'var(--text-white)',
      padding: 'var(--space-3xl) 0 var(--space-xl)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: 'var(--space-2xl)'
        }}>
          {/* Company Info */}
          <div>
            <h3 style={{ 
              color: 'var(--text-white)', 
              marginBottom: 'var(--space-lg)',
              fontSize: '1.5rem'
            }}>
              {getSectionContent('footer_company')}
            </h3>
            <p style={{ 
              color: 'var(--secondary-light)',
              marginBottom: 'var(--space-lg)',
              maxWidth: '600px'
            }}>
              {getSectionContent('footer_description')}
            </p>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 'var(--space-sm)',
              alignItems: 'center'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-sm)',
                color: 'var(--secondary-light)'
              }}>
                <Mail size={16} />
                <span>{getSectionContent('footer_email')}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-sm)',
                color: 'var(--secondary-light)'
              }}>
                <Phone size={16} />
                <span>{getSectionContent('footer_phone')}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-sm)',
                color: 'var(--secondary-light)'
              }}>
                <MapPin size={16} />
                <span>{getSectionContent('footer_address')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--secondary)',
          paddingTop: 'var(--space-lg)',
          textAlign: 'center',
          color: 'var(--secondary-light)'
        }}>
          <p>{getSectionContent('footer_copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


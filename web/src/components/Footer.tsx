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
    <footer className="main-footer" style={{
      background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%)',
      color: 'var(--text-primary)',
      padding: 'var(--space-3xl) 0 var(--space-xl)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
        <div className="container">
          <p>Chargement du footer...</p>
        </div>
      </footer>
    )
  }
  return (
    <footer className="main-footer" style={{
      background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%)',
      color: 'var(--text-primary)',
      padding: 'var(--space-3xl) 0 var(--space-xl)',
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
        background: 'rgba(247, 247, 245, 0.8)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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
              color: 'black', 
              marginBottom: 'var(--space-lg)',
              fontSize: '1.5rem'
            }}>
              {getSectionContent('footer_company')}
            </h3>
            <p style={{ 
              color: 'black',
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
                color: 'black'
              }}>
                <Mail size={16} />
                <span>{getSectionContent('footer_email')}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-sm)',
                color: 'black'
              }}>
                <Phone size={16} />
                <span>{getSectionContent('footer_phone')}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-sm)',
                color: 'black'
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
          color: 'black'
        }}>
          <p>{getSectionContent('footer_copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


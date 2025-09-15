import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--primary)',
      color: 'var(--text-white)',
      padding: 'var(--space-3xl) 0 var(--space-xl)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--space-2xl)',
          marginBottom: 'var(--space-2xl)'
        }}>
          {/* Company Info */}
          <div>
            <h3 style={{ 
              color: 'var(--text-white)', 
              marginBottom: 'var(--space-lg)',
              fontSize: '1.5rem'
            }}>
              Karima
            </h3>
            <p style={{ 
              color: 'var(--secondary-light)',
              marginBottom: 'var(--space-lg)'
            }}>
              Votre partenaire de confiance pour des services professionnels de qualité. 
              Nous nous engageons à vous offrir des solutions adaptées à vos besoins.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-sm)',
                color: 'var(--secondary-light)'
              }}>
                <Mail size={16} />
                <span>contact@karima.fr</span>
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--space-sm)',
              color: 'var(--secondary-light)',
              marginTop: 'var(--space-sm)'
            }}>
              <Phone size={16} />
              <span>01 23 45 67 89</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--space-sm)',
              color: 'var(--secondary-light)',
              marginTop: 'var(--space-sm)'
            }}>
              <MapPin size={16} />
              <span>123 Avenue des Champs, 75008 Paris</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              color: 'var(--text-white)', 
              marginBottom: 'var(--space-lg)'
            }}>
              Liens rapides
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <Link 
                to="/" 
                style={{ 
                  color: 'var(--secondary-light)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-white)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary-light)'}
              >
                Accueil
              </Link>
              <Link 
                to="/services" 
                style={{ 
                  color: 'var(--secondary-light)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-white)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary-light)'}
              >
                Services
              </Link>
              <Link 
                to="/about" 
                style={{ 
                  color: 'var(--secondary-light)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-white)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary-light)'}
              >
                À propos
              </Link>
              <Link 
                to="/blog" 
                style={{ 
                  color: 'var(--secondary-light)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-white)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary-light)'}
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ 
              color: 'var(--text-white)', 
              marginBottom: 'var(--space-lg)'
            }}>
              Nos services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <span style={{ color: 'var(--secondary-light)' }}>Consulting</span>
              <span style={{ color: 'var(--secondary-light)' }}>Formation</span>
              <span style={{ color: 'var(--secondary-light)' }}>Accompagnement</span>
              <span style={{ color: 'var(--secondary-light)' }}>Audit</span>
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
          <p>&copy; 2024 Karima. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


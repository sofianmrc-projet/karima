import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { path: '/', label: 'Cabinet' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'À propos' },
    { path: '/blog', label: 'Blog' },
    { path: '/account', label: 'Mon Compte' },
  ]

  return (
    <header style={{ 
      background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid rgba(var(--primary-rgb), 0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: 'var(--space-md) var(--space-lg)'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#1A202C',
          fontSize: '1.75rem',
          fontWeight: '700',
          letterSpacing: '-0.025em',
          transition: 'color 0.3s ease'
        }}>
          Cabinet Karima
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', gap: 'var(--space-xl)', alignItems: 'center' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: 'none',
                color: '#2D3748',
                fontWeight: '600',
                padding: 'var(--space-sm) var(--space-lg)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontSize: '0.95rem',
                letterSpacing: '0.025em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                e.currentTarget.style.color = '#1A202C'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#2D3748'
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{ 
              textDecoration: 'none',
              backgroundColor: '#2D3748',
              color: 'white',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1A202C'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2D3748'
            }}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 'var(--space-sm)'
          }}
          className="mobile-menu-btn"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--space-md)',
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--secondary-light)'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: '#2D3748',
                fontWeight: '500',
                padding: 'var(--space-md)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-xs)'
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn btn-primary"
            onClick={() => setIsMenuOpen(false)}
            style={{ 
              textDecoration: 'none',
              marginTop: 'var(--space-sm)',
              textAlign: 'center',
              backgroundColor: '#2D3748',
              color: 'white',
              border: 'none'
            }}
          >
            Contact
          </Link>
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          
          nav:first-of-type {
            display: none !important;
          }
        }
      `}</style>
    </header>
  )
}

export default Header


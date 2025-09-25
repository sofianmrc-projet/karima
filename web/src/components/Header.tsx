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
      backgroundColor: 'var(--bg-secondary)', 
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
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
          color: 'var(--primary)',
          fontSize: '1.5rem',
          fontWeight: '700'
        }}>
          Karima
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', gap: 'var(--space-xl)', alignItems: 'center' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontWeight: '500',
                padding: 'var(--space-sm) var(--space-md)',
                borderRadius: 'var(--radius-md)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                e.currentTarget.style.color = 'var(--primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{ textDecoration: 'none' }}
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
                color: 'var(--text-primary)',
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
              textAlign: 'center'
            }}
          >
            Contact
          </Link>
        </nav>
      )}

      <style jsx>{`
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


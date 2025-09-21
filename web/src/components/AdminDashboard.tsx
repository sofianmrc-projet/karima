import { useState } from 'react'
import VisualEditor from './VisualEditor'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'visual'>('visual')

  const tabs = [
    { id: 'visual', label: 'Éditeur Visuel', icon: '🎨' },
    { id: 'content', label: 'Gestion du Contenu', icon: '📝' }
  ] as const

  return (
    <div>
      {/* Navigation par onglets */}
      <div style={{
        display: 'flex',
        borderBottom: '2px solid var(--border-color)',
        marginBottom: 'var(--space-2xl)'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: 'var(--space-lg) var(--space-xl)',
              border: 'none',
              backgroundColor: 'transparent',
              borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === tab.id ? '600' : '400',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

          {/* Contenu des onglets */}
          <div>
            {activeTab === 'visual' && <VisualEditor />}
            {activeTab === 'content' && (
              <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
                <h3 style={{ marginBottom: 'var(--space-lg)' }}>
                  📝 Gestion du Contenu
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  marginBottom: 'var(--space-xl)',
                  fontSize: '1.125rem'
                }}>
                  Modifiez le contenu de chaque section de votre site de manière organisée.
                </p>
                <Link 
                  to="/admin/content" 
                  className="btn btn-primary"
                  style={{ textDecoration: 'none', fontSize: '1.125rem' }}
                >
                  🚀 Ouvrir la Gestion du Contenu
                </Link>
              </div>
            )}
          </div>
    </div>
  )
}

export default AdminDashboard

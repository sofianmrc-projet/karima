import { useState } from 'react'
import VisualEditor from './VisualEditor'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'visual'>('visual')

  const tabs = [
    { id: 'visual', label: 'Éditeur Visuel', icon: '🎨' }
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
      </div>
    </div>
  )
}

export default AdminDashboard

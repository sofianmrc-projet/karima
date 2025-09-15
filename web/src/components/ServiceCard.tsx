import { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

const ServiceCard = ({ icon: Icon, title, description, features }: ServiceCardProps) => {
  return (
    <div className="card" style={{ height: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 'var(--space-lg)'
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
          marginRight: 'var(--space-md)'
        }}>
          <Icon size={24} />
        </div>
        <h3 style={{ margin: 0, color: 'var(--primary)' }}>
          {title}
        </h3>
      </div>

      <p style={{ 
        color: 'var(--text-secondary)', 
        marginBottom: 'var(--space-lg)',
        lineHeight: 1.6
      }}>
        {description}
      </p>

      <div>
        <h4 style={{ 
          fontSize: '1rem', 
          marginBottom: 'var(--space-md)',
          color: 'var(--text-primary)'
        }}>
          Ce que nous offrons :
        </h4>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {features.map((feature, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 'var(--space-sm)',
                color: 'var(--text-secondary)',
                fontSize: '0.95rem'
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
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 'var(--space-lg)' }}>
        <button className="btn btn-outline" style={{ width: '100%' }}>
          En savoir plus
        </button>
      </div>
    </div>
  )
}

export default ServiceCard


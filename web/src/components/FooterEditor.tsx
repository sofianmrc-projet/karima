import { useState, useEffect } from 'react';
import { Section } from '../lib/api';
import { Mail, Phone, MapPin, Building, FileText, Copyright } from 'lucide-react';

interface FooterEditorProps {
  sections: Section[];
  onSave: (updatedSections: Section[]) => void;
  onCancel: () => void;
}

const FooterEditor = ({ sections, onSave, onCancel }: FooterEditorProps) => {
  const [formData, setFormData] = useState({
    company: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    copyright: ''
  });

  const [saving, setSaving] = useState(false);

  // Initialiser les données du formulaire
  useEffect(() => {
    const getSectionContent = (key: string) => {
      const section = sections.find(s => s.key === key);
      return section?.content || '';
    };

    setFormData({
      company: getSectionContent('footer_company'),
      description: getSectionContent('footer_description'),
      email: getSectionContent('footer_email'),
      phone: getSectionContent('footer_phone'),
      address: getSectionContent('footer_address'),
      copyright: getSectionContent('footer_copyright')
    });
  }, [sections]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updatedSections = sections.map(section => {
        const key = section.key;
        let newContent = section.content;

        switch (key) {
          case 'footer_company':
            newContent = formData.company;
            break;
          case 'footer_description':
            newContent = formData.description;
            break;
          case 'footer_email':
            newContent = formData.email;
            break;
          case 'footer_phone':
            newContent = formData.phone;
            break;
          case 'footer_address':
            newContent = formData.address;
            break;
          case 'footer_copyright':
            newContent = formData.copyright;
            break;
        }

        return {
          ...section,
          content: newContent,
          updatedAt: new Date().toISOString()
        };
      });

      onSave(updatedSections);
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const footerFields = [
    {
      key: 'company',
      label: 'Nom de l\'entreprise',
      icon: Building,
      placeholder: 'Nom de votre entreprise',
      type: 'text'
    },
    {
      key: 'description',
      label: 'Description',
      icon: FileText,
      placeholder: 'Description de votre entreprise',
      type: 'textarea'
    },
    {
      key: 'email',
      label: 'Email de contact',
      icon: Mail,
      placeholder: 'contact@votre-entreprise.com',
      type: 'email'
    },
    {
      key: 'phone',
      label: 'Téléphone',
      icon: Phone,
      placeholder: '01 23 45 67 89',
      type: 'tel'
    },
    {
      key: 'address',
      label: 'Adresse',
      icon: MapPin,
      placeholder: '123 Rue de la Paix, 75001 Paris',
      type: 'text'
    },
    {
      key: 'copyright',
      label: 'Copyright',
      icon: Copyright,
      placeholder: '© 2025 Votre Entreprise. Tous droits réservés.',
      type: 'text'
    }
  ];

  return (
    <div className="card" style={{ padding: 'var(--space-2xl)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
        <h1>🦶 Modifier le Footer</h1>
        <button
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Retour
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: 'var(--space-xl)' }}>
          {footerFields.map(field => {
            const IconComponent = field.icon;
            const isTextarea = field.type === 'textarea';
            
            return (
              <div key={field.key} style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                padding: 'var(--space-lg)',
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--space-sm)',
                  marginBottom: 'var(--space-md)'
                }}>
                  <IconComponent size={20} style={{ color: 'var(--primary)' }} />
                  <label htmlFor={field.key} style={{ 
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    color: 'var(--text-primary)'
                  }}>
                    {field.label}
                  </label>
                </div>
                
                {isTextarea ? (
                  <textarea
                    id={field.key}
                    name={field.key}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: 'var(--space-md)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius)',
                      fontSize: '1rem',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.key}
                    name={field.key}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      padding: 'var(--space-md)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius)',
                      fontSize: '1rem',
                      fontFamily: 'inherit'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Aperçu du footer */}
        <div style={{ 
          marginTop: 'var(--space-2xl)',
          padding: 'var(--space-xl)',
          backgroundColor: 'var(--primary)',
          color: 'var(--text-white)',
          borderRadius: 'var(--radius)',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.5rem' }}>
            Aperçu du Footer
          </h3>
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <h4 style={{ margin: 0, marginBottom: 'var(--space-sm)' }}>
              {formData.company || 'Nom de l\'entreprise'}
            </h4>
            <p style={{ 
              color: 'var(--secondary-light)',
              marginBottom: 'var(--space-lg)',
              maxWidth: '600px',
              margin: '0 auto var(--space-lg) auto'
            }}>
              {formData.description || 'Description de l\'entreprise'}
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
                <span>{formData.email || 'contact@exemple.com'}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-sm)',
                color: 'var(--secondary-light)'
              }}>
                <Phone size={16} />
                <span>{formData.phone || '01 23 45 67 89'}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-sm)',
                color: 'var(--secondary-light)'
              }}>
                <MapPin size={16} />
                <span>{formData.address || '123 Rue de la Paix'}</span>
              </div>
            </div>
          </div>
          <div style={{ 
            paddingTop: 'var(--space-lg)',
            borderTop: '1px solid var(--secondary-light)',
            fontSize: '0.9rem',
            color: 'var(--secondary-light)'
          }}>
            {formData.copyright || '© 2025 Votre Entreprise. Tous droits réservés.'}
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: 'var(--space-md)', 
          marginTop: 'var(--space-xl)',
          paddingTop: 'var(--space-lg)',
          borderTop: '1px solid var(--border-color)'
        }}>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
            style={{ 
              minWidth: '120px',
              backgroundColor: '#2D3748',
              color: 'white',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              if (!saving) {
                e.currentTarget.style.backgroundColor = '#1A202C'
              }
            }}
            onMouseLeave={(e) => {
              if (!saving) {
                e.currentTarget.style.backgroundColor = '#2D3748'
              }
            }}
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            style={{ 
              minWidth: '120px',
              backgroundColor: '#6B7280',
              color: 'white',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4B5563'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#6B7280'
            }}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default FooterEditor;

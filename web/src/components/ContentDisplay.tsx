import { useState, useEffect } from 'react';
import { api } from '../lib/api';

const ContentDisplay = () => {
  const [content, setContent] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await api.getServiceContent();
        setContent(data);
      } catch (error) {
        console.error('Erreur lors du chargement du contenu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
        <p>Chargement du contenu...</p>
      </div>
    );
  }

  // Organiser le contenu par sections
  const sections = {
    '🏠 Accueil': {
      'Hero Section': [
        { key: 'home_hero_title', label: 'Titre principal' },
        { key: 'home_hero_subtitle', label: 'Sous-titre' },
        { key: 'home_hero_description', label: 'Description' },
        { key: 'home_hero_cta_text', label: 'Texte du bouton CTA' }
      ],
      'Section À propos': [
        { key: 'home_about_title', label: 'Titre À propos' },
        { key: 'home_about_description', label: 'Description À propos' }
      ],
      'Statistiques': [
        { key: 'home_stat_1_number', label: 'Statistique 1 - Nombre' },
        { key: 'home_stat_1_label', label: 'Statistique 1 - Label' },
        { key: 'home_stat_2_number', label: 'Statistique 2 - Nombre' },
        { key: 'home_stat_2_label', label: 'Statistique 2 - Label' },
        { key: 'home_stat_3_number', label: 'Statistique 3 - Nombre' },
        { key: 'home_stat_3_label', label: 'Statistique 3 - Label' }
      ]
    },
    '⚙️ Services': {
      'Hero Section': [
        { key: 'services_hero_title', label: 'Titre principal' },
        { key: 'services_hero_description', label: 'Description' }
      ],
      'Contenu principal': [
        { key: 'services_section_title', label: 'Titre des services' },
        { key: 'services_section_description', label: 'Description des services' },
        { key: 'services_process_title', label: 'Titre du processus' },
        { key: 'services_process_description', label: 'Description du processus' },
        { key: 'services_cta_title', label: 'Titre CTA' },
        { key: 'services_cta_description', label: 'Description CTA' }
      ]
    },
    '👥 À propos': {
      'Hero Section': [
        { key: 'about_hero_title', label: 'Titre principal' },
        { key: 'about_hero_description', label: 'Description' }
      ],
      'L\'entreprise': [
        { key: 'about_company_title', label: 'Titre de l\'entreprise' },
        { key: 'about_company_description', label: 'Description de l\'entreprise' }
      ],
      'L\'équipe': [
        { key: 'about_team_title', label: 'Titre de l\'équipe' },
        { key: 'about_team_description', label: 'Description de l\'équipe' }
      ],
      'Valeurs et Mission': [
        { key: 'about_values_title', label: 'Titre des valeurs' },
        { key: 'about_values_description', label: 'Description des valeurs' },
        { key: 'about_mission_title', label: 'Titre de la mission' },
        { key: 'about_mission_description', label: 'Description de la mission' }
      ]
    },
    '📝 Blog': {
      'Hero Section': [
        { key: 'blog_hero_title', label: 'Titre principal' },
        { key: 'blog_hero_description', label: 'Description' }
      ],
      'Contenu': [
        { key: 'blog_section_title', label: 'Titre de la section' },
        { key: 'blog_section_description', label: 'Description de la section' },
        { key: 'blog_cta_title', label: 'Titre CTA' },
        { key: 'blog_cta_description', label: 'Description CTA' }
      ]
    },
    '📞 Contact': {
      'Hero Section': [
        { key: 'contact_hero_title', label: 'Titre principal' },
        { key: 'contact_hero_description', label: 'Description' }
      ],
      'Informations': [
        { key: 'contact_info_title', label: 'Titre des informations' },
        { key: 'contact_address', label: 'Adresse' },
        { key: 'contact_phone', label: 'Téléphone' },
        { key: 'contact_email', label: 'Email' },
        { key: 'contact_hours', label: 'Horaires' }
      ]
    },
    '🦶 Footer': {
      'Contenu': [
        { key: 'footer_company_name', label: 'Nom de l\'entreprise' },
        { key: 'footer_description', label: 'Description' },
        { key: 'footer_copyright', label: 'Copyright' },
        { key: 'footer_links_title', label: 'Titre des liens' }
      ]
    }
  };

  return (
    <div className="content-display">
      <h2 style={{ marginBottom: 'var(--space-2xl)', textAlign: 'center' }}>
        📊 Contenu de la table ServiceContents
      </h2>
      <p style={{ 
        textAlign: 'center', 
        color: 'var(--text-secondary)', 
        marginBottom: 'var(--space-3xl)',
        fontSize: '1.125rem'
      }}>
        Voici tout le contenu stocké dans votre base de données, organisé par sections.
      </p>

      {Object.entries(sections).map(([sectionName, subsections]) => (
        <div key={sectionName} className="card" style={{ marginBottom: 'var(--space-2xl)' }}>
          <h3 style={{ 
            color: 'var(--primary)', 
            marginBottom: 'var(--space-lg)',
            borderBottom: '2px solid var(--primary)',
            paddingBottom: 'var(--space-sm)'
          }}>
            {sectionName}
          </h3>
          
          {Object.entries(subsections).map(([subsectionName, items]) => (
            <div key={subsectionName} style={{ marginBottom: 'var(--space-xl)' }}>
              <h4 style={{ 
                color: 'var(--text-primary)', 
                marginBottom: 'var(--space-md)',
                fontSize: '1.125rem'
              }}>
                {subsectionName}
              </h4>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: 'var(--space-md)' 
              }}>
                {items.map((item) => (
                  <div key={item.key} className="card" style={{ 
                    padding: 'var(--space-md)',
                    backgroundColor: 'var(--bg-secondary)'
                  }}>
                    <div style={{ 
                      fontWeight: '600', 
                      marginBottom: 'var(--space-sm)',
                      color: 'var(--primary)',
                      fontSize: '0.9rem'
                    }}>
                      {item.label}
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: 'var(--text-muted)',
                      marginBottom: 'var(--space-sm)',
                      fontFamily: 'monospace'
                    }}>
                      Clé: {item.key}
                    </div>
                    <div style={{ 
                      color: 'var(--text-primary)',
                      backgroundColor: 'white',
                      padding: 'var(--space-sm)',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--border-color)',
                      minHeight: '40px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {content[item.key] || <em style={{ color: 'var(--text-muted)' }}>Vide</em>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius)',
        textAlign: 'center',
        marginTop: 'var(--space-2xl)'
      }}>
        <h4 style={{ marginBottom: 'var(--space-md)' }}>
          📈 Statistiques
        </h4>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          <strong>{Object.keys(content).length}</strong> éléments de contenu stockés dans la base de données
        </p>
      </div>
    </div>
  );
};

export default ContentDisplay;

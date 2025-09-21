import { useState } from 'react';
import SectionEditor from '../components/SectionEditor';

const AdminContent = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

  const sections = {
    home: {
      name: '🏠 Page d\'Accueil',
      elements: [
        {
          key: 'home_hero_title',
          label: 'Titre principal',
          type: 'title' as const
        },
        {
          key: 'home_hero_subtitle',
          label: 'Sous-titre',
          type: 'description' as const
        },
        {
          key: 'home_hero_description',
          label: 'Description principale',
          type: 'description' as const
        },
        {
          key: 'home_hero_cta_text',
          label: 'Texte du bouton CTA',
          type: 'text' as const
        },
        {
          key: 'home_about_title',
          label: 'Titre À propos',
          type: 'title' as const
        },
        {
          key: 'home_about_description',
          label: 'Description À propos',
          type: 'description' as const
        },
        {
          key: 'home_stat_1_number',
          label: 'Statistique 1 - Nombre',
          type: 'text' as const
        },
        {
          key: 'home_stat_1_label',
          label: 'Statistique 1 - Label',
          type: 'text' as const
        },
        {
          key: 'home_stat_2_number',
          label: 'Statistique 2 - Nombre',
          type: 'text' as const
        },
        {
          key: 'home_stat_2_label',
          label: 'Statistique 2 - Label',
          type: 'text' as const
        },
        {
          key: 'home_stat_3_number',
          label: 'Statistique 3 - Nombre',
          type: 'text' as const
        },
        {
          key: 'home_stat_3_label',
          label: 'Statistique 3 - Label',
          type: 'text' as const
        }
      ]
    },
    services: {
      name: '⚙️ Page Services',
      elements: [
        {
          key: 'services_hero_title',
          label: 'Titre principal',
          type: 'title' as const
        },
        {
          key: 'services_hero_description',
          label: 'Description',
          type: 'description' as const
        },
        {
          key: 'services_section_title',
          label: 'Titre des services',
          type: 'title' as const
        },
        {
          key: 'services_section_description',
          label: 'Description des services',
          type: 'description' as const
        },
        {
          key: 'services_process_title',
          label: 'Titre du processus',
          type: 'title' as const
        },
        {
          key: 'services_process_description',
          label: 'Description du processus',
          type: 'description' as const
        },
        {
          key: 'services_cta_title',
          label: 'Titre CTA',
          type: 'title' as const
        },
        {
          key: 'services_cta_description',
          label: 'Description CTA',
          type: 'description' as const
        },
        {
          key: 'gallery_title',
          label: 'Titre de la galerie',
          type: 'title' as const
        },
        // Services détaillés
        {
          key: 'service_1_title',
          label: 'Service 1 - Titre',
          type: 'title' as const
        },
        {
          key: 'service_1_description',
          label: 'Service 1 - Description',
          type: 'description' as const
        },
        {
          key: 'service_1_features',
          label: 'Service 1 - Fonctionnalités (séparées par |)',
          type: 'text' as const
        },
        {
          key: 'service_2_title',
          label: 'Service 2 - Titre',
          type: 'title' as const
        },
        {
          key: 'service_2_description',
          label: 'Service 2 - Description',
          type: 'description' as const
        },
        {
          key: 'service_2_features',
          label: 'Service 2 - Fonctionnalités (séparées par |)',
          type: 'text' as const
        },
        {
          key: 'service_3_title',
          label: 'Service 3 - Titre',
          type: 'title' as const
        },
        {
          key: 'service_3_description',
          label: 'Service 3 - Description',
          type: 'description' as const
        },
        {
          key: 'service_3_features',
          label: 'Service 3 - Fonctionnalités (séparées par |)',
          type: 'text' as const
        },
        {
          key: 'service_4_title',
          label: 'Service 4 - Titre',
          type: 'title' as const
        },
        {
          key: 'service_4_description',
          label: 'Service 4 - Description',
          type: 'description' as const
        },
        {
          key: 'service_4_features',
          label: 'Service 4 - Fonctionnalités (séparées par |)',
          type: 'text' as const
        },
        {
          key: 'service_5_title',
          label: 'Service 5 - Titre',
          type: 'title' as const
        },
        {
          key: 'service_5_description',
          label: 'Service 5 - Description',
          type: 'description' as const
        },
        {
          key: 'service_5_features',
          label: 'Service 5 - Fonctionnalités (séparées par |)',
          type: 'text' as const
        },
        {
          key: 'service_6_title',
          label: 'Service 6 - Titre',
          type: 'title' as const
        },
        {
          key: 'service_6_description',
          label: 'Service 6 - Description',
          type: 'description' as const
        },
        {
          key: 'service_6_features',
          label: 'Service 6 - Fonctionnalités (séparées par |)',
          type: 'text' as const
        },
        // Processus de travail
        {
          key: 'process_step_1_number',
          label: 'Étape 1 - Numéro',
          type: 'text' as const
        },
        {
          key: 'process_step_1_title',
          label: 'Étape 1 - Titre',
          type: 'title' as const
        },
        {
          key: 'process_step_1_description',
          label: 'Étape 1 - Description',
          type: 'description' as const
        },
        {
          key: 'process_step_2_number',
          label: 'Étape 2 - Numéro',
          type: 'text' as const
        },
        {
          key: 'process_step_2_title',
          label: 'Étape 2 - Titre',
          type: 'title' as const
        },
        {
          key: 'process_step_2_description',
          label: 'Étape 2 - Description',
          type: 'description' as const
        },
        {
          key: 'process_step_3_number',
          label: 'Étape 3 - Numéro',
          type: 'text' as const
        },
        {
          key: 'process_step_3_title',
          label: 'Étape 3 - Titre',
          type: 'title' as const
        },
        {
          key: 'process_step_3_description',
          label: 'Étape 3 - Description',
          type: 'description' as const
        },
        {
          key: 'process_step_4_number',
          label: 'Étape 4 - Numéro',
          type: 'text' as const
        },
        {
          key: 'process_step_4_title',
          label: 'Étape 4 - Titre',
          type: 'title' as const
        },
        {
          key: 'process_step_4_description',
          label: 'Étape 4 - Description',
          type: 'description' as const
        }
      ]
    },
    about: {
      name: '👥 Page À propos',
      elements: [
        {
          key: 'about_hero_title',
          label: 'Titre principal',
          type: 'title' as const
        },
        {
          key: 'about_hero_description',
          label: 'Description',
          type: 'description' as const
        },
        {
          key: 'about_company_title',
          label: 'Titre de l\'entreprise',
          type: 'title' as const
        },
        {
          key: 'about_company_description',
          label: 'Description de l\'entreprise',
          type: 'description' as const
        },
        {
          key: 'about_team_title',
          label: 'Titre de l\'équipe',
          type: 'title' as const
        },
        {
          key: 'about_team_description',
          label: 'Description de l\'équipe',
          type: 'description' as const
        },
        {
          key: 'about_values_title',
          label: 'Titre des valeurs',
          type: 'title' as const
        },
        {
          key: 'about_values_description',
          label: 'Description des valeurs',
          type: 'description' as const
        },
        {
          key: 'about_mission_title',
          label: 'Titre de la mission',
          type: 'title' as const
        },
        {
          key: 'about_mission_description',
          label: 'Description de la mission',
          type: 'description' as const
        }
      ]
    },
    blog: {
      name: '📝 Page Blog',
      elements: [
        {
          key: 'blog_hero_title',
          label: 'Titre principal',
          type: 'title' as const
        },
        {
          key: 'blog_hero_description',
          label: 'Description',
          type: 'description' as const
        },
        {
          key: 'blog_section_title',
          label: 'Titre de la section',
          type: 'title' as const
        },
        {
          key: 'blog_section_description',
          label: 'Description de la section',
          type: 'description' as const
        },
        {
          key: 'blog_cta_title',
          label: 'Titre CTA',
          type: 'title' as const
        },
        {
          key: 'blog_cta_description',
          label: 'Description CTA',
          type: 'description' as const
        }
      ]
    },
    contact: {
      name: '📞 Page Contact',
      elements: [
        {
          key: 'contact_hero_title',
          label: 'Titre principal',
          type: 'title' as const
        },
        {
          key: 'contact_hero_description',
          label: 'Description',
          type: 'description' as const
        },
        {
          key: 'contact_info_title',
          label: 'Titre des informations',
          type: 'title' as const
        },
        {
          key: 'contact_address',
          label: 'Adresse',
          type: 'text' as const
        },
        {
          key: 'contact_phone',
          label: 'Téléphone',
          type: 'text' as const
        },
        {
          key: 'contact_email',
          label: 'Email',
          type: 'text' as const
        },
        {
          key: 'contact_hours',
          label: 'Horaires',
          type: 'text' as const
        }
      ]
    },
    footer: {
      name: '🦶 Footer',
      elements: [
        {
          key: 'footer_company_name',
          label: 'Nom de l\'entreprise',
          type: 'text' as const
        },
        {
          key: 'footer_description',
          label: 'Description',
          type: 'description' as const
        },
        {
          key: 'footer_copyright',
          label: 'Copyright',
          type: 'text' as const
        },
        {
          key: 'footer_links_title',
          label: 'Titre des liens',
          type: 'text' as const
        }
      ]
    }
  };

  return (
    <div className="admin-content">
      <h1 style={{ marginBottom: 'var(--space-2xl)', textAlign: 'center' }}>
        🎛️ Administration du Contenu
      </h1>
      <p style={{ 
        textAlign: 'center', 
        color: 'var(--text-secondary)', 
        marginBottom: 'var(--space-3xl)',
        fontSize: '1.125rem'
      }}>
        Modifiez le contenu de chaque section de votre site directement depuis cette interface.
      </p>

      {/* Navigation par sections */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-sm)',
        marginBottom: 'var(--space-2xl)',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {Object.entries(sections).map(([key, section]) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`btn ${activeSection === key ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '0.9rem' }}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Contenu de la section active */}
      {activeSection && sections[activeSection as keyof typeof sections] && (
        <SectionEditor
          sectionId={activeSection}
          sectionName={sections[activeSection as keyof typeof sections].name}
          elements={sections[activeSection as keyof typeof sections].elements}
        />
      )}

      {/* Instructions */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius)',
        marginTop: 'var(--space-2xl)',
        textAlign: 'center'
      }}>
        <h4 style={{ marginBottom: 'var(--space-md)' }}>
          💡 Instructions
        </h4>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Cliquez sur "✏️ Modifier" pour éditer un élément, puis "💾 Sauvegarder" pour enregistrer vos modifications.
          <br />
          Les changements sont immédiatement visibles sur le site public.
        </p>
      </div>
    </div>
  );
};

export default AdminContent;

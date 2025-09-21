import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import SyncManager from './SyncManager';
import SitePreview from './SitePreview';

interface SectionElement {
  id: string;
  type: 'text' | 'image' | 'title' | 'description';
  label: string;
  value: string;
  imageUrl?: string;
  category?: string;
  section: string;
  position: number;
}

interface VisualEditorProps {
  onSave: (element: SectionElement) => void;
  onImageSelect: (elementId: string, imageUrl: string) => void;
}

const VisualEditor = ({ onSave, onImageSelect }: VisualEditorProps) => {
  const [elements, setElements] = useState<SectionElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingElement, setEditingElement] = useState<SectionElement | null>(null);
  const [showImageSelector, setShowImageSelector] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Configuration des sections du site
  const siteSections = [
    // PAGE D'ACCUEIL
    {
      id: 'home_hero',
      name: '🏠 Accueil - Section Hero',
      description: 'En-tête principal de la page d\'accueil',
      elements: [
        { id: 'home_hero_title', type: 'title', label: 'Titre principal', section: 'home_hero', position: 1 },
        { id: 'home_hero_subtitle', type: 'description', label: 'Sous-titre', section: 'home_hero', position: 2 },
        { id: 'home_hero_description', type: 'description', label: 'Description principale', section: 'home_hero', position: 3 },
        { id: 'home_hero_image', type: 'image', label: 'Image de fond', section: 'home_hero', position: 4 },
        { id: 'home_hero_cta_text', type: 'text', label: 'Texte du bouton CTA', section: 'home_hero', position: 5 }
      ]
    },
    {
      id: 'home_about',
      name: '🏠 Accueil - Section À propos',
      description: 'Présentation rapide de l\'entreprise sur l\'accueil',
      elements: [
        { id: 'home_about_title', type: 'title', label: 'Titre À propos', section: 'home_about', position: 1 },
        { id: 'home_about_description', type: 'description', label: 'Description courte', section: 'home_about', position: 2 },
        { id: 'home_about_image', type: 'image', label: 'Image d\'illustration', section: 'home_about', position: 3 }
      ]
    },
    {
      id: 'home_stats',
      name: '🏠 Accueil - Statistiques',
      description: 'Chiffres clés et statistiques',
      elements: [
        { id: 'home_stats_title', type: 'title', label: 'Titre des statistiques', section: 'home_stats', position: 1 },
        { id: 'home_stat_1_number', type: 'text', label: 'Statistique 1 - Nombre', section: 'home_stats', position: 2 },
        { id: 'home_stat_1_label', type: 'text', label: 'Statistique 1 - Label', section: 'home_stats', position: 3 },
        { id: 'home_stat_2_number', type: 'text', label: 'Statistique 2 - Nombre', section: 'home_stats', position: 4 },
        { id: 'home_stat_2_label', type: 'text', label: 'Statistique 2 - Label', section: 'home_stats', position: 5 },
        { id: 'home_stat_3_number', type: 'text', label: 'Statistique 3 - Nombre', section: 'home_stats', position: 6 },
        { id: 'home_stat_3_label', type: 'text', label: 'Statistique 3 - Label', section: 'home_stats', position: 7 }
      ]
    },

    // PAGE SERVICES
    {
      id: 'services_hero',
      name: '⚙️ Services - Section Hero',
      description: 'En-tête de la page services',
      elements: [
        { id: 'services_hero_title', type: 'title', label: 'Titre principal', section: 'services_hero', position: 1 },
        { id: 'services_hero_description', type: 'description', label: 'Description principale', section: 'services_hero', position: 2 },
        { id: 'services_hero_image', type: 'image', label: 'Image de fond', section: 'services_hero', position: 3 }
      ]
    },
    {
      id: 'services_content',
      name: '⚙️ Services - Contenu principal',
      description: 'Présentation des services',
      elements: [
        { id: 'services_section_title', type: 'title', label: 'Titre des services', section: 'services_content', position: 1 },
        { id: 'services_section_description', type: 'description', label: 'Description des services', section: 'services_content', position: 2 },
        { id: 'services_process_title', type: 'title', label: 'Titre du processus', section: 'services_content', position: 3 },
        { id: 'services_process_description', type: 'description', label: 'Description du processus', section: 'services_content', position: 4 },
        { id: 'services_cta_title', type: 'title', label: 'Titre CTA', section: 'services_content', position: 5 },
        { id: 'services_cta_description', type: 'description', label: 'Description CTA', section: 'services_content', position: 6 }
      ]
    },

    // PAGE À PROPOS
    {
      id: 'about_hero',
      name: '👥 À propos - Section Hero',
      description: 'En-tête de la page à propos',
      elements: [
        { id: 'about_hero_title', type: 'title', label: 'Titre principal', section: 'about_hero', position: 1 },
        { id: 'about_hero_description', type: 'description', label: 'Description principale', section: 'about_hero', position: 2 },
        { id: 'about_hero_image', type: 'image', label: 'Image de fond', section: 'about_hero', position: 3 }
      ]
    },
    {
      id: 'about_company',
      name: '👥 À propos - L\'entreprise',
      description: 'Présentation de l\'entreprise',
      elements: [
        { id: 'about_company_title', type: 'title', label: 'Titre de l\'entreprise', section: 'about_company', position: 1 },
        { id: 'about_company_description', type: 'description', label: 'Description de l\'entreprise', section: 'about_company', position: 2 },
        { id: 'about_company_image', type: 'image', label: 'Image de l\'entreprise', section: 'about_company', position: 3 }
      ]
    },
    {
      id: 'about_team',
      name: '👥 À propos - L\'équipe',
      description: 'Présentation de l\'équipe',
      elements: [
        { id: 'about_team_title', type: 'title', label: 'Titre de l\'équipe', section: 'about_team', position: 1 },
        { id: 'about_team_description', type: 'description', label: 'Description de l\'équipe', section: 'about_team', position: 2 },
        { id: 'about_team_image', type: 'image', label: 'Photo d\'équipe', section: 'about_team', position: 3 }
      ]
    },
    {
      id: 'about_values',
      name: '👥 À propos - Nos valeurs',
      description: 'Valeurs et mission de l\'entreprise',
      elements: [
        { id: 'about_values_title', type: 'title', label: 'Titre des valeurs', section: 'about_values', position: 1 },
        { id: 'about_values_description', type: 'description', label: 'Description des valeurs', section: 'about_values', position: 2 },
        { id: 'about_mission_title', type: 'title', label: 'Titre de la mission', section: 'about_mission', position: 3 },
        { id: 'about_mission_description', type: 'description', label: 'Description de la mission', section: 'about_mission', position: 4 }
      ]
    },

    // PAGE BLOG
    {
      id: 'blog_hero',
      name: '📝 Blog - Section Hero',
      description: 'En-tête de la page blog',
      elements: [
        { id: 'blog_hero_title', type: 'title', label: 'Titre principal', section: 'blog_hero', position: 1 },
        { id: 'blog_hero_description', type: 'description', label: 'Description principale', section: 'blog_hero', position: 2 },
        { id: 'blog_hero_image', type: 'image', label: 'Image de fond', section: 'blog_hero', position: 3 }
      ]
    },
    {
      id: 'blog_content',
      name: '📝 Blog - Contenu',
      description: 'Contenu de la page blog',
      elements: [
        { id: 'blog_section_title', type: 'title', label: 'Titre de la section', section: 'blog_content', position: 1 },
        { id: 'blog_section_description', type: 'description', label: 'Description de la section', section: 'blog_content', position: 2 },
        { id: 'blog_cta_title', type: 'title', label: 'Titre CTA', section: 'blog_content', position: 3 },
        { id: 'blog_cta_description', type: 'description', label: 'Description CTA', section: 'blog_content', position: 4 }
      ]
    },

    // PAGE CONTACT
    {
      id: 'contact_hero',
      name: '📞 Contact - Section Hero',
      description: 'En-tête de la page contact',
      elements: [
        { id: 'contact_hero_title', type: 'title', label: 'Titre principal', section: 'contact_hero', position: 1 },
        { id: 'contact_hero_description', type: 'description', label: 'Description principale', section: 'contact_hero', position: 2 },
        { id: 'contact_hero_image', type: 'image', label: 'Image de fond', section: 'contact_hero', position: 3 }
      ]
    },
    {
      id: 'contact_info',
      name: '📞 Contact - Informations',
      description: 'Informations de contact',
      elements: [
        { id: 'contact_info_title', type: 'title', label: 'Titre des informations', section: 'contact_info', position: 1 },
        { id: 'contact_address', type: 'text', label: 'Adresse', section: 'contact_info', position: 2 },
        { id: 'contact_phone', type: 'text', label: 'Téléphone', section: 'contact_info', position: 3 },
        { id: 'contact_email', type: 'text', label: 'Email', section: 'contact_info', position: 4 },
        { id: 'contact_hours', type: 'text', label: 'Horaires', section: 'contact_info', position: 5 }
      ]
    },

    // FOOTER
    {
      id: 'footer',
      name: '🦶 Footer',
      description: 'Pied de page du site',
      elements: [
        { id: 'footer_company_name', type: 'text', label: 'Nom de l\'entreprise', section: 'footer', position: 1 },
        { id: 'footer_description', type: 'description', label: 'Description du footer', section: 'footer', position: 2 },
        { id: 'footer_copyright', type: 'text', label: 'Copyright', section: 'footer', position: 3 },
        { id: 'footer_links_title', type: 'text', label: 'Titre des liens', section: 'footer', position: 4 }
      ]
    }
  ];

  useEffect(() => {
    loadElements();
    
    // Synchronisation automatique avec l'API toutes les 30 secondes
    const syncInterval = setInterval(async () => {
      try {
        const localContent = loadFromLocalStorage();
        if (Object.keys(localContent).length > 0) {
          console.log('🔄 Tentative de synchronisation avec l\'API...');
          
          // Essayer de synchroniser chaque élément
          for (const [key, value] of Object.entries(localContent)) {
            try {
              const response = await fetch(`/api/Public/service-content/${key}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(value)
              });
              
              if (response.ok) {
                console.log(`✅ Synchronisé: ${key}`);
              }
            } catch (error) {
              console.log(`⚠️ Échec sync: ${key}`);
            }
          }
        }
      } catch (error) {
        console.log('⚠️ Synchronisation échouée');
      }
    }, 30000); // 30 secondes
    
    return () => clearInterval(syncInterval);
  }, []);

  const loadElements = async () => {
    try {
      setLoading(true);
      
      // 1. Essayer de charger depuis l'API
      let apiContent = {};
      try {
        apiContent = await api.getServiceContent();
        console.log('Contenu API chargé:', apiContent);
      } catch (error) {
        console.log('API non accessible, utilisation du localStorage');
      }
      
      // 2. Charger depuis localStorage
      const localContent = loadFromLocalStorage();
      console.log('Contenu local chargé:', localContent);
      
      // 3. Fusionner : API en priorité, puis localStorage
      const mergedContent = { ...localContent, ...apiContent };
      
      // Transformer en éléments visuels
      const visualElements: SectionElement[] = [];
      
      siteSections.forEach(section => {
        section.elements.forEach(element => {
          const elementValue = mergedContent[element.id] || '';
          const elementImageUrl = element.type === 'image' ? (mergedContent[`${element.id}_url`] || '') : undefined;
          
          visualElements.push({
            ...element,
            value: elementValue,
            imageUrl: elementImageUrl,
            category: element.type === 'image' ? 'hero' : undefined
          });
        });
      });
      
      setElements(visualElements);
    } catch (error) {
      console.error('Erreur lors du chargement des éléments:', error);
      // En cas d'erreur, initialiser avec des valeurs par défaut
      const visualElements: SectionElement[] = [];
      siteSections.forEach(section => {
        section.elements.forEach(element => {
          visualElements.push({
            ...element,
            value: '',
            imageUrl: element.type === 'image' ? '' : undefined,
            category: element.type === 'image' ? 'hero' : undefined
          });
        });
      });
      setElements(visualElements);
    } finally {
      setLoading(false);
    }
  };

  // Fonctions de gestion du localStorage
  const saveToLocalStorage = (elements: SectionElement[]) => {
    const content: { [key: string]: string } = {};
    elements.forEach(element => {
      if (element.type === 'image') {
        content[element.id] = element.imageUrl || '';
        content[`${element.id}_url`] = element.imageUrl || '';
      } else {
        content[element.id] = element.value;
      }
    });
    
    localStorage.setItem('karima_visual_editor_content', JSON.stringify(content));
    console.log('Contenu sauvegardé dans localStorage:', content);
  };

  const loadFromLocalStorage = (): { [key: string]: string } => {
    try {
      const stored = localStorage.getItem('karima_visual_editor_content');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Erreur lors du chargement du localStorage:', error);
      return {};
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('karima_visual_editor_content');
    console.log('localStorage vidé');
  };

  // Fonctions de synchronisation
  const syncWithAPI = async () => {
    try {
      const localContent = loadFromLocalStorage();
      if (Object.keys(localContent).length === 0) {
        alert('❌ Aucun contenu local à synchroniser');
        return;
      }

      let successCount = 0;
      let errorCount = 0;

      for (const [key, value] of Object.entries(localContent)) {
        try {
          const response = await fetch(`/api/Public/service-content/${key}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(value)
          });
          
          if (response.ok) {
            successCount++;
            console.log(`✅ Synchronisé: ${key}`);
          } else {
            errorCount++;
            console.log(`❌ Échec: ${key} (${response.status})`);
          }
        } catch (error) {
          errorCount++;
          console.log(`❌ Erreur: ${key}`);
        }
      }

      alert(`🔄 Synchronisation terminée !\n✅ ${successCount} éléments synchronisés\n❌ ${errorCount} erreurs`);
    } catch (error) {
      console.error('Erreur lors de la synchronisation:', error);
      alert('❌ Erreur lors de la synchronisation');
    }
  };

  const exportContent = () => {
    const localContent = loadFromLocalStorage();
    const dataStr = JSON.stringify(localContent, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `karima-content-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importContent = (content: string) => {
    try {
      const parsedContent = JSON.parse(content);
      localStorage.setItem('karima_visual_editor_content', JSON.stringify(parsedContent));
      loadElements(); // Recharger les éléments
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      throw error;
    }
  };

  const handleEdit = (element: SectionElement) => {
    setEditingElement(element);
  };

  const handleSave = async () => {
    if (!editingElement) return;
    
    // 1. Mettre à jour l'état local immédiatement
    const updatedElements = elements.map(el => 
      el.id === editingElement.id ? editingElement : el
    );
    setElements(updatedElements);
    
    // 2. Sauvegarder dans localStorage immédiatement
    saveToLocalStorage(updatedElements);
    
    setEditingElement(null);
    
    // 3. Essayer de sauvegarder via l'API en arrière-plan (sans bloquer)
    try {
      const contentToSave = editingElement.type === 'image' ? (editingElement.imageUrl || '') : editingElement.value;
      
      const updateResponse = await fetch(`/api/Public/service-content/${editingElement.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentToSave)
      });

      if (updateResponse.ok) {
        console.log('✅ Sauvegarde API réussie pour', editingElement.id);
        // Optionnel : afficher une notification discrète
      } else {
        throw new Error('Erreur API');
      }
    } catch (error) {
      console.log('⚠️ Sauvegarde API échouée pour', editingElement.id, '- Contenu sauvegardé localement');
    }
    
    alert('✅ Modification sauvegardée ! (Persistante même après refresh)');
  };

  const handleImageSelect = (elementId: string) => {
    setShowImageSelector(elementId);
  };

  const handleImageSelected = (imageUrl: string) => {
    if (editingElement) {
      const updatedElement = { ...editingElement, imageUrl };
      setEditingElement(updatedElement);
    }
    setShowImageSelector(null);
  };

  const [mediaFiles, setMediaFiles] = useState<any[]>([]);

  const loadMediaFiles = async () => {
    try {
      const response = await fetch('/api/Public/media');
      if (response.ok) {
        const files = await response.json();
        setMediaFiles(files);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des médias:', error);
    }
  };

  useEffect(() => {
    if (showImageSelector) {
      loadMediaFiles();
    }
  }, [showImageSelector]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
        <p>Chargement de l'éditeur visuel...</p>
      </div>
    );
  }

  // Convertir les éléments en contenu pour la prévisualisation
  const getContentForPreview = () => {
    const content: { [key: string]: string } = {};
    elements.forEach(element => {
      if (element.type === 'image') {
        content[element.id] = element.imageUrl || '';
        content[`${element.id}_url`] = element.imageUrl || '';
      } else {
        content[element.id] = element.value;
      }
    });
    return content;
  };

  return (
    <div className="visual-editor">
      <SyncManager 
        onSync={syncWithAPI}
        onExport={exportContent}
        onImport={importContent}
      />
      
      {/* Navigation par onglets */}
      <div style={{
        display: 'flex',
        borderBottom: '2px solid var(--border-color)',
        marginBottom: 'var(--space-2xl)'
      }}>
        <button
          onClick={() => setActiveTab('editor')}
          style={{
            padding: 'var(--space-lg) var(--space-xl)',
            border: 'none',
            backgroundColor: activeTab === 'editor' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'editor' ? 'white' : 'var(--text-secondary)',
            fontWeight: activeTab === 'editor' ? '600' : '400',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            transition: 'all 0.2s ease'
          }}
        >
          ✏️ Éditeur Visuel
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          style={{
            padding: 'var(--space-lg) var(--space-xl)',
            border: 'none',
            backgroundColor: activeTab === 'preview' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'preview' ? 'white' : 'var(--text-secondary)',
            fontWeight: activeTab === 'preview' ? '600' : '400',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            transition: 'all 0.2s ease'
          }}
        >
          👁️ Prévisualisation du Site
        </button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'editor' && (
        <div>
          <div style={{ marginBottom: 'var(--space-xl)' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: 'var(--space-lg)',
          flexWrap: 'wrap',
          gap: 'var(--space-md)'
        }}>
          <div>
            <h2 style={{ margin: 0 }}>🎨 Éditeur Visuel du Site</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-sm) 0 0 0' }}>
              Modifiez directement chaque élément de votre site. Cliquez sur un élément pour l'éditer.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                const localContent = loadFromLocalStorage();
                const count = Object.keys(localContent).length;
                alert(`📊 Contenu local : ${count} éléments sauvegardés\n\nDétails :\n${JSON.stringify(localContent, null, 2)}`);
              }}
              className="btn btn-outline"
              style={{ fontSize: '0.9rem' }}
            >
              📊 Voir le contenu local
            </button>
            <button
              onClick={() => {
                if (confirm('Êtes-vous sûr de vouloir vider le contenu local ? Cette action est irréversible.')) {
                  clearLocalStorage();
                  loadElements(); // Recharger depuis l'API
                  alert('🗑️ Contenu local vidé !');
                }
              }}
              className="btn btn-outline"
              style={{ fontSize: '0.9rem', color: 'var(--danger)' }}
            >
              🗑️ Vider le local
            </button>
            <button
              onClick={() => {
                saveToLocalStorage(elements);
                alert('💾 Contenu actuel sauvegardé localement !');
              }}
              className="btn btn-primary"
              style={{ fontSize: '0.9rem' }}
            >
              💾 Sauvegarder maintenant
            </button>
          </div>
        </div>
      </div>

      {siteSections.map(section => (
        <div key={section.id} className="card" style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ 
            borderBottom: '2px solid var(--primary)', 
            paddingBottom: 'var(--space-md)',
            marginBottom: 'var(--space-lg)'
          }}>
            <h3 style={{ margin: 0, color: 'var(--primary)' }}>{section.name}</h3>
            <p style={{ margin: 'var(--space-sm) 0 0 0', color: 'var(--text-secondary)' }}>
              {section.description}
            </p>
          </div>

          <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
            {section.elements.map(element => {
              const elementData = elements.find(el => el.id === element.id);
              if (!elementData) return null;

              return (
                <div key={element.id} className="element-editor">
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 'var(--space-sm)'
                  }}>
                    <label style={{ fontWeight: '500', fontSize: '1rem' }}>
                      {element.label}
                    </label>
                    <button
                      onClick={() => handleEdit(elementData)}
                      className="btn btn-outline"
                      style={{ fontSize: '0.9rem' }}
                    >
                      ✏️ Modifier
                    </button>
                  </div>

                  {element.type === 'image' ? (
                    <div style={{
                      border: '2px dashed var(--border-color)',
                      borderRadius: 'var(--radius)',
                      padding: 'var(--space-lg)',
                      textAlign: 'center',
                      backgroundColor: 'var(--bg-secondary)',
                      minHeight: '120px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: 'var(--space-md)'
                    }}>
                      {elementData.imageUrl ? (
                        <div>
                          <img
                            src={elementData.imageUrl}
                            alt={element.label}
                            style={{
                              maxWidth: '200px',
                              maxHeight: '100px',
                              objectFit: 'cover',
                              borderRadius: 'var(--radius)',
                              marginBottom: 'var(--space-sm)'
                            }}
                          />
                          <div style={{ 
                            fontSize: '0.8rem', 
                            color: 'var(--text-secondary)',
                            marginBottom: 'var(--space-sm)'
                          }}>
                            Image actuelle
                          </div>
                        </div>
                      ) : (
                        <div style={{ color: 'var(--text-muted)' }}>
                          📷 Aucune image sélectionnée
                        </div>
                      )}
                      <button
                        onClick={() => handleImageSelect(element.id)}
                        className="btn btn-primary"
                        style={{ fontSize: '0.9rem' }}
                      >
                        {elementData.imageUrl ? 'Changer l\'image' : 'Sélectionner une image'}
                      </button>
                    </div>
                  ) : (
                    <div style={{
                      padding: 'var(--space-md)',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--border-color)',
                      minHeight: '60px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <div style={{ 
                        fontSize: element.type === 'title' ? '1.5rem' : '1rem',
                        fontWeight: element.type === 'title' ? '600' : '400',
                        color: elementData.value ? 'var(--text-primary)' : 'var(--text-muted)',
                        fontStyle: elementData.value ? 'normal' : 'italic'
                      }}>
                        {elementData.value || `[${element.label} - Cliquez pour modifier]`}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
        </div>
      )}

      {/* Onglet Prévisualisation */}
      {activeTab === 'preview' && (
        <SitePreview 
          content={getContentForPreview()}
          onEdit={(elementId) => {
            setActiveTab('editor');
            const element = elements.find(el => el.id === elementId);
            if (element) {
              handleEdit(element);
            }
          }}
        />
      )}

      {/* Modal d'édition */}
      {editingElement && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 'var(--space-lg)'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-xl)',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h3 style={{ marginBottom: 'var(--space-lg)' }}>
              Modifier : {editingElement.label}
            </h3>
            
            {editingElement.type === 'image' ? (
              <div>
                <p>Image actuelle :</p>
                {editingElement.imageUrl && (
                  <img
                    src={editingElement.imageUrl}
                    alt={editingElement.label}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius)',
                      marginBottom: 'var(--space-md)'
                    }}
                  />
                )}
                <button
                  onClick={() => handleImageSelect(editingElement.id)}
                  className="btn btn-primary"
                  style={{ marginBottom: 'var(--space-lg)' }}
                >
                  {editingElement.imageUrl ? 'Changer l\'image' : 'Sélectionner une image'}
                </button>
              </div>
            ) : (
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--space-sm)', fontWeight: '500' }}>
                  Contenu :
                </label>
                <textarea
                  value={editingElement.value}
                  onChange={(e) => setEditingElement({...editingElement, value: e.target.value})}
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: 'var(--space-md)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius)',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  placeholder={`Saisissez le contenu pour ${editingElement.label}...`}
                />
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              gap: 'var(--space-md)', 
              justifyContent: 'flex-end',
              marginTop: 'var(--space-lg)'
            }}>
              <button
                onClick={() => setEditingElement(null)}
                className="btn btn-secondary"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="btn btn-primary"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sélecteur d'images */}
      {showImageSelector && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
          padding: 'var(--space-lg)'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-xl)',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-lg)',
              paddingBottom: 'var(--space-md)',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <h3 style={{ margin: 0 }}>Sélectionner une image</h3>
              <button
                onClick={() => setShowImageSelector(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)'
                }}
              >
                ×
              </button>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
              Choisissez une image depuis votre médiathèque :
            </p>

            {mediaFiles.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: 'var(--space-2xl)',
                color: 'var(--text-secondary)'
              }}>
                <p>📷 Aucune image trouvée dans votre médiathèque.</p>
                <p>Uploadez d'abord des images depuis la section Médias.</p>
                <button
                  onClick={() => setShowImageSelector(null)}
                  className="btn btn-primary"
                  style={{ marginTop: 'var(--space-md)' }}
                >
                  Fermer
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: 'var(--space-md)',
                maxHeight: '400px',
                overflow: 'auto',
                marginBottom: 'var(--space-lg)'
              }}>
                {mediaFiles.map((media) => (
                  <div
                    key={media.id}
                    onClick={() => handleImageSelected(media.filePath)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: 'var(--radius)',
                      overflow: 'hidden',
                      border: '2px solid transparent',
                      transition: 'all 0.2s ease',
                      backgroundColor: 'var(--bg-secondary)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <img
                      src={media.filePath}
                      alt={media.altText || media.fileName}
                      style={{
                        width: '100%',
                        height: '120px',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div style={{
                      padding: 'var(--space-sm)',
                      fontSize: '0.8rem'
                    }}>
                      <div style={{ 
                        fontWeight: '500', 
                        marginBottom: 'var(--space-xs)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {media.fileName}
                      </div>
                      {media.category && (
                        <div style={{ 
                          color: 'var(--text-secondary)',
                          fontSize: '0.7rem'
                        }}>
                          {media.category}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              gap: 'var(--space-md)', 
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowImageSelector(null)}
                className="btn btn-secondary"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualEditor;

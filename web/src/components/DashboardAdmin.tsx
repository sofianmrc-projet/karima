import { useState, useEffect } from 'react';
import { api, Section } from '../lib/api';
import SectionEditor from './SectionEditor';

const DashboardAdmin = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      setLoading(true);
      const data = await api.getSectionsForAdmin();
      setSections(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSection = async (updatedSection: Section) => {
    try {
      await api.updateSection(updatedSection.id, {
        key: updatedSection.key,
        title: updatedSection.title,
        content: updatedSection.content,
        description: updatedSection.description,
        imageUrl: updatedSection.imageUrl,
        altText: updatedSection.altText,
        category: updatedSection.category,
        sortOrder: updatedSection.sortOrder,
        isActive: updatedSection.isActive
      });
      
      setSections(prev => 
        prev.map(s => s.id === updatedSection.id ? updatedSection : s)
      );
      setSelectedSection(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    }
  };

  const handleDeleteSection = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette section ?')) {
      return;
    }

    try {
      await api.deleteSection(id);
      setSections(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  // Grouper les sections par catégorie
  const sectionsByCategory = sections.reduce((acc, section) => {
    const category = section.category || 'Sans catégorie';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(section);
    return acc;
  }, {} as Record<string, Section[]>);

  // Trier les sections dans chaque catégorie par sortOrder
  Object.keys(sectionsByCategory).forEach(category => {
    sectionsByCategory[category].sort((a, b) => a.sortOrder - b.sortOrder);
  });

  const categories = Object.keys(sectionsByCategory).sort();

  if (loading) {
    return (
      <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
        <p>Chargement des sections...</p>
      </div>
    );
  }

  if (selectedSection) {
    return (
      <SectionEditor
        section={selectedSection}
        onSave={handleUpdateSection}
        onCancel={() => setSelectedSection(null)}
      />
    );
  }

  return (
    <div>
      <div className="card" style={{ padding: 'var(--space-2xl)' }}>
        <h1 style={{ marginBottom: 'var(--space-xl)', textAlign: 'center' }}>
          🎛️ Tableau de bord - Gestion du contenu
        </h1>
        
        {error && (
          <div style={{
            padding: 'var(--space-md)',
            backgroundColor: 'var(--danger-light)',
            color: 'var(--danger)',
            borderRadius: 'var(--radius)',
            marginBottom: 'var(--space-lg)'
          }}>
            {error}
          </div>
        )}

        {/* Navigation rapide par catégorie */}
        <div style={{ 
          marginBottom: 'var(--space-2xl)',
          padding: 'var(--space-lg)',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ marginBottom: 'var(--space-md)', textAlign: 'center' }}>
            📋 Navigation rapide
          </h3>
          <div style={{ 
            display: 'flex', 
            gap: 'var(--space-sm)', 
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  const element = document.getElementById(`category-${category}`);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-outline"
                style={{ fontSize: '0.9rem' }}
              >
                {category} ({sectionsByCategory[category].length})
              </button>
            ))}
          </div>
        </div>

        {/* Affichage par catégorie */}
        {categories.map(category => (
          <div key={category} id={`category-${category}`} style={{ marginBottom: 'var(--space-3xl)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 'var(--space-lg)',
              padding: 'var(--space-md)',
              backgroundColor: 'var(--primary)',
              color: 'white',
              borderRadius: 'var(--radius)',
              position: 'sticky',
              top: '0',
              zIndex: 10
            }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem' }}>
                {category} ({sectionsByCategory[category].length} sections)
              </h2>
            </div>

            <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
              {sectionsByCategory[category].map(section => (
                <div key={section.id} style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius)',
                  padding: 'var(--space-lg)',
                  backgroundColor: section.isActive ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem' }}>
                        {section.title}
                      </h3>
                      <p style={{ 
                        margin: 'var(--space-xs) 0 0 0', 
                        color: 'var(--text-secondary)', 
                        fontSize: '0.9rem',
                        fontFamily: 'monospace'
                      }}>
                        {section.key}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)', marginLeft: 'var(--space-md)' }}>
                      <button
                        onClick={() => setSelectedSection(section)}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.9rem' }}
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteSection(section.id)}
                        className="btn btn-danger"
                        style={{ fontSize: '0.9rem' }}
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: 'var(--space-md)' }}>
                    <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: '1.5' }}>
                      {section.content.length > 150 
                        ? `${section.content.substring(0, 150)}...` 
                        : section.content
                      }
                    </p>
                  </div>

                  {section.description && (
                    <p style={{ 
                      margin: 0, 
                      color: 'var(--text-secondary)', 
                      fontSize: '0.9rem',
                      fontStyle: 'italic',
                      marginBottom: 'var(--space-md)'
                    }}>
                      {section.description}
                    </p>
                  )}

                  {section.imageUrl && (
                    <div style={{ marginBottom: 'var(--space-md)' }}>
                      <img 
                        src={section.imageUrl} 
                        alt={section.altText || section.title}
                        style={{ 
                          maxWidth: '200px', 
                          height: 'auto', 
                          borderRadius: 'var(--radius)',
                          border: '1px solid var(--border-color)'
                        }}
                      />
                    </div>
                  )}

                  <div style={{ 
                    paddingTop: 'var(--space-md)', 
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                      <span style={{ 
                        padding: 'var(--space-xs) var(--space-sm)',
                        backgroundColor: section.isActive ? 'var(--success-light)' : 'var(--warning-light)',
                        color: section.isActive ? 'var(--success)' : 'var(--warning)',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: '500'
                      }}>
                        {section.isActive ? '✅ Actif' : '⏸️ Inactif'}
                      </span>
                      <span>Ordre: {section.sortOrder}</span>
                    </div>
                    <span>
                      Modifié: {new Date(section.updatedAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {sections.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: 'var(--space-3xl)',
            color: 'var(--text-secondary)'
          }}>
            <h3>Aucune section trouvée</h3>
            <p>Commencez par ajouter des sections via l'API ou créez-en de nouvelles.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;

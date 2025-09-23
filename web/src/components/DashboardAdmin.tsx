import { useState, useEffect } from 'react';
import { api, Section } from '../lib/api';
import SectionEditor from './SectionEditor';

const DashboardAdmin = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [filter, setFilter] = useState<string>('all');

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

  const filteredSections = filter === 'all' 
    ? sections 
    : sections.filter(s => s.category === filter);

  const categories = [...new Set(sections.map(s => s.category).filter(Boolean))];

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
        <h1 style={{ marginBottom: 'var(--space-xl)' }}>Tableau de bord - Gestion du contenu</h1>
        
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

        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <label htmlFor="filter" style={{ 
            display: 'block', 
            marginBottom: 'var(--space-sm)',
            fontWeight: '500'
          }}>
            Filtrer par catégorie :
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: 'var(--space-sm)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius)',
              fontSize: '1rem'
            }}
          >
            <option value="all">Toutes les catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
          {filteredSections.map(section => (
            <div key={section.id} style={{
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius)',
              padding: 'var(--space-lg)',
              backgroundColor: section.isActive ? 'var(--bg-primary)' : 'var(--bg-secondary)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>
                    {section.title}
                  </h3>
                  <p style={{ margin: 'var(--space-xs) 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {section.category} • {section.key}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <button
                    onClick={() => setSelectedSection(section)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.9rem' }}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    className="btn btn-danger"
                    style={{ fontSize: '0.9rem' }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              
              <div style={{ marginBottom: 'var(--space-md)' }}>
                <p style={{ margin: 0, color: 'var(--text-primary)' }}>
                  {section.content.length > 100 
                    ? `${section.content.substring(0, 100)}...` 
                    : section.content
                  }
                </p>
              </div>

              {section.description && (
                <p style={{ 
                  margin: 0, 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.9rem',
                  fontStyle: 'italic'
                }}>
                  {section.description}
                </p>
              )}

              {section.imageUrl && (
                <div style={{ marginTop: 'var(--space-md)' }}>
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
                marginTop: 'var(--space-md)', 
                paddingTop: 'var(--space-md)', 
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
                <span>
                  Ordre: {section.sortOrder} • 
                  {section.isActive ? ' Actif' : ' Inactif'}
                </span>
                <span>
                  Modifié: {new Date(section.updatedAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredSections.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: 'var(--space-2xl)',
            color: 'var(--text-secondary)'
          }}>
            <p>Aucune section trouvée pour cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;

import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface SectionEditorProps {
  sectionId: string;
  sectionName: string;
  elements: Array<{
    key: string;
    label: string;
    type: 'title' | 'description' | 'text' | 'image';
  }>;
}

const SectionEditor = ({ sectionId, sectionName, elements }: SectionEditorProps) => {
  const [content, setContent] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

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

  const handleEdit = (key: string) => {
    setEditingKey(key);
    setEditValue(content[key] || '');
  };

  const handleSave = async () => {
    if (!editingKey) return;

    try {
      // Sauvegarder via l'API
      const response = await fetch(`/api/Public/service-content/${editingKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editValue)
      });

      if (response.ok) {
        // Mettre à jour le contenu local
        setContent(prev => ({ ...prev, [editingKey]: editValue }));
        setEditingKey(null);
        alert('✅ Modification sauvegardée avec succès !');
      } else {
        throw new Error('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('❌ Erreur lors de la sauvegarde. Vérifiez que l\'API est démarrée.');
    }
  };

  const handleCancel = () => {
    setEditingKey(null);
    setEditValue('');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
        <p>Chargement de la section {sectionName}...</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
      <h3 style={{ 
        color: 'var(--primary)', 
        marginBottom: 'var(--space-lg)',
        borderBottom: '2px solid var(--primary)',
        paddingBottom: 'var(--space-sm)'
      }}>
        {sectionName}
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: 'var(--space-md)' 
      }}>
        {elements.map((element) => (
          <div key={element.key} className="card" style={{ 
            padding: 'var(--space-md)',
            backgroundColor: 'var(--bg-secondary)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 'var(--space-sm)'
            }}>
              <h4 style={{ 
                margin: 0, 
                fontSize: '1rem',
                color: 'var(--primary)'
              }}>
                {element.label}
              </h4>
              <button
                onClick={() => handleEdit(element.key)}
                className="btn btn-sm btn-outline"
                style={{ fontSize: '0.8rem' }}
              >
                ✏️ Modifier
              </button>
            </div>
            
            <div style={{ 
              fontSize: '0.8rem', 
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-sm)',
              fontFamily: 'monospace'
            }}>
              Clé: {element.key}
            </div>

            {editingKey === element.key ? (
              <div>
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: 'var(--space-sm)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius)',
                    marginBottom: 'var(--space-sm)',
                    fontSize: '0.9rem'
                  }}
                />
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <button
                    onClick={handleSave}
                    className="btn btn-sm btn-primary"
                  >
                    💾 Sauvegarder
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-sm btn-secondary"
                  >
                    ❌ Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ 
                color: 'var(--text-primary)',
                backgroundColor: 'white',
                padding: 'var(--space-sm)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border-color)',
                minHeight: '60px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.9rem'
              }}>
                {content[element.key] || <em style={{ color: 'var(--text-muted)' }}>Vide</em>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionEditor;

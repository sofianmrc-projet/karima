import { useState, useEffect } from 'react';
import { Section } from '../lib/api';

interface SectionEditorProps {
  section: Section;
  onSave: (section: Section) => void;
  onCancel: () => void;
}

const SectionEditor = ({ section, onSave, onCancel }: SectionEditorProps) => {
  const [formData, setFormData] = useState({
    key: section.key,
    title: section.title,
    content: section.content,
    description: section.description || '',
    imageUrl: section.imageUrl || '',
    altText: section.altText || '',
    category: section.category || '',
    sortOrder: section.sortOrder,
    isActive: section.isActive
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updatedSection: Section = {
        ...section,
        ...formData,
        updatedAt: new Date().toISOString()
      };
      
      onSave(updatedSection);
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="card" style={{ padding: 'var(--space-2xl)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
        <h1>Modifier la section</h1>
        <button
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Retour
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
            <div>
              <label htmlFor="key" style={{ 
                display: 'block', 
                marginBottom: 'var(--space-sm)',
                fontWeight: '500'
              }}>
                Clé (identifiant unique) *
              </label>
              <input
                type="text"
                id="key"
                name="key"
                value={formData.key}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: 'var(--space-md)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius)',
                  fontSize: '1rem'
                }}
                placeholder="ex: home_hero"
              />
            </div>

            <div>
              <label htmlFor="category" style={{ 
                display: 'block', 
                marginBottom: 'var(--space-sm)',
                fontWeight: '500'
              }}>
                Catégorie
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: 'var(--space-md)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius)',
                  fontSize: '1rem'
                }}
                placeholder="ex: Accueil, Services, Contact"
              />
            </div>
          </div>

          <div>
            <label htmlFor="title" style={{ 
              display: 'block', 
              marginBottom: 'var(--space-sm)',
              fontWeight: '500'
            }}>
              Titre *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 'var(--space-md)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                fontSize: '1rem'
              }}
              placeholder="Titre de la section"
            />
          </div>

          <div>
            <label htmlFor="content" style={{ 
              display: 'block', 
              marginBottom: 'var(--space-sm)',
              fontWeight: '500'
            }}>
              Contenu *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={6}
              style={{
                width: '100%',
                padding: 'var(--space-md)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                fontSize: '1rem',
                resize: 'vertical'
              }}
              placeholder="Contenu principal de la section"
            />
          </div>

          <div>
            <label htmlFor="description" style={{ 
              display: 'block', 
              marginBottom: 'var(--space-sm)',
              fontWeight: '500'
            }}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              style={{
                width: '100%',
                padding: 'var(--space-md)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                fontSize: '1rem',
                resize: 'vertical'
              }}
              placeholder="Description optionnelle de la section"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
            <div>
              <label htmlFor="imageUrl" style={{ 
                display: 'block', 
                marginBottom: 'var(--space-sm)',
                fontWeight: '500'
              }}>
                URL de l'image
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: 'var(--space-md)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius)',
                  fontSize: '1rem'
                }}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label htmlFor="altText" style={{ 
                display: 'block', 
                marginBottom: 'var(--space-sm)',
                fontWeight: '500'
              }}>
                Texte alternatif de l'image
              </label>
              <input
                type="text"
                id="altText"
                name="altText"
                value={formData.altText}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: 'var(--space-md)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius)',
                  fontSize: '1rem'
                }}
                placeholder="Description de l'image"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
            <div>
              <label htmlFor="sortOrder" style={{ 
                display: 'block', 
                marginBottom: 'var(--space-sm)',
                fontWeight: '500'
              }}>
                Ordre d'affichage
              </label>
              <input
                type="number"
                id="sortOrder"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: 'var(--space-md)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius)',
                  fontSize: '1rem'
                }}
                placeholder="0"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 'var(--space-lg)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ fontWeight: '500' }}>Section active</span>
              </label>
            </div>
          </div>

          {formData.imageUrl && (
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: 'var(--space-sm)',
                fontWeight: '500'
              }}>
                Aperçu de l'image
              </label>
              <img 
                src={formData.imageUrl} 
                alt={formData.altText || formData.title}
                style={{ 
                  maxWidth: '300px', 
                  height: 'auto', 
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border-color)'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
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
            style={{ minWidth: '120px' }}
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            style={{ minWidth: '120px' }}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default SectionEditor;
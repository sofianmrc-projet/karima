import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface MediaFile {
  id: number;
  fileName: string;
  filePath: string;
  altText?: string;
  description?: string;
  category?: string;
  createdAt: string;
}

interface ImageSelectorProps {
  onImageSelect: (imageUrl: string, altText?: string) => void;
  category?: string;
  showModal?: boolean;
  onClose?: () => void;
}

const ImageSelector = ({ 
  onImageSelect, 
  category, 
  showModal = false, 
  onClose 
}: ImageSelectorProps) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [mediaResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/Public/media${selectedCategory ? `?category=${selectedCategory}` : ''}`),
          fetch('/api/Media/categories')
        ]);

        if (!mediaResponse.ok || !categoriesResponse.ok) {
          throw new Error('Erreur lors du chargement des données');
        }

        const [media, cats] = await Promise.all([
          mediaResponse.json(),
          categoriesResponse.json()
        ]);

        setMediaFiles(media);
        setCategories(cats);
      } catch (err) {
        setError('Erreur lors du chargement des images');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleImageClick = (media: MediaFile) => {
    onImageSelect(media.filePath, media.altText);
    if (onClose) onClose();
  };

  if (!showModal) {
    return (
      <button
        onClick={() => {/* Ouvrir le modal */}}
        className="btn btn-outline"
        style={{ margin: 'var(--space-sm) 0' }}
      >
        📷 Choisir une image
      </button>
    );
  }

  return (
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
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'auto',
        width: '100%',
        maxWidth: '800px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-lg)',
          paddingBottom: 'var(--space-md)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <h2 style={{ margin: 0 }}>Sélectionner une image</h2>
          <button
            onClick={onClose}
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

        {/* Filtre par catégorie */}
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--space-sm)', fontWeight: '500' }}>
            Catégorie :
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: 'var(--space-md)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius)',
              fontSize: '1rem',
              minWidth: '200px'
            }}
          >
            <option value="">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Grille d'images */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
            <p>Chargement des images...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--danger)' }}>
            <p>{error}</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 'var(--space-md)',
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            {mediaFiles.map((media) => (
              <div
                key={media.id}
                onClick={() => handleImageClick(media)}
                style={{
                  cursor: 'pointer',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  border: '2px solid transparent',
                  transition: 'all 0.2s ease'
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
                />
                <div style={{
                  padding: 'var(--space-sm)',
                  backgroundColor: 'var(--bg-secondary)',
                  fontSize: '0.8rem'
                }}>
                  <div style={{ fontWeight: '500', marginBottom: 'var(--space-xs)' }}>
                    {media.fileName}
                  </div>
                  {media.category && (
                    <div style={{ color: 'var(--text-secondary)' }}>
                      {media.category}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {mediaFiles.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--text-secondary)' }}>
            <p>Aucune image trouvée{selectedCategory ? ` dans la catégorie "${selectedCategory}"` : ''}.</p>
            <p>Uploadez des images depuis la section Médias pour les voir ici.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSelector;

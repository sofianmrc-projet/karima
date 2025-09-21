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

interface MediaGalleryProps {
  category?: string;
  limit?: number;
  showDescription?: boolean;
  columns?: number;
}

const MediaGallery = ({ 
  category, 
  limit, 
  showDescription = false, 
  columns = 3 
}: MediaGalleryProps) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/Public/media${category ? `?category=${category}` : ''}`);
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des médias');
        }
        let media = await response.json();
        
        if (limit) {
          media = media.slice(0, limit);
        }
        
        setMediaFiles(media);
      } catch (err) {
        setError('Erreur lors du chargement des médias');
        console.error('Error fetching media:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [category, limit]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
        <p>Chargement des images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--danger)' }}>
        <p>{error}</p>
      </div>
    );
  }

  if (mediaFiles.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--text-secondary)' }}>
        <p>Aucune image trouvée{category ? ` dans la catégorie "${category}"` : ''}.</p>
      </div>
    );
  }

  return (
    <div 
      className="media-gallery"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 'var(--space-lg)',
        margin: 'var(--space-lg) 0'
      }}
    >
      {mediaFiles.map((media) => (
        <div 
          key={media.id} 
          className="media-item"
          style={{
            position: 'relative',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-secondary)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <img
            src={media.filePath}
            alt={media.altText || media.fileName}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              display: 'block'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          
          {showDescription && (media.description || media.altText) && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              color: 'white',
              padding: 'var(--space-lg) var(--space-md) var(--space-md)',
              fontSize: '0.9rem'
            }}>
              {media.description && (
                <p style={{ margin: '0 0 var(--space-xs) 0', fontWeight: '500' }}>
                  {media.description}
                </p>
              )}
              {media.altText && (
                <p style={{ margin: 0, opacity: 0.8, fontSize: '0.8rem' }}>
                  {media.altText}
                </p>
              )}
            </div>
          )}
          
          {media.category && (
            <div style={{
              position: 'absolute',
              top: 'var(--space-sm)',
              right: 'var(--space-sm)',
              backgroundColor: 'var(--primary)',
              color: 'white',
              padding: 'var(--space-xs) var(--space-sm)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              {media.category}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaGallery;

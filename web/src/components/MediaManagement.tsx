import { useState, useEffect, useRef } from 'react'
import { adminService, MediaFile } from '../lib/admin'

const MediaManagement = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ altText: '', description: '', category: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [files, cats] = await Promise.all([
        adminService.getMediaFiles(selectedCategory || undefined),
        adminService.getCategories()
      ])
      setMediaFiles(files)
      setCategories(cats)
    } catch (error) {
      console.error('Erreur lors du chargement des médias:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [selectedCategory])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      await adminService.uploadMediaFile(file, '', '', selectedCategory || 'general')
      await loadData()
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (media: MediaFile) => {
    setEditingId(media.id)
    setEditForm({
      altText: media.altText || '',
      description: media.description || '',
      category: media.category || ''
    })
  }

  const handleSaveEdit = async () => {
    if (!editingId) return

    try {
      await adminService.updateMediaFile(editingId, editForm)
      await loadData()
      setEditingId(null)
      setEditForm({ altText: '', description: '', category: '' })
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) return

    try {
      await adminService.deleteMediaFile(id)
      await loadData()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid var(--primary-light)',
          borderTop: '4px solid var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto var(--space-lg)'
        }}></div>
        <p>Chargement des médias...</p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h2>Gestion des médias</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Uploadez et gérez les images pour illustrer vos services.
        </p>
      </div>

      {/* Filtres et upload */}
      <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-sm)', fontWeight: '500' }}>
              Catégorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: 'var(--space-md)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                fontSize: '1rem'
              }}
            >
              <option value="">Toutes les catégories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-sm)', fontWeight: '500' }}>
              Uploader un fichier
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              style={{
                padding: 'var(--space-md)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                fontSize: '1rem'
              }}
            />
          </div>

          {uploading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid var(--primary-light)',
                borderTop: '2px solid var(--primary)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <span>Upload en cours...</span>
            </div>
          )}
        </div>
      </div>

      {/* Liste des médias */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
        {mediaFiles.map(media => (
          <div key={media.id} className="card">
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <img
                src={media.filePath}
                alt={media.altText || media.fileName}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius)',
                  backgroundColor: 'var(--bg-secondary)'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: 'var(--space-md)' }}>
              <h4 style={{ margin: '0 0 var(--space-sm) 0', fontSize: '1rem' }}>
                {media.fileName}
              </h4>
              {media.altText && (
                <p style={{ margin: '0 0 var(--space-sm) 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Alt: {media.altText}
                </p>
              )}
              {media.description && (
                <p style={{ margin: '0 0 var(--space-sm) 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {media.description}
                </p>
              )}
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <div>Catégorie: {media.category || 'Aucune'}</div>
                <div>Taille: {formatFileSize(media.fileSizeBytes)}</div>
                <div>Ajouté: {new Date(media.createdAt).toLocaleDateString('fr-FR')}</div>
              </div>
            </div>

            {editingId === media.id ? (
              <div>
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--space-sm)', fontSize: '0.9rem', fontWeight: '500' }}>
                    Texte alternatif
                  </label>
                  <input
                    type="text"
                    value={editForm.altText}
                    onChange={(e) => setEditForm(prev => ({ ...prev, altText: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: 'var(--space-sm)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius)',
                      fontSize: '0.9rem'
                    }}
                    placeholder="Description de l'image..."
                  />
                </div>

                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--space-sm)', fontSize: '0.9rem', fontWeight: '500' }}>
                    Description
                  </label>
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: 'var(--space-sm)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius)',
                      fontSize: '0.9rem'
                    }}
                    placeholder="Description du fichier..."
                  />
                </div>

                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--space-sm)', fontSize: '0.9rem', fontWeight: '500' }}>
                    Catégorie
                  </label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: 'var(--space-sm)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius)',
                      fontSize: '0.9rem'
                    }}
                    placeholder="services, hero, gallery..."
                  />
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <button
                    onClick={handleSaveEdit}
                    className="btn btn-primary"
                    style={{ fontSize: '0.9rem', padding: 'var(--space-sm) var(--space-md)' }}
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="btn btn-outline"
                    style={{ fontSize: '0.9rem', padding: 'var(--space-sm) var(--space-md)' }}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                <button
                  onClick={() => handleEdit(media)}
                  className="btn btn-outline"
                  style={{ fontSize: '0.9rem', padding: 'var(--space-sm) var(--space-md)' }}
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(media.id)}
                  className="btn btn-outline"
                  style={{ 
                    fontSize: '0.9rem', 
                    padding: 'var(--space-sm) var(--space-md)',
                    color: 'var(--danger)',
                    borderColor: 'var(--danger)'
                  }}
                >
                  Supprimer
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {mediaFiles.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--text-secondary)' }}>
          <p>Aucun fichier média trouvé.</p>
          <p>Uploadez votre premier fichier pour commencer.</p>
        </div>
      )}
    </div>
  )
}

export default MediaManagement

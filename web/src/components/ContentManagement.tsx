import { useState, useEffect } from 'react'
import { adminService, ServiceContent } from '../lib/admin'

const ContentManagement = () => {
  const [contents, setContents] = useState<ServiceContent[]>([])
  const [loading, setLoading] = useState(true)
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ content: '', description: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadContents()
  }, [])

  const loadContents = async () => {
    try {
      setLoading(true)
      const data = await adminService.getServiceContents()
      setContents(data)
    } catch (error) {
      console.error('Erreur lors du chargement du contenu:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (content: ServiceContent) => {
    setEditingKey(content.key)
    setEditForm({
      content: content.content,
      description: content.description || ''
    })
  }

  const handleSave = async () => {
    if (!editingKey) return

    try {
      setSaving(true)
      await adminService.updateServiceContent(editingKey, editForm)
      await loadContents()
      setEditingKey(null)
      setEditForm({ content: '', description: '' })
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditingKey(null)
    setEditForm({ content: '', description: '' })
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
        <p>Chargement du contenu...</p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h2>Gestion du contenu des services</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Modifiez le contenu affiché sur la page Services. Les modifications sont appliquées immédiatement.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
        {contents.map(content => (
          <div key={content.key} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--primary)' }}>{content.key}</h3>
                {content.description && (
                  <p style={{ margin: 'var(--space-sm) 0 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {content.description}
                  </p>
                )}
              </div>
              {editingKey !== content.key && (
                <button
                  onClick={() => handleEdit(content)}
                  className="btn btn-outline"
                  style={{ flexShrink: 0 }}
                >
                  Modifier
                </button>
              )}
            </div>

            {editingKey === content.key ? (
              <div>
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--space-sm)', fontWeight: '500' }}>
                    Contenu
                  </label>
                  <textarea
                    value={editForm.content}
                    onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                    style={{
                      width: '100%',
                      minHeight: '100px',
                      padding: 'var(--space-md)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius)',
                      fontSize: '1rem',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Saisissez le contenu..."
                  />
                </div>

                <div style={{ marginBottom: 'var(--space-lg)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--space-sm)', fontWeight: '500' }}>
                    Description (optionnel)
                  </label>
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: 'var(--space-md)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius)',
                      fontSize: '1rem'
                    }}
                    placeholder="Description de ce contenu..."
                  />
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn btn-primary"
                  >
                    {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="btn btn-outline"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                padding: 'var(--space-md)',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius)',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6
              }}>
                {content.content}
              </div>
            )}

            <div style={{
              marginTop: 'var(--space-md)',
              paddingTop: 'var(--space-md)',
              borderTop: '1px solid var(--border-color)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)'
            }}>
              Dernière modification: {new Date(content.updatedAt).toLocaleString('fr-FR')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContentManagement

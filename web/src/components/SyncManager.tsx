import { useState } from 'react';

interface SyncManagerProps {
  onSync: () => void;
  onExport: () => void;
  onImport: (data: string) => void;
}

const SyncManager = ({ onSync, onExport, onImport }: SyncManagerProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Charger le contenu local
      const localContent = localStorage.getItem('karima_visual_editor_content');
      if (!localContent) {
        alert('❌ Aucun contenu local à exporter');
        return;
      }

      // Créer un fichier JSON téléchargeable
      const dataStr = JSON.stringify(JSON.parse(localContent), null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `karima-content-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert('✅ Contenu exporté avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      alert('❌ Erreur lors de l\'export');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            onImport(content);
            alert('✅ Contenu importé avec succès !');
          } catch (error) {
            console.error('Erreur lors de l\'import:', error);
            alert('❌ Erreur lors de l\'import');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
      <h3 style={{ marginBottom: 'var(--space-lg)', color: 'var(--primary)' }}>
        🔄 Gestion de la synchronisation
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: 'var(--space-md)',
        marginBottom: 'var(--space-lg)'
      }}>
        <button
          onClick={onSync}
          className="btn btn-primary"
          style={{ fontSize: '0.9rem' }}
        >
          🔄 Synchroniser maintenant
        </button>
        
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="btn btn-outline"
          style={{ fontSize: '0.9rem' }}
        >
          {isExporting ? '⏳ Export...' : '📤 Exporter le contenu'}
        </button>
        
        <button
          onClick={handleImport}
          disabled={isImporting}
          className="btn btn-outline"
          style={{ fontSize: '0.9rem' }}
        >
          {isImporting ? '⏳ Import...' : '📥 Importer le contenu'}
        </button>
      </div>

      <div style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        padding: 'var(--space-md)', 
        borderRadius: 'var(--radius)',
        fontSize: '0.9rem'
      }}>
        <h4 style={{ margin: '0 0 var(--space-sm) 0' }}>💡 Workflow de production :</h4>
        <ol style={{ margin: 0, paddingLeft: 'var(--space-lg)' }}>
          <li>Modifiez votre contenu localement</li>
          <li>Exportez le contenu (bouton ci-dessus)</li>
          <li>Déployez l'API en production</li>
          <li>Importez le contenu dans l'API de production</li>
        </ol>
      </div>
    </div>
  );
};

export default SyncManager;

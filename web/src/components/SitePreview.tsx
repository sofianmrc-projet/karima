import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface SitePreviewProps {
  content: { [key: string]: string };
  onEdit: (elementId: string) => void;
}

const SitePreview = ({ content, onEdit }: SitePreviewProps) => {
  const [activeSection, setActiveSection] = useState<string>('home');

  const sections = [
    { id: 'home', name: '🏠 Accueil', icon: '🏠' },
    { id: 'services', name: '⚙️ Services', icon: '⚙️' },
    { id: 'about', name: '👥 À propos', icon: '👥' },
    { id: 'blog', name: '📝 Blog', icon: '📝' },
    { id: 'contact', name: '📞 Contact', icon: '📞' },
    { id: 'footer', name: '🦶 Footer', icon: '🦶' }
  ];

  const getContent = (key: string, defaultValue: string = '') => {
    return content[key] || defaultValue;
  };

  const renderHomeSection = () => (
    <div className="site-preview-section">
      <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--space-lg)' }}>
        🏠 Page d'Accueil
      </h2>
      
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: 'var(--space-3xl) 0',
        textAlign: 'center',
        borderRadius: 'var(--radius-lg)',
        marginBottom: 'var(--space-xl)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)' }}>
          {getContent('home_hero_title', 'Bienvenue chez Karima')}
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: 'var(--space-lg)' }}>
          {getContent('home_hero_subtitle', 'Votre partenaire de confiance')}
        </p>
        <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: 'var(--space-xl)' }}>
          {getContent('home_hero_description', 'Des solutions innovantes pour votre entreprise')}
        </p>
        <button className="btn btn-accent" style={{ fontSize: '1.125rem' }}>
          {getContent('home_hero_cta_text', 'Découvrir nos services')}
        </button>
      </div>

      {/* About Section */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          {getContent('home_about_title', 'À propos de nous')}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
          {getContent('home_about_description', 'Une entreprise dédiée à votre succès')}
        </p>
      </div>

      {/* Stats Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--space-lg)',
        marginBottom: 'var(--space-xl)'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>
            {getContent('home_stat_1_number', '100+')}
          </h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            {getContent('home_stat_1_label', 'Projets réalisés')}
          </p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>
            {getContent('home_stat_2_number', '50+')}
          </h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            {getContent('home_stat_2_label', 'Clients satisfaits')}
          </p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>
            {getContent('home_stat_3_number', '5+')}
          </h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            {getContent('home_stat_3_label', 'Années d\'expérience')}
          </p>
        </div>
      </div>
    </div>
  );

  const renderServicesSection = () => (
    <div className="site-preview-section">
      <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--space-lg)' }}>
        ⚙️ Page Services
      </h2>
      
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: 'var(--space-3xl) 0',
        textAlign: 'center',
        borderRadius: 'var(--radius-lg)',
        marginBottom: 'var(--space-xl)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)' }}>
          {getContent('services_hero_title', 'Nos Services')}
        </h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
          {getContent('services_hero_description', 'Des solutions complètes pour votre entreprise')}
        </p>
      </div>

      {/* Services Content */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          {getContent('services_section_title', 'Nos domaines d\'expertise')}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
          {getContent('services_section_description', 'Chaque service est conçu pour vous apporter une valeur ajoutée réelle')}
        </p>
      </div>

      {/* Process Section */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          {getContent('services_process_title', 'Notre méthode de travail')}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
          {getContent('services_process_description', 'Une approche structurée et éprouvée')}
        </p>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: 'var(--space-3xl)',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: 'var(--space-lg)' }}>
          {getContent('services_cta_title', 'Prêt à transformer votre organisation ?')}
        </h2>
        <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: 'var(--space-xl)' }}>
          {getContent('services_cta_description', 'Contactez-nous dès aujourd\'hui pour discuter de vos besoins')}
        </p>
        <button className="btn btn-accent" style={{ fontSize: '1.125rem' }}>
          Demander un devis
        </button>
      </div>
    </div>
  );

  const renderAboutSection = () => (
    <div className="site-preview-section">
      <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--space-lg)' }}>
        👥 Page À propos
      </h2>
      
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: 'var(--space-3xl) 0',
        textAlign: 'center',
        borderRadius: 'var(--radius-lg)',
        marginBottom: 'var(--space-xl)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)' }}>
          {getContent('about_hero_title', 'À propos de nous')}
        </h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
          {getContent('about_hero_description', 'Découvrez notre histoire et notre mission')}
        </p>
      </div>

      {/* Company Section */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          {getContent('about_company_title', 'Notre entreprise')}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
          {getContent('about_company_description', 'Une entreprise dédiée à l\'excellence et à l\'innovation')}
        </p>
      </div>

      {/* Team Section */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          {getContent('about_team_title', 'Notre équipe')}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
          {getContent('about_team_description', 'Des professionnels passionnés et expérimentés')}
        </p>
      </div>

      {/* Values Section */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          {getContent('about_values_title', 'Nos valeurs')}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
          {getContent('about_values_description', 'Des valeurs qui nous guident au quotidien')}
        </p>
      </div>

      {/* Mission Section */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          {getContent('about_mission_title', 'Notre mission')}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
          {getContent('about_mission_description', 'Accompagner nos clients vers le succès')}
        </p>
      </div>
    </div>
  );

  const renderBlogSection = () => (
    <div className="site-preview-section">
      <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--space-lg)' }}>
        📝 Page Blog
      </h2>
      
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: 'var(--space-3xl) 0',
        textAlign: 'center',
        borderRadius: 'var(--radius-lg)',
        marginBottom: 'var(--space-xl)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)' }}>
          {getContent('blog_hero_title', 'Notre Blog')}
        </h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
          {getContent('blog_hero_description', 'Découvrez nos articles et actualités')}
        </p>
      </div>

      {/* Blog Content */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          {getContent('blog_section_title', 'Derniers articles')}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
          {getContent('blog_section_description', 'Restez informé de nos dernières actualités')}
        </p>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: 'var(--space-3xl)',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: 'var(--space-lg)' }}>
          {getContent('blog_cta_title', 'Restez informé')}
        </h2>
        <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: 'var(--space-xl)' }}>
          {getContent('blog_cta_description', 'Abonnez-vous à notre newsletter')}
        </p>
        <button className="btn btn-accent" style={{ fontSize: '1.125rem' }}>
          S'abonner
        </button>
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="site-preview-section">
      <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--space-lg)' }}>
        📞 Page Contact
      </h2>
      
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: 'var(--space-3xl) 0',
        textAlign: 'center',
        borderRadius: 'var(--radius-lg)',
        marginBottom: 'var(--space-xl)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)' }}>
          {getContent('contact_hero_title', 'Contactez-nous')}
        </h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
          {getContent('contact_hero_description', 'Nous sommes là pour vous accompagner')}
        </p>
      </div>

      {/* Contact Info */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          {getContent('contact_info_title', 'Nos coordonnées')}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--space-lg)'
        }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>📍 Adresse</h3>
            <p style={{ margin: 0 }}>{getContent('contact_address', '123 Rue de la Paix, 75001 Paris')}</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>📞 Téléphone</h3>
            <p style={{ margin: 0 }}>{getContent('contact_phone', '+33 1 23 45 67 89')}</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>✉️ Email</h3>
            <p style={{ margin: 0 }}>{getContent('contact_email', 'contact@karima.com')}</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>🕒 Horaires</h3>
            <p style={{ margin: 0 }}>{getContent('contact_hours', 'Lun-Ven: 9h-18h')}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFooterSection = () => (
    <div className="site-preview-section">
      <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--space-lg)' }}>
        🦶 Footer
      </h2>
      
      <div style={{
        background: 'var(--bg-secondary)',
        padding: 'var(--space-3xl)',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: 'var(--space-lg)' }}>
          {getContent('footer_company_name', 'Karima')}
        </h3>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
          {getContent('footer_description', 'Votre partenaire de confiance pour tous vos projets')}
        </p>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>
          {getContent('footer_copyright', '© 2025 Karima. Tous droits réservés.')}
        </p>
        <p style={{ color: 'var(--text-muted)', margin: 'var(--space-sm) 0 0 0' }}>
          {getContent('footer_links_title', 'Mentions légales | Politique de confidentialité')}
        </p>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'home': return renderHomeSection();
      case 'services': return renderServicesSection();
      case 'about': return renderAboutSection();
      case 'blog': return renderBlogSection();
      case 'contact': return renderContactSection();
      case 'footer': return renderFooterSection();
      default: return renderHomeSection();
    }
  };

  return (
    <div className="site-preview">
      {/* Navigation */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-sm)',
        marginBottom: 'var(--space-xl)',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`btn ${activeSection === section.id ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '0.9rem' }}
          >
            {section.icon} {section.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-xl)',
        backgroundColor: 'white',
        minHeight: '600px'
      }}>
        {renderSection()}
      </div>

      {/* Edit Instructions */}
      <div style={{
        marginTop: 'var(--space-lg)',
        padding: 'var(--space-md)',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius)',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)'
      }}>
        💡 <strong>Astuce :</strong> Cliquez sur "Modifier" dans l'éditeur visuel pour changer le contenu de chaque section
      </div>
    </div>
  );
};

export default SitePreview;

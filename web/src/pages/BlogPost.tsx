import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Clock, Share2, Heart } from 'lucide-react'
import { useSections } from '../hooks/useSections'

const BlogPost = () => {
  const { id } = useParams<{ id: string }>()
  const { sections, loading, error } = useSections('Blog')

  // Fonction pour récupérer une section par sa clé
  const getSectionContent = (key: string) => {
    const section = sections.find(s => s.key === key)
    return section?.content || ''
  }

  // Trouver l'article par ID (utilise l'index + 1 comme ID)
  const post = sections[parseInt(id || '0') - 1]

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
        <p>Chargement du contenu...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
        <p style={{ color: 'var(--danger)' }}>Erreur lors du chargement: {error}</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="section">
        <div className="container">
          <div className="text-center">
            <h1>Article non trouvé</h1>
            <p>L'article que vous recherchez n'existe pas.</p>
            <Link to="/blog" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Retour au blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: 'var(--space-3xl) 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: 'var(--space-lg)',
            fontWeight: '700',
            lineHeight: 1.2
          }}>
            {post.title}
          </h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-xl)',
            flexWrap: 'wrap',
            fontSize: '1rem',
            opacity: 0.9
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <User size={20} />
              {getSectionContent('blog_author') || 'Équipe Karima'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <Calendar size={20} />
              {new Date().toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <Clock size={20} />
              {getSectionContent('blog_read_time') || '5 min'}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section">
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {/* Article Meta */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-2xl)',
              paddingBottom: 'var(--space-lg)',
              borderBottom: '1px solid var(--secondary-light)',
              flexWrap: 'wrap',
              gap: 'var(--space-md)'
            }}>
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                <span
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    padding: 'var(--space-xs) var(--space-sm)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  #{post.key}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                <button
                  className="btn btn-outline"
                  style={{ padding: 'var(--space-sm)' }}
                >
                  <Share2 size={16} />
                </button>
                <button
                  className="btn btn-outline"
                  style={{ padding: 'var(--space-sm)' }}
                >
                  <Heart size={16} />
                </button>
              </div>
            </div>

            {/* Article Body */}
            <article style={{
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: 'var(--text-primary)'
            }}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Author Bio */}
            <div className="card" style={{ 
              marginTop: 'var(--space-2xl)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-lg)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '700',
                flexShrink: 0
              }}>
                {getSectionContent('blog_author_initials') || 'K'}
              </div>
              <div>
                <h4 style={{ 
                  marginBottom: 'var(--space-sm)',
                  color: 'var(--primary)'
                }}>
                  {getSectionContent('blog_author') || 'Équipe Karima'}
                </h4>
                <p style={{ 
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-md)'
                }}>
                  {getSectionContent('blog_author_bio') || 'Expert en transformation organisationnelle avec plus de 15 ans d\'expérience. Spécialisée dans l\'accompagnement des entreprises vers l\'excellence opérationnelle.'}
                </p>
                <Link 
                  to="/about" 
                  className="btn btn-outline"
                  style={{ textDecoration: 'none' }}
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2>{getSectionContent('related_posts_title') || 'Articles similaires'}</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {getSectionContent('related_posts_description') || 'Découvrez d\'autres articles qui pourraient vous intéresser.'}
            </p>
          </div>
          <div className="grid grid-2">
            {sections.slice(0, 2).map((relatedPost, index) => (
              <article key={index} className="card" style={{ 
                display: 'flex',
                gap: 'var(--space-lg)',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '120px',
                  height: '80px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  flexShrink: 0
                }}>
                  {relatedPost.title.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--accent)',
                    color: 'var(--text-primary)',
                    padding: 'var(--space-xs) var(--space-sm)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginBottom: 'var(--space-sm)'
                  }}>
                    {relatedPost.key}
                  </div>
                  <h3 style={{ 
                    fontSize: '1.125rem',
                    marginBottom: 'var(--space-sm)',
                    color: 'var(--primary)',
                    lineHeight: 1.3
                  }}>
                    {relatedPost.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    marginBottom: 'var(--space-sm)',
                    lineHeight: 1.4
                  }}>
                    {relatedPost.content.substring(0, 100)}...
                  </p>
                </div>
                <Link 
                  to={`/blog/${index + 1}`}
                  className="btn btn-outline"
                  style={{ 
                    textDecoration: 'none',
                    alignSelf: 'flex-start'
                  }}
                >
                  Lire
                  <ArrowRight size={14} style={{ marginLeft: 'var(--space-xs)' }} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <Link 
              to="/blog" 
              className="btn btn-primary"
              style={{ textDecoration: 'none' }}
            >
              <ArrowRight size={16} style={{ marginRight: 'var(--space-sm)', transform: 'rotate(180deg)' }} />
              Retour au blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPost


import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Clock, Share2, Heart } from 'lucide-react'

const BlogPost = () => {
  const { id } = useParams<{ id: string }>()
  
  // Mock data - in a real app, this would come from an API
  const blogPosts = [
    {
      id: 1,
      title: 'Les 5 clés du succès pour une transformation organisationnelle réussie',
      content: `
        <p>La transformation organisationnelle est un défi majeur pour de nombreuses entreprises. Pour garantir le succès de cette démarche, il est essentiel de respecter certaines clés fondamentales.</p>
        
        <h3>1. Vision claire et partagée</h3>
        <p>La première étape consiste à définir une vision claire de l'état souhaité après la transformation. Cette vision doit être partagée par tous les acteurs de l'organisation et servir de boussole tout au long du processus.</p>
        
        <h3>2. Leadership engagé</h3>
        <p>Le leadership doit être totalement engagé dans la transformation. Les dirigeants doivent montrer l'exemple et communiquer régulièrement sur les progrès et les défis rencontrés.</p>
        
        <h3>3. Communication transparente</h3>
        <p>Une communication transparente et régulière est cruciale pour maintenir l'engagement des équipes. Il faut expliquer les raisons de la transformation, les bénéfices attendus et les étapes du processus.</p>
        
        <h3>4. Formation et accompagnement</h3>
        <p>Les équipes doivent être formées et accompagnées tout au long de la transformation. Cela inclut la formation aux nouveaux outils, processus et méthodes de travail.</p>
        
        <h3>5. Mesure et ajustement</h3>
        <p>Il est important de mettre en place des indicateurs de performance pour mesurer les progrès et ajuster la stratégie si nécessaire. La transformation est un processus itératif qui nécessite de la flexibilité.</p>
        
        <p>En respectant ces cinq clés, vous maximisez vos chances de réussir votre transformation organisationnelle et d'obtenir les résultats escomptés.</p>
      `,
      author: 'Marie Dubois',
      date: '2024-01-15',
      readTime: '5 min',
      category: 'Transformation',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      tags: ['Transformation', 'Leadership', 'Organisation', 'Management']
    }
  ]

  const relatedPosts = [
    {
      id: 2,
      title: 'Comment développer l\'intelligence collective dans vos équipes',
      excerpt: 'L\'intelligence collective est un levier puissant pour améliorer la performance.',
      author: 'Jean Martin',
      date: '2024-01-10',
      readTime: '7 min',
      category: 'Management',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'L\'importance de la formation continue en entreprise',
      excerpt: 'Dans un monde en constante évolution, la formation continue devient cruciale.',
      author: 'Sophie Laurent',
      date: '2024-01-05',
      readTime: '6 min',
      category: 'Formation',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop'
    }
  ]

  const post = blogPosts.find(p => p.id === parseInt(id || '0'))

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
          <div style={{
            display: 'inline-block',
            backgroundColor: 'var(--accent)',
            color: 'var(--text-primary)',
            padding: 'var(--space-xs) var(--space-md)',
            borderRadius: 'var(--radius-lg)',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: 'var(--space-lg)'
          }}>
            {post.category}
          </div>
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
              {post.author}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <Calendar size={20} />
              {formatDate(post.date)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <Clock size={20} />
              {post.readTime}
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
            {/* Featured Image */}
            <div style={{
              backgroundImage: `url(${post.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '400px',
              borderRadius: 'var(--radius-lg)',
              marginBottom: 'var(--space-2xl)'
            }} />

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
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      padding: 'var(--space-xs) var(--space-sm)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
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
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 style={{ 
                  marginBottom: 'var(--space-sm)',
                  color: 'var(--primary)'
                }}>
                  {post.author}
                </h4>
                <p style={{ 
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-md)'
                }}>
                  Expert en transformation organisationnelle avec plus de 15 ans d'expérience. 
                  Spécialisée dans l'accompagnement des entreprises vers l'excellence opérationnelle.
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
            <h2>Articles similaires</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Découvrez d'autres articles qui pourraient vous intéresser.
            </p>
          </div>
          <div className="grid grid-2">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.id} className="card" style={{ 
                display: 'flex',
                gap: 'var(--space-lg)',
                alignItems: 'center'
              }}>
                <div style={{
                  backgroundImage: `url(${relatedPost.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '120px',
                  height: '80px',
                  borderRadius: 'var(--radius-md)',
                  flexShrink: 0
                }} />
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
                    {relatedPost.category}
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
                    {relatedPost.excerpt}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)'
                  }}>
                    <span>{relatedPost.author}</span>
                    <span>•</span>
                    <span>{formatDate(relatedPost.date)}</span>
                    <span>•</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                </div>
                <Link 
                  to={`/blog/${relatedPost.id}`}
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

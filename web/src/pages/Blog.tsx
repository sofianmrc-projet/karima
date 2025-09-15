import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Les 5 clés du succès pour une transformation organisationnelle réussie',
      excerpt: 'Découvrez les éléments essentiels à prendre en compte pour mener à bien une transformation organisationnelle et garantir le succès de votre projet.',
      author: 'Marie Dubois',
      date: '2024-01-15',
      readTime: '5 min',
      category: 'Transformation',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Comment développer l\'intelligence collective dans vos équipes',
      excerpt: 'L\'intelligence collective est un levier puissant pour améliorer la performance. Apprenez les techniques pour la développer dans votre organisation.',
      author: 'Jean Martin',
      date: '2024-01-10',
      readTime: '7 min',
      category: 'Management',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'L\'importance de la formation continue en entreprise',
      excerpt: 'Dans un monde en constante évolution, la formation continue devient cruciale. Découvrez pourquoi et comment l\'implémenter efficacement.',
      author: 'Sophie Laurent',
      date: '2024-01-05',
      readTime: '6 min',
      category: 'Formation',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Optimiser ses processus métier : guide pratique',
      excerpt: 'Un guide étape par étape pour identifier, analyser et optimiser vos processus métier afin d\'améliorer l\'efficacité organisationnelle.',
      author: 'Marie Dubois',
      date: '2023-12-28',
      readTime: '8 min',
      category: 'Optimisation',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Le leadership au service de la performance collective',
      excerpt: 'Comment développer un leadership efficace qui mobilise les équipes et favorise l\'atteinte des objectifs organisationnels.',
      author: 'Jean Martin',
      date: '2023-12-20',
      readTime: '6 min',
      category: 'Leadership',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Innovation et créativité : moteurs de la croissance',
      excerpt: 'Découvrez comment cultiver l\'innovation et la créativité dans votre organisation pour stimuler la croissance et l\'adaptabilité.',
      author: 'Sophie Laurent',
      date: '2023-12-15',
      readTime: '5 min',
      category: 'Innovation',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=300&fit=crop'
    }
  ]

  const categories = [
    'Tous',
    'Transformation',
    'Management',
    'Formation',
    'Optimisation',
    'Leadership',
    'Innovation'
  ]

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
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: 'var(--space-lg)',
            fontWeight: '700'
          }}>
            Blog & Actualités
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: 'var(--space-2xl)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto var(--space-2xl)'
          }}>
            Découvrez nos derniers articles, conseils et réflexions sur l'excellence 
            organisationnelle et le développement professionnel.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section style={{ 
        padding: 'var(--space-xl) 0',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--secondary-light)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            gap: 'var(--space-md)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {categories.map((category, index) => (
              <button
                key={index}
                className="btn"
                style={{
                  backgroundColor: index === 0 ? 'var(--primary)' : 'transparent',
                  color: index === 0 ? 'white' : 'var(--text-primary)',
                  border: '2px solid var(--primary)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-sm) var(--space-lg)',
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  if (index !== 0) {
                    e.currentTarget.style.backgroundColor = 'var(--primary)'
                    e.currentTarget.style.color = 'white'
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== 0) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'var(--text-primary)'
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2>Article à la une</h2>
          </div>
          <div className="card" style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-2xl)',
            alignItems: 'center',
            marginBottom: 'var(--space-3xl)'
          }}>
            <div>
              <div style={{
                display: 'inline-block',
                backgroundColor: 'var(--accent)',
                color: 'var(--text-primary)',
                padding: 'var(--space-xs) var(--space-md)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: 'var(--space-md)'
              }}>
                {blogPosts[0].category}
              </div>
              <h3 style={{ 
                fontSize: '1.75rem',
                marginBottom: 'var(--space-md)',
                color: 'var(--primary)'
              }}>
                {blogPosts[0].title}
              </h3>
              <p style={{ 
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-lg)',
                lineHeight: 1.6
              }}>
                {blogPosts[0].excerpt}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-lg)',
                marginBottom: 'var(--space-lg)',
                fontSize: '0.875rem',
                color: 'var(--text-muted)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                  <User size={16} />
                  {blogPosts[0].author}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                  <Calendar size={16} />
                  {formatDate(blogPosts[0].date)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                  <Clock size={16} />
                  {blogPosts[0].readTime}
                </div>
              </div>
              <Link 
                to={`/blog/${blogPosts[0].id}`}
                className="btn btn-primary"
                style={{ textDecoration: 'none' }}
              >
                Lire l'article
                <ArrowRight size={16} style={{ marginLeft: 'var(--space-sm)' }} />
              </Link>
            </div>
            <div style={{
              backgroundImage: `url(${blogPosts[0].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '300px',
              borderRadius: 'var(--radius-lg)'
            }} />
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2>Tous les articles</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Explorez notre collection d'articles pour approfondir vos connaissances 
              et découvrir les meilleures pratiques.
            </p>
          </div>
          <div className="grid grid-3">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="card" style={{ 
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div style={{
                  backgroundImage: `url(${post.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '200px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--space-lg)'
                }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--accent)',
                    color: 'var(--text-primary)',
                    padding: 'var(--space-xs) var(--space-sm)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginBottom: 'var(--space-md)',
                    alignSelf: 'flex-start'
                  }}>
                    {post.category}
                  </div>
                  <h3 style={{ 
                    fontSize: '1.25rem',
                    marginBottom: 'var(--space-md)',
                    color: 'var(--primary)',
                    lineHeight: 1.3
                  }}>
                    {post.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--space-lg)',
                    lineHeight: 1.5,
                    flex: 1
                  }}>
                    {post.excerpt}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    marginBottom: 'var(--space-lg)',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                      <User size={14} />
                      {post.author}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                      <Calendar size={14} />
                      {formatDate(post.date)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                      <Clock size={14} />
                      {post.readTime}
                    </div>
                  </div>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="btn btn-outline"
                    style={{ 
                      textDecoration: 'none',
                      alignSelf: 'flex-start'
                    }}
                  >
                    Lire la suite
                    <ArrowRight size={14} style={{ marginLeft: 'var(--space-xs)' }} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section">
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-3xl)',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{ color: 'white', marginBottom: 'var(--space-lg)' }}>
              Restez informé
            </h2>
            <p style={{ 
              opacity: 0.9, 
              marginBottom: 'var(--space-xl)',
              fontSize: '1.125rem',
              maxWidth: '600px',
              margin: '0 auto var(--space-xl)'
            }}>
              Abonnez-vous à notre newsletter pour recevoir nos derniers articles 
              et conseils directement dans votre boîte mail.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: 'var(--space-md)', 
              justifyContent: 'center',
              flexWrap: 'wrap',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <input
                type="email"
                placeholder="Votre adresse email"
                className="form-input"
                style={{ flex: 1, minWidth: '250px' }}
              />
              <button className="btn btn-accent">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog


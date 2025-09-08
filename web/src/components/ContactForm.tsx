import { useState } from 'react'
import { api, ContactRequest } from '../lib/api'
import { Send, CheckCircle } from 'lucide-react'

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactRequest>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<ContactRequest>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactRequest> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await api.submitContact(formData)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactRequest]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
        <CheckCircle size={48} style={{ color: 'var(--success)', marginBottom: 'var(--space-lg)' }} />
        <h3 style={{ color: 'var(--success)', marginBottom: 'var(--space-md)' }}>
          Message envoyé avec succès !
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
          Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
        </p>
        <button
          className="btn btn-outline"
          onClick={() => setIsSubmitted(false)}
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 style={{ marginBottom: 'var(--space-lg)' }}>
        Contactez-nous
      </h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
        N'hésitez pas à nous faire part de vos questions ou demandes. Nous vous répondrons rapidement.
      </p>

      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nom complet *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          placeholder="Votre nom complet"
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          placeholder="votre.email@exemple.com"
        />
        {errors.email && <div className="form-error">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="form-textarea"
          placeholder="Décrivez votre demande ou question..."
          rows={5}
        />
        {errors.message && <div className="form-error">{errors.message}</div>}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
        style={{ width: '100%' }}
      >
        {isSubmitting ? (
          'Envoi en cours...'
        ) : (
          <>
            <Send size={16} style={{ marginRight: 'var(--space-sm)' }} />
            Envoyer le message
          </>
        )}
      </button>
    </form>
  )
}

export default ContactForm

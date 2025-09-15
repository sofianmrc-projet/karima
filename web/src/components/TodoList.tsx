import { useState, useEffect } from 'react'
import { api, Todo } from '../lib/api'
import { Plus, Trash2, Check, X } from 'lucide-react'

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    try {
      const data = await api.getTodos()
      setTodos(data)
    } catch (error) {
      console.error('Erreur lors du chargement des todos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodoTitle.trim()) return

    setIsAdding(true)
    try {
      const newTodo = await api.createTodo(newTodoTitle.trim())
      setTodos(prev => [newTodo, ...prev])
      setNewTodoTitle('')
    } catch (error) {
      console.error('Erreur lors de l\'ajout du todo:', error)
      alert('Erreur lors de l\'ajout de la tâche')
    } finally {
      setIsAdding(false)
    }
  }

  const handleToggleTodo = async (id: number) => {
    try {
      await api.toggleTodo(id)
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      )
    } catch (error) {
      console.error('Erreur lors de la modification du todo:', error)
      alert('Erreur lors de la modification de la tâche')
    }
  }

  const handleDeleteTodo = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) return

    try {
      await api.deleteTodo(id)
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Erreur lors de la suppression du todo:', error)
      alert('Erreur lors de la suppression de la tâche')
    }
  }

  if (isLoading) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
        <p>Chargement des tâches...</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: 'var(--space-lg)' }}>
        Démonstration CRUD - Gestion des tâches
      </h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
        Cette section démontre les fonctionnalités CRUD avec l'API backend. 
        Vous pouvez ajouter, modifier et supprimer des tâches en temps réel.
      </p>

      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} style={{ 
        display: 'flex', 
        gap: 'var(--space-sm)', 
        marginBottom: 'var(--space-xl)' 
      }}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Ajouter une nouvelle tâche..."
          className="form-input"
          style={{ flex: 1 }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isAdding || !newTodoTitle.trim()}
        >
          {isAdding ? (
            'Ajout...'
          ) : (
            <>
              <Plus size={16} />
            </>
          )}
        </button>
      </form>

      {/* Todos List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        {todos.length === 0 ? (
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-muted)', 
            padding: 'var(--space-xl)',
            fontStyle: 'italic'
          }}>
            Aucune tâche pour le moment. Ajoutez-en une ci-dessus !
          </p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                padding: 'var(--space-md)',
                backgroundColor: todo.done ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                border: '1px solid var(--secondary-light)',
                borderRadius: 'var(--radius-md)',
                transition: 'all 0.2s ease'
              }}
            >
              <button
                onClick={() => handleToggleTodo(todo.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid var(--primary)',
                  backgroundColor: todo.done ? 'var(--primary)' : 'transparent',
                  color: todo.done ? 'white' : 'var(--primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {todo.done && <Check size={14} />}
              </button>

              <span
                style={{
                  flex: 1,
                  textDecoration: todo.done ? 'line-through' : 'none',
                  color: todo.done ? 'var(--text-muted)' : 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
              >
                {todo.title}
              </span>

              <button
                onClick={() => handleDeleteTodo(todo.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--error)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--error)'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = 'var(--error)'
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{
        marginTop: 'var(--space-lg)',
        padding: 'var(--space-md)',
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.875rem',
        color: 'var(--text-secondary)'
      }}>
        <strong>Note technique :</strong> Cette démonstration utilise l'API REST backend 
        avec Entity Framework Core et SQL Server. Les données sont persistées en base de données.
      </div>
    </div>
  )
}

export default TodoList


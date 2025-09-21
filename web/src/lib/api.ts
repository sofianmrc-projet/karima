// Types
export interface Todo {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  message: string;
}

export interface ServiceContent {
  [key: string]: string;
}

// API Base URL
const API_BASE_URL = '/api';

// API Functions
export const api = {
  // Todos
  async getTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  async createTodo(title: string): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, done: false }),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return response.json();
  },

  async toggleTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error('Failed to toggle todo');
    }
  },

  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },

  // Contact
  async submitContact(contact: ContactRequest): Promise<ContactResponse> {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Failed to submit contact');
    }
    return response.json();
  },

  // Public Service Content
  async getServiceContent(): Promise<ServiceContent> {
    const response = await fetch(`${API_BASE_URL}/Public/service-content`);
    if (!response.ok) {
      throw new Error('Failed to fetch service content');
    }
    return response.json();
  },
};


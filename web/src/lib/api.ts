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

export interface Section {
  id: number;
  key: string;
  title: string;
  content: string;
  description?: string;
  imageUrl?: string;
  altText?: string;
  category?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  updatedByUserId?: number;
}

export interface SectionRequest {
  key: string;
  title: string;
  content: string;
  description?: string;
  imageUrl?: string;
  altText?: string;
  category?: string;
  sortOrder: number;
  isActive: boolean;
}

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

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

  // ServiceContent Admin
  async getServiceContents(): Promise<ServiceContent[]> {
    const response = await fetch(`${API_BASE_URL}/servicecontent`, {
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch service contents');
    return response.json();
  },

  async updateServiceContent(id: number, content: string): Promise<ServiceContent> {
    const response = await fetch(`${API_BASE_URL}/servicecontent/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify({ content })
    });
    if (!response.ok) throw new Error('Failed to update service content');
    return response.json();
  },

  // Sections
  async getSections(): Promise<Section[]> {
    const response = await fetch(`${API_BASE_URL}/sections`);
    if (!response.ok) throw new Error('Failed to fetch sections');
    return response.json();
  },

  async getSectionsByCategory(category: string): Promise<Section[]> {
    const response = await fetch(`${API_BASE_URL}/sections/by-category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch sections by category');
    return response.json();
  },

  async getSection(key: string): Promise<Section> {
    const response = await fetch(`${API_BASE_URL}/sections/${key}`);
    if (!response.ok) throw new Error('Failed to fetch section');
    return response.json();
  },

  async getSectionsForAdmin(): Promise<Section[]> {
    const response = await fetch(`${API_BASE_URL}/sections/admin`, {
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch sections for admin');
    return response.json();
  },

  async createSection(section: SectionRequest): Promise<Section> {
    const response = await fetch(`${API_BASE_URL}/sections/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify(section)
    });
    if (!response.ok) throw new Error('Failed to create section');
    return response.json();
  },

  async updateSection(id: number, section: SectionRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/sections/admin/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify(section)
    });
    if (!response.ok) throw new Error('Failed to update section');
  },

  async deleteSection(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/sections/admin/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete section');
  }
};


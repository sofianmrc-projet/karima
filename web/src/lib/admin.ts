import { authService } from './auth';

export interface ServiceContent {
  id: number;
  key: string;
  content: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  updatedByUserId?: number;
}

export interface MediaFile {
  id: number;
  fileName: string;
  filePath: string;
  mimeType?: string;
  fileSizeBytes: number;
  altText?: string;
  description?: string;
  category?: string;
  createdAt: string;
}

export interface ServiceContentRequest {
  key: string;
  content: string;
  description?: string;
}

export interface ServiceContentUpdateRequest {
  content: string;
  description?: string;
}

export interface MediaFileRequest {
  altText?: string;
  description?: string;
  category?: string;
}

export interface MediaFileUpdateRequest {
  altText?: string;
  description?: string;
  category?: string;
}

class AdminService {
  private readonly API_BASE = '/api';

  // Service Content
  async getServiceContents(): Promise<ServiceContent[]> {
    const response = await fetch(`${this.API_BASE}/servicecontent`, {
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du contenu');
    }

    return response.json();
  }

  async getServiceContent(key: string): Promise<ServiceContent> {
    const response = await fetch(`${this.API_BASE}/servicecontent/${key}`, {
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du contenu');
    }

    return response.json();
  }

  async createServiceContent(data: ServiceContentRequest): Promise<ServiceContent> {
    const response = await fetch(`${this.API_BASE}/servicecontent`, {
      method: 'POST',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création du contenu');
    }

    return response.json();
  }

  async updateServiceContent(key: string, data: ServiceContentUpdateRequest): Promise<void> {
    const response = await fetch(`${this.API_BASE}/servicecontent/${key}`, {
      method: 'PUT',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour du contenu');
    }
  }

  async deleteServiceContent(key: string): Promise<void> {
    const response = await fetch(`${this.API_BASE}/servicecontent/${key}`, {
      method: 'DELETE',
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du contenu');
    }
  }

  // Media Files
  async getMediaFiles(category?: string): Promise<MediaFile[]> {
    const url = new URL(`${this.API_BASE}/media`, window.location.origin);
    if (category) {
      url.searchParams.append('category', category);
    }

    const response = await fetch(url.toString(), {
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des médias');
    }

    return response.json();
  }

  async getMediaFile(id: number): Promise<MediaFile> {
    const response = await fetch(`${this.API_BASE}/media/${id}`, {
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du média');
    }

    return response.json();
  }

  async uploadMediaFile(
    file: File,
    altText?: string,
    description?: string,
    category?: string
  ): Promise<MediaFile> {
    const formData = new FormData();
    formData.append('file', file);
    if (altText) formData.append('altText', altText);
    if (description) formData.append('description', description);
    if (category) formData.append('category', category);

    const response = await fetch(`${this.API_BASE}/media/upload`, {
      method: 'POST',
      headers: authService.getFormDataHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de l\'upload du fichier');
    }

    return response.json();
  }

  async updateMediaFile(id: number, data: MediaFileUpdateRequest): Promise<void> {
    const response = await fetch(`${this.API_BASE}/media/${id}`, {
      method: 'PUT',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour du média');
    }
  }

  async deleteMediaFile(id: number): Promise<void> {
    const response = await fetch(`${this.API_BASE}/media/${id}`, {
      method: 'DELETE',
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du média');
    }
  }

  async getCategories(): Promise<string[]> {
    const response = await fetch(`${this.API_BASE}/media/categories`, {
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories');
    }

    return response.json();
  }
}

export const adminService = new AdminService();

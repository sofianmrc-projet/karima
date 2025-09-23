import { useState, useEffect } from 'react';
import { api, Section } from '../lib/api';

export const useSections = (category?: string) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSections = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data: Section[];
        if (category) {
          data = await api.getSectionsByCategory(category);
        } else {
          data = await api.getSections();
        }
        
        setSections(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
        console.error('Erreur lors du chargement des sections:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSections();
  }, [category]);

  return { sections, loading, error };
};

export const useSection = (key: string) => {
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSection = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await api.getSection(key);
        setSection(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
        console.error('Erreur lors du chargement de la section:', err);
      } finally {
        setLoading(false);
      }
    };

    if (key) {
      loadSection();
    }
  }, [key]);

  return { section, loading, error };
};

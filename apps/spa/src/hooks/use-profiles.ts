import { useEffect, useState } from 'react';
import { type Profile, fetchProfiles } from '@erasys-monorepo/shared-profiles';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export interface UseProfilesResult {
  profiles: Profile[];
  isLoading: boolean;
  error: string | null;
}

export function useProfiles(): UseProfilesResult {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setError(null);
      try {
        const data = await fetchProfiles({
          fetchImpl: fetch,
          apiBaseUrl: API_BASE,
          signal: controller.signal,
        });

        setProfiles(data);
      } catch (err) {
        if ((err as DOMException).name === 'AbortError') return;
        setError('Failed to load profiles');
      } finally {
        setIsLoading(false);
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  console.log({ profiles, isLoading, error });

  return { profiles, isLoading, error };
}

// These should be extracted to a config file or environment variable, for now we'll use the default values for demonstration purposes
export const REMOTE_PROFILE_ENDPOINT =
  'https://www.hunqz.com/api/opengrid/profiles/msescortplus';
export const PROFILE_IMAGE_BASE_URL =
  'https://www.hunqz.com/img/usr/original/0x0';

export interface RemoteProfile {
  id?: string | number;
  url_token?: string;
  display_name?: string;
  name?: string;
  preview_pic?: {
    url_token?: string;
  } | null;
  pictures?: Array<{
    id: string;
    url_token?: string;
  }>;
  [key: string]: unknown;
}

export interface Picture {
  id: string;
  src: string;
}
export interface Profile {
  id: string;
  displayName: string;
  pictures: Array<Picture>;
}

export function buildProfileImageUrl(urlToken?: string): string {
  if (!urlToken) {
    return '';
  }
  const safeToken = encodeURIComponent(urlToken.trim());
  return `${PROFILE_IMAGE_BASE_URL}/${safeToken}.jpg`;
}

export function mapRemoteProfiles(raw: RemoteProfile[]): Profile[] {
  return raw
    .map((p) => {
      return {
        id: p.id,
        displayName: p.name,
        pictures: p.pictures?.map((picture) => {
          return {
            id: picture.id,
            src: buildProfileImageUrl(picture.url_token),
          };
        }),
      };
    })
    .filter((p): p is Profile => p !== null);
}

export async function fetchProfilesFromRemote(
  fetchImpl: typeof fetch = fetch,
  init?: RequestInit,
): Promise<Profile[]> {
  const response = await fetchImpl(REMOTE_PROFILE_ENDPOINT, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch profiles: ${response.status}`);
  }

  const data: unknown = await response.json();

  // make sure we have an array of remote profiles
  let items: RemoteProfile[];

  if (Array.isArray(data)) {
    items = data as RemoteProfile[];
  } else if (data && typeof data === 'object') {
    items = [data as RemoteProfile];
  } else {
    items = [];
  }

  return mapRemoteProfiles(items);
}

export interface FetchProfilesOptions {
  fetchImpl?: typeof fetch;
  signal?: AbortSignal;
  /** When set (e.g. '' or 'http://localhost:3000'), fetches from apiBaseUrl + '/api/profiles' instead of remote. Use in browser to avoid CORS. */
  apiBaseUrl?: string;
}

export async function fetchProfiles(
  options: FetchProfilesOptions = {},
): Promise<Profile[]> {
  const { fetchImpl = fetch, signal, apiBaseUrl } = options;
  if (apiBaseUrl !== undefined) {
    const res = await fetchImpl(`${apiBaseUrl}/api/profiles`, { signal });
    if (!res.ok) throw new Error(`Failed to fetch profiles: ${res.status}`);
    return (await res.json()) as Profile[];
  }
  return fetchProfilesFromRemote(fetchImpl, { signal });
}

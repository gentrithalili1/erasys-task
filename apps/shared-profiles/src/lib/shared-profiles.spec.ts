import {
  PROFILE_IMAGE_BASE_URL,
  buildProfileImageUrl,
  fetchProfilesFromRemote,
  mapRemoteProfiles,
  type RemoteProfile,
} from './shared-profiles.js';

describe('buildProfileImageUrl', () => {
  it('returns empty string for missing or empty token', () => {
    expect(buildProfileImageUrl()).toBe('');
    expect(buildProfileImageUrl('')).toBe('');
  });

  it('builds URL with encoded token', () => {
    expect(buildProfileImageUrl('foo')).toBe(
      `${PROFILE_IMAGE_BASE_URL}/foo.jpg`,
    );
    expect(buildProfileImageUrl('a/b')).toBe(
      `${PROFILE_IMAGE_BASE_URL}/a%2Fb.jpg`,
    );
  });
});

describe('mapRemoteProfiles', () => {
  it('maps remote profiles to Profile with id, displayName, pictures, raw', () => {
    const raw: RemoteProfile[] = [
      {
        id: 1,
        url_token: 'abc',
        name: 'Alice',
        pictures: [
          { id: 'p1', url_token: 'pic1' },
          { id: 'p2', url_token: 'pic2' },
        ],
      },
      {
        id: 'x',
        url_token: 'xyz',
        name: 'Bob',
      },
    ];

    const mapped = mapRemoteProfiles(raw);

    expect(mapped).toHaveLength(2);
    expect(mapped[0]).toMatchObject({
      id: 1,
      displayName: 'Alice',
      raw: raw[0],
    });
    expect(mapped[0].pictures).toHaveLength(2);
    expect(mapped[0].pictures![0]).toEqual({
      id: 'p1',
      src: `${PROFILE_IMAGE_BASE_URL}/pic1.jpg`,
    });
    expect(mapped[0].pictures![1]).toEqual({
      id: 'p2',
      src: `${PROFILE_IMAGE_BASE_URL}/pic2.jpg`,
    });

    expect(mapped[1]).toMatchObject({
      id: 'x',
      displayName: 'Bob',
      raw: raw[1],
    });
    expect(mapped[1].pictures).toBeUndefined();
  });
});

describe('fetchProfilesFromRemote', () => {
  it('uses provided fetch and maps response to Profile[]', async () => {
    const fakeResponse = {
      ok: true,
      status: 200,
      json: async () => [
        {
          id: 1,
          url_token: 'abc',
          name: 'Alice',
          pictures: [{ id: 'p1', url_token: 'img' }],
        },
      ],
    } as const;

    const fakeFetch: typeof fetch = async () =>
      fakeResponse as unknown as Response;

    const result = await fetchProfilesFromRemote(fakeFetch);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: 1,
      displayName: 'Alice',
      raw: expect.any(Object),
    });
    expect(result[0].pictures).toHaveLength(1);
    expect(result[0].pictures![0]).toEqual({
      id: 'p1',
      src: `${PROFILE_IMAGE_BASE_URL}/img.jpg`,
    });
  });

  it('throws when response is not ok', async () => {
    const fakeFetch: typeof fetch = async () =>
      ({ ok: false, status: 404 }) as unknown as Response;

    await expect(fetchProfilesFromRemote(fakeFetch)).rejects.toThrow(
      'Failed to fetch profiles: 404',
    );
  });
});

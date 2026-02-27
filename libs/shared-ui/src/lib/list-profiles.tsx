import type { ReactNode } from 'react';
import type { Profile } from '@erasys-monorepo/shared-profiles';
import { ProfileCard } from './profile-card';

export interface ListProfilesProps {
  profiles: Profile[];
  sectionTitle?: string;
  loading?: boolean;
  error?: string;
  renderPicture: (
    picture: { id: string; src: string },
    alt: string
  ) => ReactNode;
}

export function ListProfiles({
  profiles,
  sectionTitle = 'Featured profiles',
  loading = false,
  error,
  renderPicture,
}: ListProfilesProps) {
  return (
    <section className="space-y-8">
      <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
        {sectionTitle}
      </h2>
      <div className="space-y-10">
        {error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : loading ? (
          <p className="text-slate-400 text-center">Loading profiles...</p>
        ) : (
          profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              renderPicture={renderPicture}
            />
          ))
        )}
      </div>
    </section>
  );
}

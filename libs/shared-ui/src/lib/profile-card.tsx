import type { ReactNode } from 'react';
import type { Profile } from '@erasys-monorepo/shared-profiles';

export interface ProfileCardProps {
  profile: Profile;
  renderPicture: (
    picture: { id: string; src: string },
    alt: string,
  ) => ReactNode;
}

export function ProfileCard({ profile, renderPicture }: ProfileCardProps) {
  return (
    <article className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white truncate">
          {profile.displayName}
        </h3>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-2 sm:gap-3">
        {profile.pictures?.map((picture) => (
          <div
            key={picture.id}
            className="relative aspect-[3/4] min-w-0 overflow-hidden rounded-xl bg-slate-800"
          >
            {renderPicture(picture, profile.displayName)}
          </div>
        ))}
      </div>
    </article>
  );
}

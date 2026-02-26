import Image from 'next/image';
import type { Metadata } from 'next';
import { fetchProfiles } from '@erasys-monorepo/shared-profiles';

export const metadata: Metadata = {
  title: 'Hunqz Profiles Gallery - SSR Demo',
  description:
    'Server-rendered gallery of Hunqz user profiles, demonstrating Nx monorepo with Next.js and shared TypeScript modules.',
  openGraph: {
    title: 'Hunqz Profiles Gallery - SSR Demo',
    description:
      'Server-rendered gallery of Hunqz user profiles, demonstrating Nx monorepo with Next.js and shared TypeScript modules.',
  },
};

export default async function Index() {
  const profiles = await fetchProfiles();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12">
        <header className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
            Nx Monorepo • Next.js SSR
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Hunqz Profiles Gallery
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
            This page is fully server-rendered with Next.js and powered by a
            shared TypeScript library that fetches profile data and image URLs
            from the remote Hunqz API.
          </p>
        </header>

        <section className="space-y-8">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
            Featured profiles
          </h2>

          <div className="space-y-10">
            {profiles.map((profile) => (
              <article
                key={profile.id}
                className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm"
              >
                {/* Profile Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {profile.displayName}
                  </h3>
                </div>

                {/* Pictures Row */}
                <div className="flex flex-wrap gap-3">
                  {profile.pictures?.map((picture) => (
                    <div
                      key={picture.id}
                      className="relative aspect-[3/4] w-24 sm:w-28 md:w-32 lg:w-36 overflow-hidden rounded-xl bg-slate-800"
                    >
                      <Image
                        src={picture.src}
                        alt={profile.displayName}
                        fill
                        sizes="(max-width: 640px) 96px,
                       (max-width: 768px) 112px,
                       (max-width: 1024px) 128px,
                       144px"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-500">
          <p>
            Built with <span className="font-semibold">Nx</span>,{' '}
            <span className="font-semibold">Next.js 16</span>, and{' '}
            <span className="font-semibold">Tailwind CSS</span> in a typed
            monorepo architecture.
          </p>
        </footer>
      </section>
    </main>
  );
}
